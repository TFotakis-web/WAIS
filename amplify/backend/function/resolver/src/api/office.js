const gqlUtil = require('../utils/gql')
const userAPI = require('../api/user')

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const ddbSuffix = '-' + process.env.API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT + '-' + process.env.ENV

module.exports = {
	getOfficeByOwnerUsername: (username) => {
		return docClient.query({
			TableName: 'Office' + ddbSuffix,
			IndexName: 'byOwnerUsername',
			ExpressionAttributeNames: {'#ownerUsernameFieldName': 'ownerUsername'},
			KeyConditionExpression: '#ownerUsernameFieldName = :inputUsername',
			ExpressionAttributeValues: {':inputUsername': username},
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

	/**
	 * ==DDB TRANSACTION==
	 * Update members and put user into members iff remaining > 0 AND members dont contain empUsername
	 * Put new office-user connection.
	 * Atomically decrement the members counter by one.
	 */
	addEmployeeToOffice: (office, userProfId, empUsername, connId, userId, empModelPermissions, empPagePermissions) => {
		const now = new Date().toISOString()
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
							Item: {
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
							},
						},
					},
					{
						//Add the user's role in the UserProfile
						Update: {
							TableName: 'UserProfile' + ddbSuffix,
							Key: {
								id: userProfId,
							},
							UpdateExpression: 'SET #updatedAt = :now, #role = :role',
							ExpressionAttributeNames: {
								'#updatedAt': 'updatedAt',
								'#role': 'role',
							},
							ExpressionAttributeValues: {
								':now': now,
								':role': 'EMPLOYEE',
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
	 * Connects 2 Offices via a OfficeAccessConnection.
	 */
	addOfficeAccessConnection: (senderOfficeId, senderOfficeName, receiverOfficeId, receiverOfficeName, insuranceCompanyName, insuranceCompanyCode) => {
		const now = new Date().toISOString()
		const connId = senderOfficeId + '_' + receiverOfficeId
		return docClient.transactWrite({
			TransactItems: [
				{
					// Decrement the partners counter in both offices iff its gtz.
					Update: {
						TableName: 'Office' + ddbSuffix,
						Key: {
							id: senderOfficeId,
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
					Update: {
						TableName: 'Office' + ddbSuffix,
						Key: {
							id: receiverOfficeId,
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
					//Create the OfficeAccessConnection item
					Put: {
						TableName: 'OfficeAccessConnection' + ddbSuffix,
						Item: {
							__typename: 'OfficeAccessConnection',
							id: connId,
							insuranceCompanyCode: insuranceCompanyCode,
							insuranceCompanyName: insuranceCompanyName,
							fromId: senderOfficeId,
							toId: receiverOfficeId,
							fromOfficeName: senderOfficeName,
							toOfficeName: receiverOfficeName,
							expirationDate: new Date(new Date().getTime() + 1000 * 60 * 24 * 7).getTime(),
							message: ' ',
							createdAt: now,
							updatedAt: now,
						},
					},
				},
			],
		})
			.promise()
			.then(() => connId)

	},
	/**
	 * Remove a user from the given office.
	 * The index of the user's username in the office members index is necessary.
	 *
	 * @param {String} officeUserConId
	 * @param {String} officeId
	 */
	removeEmployeeFromOffice: (officeUserConId, officeId) => {
		return docClient.transactWrite({
			TransactItems: [
				{
					Delete: {
						TableName: 'OfficeUserConnection' + ddbSuffix,
						Key: {id: officeUserConId},
					},
				},
				{
					Update: {
						TableName: 'Office' + ddbSuffix,
						Key: {id: officeId},
						UpdateExpression: 'SET #updatedAt = :now, #employeesNumberLimit = #employeesNumberLimit + :inc',
						ExpressionAttributeNames: {
							'#updatedAt': 'updatedAt',
							'#employeesNumberLimit': 'employeesNumberLimit',
						},
						ExpressionAttributeValues: {
							':inc': 1,
							':now': new Date().toISOString(),
						},
						ReturnValues: 'UPDATED_NEW',
					},
				},
			],
		})
			.promise()
			.then(() => officeUserConId)
	},
	detailsAndPermissionsByUsername: (username, filter, limit, nextToken) => {
		const query = /* GraphQL */ `
			query getOfficeDetailsAndPermissionsByUsername(
				$username: String!
				$filter: ModelOfficeUserConnectionFilterInput
				$limit: Int
				$nextToken: String
			) {
				listUserProfileByUsername(username: $username) {
					items {
						officeConnections(filter: $filter, limit: $limit, nextToken: $nextToken) {
							items {
								id
								username
								userId
								pagePermissions
								modelPermissions
								preferences
								officeId
								officeName
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
									name
									code
								  }
								  insuranceCompaniesAvailable
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
			}
		`
		return gqlUtil.execute({
			username: username,
			filter: filter || {id: {ne: ''}},
			limit: limit || 100,
			nextToken: nextToken
		}, query, 'getOfficeDetailsAndPermissionsByUsername')
			.then(response => {
				const result = response?.data?.listUserProfileByUsername?.items[0]?.officeConnections || []
				result?.items.forEach((item) => { //Quick page permissions fix
					item.pagePermissions = JSON.parse(item.pagePermissions)
					if (item.office) {
						item.office.bankAccountInfo = JSON.parse(item.office.bankAccountInfo)
					}
				})
				return result
			})
	},
	userIsUnemployed: async (username) => {
		const query = /* GraphQL */ `
			query getOfficeDetailsAndPermissionsByUsername($username: String!) {
				listUserProfileByUsername(username: $username) {
					items {
						officeConnections {
							items {
								id
							}
						}
					}
				}
			}
		`
		return await gqlUtil.execute({username: username}, query, 'getOfficeDetailsAndPermissionsByUsername')
			.then(response => {
				const result = response?.data?.listUserProfileByUsername?.items[0]?.officeConnections?.items
				return result !== undefined && result.length > 0;
			})
	},

	updateEmployeeModelPermissionsForOffice: async (officeId, caller_username, empUsername, modelPermissions) => {
		if (!caller_username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}

		const mutation1 = /* GraphQL */ `
			mutation updateOfficeUserConnection(input: UpdateOfficeUserConnectionInput!) {
				updateOfficeUserConnection(input: $input) {
					id
				}
			}
		`

		//Get the office
		const tuc_filter = {and: [{officeId: {eq: officeId}}, {username: {eq: caller_username}}]}
		const officeDetailsAndPermissions = await module.exports.detailsAndPermissionsByUsername(caller_username, tuc_filter)
		const tucItem = officeDetailsAndPermissions?.items[0]?.officeConnections?.items[0]
		if (!tucItem || tucItem.office.ownerUsername !== caller_username) {
			return Promise.reject(new Error('Invalid office ID or caller not an owner of that office.'))
		}

		return gqlUtil.execute({input: {id: tucItem.id, modelPermissions: modelPermissions}},
			mutation1, 'updateOfficeUserConnection')
			.then(response => {
				const result = response?.data?.updateUserCalendarEvent
				if (result === undefined) {
					return Promise.reject(new Error('Failed to update model permissions.'))
				}
				return result
			})
	},

	updateEmployeePagePermissionsForOffice: async (officeId, caller_username, empUsername, pagePermissions) => {
		console.log('userAPI.updateEmployeePagePermissionsForOffice input: ' + [officeId, caller_username, empUsername, pagePermissions])
		if (!caller_username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}

		const mutation1 = /* GraphQL */ `
			mutation updateOfficeUserConnection(input: UpdateOfficeUserConnectionInput!) {
				updateOfficeUserConnection(input: $input) {
					id
				}
			}
		`

		//Get the office
		const tuc_filter = {and: [{officeId: {eq: officeId}}, {username: {eq: caller_username}}]}
		const officeDetailsAndPermissions = await module.exports.detailsAndPermissionsByUsername(caller_username, tuc_filter)
		const tucItem = officeDetailsAndPermissions?.items[0]?.officeConnections?.items[0]
		if (!tucItem || tucItem.office.ownerUsername !== caller_username) {
			return Promise.reject(new Error('Invalid office ID or caller not an owner of that office.'))

		}
		return gqlUtil.execute({input: {id: tucItem.id, pagePermissions: pagePermissions}},
			mutation1, 'updateOfficeUserConnection')
			.then(response => {
				const result = response?.data?.updateUserCalendarEvent
				if (result === undefined) {
					return Promise.reject(new Error('Failed to update page permissions.'))
				}
				return result
			})
	},
	getEmployeeUserProfilesForManagerUsername: (managerUsername, empType, filter, limit, nextToken) => {
		const emp_filter = {and: [filter || {id: {ne: ''}}, {employeeType: {eq: empType}}]}
		const query = /* GraphQL */ `
			query getEmployeeTypeUserProfilesForManagerUsername(
				$ownerUsername: String!
				$filter: ModelOfficeUserConnectionFilterInput
				$limit: Int
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
			.then(response => {
				const office = response?.data?.listOfficeByOwnerUsername
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
				let result = response?.data?.listOffices?.items
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
		return gqlUtil.execute(
			{officeId: officeId, filter: filter || {id: {ne: ''}}, limit: limit || 50, nextToken: nextToken},
			query, 'getContractsForOfficeId')
			.then(response => {
				let result = response?.data?.listOffices
				if (result) {
					result = result[0]?.officeCustomers
				}
				if (result === undefined) {
					return Promise.reject(new Error('Failed to get contracts for this Office.'))
				}
				return result
			})
	},

	getPartnerOfficeConnections: (officeId, username, filter, limit, nextToken) => {
		if (!username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		if (!officeId) {
			return Promise.reject(new Error('Invalid office ID'))
		}
		const user_filter = {and: [filter || {id: {ne: ''}}, {fromId: {eq: officeId}}]}
		const query = /* GraphQL */ `
			query getPartnerOfficeConnections(
				$officeId: String!
				$filter: ModelOfficeAccessConnectionFilterInput
				$limit: Int
				$nextToken: String
			) {
				listOfficeAccessConnections(filter: $filter, limit: $limit, nextToken: $nextToken) {
					items {
						id
						to {
							id
							officeName
							ownerUsername
							office_email
							address
							mobile
							phone
							tin
						}
						expirationDate
						message
						createdAt
						updatedAt
					}
					nextToken
				}
			}
		`
		return gqlUtil.execute(
			{officeId: officeId, filter: user_filter, limit: limit || 100, nextToken: nextToken},
			query, 'getPartnerOfficeConnections')
			.then(response => {
				const result = response?.data?.listOfficeAccessConnections
				if (result === undefined) {
					return Promise.reject(new Error('Failed to retrieve partners.'))
				}
				return result
			})
	},

	getAllInsuranceCompanies: (username) => {
		if (!username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}

		//Get user's office and its companies
		const query = /* GraphQL */ `
			query getOfficeDetailsAndPermissionsByUsername($username: String!) {
				listUserProfileByUsername(username: $username) {
					items {
						officeConnections {
							items {
								office {
									availableInsuranceCompanies {
										items {
											id
											officeName
											insuranceCompanies {
												name
												code
											}
										}
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
				const companies = []
				response?.data?.listUserProfileByUsername?.items?.forEach((oc) => {
					oc.items.forEach((office) => {
						office.availableInsuranceCompanies.items.forEach((ic) => {
							companies.push(ic)
						})
					})
				})
				return {items: companies}
			})
	},

	getAvailableInsuranceCompaniesForOffice: (office, username) => {
		if (!username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}

		//Get user's office and its companies
		const companies = []
		companies.push({
			id: office.id,
			officeName: office.officeName,
			insuranceCompanies: office.insuranceCompanies,
		})

		const query = /* GraphQL */ `
			query getPartnerOfficeConnections($officeId: String!, $limit: Int) {
				listOfficeAccessConnections(limit: $limit) {
					items {
						to {
							id
							officeName
							insuranceCompanies {
								name
								code
							}
						}
					}
				}
			}
		`

		return gqlUtil.execute({officeId: office.id, limit: 1000}, query, 'getPartnerOfficeConnections')
			.then(response => {
				response?.data?.listOfficeAccessConnections?.items?.forEach((partnerOffice) => companies.push(partnerOffice))
				return {items: companies}
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
			'insuranceCompaniesAvailable',
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
					insuranceCompaniesAvailable
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

		return gqlUtil.execute({
			input: sanitized_input,
			condition: {ownerUsername: {eq: username}}
		}, mutation, 'updateOfficeDetails')
			.then(response => {
				const result = response?.data?.updateOffice
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
			.then(response => {
				const result = response?.data?.createVehicle
				if (result === undefined) {
					return Promise.reject(new Error('Failed to create vehicle for office.'))
				}
				return result
			})
	},

	updateVehicleForOffice: async (office_id, username, input, condition) => {
		//Sanitize input
		const allowed = [
			'id',
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
			.then(response => {
				const result = response?.data?.updateVehicle
				if (result === undefined) {
					return Promise.reject(new Error('Failed to update vehicle for this Office.'))
				}
				return result
			})
	},

	getWorkEnvironment: (username, filter, limit, nextToken) => {
		const query = /* GraphQL */ `
			query getOfficeDetailsAndPermissionsByUsername(
				$username: String!
				$filter: ModelOfficeUserConnectionFilterInput
				$limit: Int
				$nextToken: String
			) {
				listUserProfileByUsername(username: $username) {
					items {
						officeConnections(filter: $filter, limit: $limit, nextToken: $nextToken) {
							items {
								id
								username
								userId
								pagePermissions
								modelPermissions
								preferences
								officeId
								officeName
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
								  insuranceCompanies {
									name
									code
								  }
								  insuranceCompaniesAvailable
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
			}
		`
		return gqlUtil.execute({
			username: username,
			filter: filter || {id: {ne: ''}},
			limit: limit || 100,
			nextToken: nextToken || null
		}, query, 'getOfficeDetailsAndPermissionsByUsername')
			.then(response => {
				const result = response.data.listUserProfileByUsername?.items[0].officeConnections?.items[0]
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
					if (!result?.office?.insuranceCompaniesAvailable) {
						result.office.insuranceCompaniesAvailable = []
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
		const getUserProfileQuery = /* GraphQL */ `
			query getUserProfileByUsername($username: String!) {
				listUserProfileByUsername(username: $username) {
					items {
						id
						username
						role
					}
				}
			}
		`

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
				}
			}
		`

		//Update role in the UserProfile
		const updateProfileMutation = /* GraphQL */ `
			mutation updateUserProfileDetails($input: UpdateUserProfileInput!) {
				updateUserProfile(input: $input) {
					id
				}
			}
		`

		return gqlUtil.execute({username: caller_username}, getUserProfileQuery, 'getUserProfileByUsername')
			.then(async function (callerUserProfile) {
				if (!callerUserProfile) {
					return Promise.reject(new Error(`User profile for sender was not found.`))
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
				createOfficeInput.ownerUsername = caller_username
				createOfficeInput.employeesNumberLimit = 0
				createOfficeInput.partnersNumberLimit = 10
				createOfficeInput.insuranceCompanies = []
				createOfficeInput.insuranceCompaniesAvailable = []
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

				const response = await gqlUtil.execute({input: createOfficeInput}, createOfficeMutation, 'createOffice')
				const createdOfficeId = response?.data?.createOffice?.id
				if (!createdOfficeId) {
					return Promise.reject(new Error('Failed to create new office: ' + response.errors.message))
				}

				//Create a connection between the new Office and the contractor-manager.
				const createTUCInput = {
					officeId: createdOfficeId,
					officeName: createOfficeInput.officeName,
					userId: callerUserProfile.id,
					username: callerUserProfile.username,
					pagePermissions: JSON.stringify(officeInput.managerPagePermissions),
					modelPermissions: officeInput.managerModelPermissions,
					employeeType: 'MANAGER',
				}

				const createOUCResponse = await gqlUtil.execute({input: createTUCInput}, createOfficeUserConnectionMutation, 'createOfficeUserConnection')
				const createOUCResult = createOUCResponse?.data?.createOfficeUserConnection
				if (!createOUCResult) {
					return Promise.reject(new Error('Failed to create new Office-User connection: ' + createOUCResponse.errors.message))
				}

				const upInput = {
					id: callerUserProfile.id,
					role: 'CONTRACTOR',
				}
				const updateUPResponse = await gqlUtil.execute({input: upInput}, updateProfileMutation, 'updateUserProfileDetails')
				const resultUP = updateUPResponse?.data?.updateUserProfile?.id
				if (!resultUP) {
					return Promise.reject(new Error('Failed to update Contractor`s UserProfile role.'))
				}

				return {id: createdOfficeId}
			})
	}
}
