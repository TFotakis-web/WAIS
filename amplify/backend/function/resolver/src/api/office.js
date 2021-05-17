const gqlUtil = require('../gql')
const userAPI = require('../api/user')

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const ddbSuffix = '-' + process.env.API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT + '-' + process.env.ENV

const {
	v1: uuidv1,	// Time-based
	v4: uuidv4,	// Random
	v5: uuidv5,	// Based on name (seed)
} = require('uuid');

module.exports = {
	getOfficeByOwnerUsername: (username) => {
		return docClient.query({
			TableName: 'Office' + ddbSuffix,
			IndexName: 'byOwnerUsername',
			KeyConditionExpression: '#ownerUsernameFieldName = :inputUsername',
			ExpressionAttributeNames: {'#ownerUsernameFieldName': 'ownerUsername'},
			ExpressionAttributeValues: {':inputUsername': username},
		})
			.promise()
			.then(res => res.Items)
	},
	getOfficeByOfficeEmail: (office_email) => {
		return docClient.query({
			TableName: 'Office' + ddbSuffix,
			IndexName: 'byOfficeEmail',
			KeyConditionExpression: '#office_email = :office_email',
			ExpressionAttributeNames: {'#office_email': 'office_email'},
			ExpressionAttributeValues: {':office_email': office_email},
		})
			.promise()
			.then(res => res.Items)
	},
	getOfficeById: (id) => {
		return docClient.get({
			TableName: 'Office' + ddbSuffix,
			Key: {id: id}
		})
			.promise()
			.then(res => res.Item)
	},
	getOfficeOfUser: (username) => {
		const query = /* GraphQL */ `
			query getUserOffice($username: String!) {
				listUserProfileByUsername(username: $username) {
					items {
						officeConnection {
							office {
							  id
							  officeName
							  ownerUsername
							  address
							  office_email
							  zip_code
							  mobile
							  phone
							  partnersNumberLimit
							  employeesNumberLimit
							  verified
							  tin
							  office_logo {
								level
								idToken
								filePath
								filename
								contentType
							  }
							  professionStartDate
							  chamberRecordNumber
							  insuranceLicenseExpirationDate
							  civilLiabilityExpirationDate
							  bankAccountInfo
							  files {
								level
								idToken
								filePath
								filename
								contentType
							  }
							  insuranceCompanies {
								name
								code
								expiresAt
								receivedFromUsername
								givenToOffices
							  }
							  createdAt
							  updatedAt
							}
						}
					}
				}
			}
		`

		return gqlUtil.execute({username: username}, query, 'getUserOffice')
			.then(response => response?.listUserProfileByUsername?.items[0]?.officeConnection?.office)
			.then(result => {
				if (result === undefined) {
					return Promise.reject(new Error(`Failed to retrieve office of user ${username}.`))
				}
				return result
			})
	},
	/**
	 * ==DDB TRANSACTION==
	 * Update members and put user into members iff remaining > 0 AND members dont contain empUsername
	 * Put new office-user connection.
	 * Atomically decrement the members counter by one.
	 */
	addEmployeeToOffice: (office, userProfId, empUsername, connId, userId, empModelPermissions, empPagePermissions) => {
		const now = new Date().toISOString()
		const newConnItem = {
			__typename: 'OfficeUserConnection',
			id: connId,
			officeId: office.id,
			officeName: office.officeName,
			userId: userId,
			username: empUsername,
			modelPermissions: empModelPermissions,
			pagePermissions: JSON.parse(empPagePermissions),
			employeeType: 'STANDARD',
			preferences: "{}",
			createdAt: now,
			updatedAt: now,
		}

		return docClient
			.transactWrite({
				TransactItems: [
					{
						// Decrement the Offices employee limit.
						Update: {
							TableName: 'Office' + ddbSuffix,
							Key: {
								id: office.id,
							},
							ConditionExpression: '#employeesNumberLimit > :zero',
							UpdateExpression: 'SET #updatedAt = :now, #employeesNumberLimit = #employeesNumberLimit - :dec',
							ExpressionAttributeNames: {
								'#updatedAt': 'updatedAt',
								'#employeesNumberLimit': 'employeesNumberLimit',
							},
							ExpressionAttributeValues: {
								':now': now,
								':dec': 1,
								':zero': 0,
							},
							ReturnValues: 'UPDATED_NEW',
						},
					},
					{
						//Add the user's connection with the Office
						Put: {
							TableName: 'OfficeUserConnection' + ddbSuffix,
							Item: newConnItem,
						},
					},
					{
						//Add the user's role in the UserProfile
						Update: {
							TableName: 'UserProfile' + ddbSuffix,
							Key: {
								id: userProfId,
							},
							UpdateExpression: 'SET #updatedAt = :now, #role = :role, #officeConnId = :officeConnId',
							ExpressionAttributeNames: {
								'#updatedAt': 'updatedAt',
								'#role': 'role',
								'#officeConnId': 'officeConnId',
							},
							ExpressionAttributeValues: {
								':now': now,
								':role': 'EMPLOYEE',
								':officeConnId': newConnItem.id
							},
						},
					},
				],
			})
			.promise()
			.then(() => connId)
	},

	/**
	 * Transaction.
	 * Connects 2 Offices via a 1-way OfficeCollaborationConnection.
	 * The sharedInsuranceCompanies are initialized to an empty JSON.
	 */
	addOfficeCollaborationConnection: (senderOffice, receiverOffice) => {
		const now = new Date().toISOString()
		const connId = module.exports.getOfficeCollaborationConnectionId(senderOffice.id, receiverOffice.id)
		return docClient.transactWrite({
			TransactItems: [
				{
					// Decrement the partners counter in both offices iff its gtz.
					Update: {
						TableName: 'Office' + ddbSuffix,
						Key: {
							id: senderOffice.id,
						},
						ConditionExpression: '#partnersNumberLimit > :zero',
						UpdateExpression: 'SET #updatedAt = :now, #partnersNumberLimit = #partnersNumberLimit - :dec',
						ExpressionAttributeNames: {
							'#updatedAt': 'updatedAt',
							'#partnersNumberLimit': 'partnersNumberLimit',
						},
						ExpressionAttributeValues: {
							':now': now,
							':dec': 1,
							':zero': 0,
						},
						ReturnValues: 'UPDATED_NEW',
					},
				},
				{
					Put: {
						TableName: 'OfficeCollaborationConnection' + ddbSuffix,
						Key: {
							id: connId
						},
						Item: {
							id: connId,
							fromId: senderOffice.id,
							fromOfficeName: senderOffice.officeName,
							toId: receiverOffice.id,
							toOfficeName: receiverOffice.office,
							sharedInsuranceCompanies: '{}',
							expirationDate: '',
							message: '',
						}
					}
				}
			],
		}).promise()
			.then(() => connId)
	},
	getOfficeCollaborationConnectionId: (senderOfficeId, receiverOfficeId) => {
		return uuidv5('getOfficeCollaborationConnectionId', JSON.stringify([senderOfficeId, receiverOfficeId]))
	},
	getOfficeUserConnectionId: (fromUserProfileId, toOfficeId) => {
		return uuidv5('getOfficeCollaborationConnectionId', JSON.stringify([fromUserProfileId, toOfficeId]))
	},
	addOfficeCollaborationConnectionInsuranceCompany: (connId, insuranceCompany) => {
		return docClient.update({
			TableName: 'OfficeCollaborationConnection' + ddbSuffix,
			Key: {id: connId},
			UpdateExpression: '',
			KeyConditionExpression: `ADD #sharedInsuranceCompanies.${insuranceCompany.code} = :insuranceCompany`,
			ExpressionAttributeNames: {'#sharedInsuranceCompanies': 'sharedInsuranceCompanies'},
			ExpressionAttributeValues: {':insuranceCompany': insuranceCompany},
		}).promise()
	},
	/**
	 * Remove a user from the given office.
	 * The index of the user's username in the office members index is necessary.
	 */
	removeEmployeeFromOffice: async (caller_username, emp_username) => {
		const callersOffice = await module.exports.getOfficeByOwnerUsername(caller_username)
			.catch(() => Promise.reject(new Error('Caller is not a Manager.')))
		const empUP = await userAPI.getUserProfileByUsername(emp_username)
		const oucID = module.exports.getOfficeUserConnectionId(empUP.id, callersOffice.id)
		const now = new Date().toISOString()
		return docClient.transactWrite({
			TransactItems: [
				{
					Update: {
						TableName: 'Office' + ddbSuffix,
						Key: {id: callersOffice},
						UpdateExpression: 'SET #updatedAt = :now, #employeesNumberLimit = #employeesNumberLimit + :inc',
						ExpressionAttributeNames: {
							'#updatedAt': 'updatedAt',
							'#employeesNumberLimit': 'employeesNumberLimit',
						},
						ExpressionAttributeValues: {
							':inc': 1,
							':now': now,
						},
						ReturnValues: 'UPDATED_NEW',
					},
				},
				{
					Delete: {
						TableName: 'OfficeUserConnection' + ddbSuffix,
						Key: {id: oucID},
					},
				},
				{
					Update: {
						TableName: 'Office' + ddbSuffix,
						Key: {
							id: empUP.id,
						},
						ConditionExpression: '#partnersNumberLimit > :zero',
						UpdateExpression: 'SET #updatedAt = :now, #partnersNumberLimit = #partnersNumberLimit - :dec',
						ExpressionAttributeNames: {
							'#updatedAt': 'updatedAt',
							'#partnersNumberLimit': 'partnersNumberLimit',
						},
						ExpressionAttributeValues: {
							':now': now,
							':dec': 1,
							':zero': 0,
						},
						ReturnValues: 'UPDATED_NEW',
					},
				},
			],
		})
			.promise()
			.then(() => officeUserConId)
	},
	detailsAndPermissionsByUsername: (username) => {
		const query = /* GraphQL */ `
			query getOfficeDetailsAndPermissionsByUsername($username: String!) {
				listUserProfileByUsername(username: $username) {
					items {
						officeConnection {
							id
							username
							userId
							pagePermissions
							modelPermissions
							preferences
							employeeType
							office {
							  id
							  officeName
							  ownerUsername
							  address
							  office_email
							  zip_code
							  mobile
							  phone
							  partnersNumberLimit
							  employeesNumberLimit
							  verified
							  tin
							  office_logo {
								level
								idToken
								filePath
								filename
								contentType
							  }
							  professionStartDate
							  chamberRecordNumber
							  insuranceLicenseExpirationDate
							  civilLiabilityExpirationDate
							  bankAccountInfo
							  files {
								level
								idToken
								filePath
								filename
								contentType
							  }
							  insuranceCompanies {
								officeId
								officeName
								name
								code
								expiresAt
							  }
							  createdAt
							  updatedAt
							}
							user {
								username
								email
								role
								telephone
								createdAt
								updatedAt
							}
							createdAt
							updatedAt
						}
						nextToken
					}
				}
			}
		`
		return gqlUtil.execute({username: username}, query, 'getOfficeDetailsAndPermissionsByUsername')
			.then(response => {
				const officeConnection = response?.listUserProfileByUsername?.items[0]?.officeConnection
				if (officeConnection) {
					officeConnection.pagePermissions = JSON.parse(officeConnection.pagePermissions)
					if (officeConnection.office) {
						officeConnection.office.bankAccountInfo = JSON.parse(officeConnection.office.bankAccountInfo)
					}
				}
				return officeConnection
			})
	},
	userIsUnemployed: async (username) => {
		const query = /* GraphQL */ `
			query getOfficeDetailsAndPermissionsByUsername($username: String!) {
				listUserProfileByUsername(username: $username) {
					items {
						officeConnections {
							id
						}
					}
				}
			}
		`
		return await gqlUtil.execute({username: username}, query, 'getOfficeDetailsAndPermissionsByUsername')
			.then(response => !!response?.listUserProfileByUsername?.items[0]?.officeConnection)
	},

	updateEmployeeModelPermissionsForOffice: async (caller_username, empUsername, modelPermissions) => {
		if (!caller_username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}

		const callersOffice = await module.exports.getOfficeByOwnerUsername(caller_username)
			.catch(() => Promise.reject(new Error('Caller is not a Manager.')))
		const empUP = await userAPI.getUserProfileByUsername(empUsername)
		const oucID = module.exports.getOfficeUserConnectionId(empUP.id, callersOffice.id)

		const mutation1 = /* GraphQL */ `
			mutation updateOfficeUserConnection(input: UpdateOfficeUserConnectionInput!) {
				updateOfficeUserConnection(input: $input) {
				  id
			    }
			}
		`

		return gqlUtil.execute({input: {id: oucID, modelPermissions: modelPermissions}}, mutation1, 'updateOfficeUserConnection')
			.then(result => {
				result = result?.updateOfficeUserConnection
				if (result === undefined) {
					return Promise.reject(new Error('Failed to update model permissions.'))
				}
				return result
			})
	},

	updateEmployeePagePermissionsForOffice: async (caller_username, empUsername, pagePermissions) => {
		if (!caller_username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}

		const callersOffice = await module.exports.getOfficeByOwnerUsername(caller_username)
			.catch(() => Promise.reject(new Error('Caller is not a Manager.')))
		const empUP = await userAPI.getUserProfileByUsername(empUsername)
		const oucID = module.exports.getOfficeUserConnectionId(empUP.id, callersOffice.id)

		const mutation1 = /* GraphQL */ `
			mutation updateOfficeUserConnection(input: UpdateOfficeUserConnectionInput!) {
				updateOfficeUserConnection(input: $input) {
				  id
			    }
			}
		`

		return gqlUtil.execute({input: {id: oucID, pagePermissions: pagePermissions}}, mutation1, 'updateOfficeUserConnection')
			.then(result => {
				result = result?.updateOfficeUserConnection
				if (result === undefined) {
					return Promise.reject(new Error('Failed to update model permissions.'))
				}
				return result
			})
	},
	getEmployeeUserProfilesForManagerUsername: (managerUsername, empType, filter, limit, nextToken) => {
		const emp_filter = {and: [filter || {id: {ne: ''}}, {employeeType: {eq: empType}}]}
		const query = /* GraphQL */ `
			query getEmployeeTypeUserProfilesForManagerUsername(
				$ownerUsername: String!,
				$filter: ModelOfficeUserConnectionFilterInput,
				$limit: Int,
				$nextToken: String
			) {
				listOfficeByOwnerUsername(ownerUsername: $ownerUsername) {
					items {
						workforce(filter: $filter, limit: $limit, nextToken: $nextToken) {
							items {
								user {
									id
									username
									email
									telephone
									role
									name
									fathers_name
									address
									zip_code
									mobile
									tin
									family_name
									gender
									birthdate
									city
									profilePicture {
										level
										idToken
										filePath
										filename
										contentType
									}
									preferences
									locale
									files {
										level
										idToken
										filePath
										filename
										contentType
									}
								}
							}
							nextToken
						}
					}
				}
			}
		`
		return gqlUtil.execute(
			{ownerUsername: managerUsername, filter: emp_filter, limit: limit || 100, nextToken: nextToken},
			query, 'getEmployeeTypeUserProfilesForManagerUsername')
			.then(office => {
				office = office?.listOfficeByOwnerUsername
				if (office === undefined || office.items === undefined) {
					return Promise.reject(new Error('An error occurred while retrieving contractors.'))
				}
				let users = []
				office?.items.forEach((workforceItem) => {
					workforceItem?.workforce?.items.forEach((userItem) => {
						users.push(userItem.user)
					})
				})
				return {
					items: users,
					nextToken: null
				}
			})
	},
	getCustomersForOfficeId: (officeId, filter, limit, nextToken) => {
		if (!officeId) {
			return Promise.reject(new Error('Invalid office ID'))
		}

		const query = /* GraphQL */ `
			query getCustomersForOfficeId($officeId: String!, $filter: ModelCustomerFilterInput, $limit: Int, $nextToken: String) {
				listOffices(filter: { id: { eq: $officeId } }) {
					items {
						officeCustomers(limit: $limit, filter: $filter, nextToken: $nextToken) {
							items {
								address
								birthDate
								doy
								createdAt
								email
								driversLicense {
									Category {
										category
										expiresAt
										issueDate
									}
									DriversLicenseType
									LicenseID
								}
								familyStatus
								fathersName
								files {
									level
									idToken
									filePath
									filename
									contentType
								}
								firstName
								gender
								id
								lastName
								mobile
								zip_code
								tin
								officeName
								updatedAt
							}
							nextToken
						}
					}
				}
			}
		`
		return gqlUtil.execute(
			{officeId: officeId, filter: filter || {id: {ne: ''}}, limit: limit || 100, nextToken: nextToken},
			query, 'getCustomersForOfficeId')
			.then(response => {
				let result = response?.listOffices?.items
				if (result) {
					result = result[0]?.officeCustomers
				}
				if (result === undefined) {
					return Promise.reject(new Error('Failed to get customers for this Office.'))
				}
				return result
			})
	},

	getContractsForOfficeId: (officeId, filter, limit, nextToken) => {
		if (!officeId) {
			return Promise.reject(new Error('Invalid office ID'))
		}
		const query = /* GraphQL */ `
			query getContractsForOfficeId($officeId: String!, $filter: ModelContractFilterInput, $limit: Int, $nextToken: String) {
				listOffices(filter: { id: { eq: $officeId } }) {
					items {
						officeContracts(limit: $limit, filter: $filter, nextToken: $nextToken) {
							items {
								id
								contractId
								version
								vehicleNumberPlate
								vehicleId
								voucherId
								customerId
								officeName
								second_officeId
								contractorId
								co_name
								co_TRN
								contractState
								insuranceClass
								insuranceCoverage
								insuranceUsage
								duration
								startDate
								endDate
								data
								discount
								jointWorth
								netWorth
								driversLicense
								createdAt
								updatedAt
								vehicle {
									color
									createdAt
									displacement
									eurotax
									file {
										level
										idToken
										filePath
										filename
										contentType
									}
									firstRegistrationDate
									fuelType
									id
									manufacturer
									model
									vin
									vehicle_owner
									value
									usage
									updatedAt
									trim
									officeName
									taxableHorsepower
									purchaseDate
									passengers
									numberPlate
								}
							}
							nextToken
						}
					}
				}
			}
		`
		return gqlUtil.execute({officeId: officeId, filter: filter || {id: {ne: ''}}, limit: limit || 50, nextToken: nextToken},
			query, 'getContractsForOfficeId')
			.then(result => {
				result = result?.listOffices
				if (result) {
					result = result[0]?.officeCustomers
				}
				if (result === undefined) {
					return Promise.reject(new Error('Failed to get contracts for this Office.'))
				}
				return result
			})
	},
	getInsuranceCompaniesForOffice: (officeId) => {
		//Get user's office and its companies
		const query = /* GraphQL */ `
			query getInsuranceCompaniesForOffice($officeId: ID!) {
				getOffice(id: $officeId){
					id
					officeName
					ownedInsuranceCompanies {
						name
						code
						expiresAt
					}
					outgoingOfficeConnections {
						items {
							toId
							toOfficeName
							sharedInsuranceCompanies
						}
					}
					incomingOfficeConnections {
						items {
							fromId
							fromOfficeName
							sharedInsuranceCompanies
						}
					}
				}
			}
		`

		return gqlUtil.execute({officeId: officeId}, query, 'getInsuranceCompaniesForOffice')
			.then(response => response?.getOffice)
			.then(office => {
				if (!office) {
					return Promise.reject(new Error('Office not found.'))
				}
				const companies = []
				office?.ownedInsuranceCompanies?.forEach(ownedInsuranceCompany => {
					companies.push({
						officeId: office?.id,
						officeName: office?.name,
						name: ownedInsuranceCompany?.name,
						code: ownedInsuranceCompany?.code,
						expiresAt: ownedInsuranceCompany?.expiresAt,
					})
				})
				office?.outgoingOfficeConnections?.items?.forEach(outgoingOfficeConnection => {
					companies.push({
						officeId: outgoingOfficeConnection?.toId,
						officeName: outgoingOfficeConnection?.toOfficeName,
						name: outgoingOfficeConnection?.sharedInsuranceCompanies?.name,
						code: outgoingOfficeConnection?.sharedInsuranceCompanies?.code,
						expiresAt: outgoingOfficeConnection?.sharedInsuranceCompanies?.expiresAt,
					})
				})
				office?.incomingOfficeConnections?.items?.forEach(incomingOfficeConnection => {
					companies.push({
						officeId: incomingOfficeConnection?.toId,
						officeName: incomingOfficeConnection?.toOfficeName,
						name: incomingOfficeConnection?.sharedInsuranceCompanies?.name,
						code: incomingOfficeConnection?.sharedInsuranceCompanies?.code,
						expiresAt: incomingOfficeConnection?.sharedInsuranceCompanies?.expiresAt,
					})
				})
				return companies
			})
	},
	getInsuranceCompaniesOfMyOffice(username) {
		//Get user's office and its companies
		const query = /* GraphQL */ `
			query getInsuranceCompaniesForOffice($ownerUsername: String!) {
  				listOfficeByOwnerUsername(ownerUsername: $ownerUsername")
					allInsuranceCompanies {
						officeId
						officeName
						name
						code
						expiresAt
					}
				}
			}
		`

		return gqlUtil.execute({ownerUsername: username}, query, 'getInsuranceCompaniesForOffice')
			.then(response => response?.listOfficeByOwnerUsername?.allInsuranceCompanies ?? [])
	},
	getOutgoingOfficeConnections: (officeId) => {
		//Get user's office and its companies
		const query = /* GraphQL */ `
			query getOutgoingOfficeConnections($officeId: ID!) {
				getOffice(id: $officeId){
					outgoingOfficeConnections {
						id
						fromId
						fromOfficeName
						toId
						toOfficeName
						sharedInsuranceCompanies
						expirationDate
						message
						createdAt
						updatedAt
					}
				}
			}
		`

		return gqlUtil.execute({officeId: officeId}, query, 'getOutgoingOfficeConnections')
			.then(response => response?.getOffice)
			.then(office => {
				if (!office) {
					return Promise.reject(new Error('Office not found.'))
				}
				return office?.outgoingOfficeConnections ?? []
			})
	},
	getIncomingOfficeConnections: (officeId) => {
		//Get user's office and its companies
		const query = /* GraphQL */ `
			query getIncomingOfficeConnections($officeId: ID!) {
				getOffice(id: $officeId){
					incomingOfficeConnections {
						id
						fromId
						fromOfficeName
						toId
						toOfficeName
						sharedInsuranceCompanies
						expirationDate
						message
						createdAt
						updatedAt
					}
				}
			}
		`

		return gqlUtil.execute({officeId: officeId}, query, 'getIncomingOfficeConnections')
			.then(response => response?.getOffice)
			.then(office => {
				if (!office) {
					return Promise.reject(new Error('Office not found.'))
				}
				return office?.incomingOfficeConnections ?? []
			})
	},

	/*
	 * Mutations
	 */

	updateOfficeDetails: (username, input, condition) => {
		//Sanitize input
		const allowed = [
			'id',
			'address',
			'office_email',
			'zip_code',
			'mobile',
			'files',
			'tin',
			'bankAccountInfo',
			'chamberRecordNumber',
			'civilLiabilityExpirationDate',
			'insuranceLicenseExpirationDate',
			'office_logo',
			'insuranceCompanies',
			'phone',
			'professionStartDate',
		]

		const mutation = /* GraphQL */ `
			mutation updateOfficeDetails($input: UpdateOfficeInput!, $condition: ModelOfficeConditionInput) {
				updateOffice(input: $input, condition: $condition) {
					id
					address
					office_email
					officeName
					zip_code
					mobile
					tin
					bankAccountInfo
					chamberRecordNumber
					ownerUsername
					phone
					civilLiabilityExpirationDate
					insuranceLicenseExpirationDate
					partnersNumberLimit
					employeesNumberLimit
					insuranceCompanies {
						name
						code
					}
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
					professionStartDate
					createdAt
					updatedAt
				}
			}
		`

		if (!username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}

		const sanitized_input = Object.keys(input)
			.filter((key) => allowed.includes(key))
			.reduce((obj, key) => {
				obj[key] = input[key]
				return obj
			}, {})

		if ('bankAccountInfo' in sanitized_input) {
			sanitized_input.bankAccountInfo = JSON.stringify(sanitized_input.bankAccountInfo)
		}

		return gqlUtil.execute({input: sanitized_input, condition: {ownerUsername: {eq: username}}}, mutation, 'updateOfficeDetails')
			.then(result => {
				result = result?.updateOffice
				if (result === undefined) {
					return Promise.reject(new Error('Failed to update Office details.'));
				}
				return result
			})
	},

	createVehicleForOffice: async (office_id, username, input, condition) => {
		if (!username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		if (!office_id) {
			return Promise.reject(new Error('Invalid office ID'))
		}

		//Get caller's office
		const officeDetailsAndPermissions = await module?.exports?.getUserModelPermissionsForOffice(username, office_id)
		if (!officeDetailsAndPermissions) {
			return Promise.reject(new Error('Insufficient permissions'))
		}

		//Expand the condition to require that the caller is also the owner of the profile
		const expanded_condition = {and: [condition || {officeId: {ne: ''}}, {officeId: {eq: office_id}}]}
		const mutation = /* GraphQL */ `
			mutation createVehicleForOffice($input: CreateVehicleInput!, $condition: ModelVehicleConditionInput) {
				createVehicle(input: $input, condition: $condition) {
					id
				}
			}
		`

		return gqlUtil.execute({
			input: input,
			condition: expanded_condition
		}, mutation, 'createVehicleForOffice')
			.then(result => {
				if (result === undefined) {
					return Promise.reject(new Error('Failed to create vehicle for office.'))
				}
				return result
			})
	},

	updateVehicleForOffice: async (office_id, username, input, condition) => {
		//Sanitize input
		const allowed = [
			'numberPlate',
			'color',
			'manufacturer',
			'model',
			'vehicle_owner',
			'trim',
			'fuelType',
			'usage',
			'displacement',
			'eurotax',
			'firstRegistrationDate',
			'passengers',
			'purchaseDate',
			'taxableHorsepower',
			'vin',
			'value',
			'file',
		]

		const mutation = /* GraphQL */ `
			mutation updateVehicleForOffice($input: UpdateVehicleInput!, $condition: ModelVehicleConditionInput) {
				updateVehicle(input: $input, condition: $condition) {
					id
				}
			}
		`
		if (!username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		if (!office_id) {
			return Promise.reject(new Error('Invalid office ID'))
		}

		//Get caller's office
		const officeDetailsAndPermissions = await userAPI.getUserModelPermissionsForOffice(username, office_id)
		if (!officeDetailsAndPermissions) {
			return Promise.reject(new Error('Insufficient permissions'))
		}

		let sanitized_input = Object.keys(input)
			.filter((key) => allowed.includes(key))
			.reduce((obj, key) => {
				obj[key] = input[key]
				return obj
			}, {})

		sanitized_input.officeId = officeDetailsAndPermissions[0].officeId
		sanitized_input.officeName = officeDetailsAndPermissions[0].officeName
		if (!('file' in sanitized_input)) {
			sanitized_input.file = []
		}
		//Expand the condition to require that the caller is also the owner of the profile
		const expanded_condition = {and: [condition || {officeId: {ne: ''}}, {officeId: {eq: office_id}}]}
		return gqlUtil.execute({
			input: sanitized_input,
			condition: expanded_condition
		}, mutation, 'updateVehicleForOffice')
			.then(result => {
				if (result === undefined) {
					return Promise.reject(new Error('Failed to update vehicle for this Office.'))
				}
				return result
			})
	},

	getWorkEnvironment: (username) => {
		const query = /* GraphQL */ `
			query getOfficeDetailsAndPermissionsByUsername($username: String!) {
				listUserProfileByUsername(username: $username) {
					items {
						officeConnection {
							id
							username
							userId
							pagePermissions
							modelPermissions
							preferences
							employeeType
							office {
							  id
							  officeName
							  ownerUsername
							  address
							  office_email
							  zip_code
							  mobile
							  phone
							  tin
							  office_logo {
								level
								idToken
								filePath
								filename
								contentType
							  }
							  professionStartDate
							  chamberRecordNumber
							  insuranceLicenseExpirationDate
							  civilLiabilityExpirationDate
							  bankAccountInfo
							  files {
								level
								idToken
								filePath
								filename
								contentType
							  }
							  allInsuranceCompanies {
								officeId
								officeName
								name
								code
								expiresAt
							  }
							  workforce {
								items{
									id
									officeId
									officeName
									userId
									username
									pagePermissions
									modelPermissions
									employeeType
									preferences
								}
							  }
							}
						}
					}
				}
			}
		`
		return gqlUtil.execute({username: username}, query, 'getOfficeDetailsAndPermissionsByUsername')
			.then(response => {
				const result = response?.listUserProfileByUsername?.response?.items[0]?.officeConnections?.items[0]
				if (!result) {
					return Promise.reject(new Error('Failed to retrieve Office of user ' + username))
				}
				//Quick page permissions fix
				result.pagePermissions = JSON.parse(result.pagePermissions)
				if (result.office) {
					if (!result?.office?.files) {
						result.office.files = []
					}
					if (!result?.office?.insuranceCompanies) {
						result.office.insuranceCompanies = []
					}
					if (!result?.office?.workforce) {
						result.office.workforce = []
					}
				}
				if (result?.office?.bankAccountInfo) {
					result.office.bankAccountInfo = JSON.parse(result.office.bankAccountInfo)
				}
				result?.office?.workforce?.items.forEach((workforce) => {
					if (workforce.pagePermissions) {
						workforce.pagePermissions = JSON.parse(workforce.pagePermissions)
					}
				})
				return result
			})
	},
	createUnverifiedOffice: (caller_username, officeInput) => {
		const createOfficeMutation = /* GraphQL */ `
			mutation createOffice($input: CreateOfficeInput!) {
				createOffice(input: $input) {
					id
				}
			}
		`

		const createOfficeUserConnectionMutation = /* GraphQL */ `
			mutation createOfficeUserConnection($input: CreateOfficeUserConnectionInput!) {
				createOfficeUserConnection(input: $input) {
					id
					officeId
				}
			}
		`

		return userAPI.getUserProfileByUsername(caller_username)
			.then(async function (callerUserProfile) {
				if (!callerUserProfile) {
					return Promise.reject(new Error(`User profile for caller was not found.`))
				}

				//Check if there is already an Office with this name
				if (callerUserProfile.role !== 'UNKNOWN') {
					return Promise.reject(new Error(`User's role is not UNKNOWN.`))
				}

				//Deep copy input
				const createOfficeInput = JSON.parse(JSON.stringify(officeInput));
				if (!createOfficeInput) {
					return Promise.reject(new Error('Request has invalid payload.'))
				}

				//Add extra fields to the Office
				createOfficeInput.id = callerUserProfile.id
				createOfficeInput.ownerUsername = caller_username
				createOfficeInput.employeesNumberLimit = 0
				createOfficeInput.partnersNumberLimit = 10
				createOfficeInput.insuranceCompanies = []
				createOfficeInput.verified = false
				createOfficeInput.bankAccountInfo = JSON.stringify([])

				//Delete some fields that should only be present in the request and not in the office
				delete createOfficeInput.comments
				delete createOfficeInput.modelPermissions
				delete createOfficeInput.pagePermissions

				//Empty and Null checks
				if (!createOfficeInput.office_email) {
					return Promise.reject(Promise.reject(new Error('Office e-mail can not be empty.')))
				}

				return gqlUtil.execute({input: createOfficeInput}, createOfficeMutation, 'createOffice')
					.then(response => {
						const createdOfficeId = response?.createOffice?.id
						if (!createdOfficeId) {
							return Promise.reject(new Error('Failed to create new office: ' + response.errors.message))
						}
						return createdOfficeId
					})
					.then(createdOfficeId => {
						return {
							officeId: createdOfficeId,
							officeName: createOfficeInput.officeName,
							userId: callerUserProfile.id,
							username: callerUserProfile.username,
							pagePermissions: JSON.stringify([]),
							modelPermissions: [],
							employeeType: 'MANAGER',
						}
					}).then(createOUCInput => {
						return gqlUtil.execute({input: createOUCInput}, createOfficeUserConnectionMutation, 'createOfficeUserConnection')
					}).then(createOUCResponse => {
						const createdOfficeId = createOUCResponse?.createOfficeUserConnection?.id
						if (!createdOfficeId) {
							return Promise.reject(new Error('Failed to create new Office-User connection: ' + createOUCResponse.errors.message))
						}
						return {id: createdOfficeId}
					})
			})
	}
}
