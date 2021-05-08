const gqlUtil = require('../utils/gql')
const userQueries = require('./user')
const officeQueries = require('./office')

//Init the DDB client and update regional settings
const AWS = require('aws-sdk')
AWS.config.update({
	region: process.env.REGION,
})

//DDB client
const ddb = new AWS.DynamoDB.DocumentClient({
	region: process.env.REGION,
})

//Amplify DDB table suffix
const ddbSuffix = '-' + process.env.API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT + '-' + process.env.ENV


module.exports = {
	getRequestById: (id) => {
		return ddb.get({TableName: 'Requests' + ddbSuffix, Key: {id: id}})
			.promise()
			.then(data => data.Item)
	},
	deleteRequestById: (id) => {
		return ddb.delete({TableName: 'Office' + ddbSuffix, Key: {id: id}})
			.promise()
	},
	getRequestsFromUser: (username, filter, limit, nextToken) => {
		const query = /* GraphQL */ `
			query getRequestsFromUser($username: String!, $filter: ModelRequestsFilterInput, $limit: Int, $nextToken: String) {
				listRequestsBySenderUsername(limit: $limit, nextToken: $nextToken, filter: $filter, senderUsername: $username) {
					items {
						id
						updatedAt
						type
						senderUsername
						senderEmail
						receiverEmail
						payload {
							createOfficePayload {
								officeName
								zip_code
								tin
								professionStartDate
								phone
								office_email
								mobile
								insuranceLicenseExpirationDate
								address
								chamberRecordNumber
								civilLiabilityExpirationDate
								comments
								office_logo {
									level
									idToken
									filePath
									filename
									contentType
								}
								files {
									level
									idToken
									filePath
									filename
									contentType
								}
							}
							createOfficeConnectionPayload {
								manager_email
							}
							inviteEmployeeToOfficePayload {
								email
								empModelPermissions
								empPagePermissions
							}
							inviteContractorToOfficePayload {
								email
								ctrModelPermissions
								ctrPagePermissions
							}
						}
						createdAt
					}
					nextToken
				}
			}
		`
		return gqlUtil.execute(
			{username: username, filter: filter || {id: {ne: ''}}, limit: limit || 100, nextToken: nextToken},
			query, 'getRequestsFromUser')
			.then(result => {
				if (result === undefined) {
					return Promise.reject(new Error('Failed to get Requests.'))
				}
				result?.items.forEach((request) => {  //Quick page permissions fix
					if (request.payload?.inviteEmployeeToOfficePayload?.empPagePermissions) {
						request.payload.inviteEmployeeToOfficePayload.empPagePermissions = JSON.parse(request.payload.inviteEmployeeToOfficePayload.empPagePermissions)
					}
					if (request.payload?.inviteContractorToOfficePayload?.ctrPagePermissions) {
						request.payload.inviteContractorToOfficePayload.ctrPagePermissions = JSON.parse(request.payload.inviteContractorToOfficePayload.ctrPagePermissions)
					}
				})
				return result
			})
	},
	getRequestsForUser: (username, email, filter, limit, nextToken) => {
		const query = /* GraphQL */ `
			query getRequestsForUser($email: String!, $filter: ModelRequestsFilterInput, $limit: Int, $nextToken: String) {
				listRequestsByReceiverEmail(limit: $limit, nextToken: $nextToken, filter: $filter, receiverEmail: $email) {
					items {
						id
						updatedAt
						type
						senderUsername
						senderEmail
						receiverEmail
						payload {
							createOfficePayload {
								officeName
								zip_code
								tin
								professionStartDate
								phone
								office_email
								mobile
								insuranceLicenseExpirationDate
								address
								chamberRecordNumber
								civilLiabilityExpirationDate
								comments
								office_logo {
									level
									idToken
									filePath
									filename
									contentType
								}
								files {
									level
									idToken
									filePath
									filename
									contentType
								}
							}
							createOfficeConnectionPayload {
								manager_email
							}
							inviteEmployeeToOfficePayload {
								email
								empModelPermissions
								empPagePermissions
							}
							inviteContractorToOfficePayload {
								email
								ctrModelPermissions
								ctrPagePermissions
							}
						}
						createdAt
					}
					nextToken
				}
			}
		`
		return gqlUtil.execute(
			{email: email, filter: filter || {id: {ne: ''}}, limit: limit || 50, nextToken: nextToken},
			query, 'getRequestsForUser')
			.then(result => {
				if (result === undefined) {
					return Promise.reject(new Error('Failed to get Requests.'))
				}
				result?.items.forEach((request) => {  //Quick page permissions fix
					if (request.payload?.inviteEmployeeToOfficePayload?.empPagePermissions) {
						request.payload.inviteEmployeeToOfficePayload.empPagePermissions = JSON.parse(request.payload.inviteEmployeeToOfficePayload.empPagePermissions)
					}
					if (request.payload?.inviteContractorToOfficePayload?.ctrPagePermissions) {
						request.payload.inviteContractorToOfficePayload.ctrPagePermissions = JSON.parse(request.payload.inviteContractorToOfficePayload.ctrPagePermissions)
					}
				})
				return result
			})
	},

	resolveRequest: async (callerUsername, caller_email, groups, id, decision, callerPayload) => {
		if (!decision) {
			return Promise.reject(new Error("No 'decision' field provided."))
		}
		if (!id) {
			return Promise.reject(new Error("No 'id' field provided."))
		}

		//Start fetching the caller's profile
		const callerProfilePromise = userQueries.getUserProfileByEmail(caller_email)

		return module.exports.getRequestById(id)
			.catch(reason => {
				console.log('Failed to get Request with error: ' + JSON.stringify(reason, null, 2))
				return Promise.reject(reason)
			})
			.then(async function (requestObject) {
				console.log('Request object: ' + JSON.stringify(requestObject))

				//Block and fetch the sender's and receiver's UserProfile
				let senderUPFound = true, callerUPFound = true
				const senderUserProfile = await userQueries.getUserProfileByUsername(requestObject.senderUsername)
					.catch(reason => {
						console.log(`Failed to find sender's UserProfile for request ID: ${requestObject.id} and reason: ${JSON.stringify(reason)}`)
						senderUPFound = false
					})
				if (!senderUPFound) {
					return Promise.reject(new Error(`Failed to find sender's UserProfile for request ID: ${requestObject.id}`))
				}
				const receiverUserProfile = await callerProfilePromise
					.catch(reason => {
						console.log(`Failed to find caller's UserProfile for request ID: ${requestObject.id} and reason: ${JSON.stringify(reason)}`)
						callerUPFound = false
					})
				if (!callerUPFound) {
					return Promise.reject(new Error(`Failed to find caller's UserProfile for request ID: ${requestObject.id}`))
				}

				//Resolve the request
				console.log(`Decision for ${requestObject.type}: ${decision}`)
				switch (requestObject.type) {
					case 'VERIFY_OFFICE': {
						if (groups == null || groups.indexOf('admin') === -1) {
							return Promise.reject(new Error('Admin privileges are required to resolve this request.'))
						}

						if (decision === 'ACCEPT') {
							//Required
							if (!callerPayload) {
								return Promise.reject(new Error("No 'payload' field provided."))
							}

							//Create the new Office
							const createOfficeInput = requestObject?.payload?.verifyOfficePayload
							if (!createOfficeInput) {
								return Promise.reject(new Error('Request has invalid payload.'))
							}

							//Add extra fields to the Office
							createOfficeInput.ownerUsername = senderUserProfile.username
							createOfficeInput.partnersNumberLimit = callerPayload.createOfficePayload.partnersNumberLimit
							createOfficeInput.employeesNumberLimit = callerPayload.createOfficePayload.employeesNumberLimit
							createOfficeInput.insuranceCompanies = callerPayload.createOfficePayload.insuranceCompanies || []
							createOfficeInput.insuranceCompaniesAvailable = callerPayload.createOfficePayload.insuranceCompaniesAvailable || []
							createOfficeInput.subscriptionExpirationDate = callerPayload.createOfficePayload.subscriptionExpirationDate
							createOfficeInput.verified = true
							createOfficeInput.bankAccountInfo = JSON.stringify([])

							//Delete some fields that should only be present in the request and not in the office
							delete createOfficeInput.comments

							//Empty and Null checks
							if (!createOfficeInput?.office_email) {
								return Promise.reject(new Error('Office e-mail can not be empty.'))
							}

							const mutation1 = /* GraphQL */ `
								mutation createOffice($input: CreateOfficeInput!) {
									createOffice(input: $input) {
										id
									}
								}
							`

							let createOfficeErrorMsg = 'Failed to create new Office.'
							const createdOfficeId = await gqlUtil.execute({input: createOfficeInput}, mutation1, 'createOffice')
								.then(response => response.id)
								.catch(reason => {
									createOfficeErrorMsg = 'Failed to create new office: ' + JSON.stringify(reason, null, 2)
								})
							if (!createdOfficeId) {
								return Promise.reject(new Error(createOfficeErrorMsg))
							}
							console.log(`Created Office with ID= ${createdOfficeId}`)

							//Create a connection between the new Office and the manager.
							const createOUCInput = {
								officeId: createdOfficeId,
								officeName: createOfficeInput.officeName,
								userId: senderUserProfile.id,
								username: senderUserProfile.username,
								pagePermissions: JSON.stringify(callerPayload.createOfficePayload.managerPagePermissions),
								modelPermissions: callerPayload.createOfficePayload.managerModelPermissions,
								employeeType: 'MANAGER',
							}

							const mutation2 = /* GraphQL */ `
								mutation createOfficeUserConnection($input: CreateOfficeUserConnectionInput!) {
									createOfficeUserConnection(input: $input) {
										id
									}
								}
							`

							let createOUCErrorMsg = 'Failed to create new Office-User Connection.'
							const createOUCResult = await gqlUtil.execute({input: createOUCInput}, mutation2, 'createOfficeUserConnection')
								.catch(reason => {
									createOUCErrorMsg = 'Failed to create new Office-User Connection: ' + JSON.stringify(reason, null, 2)
								})
							if (!createOUCResult) {
								return Promise.reject(new Error(createOUCErrorMsg))
							}
							console.log(`Created OUC: ${JSON.stringify(createOUCResult)}`)

							//Update role in the UserProfile
							let updateRoleErrorMsg = 'Failed to update new UserProfile role.'
							const updateSuccess = await userQueries.updateUserRoleByUserId(senderUserProfile.id, 'MANAGER')
								.then(() => true)
								.catch(err => {
									updateRoleErrorMsg = 'Failed to update new UserProfile role with error: ' + JSON.stringify(err)
									return false
								})
							if (!updateSuccess) {
								return Promise.reject(new Error(updateRoleErrorMsg))
							}
							return createdOfficeId
						} else {
							console.log(`Request with ID ${id} was rejected.`)
						}
						break
					}
					case 'CREATE_OFFICE_CONNECTION': {
						//Ensure that the caller-employee is the receiver of this request
						if (caller_email !== requestObject.receiverEmail) {
							return Promise.reject(new Error('Caller is not the receiver of this request (e-mail mismatch).'))
						}

						if (decision === 'ACCEPT') {
							//Get the sender and receiver offices
							const senderOffice = await officeQueries.getOfficeByOwnerUsername(requestObject.senderUsername)
							if (!senderOffice) {
								return Promise.reject(new Error("Sender's Office not found."))
							}
							const receiverOffice = await officeQueries.getOfficeByOwnerUsername(receiverUserProfile.username)
							if (!receiverOffice) {
								return Promise.reject(new Error("Receiver's Office not found."))
							}

							//Transaction, add the new connection
							try {
								return await officeQueries.addOfficeAccessConnection(senderOffice, receiverOffice, 'comp1', 'code1')//TODO change
							} catch (err) {
								return Promise.reject(new Error(
									'Failed to add employee to Office, ensure that the Office is allowed to collaborate with other Offices.',
								))
							}
						} else {
							console.log(`Request with ID ${id} was rejected.`)
						}
						break
					}
					case 'INVITE_EMPLOYEE_TO_OFFICE': {
						//Ensure that the caller-employee is the receiver of this request
						if (caller_email !== requestObject.receiverEmail) {
							throw  new Error('Caller is not the receiver of this request (e-mail mismatch).')
						}

						if (decision === 'ACCEPT') {
							//Get the sender`s office
							const senderOffice = await officeQueries.getOfficeByOwnerUsername(requestObject.senderUsername)
							if (!senderOffice) {
								return Promise.reject(new Error("Sender's Office not found."))
							}
							//Ensure that the User has no other connections
							const isUnemployed = await userQueries.checkIfUserIsUnemployed(receiverUserProfile.username)
							if (!isUnemployed) {
								return Promise.reject(new Error("User is a member of another Office and therefore can't join a new one."))
							}

							//Get the permissions (decided by manager)
							const modelPermissions = requestObject.payload.inviteEmployeeToOfficePayload.empModelPermissions
							const pagePermissions = requestObject.payload.inviteEmployeeToOfficePayload.empPagePermissions //TODO stringify?

							//Add the Employee to the new Office and create the connection between User and Office
							try {
								const empAddRes = await officeQueries.addEmployeeToOffice(
									senderOffice,
									senderUserProfile.id,
									receiverUserProfile.username,
									requestObject.id,
									receiverUserProfile.id,
									modelPermissions,
									pagePermissions,
								)
								console.log('Invite emp tx: ' + JSON.stringify(empAddRes))
								return receiverUserProfile.id
							} catch (err) {
								return Promise.reject(new Error('Failed to add employee to Office, ensure that the Office is allowed to invite employees.'))
							}
						} else {
							console.log(`Request with ID ${id} was rejected.`)
						}
						break
					}
					case 'INVITE_CONTRACTOR_TO_OFFICE': {
						//Create an unverified office
						if (decision === 'ACCEPT') {
							//Required
							if (!callerPayload) {
								return Promise.reject(new Error("No 'payload' field provided."))
							}

							if (receiverUserProfile.role !== 'CONTRACTOR') {
								return Promise.reject(new Error('Receiver is not a Contractor.'))
							}

							//Create a connection between the contractor office and the manager that invited you
							const contractorOffice = await officeQueries.getOfficeByOwnerUsername(receiverUserProfile.username)
							const otherOffice = await officeQueries.getOfficeByOwnerUsername(senderUserProfile.username);
							return await officeQueries.addOfficeAccessConnection(contractorOffice, otherOffice, 'comp1', 'code1')//FIXME
						} else {
							console.log(`Request with ID ${id} was rejected.`)
						}
						break
					}
					default: {
						return Promise.reject(new Error(`Invalid request type: ${requestObject.type}`))
					}
				}
			})
			.catch(reason => {
				const msg = 'Unhandled error in resolveRequest with reason: ' + JSON.stringify(reason, null, 2)
				console.log(msg)
				return Promise.resolve()
			})
			.then(async function () {
				//Delete the resolved request
				let deleted = true
				await module.exports.deleteRequestById(id)
					.then(() => console.log(`Request with id=${id} was deleted.`))
					.catch(reason => {
						console.log(`Failed to delete request with ID=${id} with reason: ${reason}.`)
						deleted = false
					})
				return JSON.stringify({id: id})
			})
			.catch(reason => {
				const msg = 'Unhandled error in resolveRequest final catch with reason: ' + JSON.stringify(reason, null, 2)
				console.log(msg)
				return Promise.reject(new Error(msg))
			})
	},

	/*
	 * Mutations
	 */
	createInviteEmployeeToOfficeRequest: (username, email, groups, input) => {
		if (!username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		if (!input.email) {
			return Promise.reject(new Error('Receiver\'s email is invalid.'))
		}
		input.empPagePermissions = JSON.stringify(input.empPagePermissions)
		const requestInput = {
			senderUsername: username,
			senderEmail: email,
			type: 'INVITE_EMPLOYEE_TO_OFFICE',
			receiverEmail: input.email,
			payload: {inviteEmployeeToOfficePayload: input},
		}
		const mutation = /* GraphQL */ `
			mutation createRequest($input: CreateRequestsInput!) {
				createRequests(input: $input) {
					id
					updatedAt
					type
					senderUsername
					senderEmail
					receiverEmail
					payload {
						inviteEmployeeToOfficePayload {
							email
							empModelPermissions
							empPagePermissions
						}
					}
				}
			}
		`
		return gqlUtil.execute({input: requestInput}, mutation, 'createRequest')
			.then(result => {
				if (result === undefined) {
					return Promise.reject(new Error('Failed to create request.'))
				}
				if (result?.payload?.inviteEmployeeToOfficePayload?.empPagePermissions) {
					result.payload.inviteEmployeeToOfficePayload.empPagePermissions = JSON.parse(result.payload.inviteEmployeeToOfficePayload.empPagePermissions)
				}
				return result
			})
	},

	createInviteContractorToOfficeRequest: (username, email, groups, input) => {
		if (!username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		if (!input.email) {
			return Promise.reject(new Error('Receiver\'s email is invalid.'))
		}
		input.ctrPagePermissions = JSON.stringify(input.ctrPagePermissions)
		const requestInput = {
			senderUsername: username,
			senderEmail: email,
			type: 'INVITE_CONTRACTOR_TO_OFFICE',
			receiverEmail: input.email,
			payload: {inviteContractorToOfficePayload: input},
		}
		const mutation = /* GraphQL */ `
			mutation createRequest($input: CreateRequestsInput!) {
				createRequests(input: $input) {
					id
					updatedAt
					type
					senderUsername
					senderEmail
					receiverEmail
					payload {
						inviteContractorToOfficePayload {
							email
							ctrModelPermissions
							ctrPagePermissions
						}
					}
				}
			}
		`

		return gqlUtil.execute({input: requestInput}, mutation, 'createRequest')
			.then(result => {
				if (result === undefined) {
					return Promise.reject(new Error('Failed to create request.'))
				}
				if (result?.payload?.inviteContractorToOfficePayload?.ctrPagePermissions) {
					result.payload.inviteContractorToOfficePayload.ctrPagePermissions = JSON.parse(result.payload.inviteContractorToOfficePayload.ctrPagePermissions)
				}
				return result
			})
	},

	/**
	 * Requirements: The caller must have an unverified Office and must hold a role of UNKNOWN.
	 */
	verifyOfficeRequest: (username, email, groups, message) => {
		if (!username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}

		const mutation = /* GraphQL */ `
			mutation createRequest($input: CreateRequestsInput!) {
				createRequests(input: $input) {
					id
					senderUsername
					senderEmail
					receiverEmail
					type
					payload {
						officeId
						message
					}
				}
			}
		`

		//Get *existing* office
		return officeQueries.getOfficeByOwnerUsername(username)
			.then(unverifiedOffice => {
				return {
					senderUsername: username,
					senderEmail: email,
					type: 'CREATE_OFFICE',
					receiverEmail: 'admin@wais.com',
					payload: {office: unverifiedOffice, message: message || ''},
				}
			})
			.then(requestInput => gqlUtil.execute({input: requestInput}, mutation, 'createRequest'))
			.then(responseData => {
				if (responseData === undefined) {
					return Promise.reject(new Error('Failed to create Request.'))
				}
				return responseData
			})
	},
	createOfficeConnectionRequest: (username, email, groups, input) => {
		if (!username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		if (!input?.manager_email) {
			return Promise.reject(new Error('Manager email is required.'))
		}
		if (!email) {
			return Promise.reject(new Error('Caller\'s email is invalid.'))
		}
		const requestInput = {
			senderUsername: username,
			senderEmail: email,
			type: 'CREATE_OFFICE_CONNECTION',
			receiverEmail: input.manager_email,
			payload: {createOfficeConnectionPayload: input},
		}
		const mutation = /* GraphQL */ `
			mutation createRequest($input: CreateRequestsInput!) {
				createRequests(input: $input) {
					id
					createdAt
					updatedAt
				}
			}
		`
		return gqlUtil.execute({input: requestInput}, mutation, 'createRequest')
			.then(responseData => {
				if (responseData === undefined) {
					return Promise.reject(new Error('Failed to create Request.'))
				}
				const result = requestInput
				result.id = responseData.id
				result.createdAt = responseData.createdAt
				result.updatedAt = responseData.updatedAt
				return result
			})
	},

	deleteRequestsSentByMe: (username, email, groups, input, condition) => {
		if (!username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const expanded_condition = {
			and: [condition || {senderUsername: {ne: ''}}, {senderUsername: {eq: username}}, {senderEmail: {eq: email}}],
		}
		const mutation = /* GraphQL */ `
			mutation deleteRequestsSentByMe($input: DeleteRequestsInput!, $condition: ModelRequestsConditionInput) {
				deleteRequests(input: $input, condition: $condition) {
					id
				}
			}
		`
		return gqlUtil.execute({
			input: input,
			condition: expanded_condition
		}, mutation, 'deleteRequestsSentByMe')
			.then(result => {
				if (result === undefined) {
					return Promise.reject(new Error('Failed to delete Requests.'))
				}
				return result
			})
	},
}
