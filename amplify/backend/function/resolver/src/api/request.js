const gqlUtil = require('./utils/gql_utils')
const ddbAPI = require('./utils/ddb_utils')
const userQueries = require('./user')

module.exports = {
	getRequestsFromUser: async (username, filter, limit, nextToken) => {
		console.log('requestAPI.getRequestsFromUser input: ' + [username, JSON.stringify(filter), limit, nextToken])
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
								files {
									bucket
									key
									name
									region
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
		const response = await gqlUtil.execute(
			{ username: username, filter: filter || { id: { ne: '' } }, limit: limit || 50, nextToken: nextToken },
			query,
			'getRequestsFromUser',
		)
		const result = response.data.listRequestsBySenderUsername
		console.log('requestAPI.getRequestsFromUser output: ' + JSON.stringify(result))
		return result
	},
	getRequestsForUser: async (username, email, filter, limit, nextToken) => {
		console.log('requestAPI.getRequestsForUser input: ' + [username, email, filter, limit, nextToken])
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
								files {
									bucket
									key
									name
									region
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
		const response = await gqlUtil.execute(
			{ email: email, filter: filter || { id: { ne: '' } }, limit: limit || 50, nextToken: nextToken },
			query,
			'getRequestsForUser',
		)
		const result = response.data.listRequestsByReceiverEmail
		console.log('requestAPI.getRequestsForUser output: ' + JSON.stringify(result))
		return result
	},

	resolveRequest: async (username, groups, id, decision, callerPayload) => {
		console.log('requestAPI.resolveRequest input: ' + [username, JSON.stringify(groups), id, decision, JSON.stringify(callerPayload)])
		if (!username) {
			throw new Error('Invalid username or unauthenticated user.')
		}

		// Fetch the request with the provided ID
		const query1 = /* GraphQL */ `
			query getRequestById($filter: ModelRequestsFilterInput!) {
				listRequestss(filter: $filter) {
					items {
						id
						senderUsername
						senderEmail
						receiverEmail
						type
						createdAt
						updatedAt
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
								files {
									bucket
									key
									name
									region
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
					}
				}
			}
		`
		const retrieveRequestResponse = await gqlUtil.execute({ filter: { id: { eq: id } } }, query1, 'getRequestById')
		const requestObject = retrieveRequestResponse.data.listRequestss.items[0] || null
		if (requestObject == null) {
			throw new Error('Request with provided ID was not found.')
		}
		console.log('Request object: ' + JSON.stringify(requestObject))

		//Retrieve the sender's UserProfile
		const senderUserProfile = await userQueries.getUserProfileByUsername(requestObject.senderUsername)
		if (senderUserProfile == null) {
			throw new Error(`User profile for sender was not found.`)
		}

		const receiverUserProfile = await userQueries.getUserProfileByEmail(requestObject.email)
		if (receiverUserProfile == null) {
			throw new Error(`User profile for sender was not found.`)
		}

		//Resolve the request
		let result = ''
		console.log(`Decision for ${requestObject.type}: ${decision}`)
		switch (requestObject.type) {
			case 'CREATE_OFFICE': {
				if (groups == null || groups.indexOf('admin') === -1) {
					throw new Error('Admin privilleges are required to resolve this request.')
				}

				//TODO make this a DDB Trasaction
				if (decision === 'ACCEPT') {
					//Create the new Office
					const createOfficeInput = requestObject.payload.createOfficePayload
					if (!createOfficeInput) {
						throw new Error('Request has invalid payload.')
					}
					createOfficeInput.ownerUsername = senderUserProfile.username
					createOfficeInput.partnersNumberLimit = callerPayload.createOfficePayload.partnersNumberLimit
					createOfficeInput.employeesNumberLimit = callerPayload.createOfficePayload.employeesNumberLimit
					createOfficeInput.verified = true
					createOfficeInput.files = []

					const mutation1 = /* GraphQL */ `
						mutation createOffice($input: CreateOfficeInput!) {
							createOffice(input: $input) {
								id
							}
						}
					`
					const createOfficeResponse = await gqlUtil.execute({ input: createOfficeInput }, mutation1, 'createOffice')
					const createdOfficeId = createOfficeResponse.data.createOffice.id
					if (!createdOfficeId) {
						throw new Error('Failed to create new office.')
					}

					//Create a connection between the new Office and the manager.
					const createTUCInput = {
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
					const createTUCResponse = await gqlUtil.execute({ input: createTUCInput }, mutation2, 'createOfficeUserConnection')
					const createdTUCId = createTUCResponse.data.createOfficeUserConnection.id
					if (!createdTUCId) {
						throw new Error('Failed to create new Office-User connection.')
					}

					//Update role in the UserProfile
					const mutation = /* GraphQL */ `
						mutation updateUserProfileDetails($input: UpdateUserProfileInput!) {
							updateUserProfile(input: $input) {
								id
							}
						}
					`
					const upInput = {
						id: senderUserProfile.id,
						role: 'MANAGER',
					}
					const response = await gqlUtil.execute({ input: upInput }, mutation, 'updateUserProfileDetails')
					const resultUP = response.data.updateUserProfile.id
					if (!resultUP) {
						throw new Error('Failed to update Manager`s UserProfile role.')
					}

					result = createdOfficeId
					console.log(`Request with ID ${id} was accepted.`)
				} else {
					console.log(`Request with ID ${id} was rejected.`)
				}
				break
			}
			case 'CREATE_OFFICE_CONNECTION': {
				if (decision === 'ACCEPT') {
					//Get the sencer and receiver offices
					const senderOffice = await module.exports.getOfficeByOwnerUsername(requestObject.senderUsername)
					if (!senderOffice) {
						throw new Error("Sender's Office not found.")
					}
					const receiverOffice = await module.exports.getOfficeByOwnerUsername(requestObject.receiverUsername)
					if (!receiverOffice) {
						throw new Error("Receiver's Office not found.")
					}

					//Transaction, add the new connection
					try {
						const connId = await ddbAPI.addOfficeConnection(senderOffice, receiverOffice)
						result = connId
					} catch (err) {
						throw new Error(
							'Failed to add employee to Office, ensure that the Office is allowed to collaborate with other Offices.',
						)
					}
					console.log(`Request with ID ${id} was accepted.`)
				} else {
					console.log(`Request with ID ${id} was rejected.`)
				}
				break
			}
			case 'INVITE_EMPLOYEE_TO_OFFICE': {
				if (decision === 'ACCEPT') {
					//Get the sencer`s office
					const senderOffice = await module.exports.getOfficeByOwnerUsername(requestObject.senderUsername)
					if (!senderOffice) {
						throw new Error("Sender's Office not found.")
					}

					//Ensure that the User has no other connections
					const isUnemployed = await userQueries.checkIfUserIsUnemployed(requestObject.receiverUsername)
					if (!isUnemployed) {
						throw new Error("User is a member of another Office and therefore can't join a new one.")
					}

					//Get the permissions (decided by manager)
					const modelPermissions = requestObject.payload.inviteEmployeeToOfficePayload.empModelPermissions
					const pagePermissions = requestObject.payload.inviteEmployeeToOfficePayload.empPagePermissions

					//Add the Employee to the new Office and create the connection between User and Office
					try {
						const empAddRes = await ddbAPI.addEmployeeToOffice(
							senderOffice,
							senderUserProfile.id,
							requestObject.receiverUsername,
							requestObject.id,
							receiverUserProfile.id,
							modelPermissions,
							pagePermissions,
						)
						console.log('Invite emp tx: ' + JSON.stringify(empAddRes))
						result = receiverUserProfile.id
					} catch (err) {
						throw new Error('Failed to add employee to Office, ensure that the Office is allowed to invite employees.')
					}
					console.log(`Request with ID ${id} was accepted.`)
				} else {
					console.log(`Request with ID ${id} was rejected.`)
				}
				break
			}
			case 'INVITE_CONTRACTOR_TO_OFFICE': {
				//Create an unverified office
				if (decision === 'ACCEPT') {
					//let newContractorResult = await ddbAPI.addContractorToOffice('office', receiverUsername, 'empEmail', uuid)

					//Update role in the UserProfile
					const mutation = /* GraphQL */ `
						mutation updateUserProfileDetails($input: UpdateUserProfileInput!) {
							updateUserProfile(input: $input) {
								id
							}
						}
					`
					const upInput = {
						id: senderUserProfile.id,
						role: 'CONTRACTOR',
					}
					const response = await gqlUtil.execute({ input: upInput }, mutation, 'updateUserProfileDetails')
					const resultUP = response.data.updateUserProfile.id
					if (!resultUP) {
						throw new Error('Failed to update Contractor`s UserProfile role.')
					}
				} else {
					console.log(`Request with ID ${id} was rejected.`)
				}
				break
			}
			default: {
				throw new Error('Invalid request type.')
			}
		}

		//Delete the resolved request
		const mutation0 = /* GraphQL */ `
			mutation deleteResolvedRequest($input: DeleteRequestsInput!) {
				deleteRequests(input: $input) {
					id
				}
			}
		`
		const delResponse = await gqlUtil.execute({ input: { id: id } }, mutation0, 'deleteResolvedRequest')
		console.log(`Request with id=${id} was deleted with message: ${JSON.stringify(delResponse)}`)

		console.log('RequestAPI.resolveRequest output: ' + JSON.stringify(result))
		return result
	},

	/*
	 * Mutations
	 */
	createInviteEmployeeToOfficeRequest: async (username, email, groups, input) => {
		console.log('requestAPI.createInviteEmployeeToOfficeRequest input: ' + [username, email, groups, JSON.stringify(input)])
		if (!username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		input.empPagePermissions = JSON.stringify(input.empPagePermissions)
		const requestInput = {
			senderUsername: username,
			senderEmail: email,
			type: 'INVITE_EMPLOYEE_TO_OFFICE',
			receiverEmail: input.email,
			payload: { inviteEmployeeToOfficePayload: input },
		}
		const mutation = /* GraphQL */ `
			mutation createRequest($input: CreateRequestsInput!) {
				createRequests(input: $input) {
					id
				}
			}
		`
		const response = await gqlUtil.execute({ input: requestInput }, mutation, 'createRequest')
		const reqID = response.data.createRequests.id
		const result = requestInput
		result.id = reqID
		console.log('requestAPI.createInviteEmployeeToOfficeRequest output: ' + JSON.stringify(result))
		return result
	},

	createInviteContractorToOfficeRequest: async (username, email, groups, input) => {
		console.log('requestAPI.createInviteContractorToOfficeRequest input: ' + [username, email, groups, JSON.stringify(input)])
		if (!username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		input.empPagePermissions = JSON.stringify(input.empPagePermissions)
		const requestInput = {
			senderUsername: username,
			senderEmail: email,
			type: 'INVITE_CONTRACTOR_TO_OFFICE',
			receiverEmail: input.email,
			payload: { inviteContractorToOfficePayload: input },
		}
		const mutation = /* GraphQL */ `
			mutation createRequest($input: CreateRequestsInput!) {
				createRequests(input: $input) {
					id
				}
			}
		`
		const response = await gqlUtil.execute({ input: requestInput }, mutation, 'createRequest')
		const reqID = response.data.createRequests.id
		const result = requestInput
		result.id = reqID
		console.log('requestAPI.createInviteContractorToOfficeRequest output: ' + JSON.stringify(result))
		return result
	},

	createOfficeRequest: async (username, email, groups, input) => {
		console.log('requestAPI.createOfficeRequest input: ' + [username, email, groups, JSON.stringify(input)])
		if (!username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const requestInput = {
			senderUsername: username,
			senderEmail: email,
			type: 'CREATE_OFFICE',
			receiverEmail: 'admin1@wais.com',
			payload: { createOfficePayload: input },
		}

		if (requestInput.payload.createOfficePayload == null || requestInput.payload.createOfficePayload == '{}') {
			throw new Error('Invalid payload.')
		}

		const mutation = /* GraphQL */ `
			mutation createRequest($input: CreateRequestsInput!) {
				createRequests(input: $input) {
					id
				}
			}
		`
		const response = await gqlUtil.execute({ input: requestInput }, mutation, 'createRequest')
		const reqID = response.data.createRequests.id
		const result = requestInput
		result.id = reqID
		console.log('requestAPI.createOfficeRequest output: ' + JSON.stringify(result))
		return result
	},
	createOfficeConnectionRequest: async (username, email, groups, input) => {
		console.log('requestAPI.createOfficeConnectionRequest input: ' + [username, email, groups, JSON.stringify(input)])
		if (!username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const requestInput = {
			senderUsername: username,
			senderEmail: email,
			type: 'CREATE_OFFICE_CONNECTION',
			receiverEmail: input.manager_email,
			payload: { createOfficeConnectionPayload: input },
		}
		const mutation = /* GraphQL */ `
			mutation createRequest($input: CreateRequestsInput!) {
				createRequests(input: $input) {
					id
				}
			}
		`
		const response = await gqlUtil.execute({ input: requestInput }, mutation, 'createRequest')
		const reqID = response.data.createRequests.id
		const result = requestInput
		result.id = reqID
		console.log('requestAPI.createOfficeConnectionRequest output: ' + JSON.stringify(result))
		return result
	},

	deleteRequestsSentByMe: async (username, email, groups, input, condition) => {
		console.log('requestAPI.deleteRequestsSentByMe input: ' + [username, email, groups, input, condition])
		if (!username) {
			throw new Error('Invalid username or unauthenticated user.')
		}

		const expanded_condition = {
			and: [condition || { senderUsername: { ne: '' } }, { senderUsername: { eq: username } }, { senderEmail: { eq: email } }],
		}
		const mutation = /* GraphQL */ `
			mutation deleteRequestsSentByMe($input: DeleteRequestsInput!, $condition: ModelRequestsConditionInput) {
				deleteRequests(input: $input, condition: $condition) {
					id
				}
			}
		`
		const response = await gqlUtil.execute({ input: input, condition: expanded_condition }, mutation, 'deleteRequestsSentByMe')
		const result = response.data.deleteRequests
		console.log('requestAPI.deleteRequestsSentByMe output: ' + JSON.stringify(result))
		return result
	},
}
