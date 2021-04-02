const gqlUtil = require('./api/utils/gql_utils')
const ddbUtil = require('./api/utils/ddb_utils')

const officeAPI = require('./api/office')
const userAPI = require('./api/user')
const requestAPI = require('./api/request')

/**
 * High-level API.
 * Should be the single point of entry for ALL user queries.
 * Branches out to other AWS APIs (e.g GQL and DDB).
 */
module.exports = {
	/* Queries */
	user: async (username) => {
		console.log('getUserProfileByUsername input: ' + username)
		const userProfile = userAPI.getUserProfileByUsername(username)
		console.log('getUserProfileByUsername output: ' + JSON.stringify(result))
		return userProfile
	},
	getOfficesOfUser: async (args) => {
		console.log('getOfficeDetailsAndPermissionsByUsername input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = officeAPI.getOfficeDetailsAndPermissionsByUsername(args.username, args.filter, args.limit, args.nextToken)
		console.log('getOfficeDetailsAndPermissionsByUsername output: ' + JSON.stringify(result))
		return result
	},
	getCallendarEventsOfUser: async (args) => {
		console.log('getCallendarEventsForUser input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const query = /* GraphQL */ `
			query getCallendarEventsForUser(
				$username: String!
				$filter: ModelUserCalendarEventFilterInput
				$limit: Int
				$nextToken: String
			) {
				listUserCalendarEventsByUsername(limit: $limit, nextToken: $nextToken, filter: $filter, username: $username) {
					items {
						username
						updatedAt
						payload
						id
						createdAt
					}
					nextToken
				}
			}
		`
		const response = await gqlUtil.execute(
			{ username: args.username, filter: args.filter || { id: { ne: '' } }, limit: args.limit || 50, nextToken: args.nextToken },
			query,
			'getCallendarEventsForUser',
		)
		const result = response.data.listUserCalendarEventsByUsername
		console.log('getCallendarEventsForUser output: ' + JSON.stringify(result))
		return result
	},
	getRequestsFromUser: async (args) => {
		console.log('getRequestsFromUser input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await requestAPI.getRequestsFromUser(args.username, args.filter, args.limit, args.nextToken)
		console.log('getRequestsFromUser output: ' + JSON.stringify(result))
		return result
	},
	getRequestsForUser: async (args) => {
		console.log('getRequestsForUser input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await requestAPI.getRequestsForUser(args.username, args.email, args.filter, args.limit, args.nextToken)
		console.log('getRequestsForUser output: ' + JSON.stringify(result))
		return result
	},
	resolveRequest: async (args) => {
		console.log('resolveRequest input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await requestAPI.resolveRequest(args.username, args.groups, args.id, args.decission, args.payload)
		console.log('resolveRequest output: ' + JSON.stringify(result))
		return result
	},
	getEmployeeUserProfilesForManagerUsername: async (args) => {
		console.log('getEmployeeUserProfilesForManagerUsername input: ' + JSON.stringify(args))
		if (!args.managerUsername) {
			throw new Error('Invalid manager username')
		}
		const result = officeAPI.getEmployeeTypeUserProfilesForManagerUsername(
			args.username,
			'STANDARD',
			args.filter,
			args.limit,
			args.nextToken,
		)
		console.log('getEmployeeUserProfilesForManagerUsername output: ' + JSON.stringify(result))
		return result
	},
	getContractorUserProfilesForManagerUsername: async (args) => {
		console.log('getContractorUserProfilesForManagerUsername input: ' + JSON.stringify(args))
		if (!args.managerUsername) {
			throw new Error('Invalid manager username')
		}
		const result = officeAPI.getEmployeeTypeUserProfilesForManagerUsername(
			args.username,
			'CONTRACTOR',
			args.filter,
			args.limit,
			args.nextToken,
		)
		console.log('getContractorUserProfilesForManagerUsername output: ' + JSON.stringify(result))
		return result
	},
	getCustomersForOfficeId: async (args) => {
		console.log('getCustomersForOfficeId input: ' + JSON.stringify(args))
		if (!args.officeId) {
			throw new Error('Invalid office ID')
		}
		const result = await officeAPI.getCustomersForOfficeId(args.officeId, args.filter, args.limit, args.nextToken)
		console.log('getCustomersForOfficeId output: ' + JSON.stringify(result))
		return result
	},
	getContractsForOfficeId: async (args) => {
		console.log('getContractsForOfficeId input: ' + JSON.stringify(args))
		if (!args.officeId) {
			throw new Error('Invalid office ID')
		}
		const result = await officeAPI.getContractsForOfficeId(args.officeId, args.username, args.filter, args.limit, args.nextToken)
		console.log('getContractsForOfficeId output: ' + JSON.stringify(result))
		return result
	},
	getPartnerOfficeConnections: async (args) => {
		console.log('getPartnerOfficeConnections input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		if (!args.officeId) {
			throw new Error('Invalid office ID')
		}
		const result = await officeAPI.getPartnerOfficeConnections(args.officeId, args.username, args.filter, args.limit, args.nextToken)
		console.log('getPartnerOfficeConnections output: ' + JSON.stringify(result))
		return result
	},
	getUserModelPermissionsForOffice: async (args) => {
		console.log('getUserModelPermissionsForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		if (!args.officeId) {
			throw new Error('Invalid office ID')
		}
		const result = await userAPI.getUserModelPermissionsForOffice(args.officeId, args.username)
		console.log('getUserModelPermissionsForOffice output: ' + JSON.stringify(result))
		return result
	},
	getUserPagePermissionsForOffice: async (args) => {
		console.log('getUserPagePermissionsForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		if (!args.officeId) {
			throw new Error('Invalid office ID')
		}
		const result = await userAPI.getUserPagePermissionsForOffice(args.officeId, args.username)
		console.log('getUserPagePermissionsForOffice output: ' + JSON.stringify(result))
		return result
	},

	/* Mutations */
	updateOfficeDetails: async (args) => {
		console.log('updateOfficeDetails input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.updateOfficeDetails(args.username, args.requestInput, args.condition)
		console.log('updateOfficeDetails output: ' + JSON.stringify(result))
		return result
	},
	updateUserProfileDetails: async (args) => {
		console.log('updateOfficeDetails input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await gqlAPI.updateUserProfileDetails(args.username, args.requestInput, args.condition)
		console.log('updateOfficeDetails output: ' + JSON.stringify(result))
		return result
	},
	createVehicleForOffice: async (args) => {
		console.log('createVehicleForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.createVehicleForOffice(args.officeId, args.username, args.requestInput, args.condition)
		console.log('createVehicleForOffice output: ' + JSON.stringify(result))
		return result
	},
	updateVehicleForOffice: async (args) => {
		console.log('updateVehicleForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.updateVehicleForOffice(args.officeId, args.username, args.requestInput, args.condition)
		console.log('updateVehicleForOffice output: ' + JSON.stringify(result))
		return result
	},
	deleteVehicleForOffice: async (args) => {
		console.log('deleteVehicleForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.deleteVehicleForOffice(args.officeId, args.username, args.requestInput, args.condition)
		console.log('deleteVehicleForOffice output: ' + JSON.stringify(result))
		return result
	},
	createContractForOffice: async (args) => {
		console.log('createContractForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.createContractForOffice(args.officeId, args.username, args.requestInput, args.condition) //TODO implement
		console.log('createContractForOffice output: ' + JSON.stringify(result))
		return result
	},
	updateContractForOffice: async (args) => {
		console.log('updateContractForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.updateContractForOffice(args.officeId, args.username, args.requestInput, args.condition) //TODO implement
		console.log('updateContractForOffice output: ' + JSON.stringify(result))
		return result
	},
	deleteContractForOffice: async (args) => {
		console.log('deleteContractForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.deleteContractForOffice(args.officeId, args.username, args.requestInput, args.condition) //TODO implement
		console.log('deleteContractForOffice output: ' + JSON.stringify(result))
		return result
	},
	createCustomerForOffice: async (args) => {
		console.log('createCustomerForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.createCustomerForOffice(args.officeId, args.username, args.requestInput, args.condition) //TODO implement
		console.log('createCustomerForOffice output: ' + JSON.stringify(result))
		return result
	},
	createOfficeRequest: async (args) => {
		console.log('createOfficeRequest input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await requestAPI.createOfficeRequest(args.username, args.email, args.groups, args.input)
		console.log('createOfficeRequest output: ' + JSON.stringify(result))
		return result
	},
	createInviteEmployeeToOfficeRequest: async (args) => {
		console.log('createInviteEmployeeToOfficeRequest input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await requestAPI.createInviteEmployeeToOfficeRequest(args.username, args.email, args.groups, args.input)
		console.log('createOfficeRequest output: ' + JSON.stringify(result))
		return result
	},
	createInviteContractorToOfficeRequest: async (args) => {
		console.log('createInviteContractorToOfficeRequest input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await requestAPI.createInviteContractorToOfficeRequest(args.username, args.email, args.groups, args.input)
		console.log('createInviteContractorToOfficeRequest output: ' + JSON.stringify(result))
		return result
	},
	createOfficeConnectionRequest: async (args) => {
		console.log('createOfficeConnectionRequest input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await requestAPI.createOfficeConnectionRequest(args.username, args.email, args.groups, args.input)
		console.log('createOfficeConnectionRequest output: ' + JSON.stringify(result))
		return result
	},
	deleteRequestsSentByMe: async (args) => {
		console.log('deleteRequestsSentByMe input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await requestAPI.deleteRequestsSentByMe(args.username, args.email, args.groups, args.requestInput, args.condition)
		console.log('deleteRequestsSentByMe output: ' + JSON.stringify(result))
		return result
	},
	createOfficeAccessConnectionForOffice: async (args) => {
		console.log('createOfficeAccessConnectionForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.createOfficeAccessConnectionForOffice(
			args.officeId,
			args.username,
			args.requestInput,
			args.condition,
		) //TODO implement
		console.log('createOfficeAccessConnectionForOffice output: ' + JSON.stringify(result))
		return result
	},
	updateOfficeAccessConnectionForOffice: async (args) => {
		console.log('updateOfficeAccessConnectionForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.updateOfficeAccessConnectionForOffice(
			args.officeId,
			args.username,
			args.requestInput,
			args.condition,
		) //TODO implement
		console.log('updateOfficeAccessConnectionForOffice output: ' + JSON.stringify(result))
		return result
	},
	deleteOfficeAccessConnectionForOffice: async (args) => {
		console.log('deleteOfficeAccessConnectionForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.deleteOfficeAccessConnectionForOffice(args.username, args.requestInput, args.condition) //TODO implement
		console.log('deleteOfficeAccessConnectionForOffice output: ' + JSON.stringify(result))
		return result
	},
	createMyUserCalendarEvent: async (args) => {
		const username = args.username
		const input = args.input
		const condition = args.condition
		console.log('createMyUserCalendarEvent input: ' + [username, input, condition])
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}

		// Populate/Overwrite user identity claims
		input.username = username

		// Expand the condition to require that the caller is also the owner of the profile
		const mutation = /* GraphQL */ `
			mutation createMyUserCalendarEvent($input: CreateUserCalendarEventInput!, $condition: ModelUserCalendarEventConditionInput) {
				createUserCalendarEvent(input: $input, condition: $condition) {
					id
				}
			}
		`

		const response = await gqlAPI.execute({ input: input, condition: condition }, mutation, 'createMyUserCalendarEvent')
		const result = response.data.createUserCalendarEvent
		console.log('createMyUserCalendarEvent output: ' + JSON.stringify(result))
		return result
	},
	updateMyUserCalendarEvents: async (args) => {
		const username = args.username
		const input = args.input
		const condition = args.condition
		console.log('updateMyUserCalendarEvents input: ' + [username, input, condition])
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}

		const allowed = ['id', 'username', 'payload']
		const sanitized_input = Object.keys(input)
			.filter((key) => allowed.includes(key))
			.reduce((obj, key) => {
				obj[key] = input[key]
				return obj
			}, {})
		const expanded_condition = { and: [condition || { username: { ne: '' } }, { username: { eq: username } }] }
		const mutation = /* GraphQL */ `
			mutation updateMyUserCalendarEvents($input: UpdateUserCalendarEventInput!, $condition: ModelUserCalendarEventConditionInput) {
				updateUserCalendarEvent(input: $input, condition: $condition) {
					id
				}
			}
		`
		const response = await gqlAPI.execute(
			{ input: sanitized_input, condition: expanded_condition },
			mutation,
			'updateMyUserCalendarEvents',
		)
		const result = response.data.updateUserCalendarEvent
		console.log('updateMyUserCalendarEvents output: ' + JSON.stringify(result))
		return result
	},
	deleteMyUserCalendarEvents: async (args) => {
		const username = args.username
		const input = args.input
		const condition = args.condition
		console.log('deleteMyUserCalendarEvents input: ' + [username, input, condition])
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}

		const expanded_condition = { and: [condition || { senderUsername: { ne: '' } }, { username: { eq: username } }] }
		const mutation = /* GraphQL */ `
			mutation deleteMyUserCalendarEvents($input: DeleteUserCalendarEventInput!, $condition: ModelUserCalendarEventConditionInput) {
				deleteUserCalendarEvent(input: $input, condition: $condition) {
					id
				}
			}
		`
		const response = await gqlAPI.execute({ input: input, condition: expanded_condition }, mutation, 'deleteMyUserCalendarEvents')
		const result = response.data.deleteUserCalendarEvent
		console.log('deleteMyUserCalendarEvents output: ' + JSON.stringify(result))
		return result
	},
	updateEmployeeModelPermissionsForOffice: async (args) => {
		console.log('updateEmployeeModelPermissionsForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await userAPI.updateEmployeeModelPermissionsForOffice(
			args.officeId,
			args.username,
			args.empUsername,
			args.modelPermissions,
		)
		console.log('updateEmployeeModelPermissionsForOffice output: ' + JSON.stringify(result))
		return result
	},
	updateEmployeePagePermissionsForOffice: async (args) => {
		console.log('updateEmployeePagePermissionsForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await userAPI.updateEmployeePagePermissionsForOffice(
			args.officeId,
			args.username,
			args.empUsername,
			args.modelPermissions,
		)
		console.log('updateEmployeePagePermissionsForOffice output: ' + JSON.stringify(result))
		return result
	},
	deleteEmployeeForOffice: async (args) => {
		//TODO finish
		console.log('deleteEmployeeForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await ddbUtil.removeEmployeeFromOffice(args.officeId, args.username, args.empUsername)
		console.log('deleteEmployeeForOffice output: ' + JSON.stringify(result))
		return result
	},
	updateContractorModelPermissionsForOffice: async (args) => {
		console.log('updateContractorModelPermissionsForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await userAPI.updateContractorModelPermissionsForOffice(
			args.officeId,
			args.username,
			args.contractorUsername,
			args.modelPermissions,
		) //TODO implement
		console.log('updateContractorModelPermissionsForOffice output: ' + JSON.stringify(result))
		return result
	},
	updateContractorPagePermissionsForOffice: async (args) => {
		console.log('updateContractorPagePermissionsForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await userAPI.updateContractorPagePermissionsForOffice(
			args.officeId,
			args.username,
			args.contractorUsername,
			args.modelPermissions,
		) //TODO implement
		console.log('updateContractorPagePermissionsForOffice output: ' + JSON.stringify(result))
		return result
	},
	deleteContractorForOffice: async (args) => {
		console.log('deleteContractorForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await userAPI.deleteContractorForOffice(args.officeId, args.username, args.contractorUsername) //TODO implement
		console.log('deleteContractorForOffice output: ' + JSON.stringify(result))
		return result
	},
	getUserRoleByUsername: async (args) => {
		console.log('getUserRoleByUsername input: ' + args.username)
		const result = userAPI.getUserRoleByUsername(args.username)
		console.log('getUserRoleByUsername output: ' + JSON.stringify(result))
		return result
	},
	getAllInsuranceCompanies: async (args) => {
		console.log('getAllInsuranceCompanies input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.getAllInsuranceCompanies(args.username)
		console.log('getAllInsuranceCompanies output: ' + JSON.stringify(result))
		return result
	},
	getAvailableInsuranceCompaniesForOffice: async (args) => {
		console.log('getAvailableInsuranceCompaniesForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.getAvailableInsuranceCompaniesForOffice(args.office, args.username)
		console.log('getAvailableInsuranceCompaniesForOffice output: ' + JSON.stringify(result))
		return result
	},
}
