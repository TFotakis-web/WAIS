const gqlUtil = require('./utils/gql')
const ddbUtil = require('./utils/ddb')

const officeAPI = require('./api/office')
const userAPI = require('./api/user')
const requestAPI = require('./api/request')
const adminAPI = require('./api/admin')

/**
 * High-level API.
 * Should be the single point of entry for ALL user queries.
 * Branches out to other AWS APIs (e.g GQL and DDB).
 */
module.exports = {
	/* Queries */
	user: async (args) => {
		console.log('getUserProfileByUsername input: ' + args.username)
		const result = await userAPI.getUserProfileByUsername(args.username)
		console.log('getUserProfileByUsername output: ' + JSON.stringify(result))
		return result
	},
	getWorkEnvironment: async (args) => {
		console.log('getUserProfileByUsername input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid caller username or unauthenticated user.')
		}
		const result = await officeAPI.getWorkEnvironment(args.username)
		console.log('getPartnerSummary output: ' + JSON.stringify(result))
		return result
	},
	getCalendarEventsOfUser: async (args) => {
		console.log('getCalendarEventsForUser input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const query = /* GraphQL */ `
			query getCalendarEventsForUser(
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
			{
				username: args.username,
				filter: args.filter || {id: {ne: ''}},
				limit: args.limit || 50,
				nextToken: args.nextToken
			},
			query,
			'getCalendarEventsForUser',
		)
		const result = response.data.listUserCalendarEventsByUsername
		console.log('getCalendarEventsForUser output: ' + JSON.stringify(result))
		return result
	},
	getRequestsFromUser: async (args) => {
		console.log('getRequestsFromUser input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await requestAPI.getRequestsFromUser(args.username, args.filter, args.limit, args.nextToken)
		console.log('getRequestsFromUser output: ' + JSON.stringify(result))
		return result
	},
	getRequestsForUser: async (args) => {
		console.log('getRequestsForUser input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		//Admin users just need the Create Office requests
		let result
		if (args.groups != null && args.groups.indexOf('admin') > -1) {
			result = await adminAPI.getCreateOfficeRequests(args.filter, args.limit, args.nextToken)
		} else {
			result = await requestAPI.getRequestsForUser(args.username, args.email, args.filter, args.limit, args.nextToken)
		}
		console.log('getRequestsForUser output: ' + JSON.stringify(result))
		return result
	},
	resolveRequest: async (args) => {
		console.log('resolveRequest input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await requestAPI.resolveRequest(args.username, args.email, args.groups, args.id, args.decision, args.payload)
		console.log('resolveRequest output: ' + result)
		return result
	},
	getEmployeeUserProfilesForManagerUsername: async (args) => {
		console.log('getEmployeeUserProfilesForManagerUsername input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid manager username')
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
		if (!args.username) {
			return Promise.reject('Invalid manager username')
		}
		const result = await officeAPI.getEmployeeTypeUserProfilesForManagerUsername(
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
			return Promise.reject('Invalid office ID')
		}
		const result = await officeAPI.getCustomersForOfficeId(args.officeId, args.filter, args.limit, args.nextToken)
		console.log('getCustomersForOfficeId output: ' + JSON.stringify(result))
		return result
	},
	getContractsForOfficeId: async (args) => {
		console.log('getContractsForOfficeId input: ' + JSON.stringify(args))
		if (!args.officeId) {
			return Promise.reject('Invalid office ID')
		}
		const result = await officeAPI.getContractsForOfficeId(args.officeId, args.username, args.filter, args.limit, args.nextToken)
		console.log('getContractsForOfficeId output: ' + JSON.stringify(result))
		return result
	},
	getPartnerOfficeConnections: async (args) => {
		console.log('getPartnerOfficeConnections input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		if (!args.officeId) {
			return Promise.reject('Invalid office ID')
		}
		const result = await officeAPI.getPartnerOfficeConnections(args.officeId, args.username, args.filter, args.limit, args.nextToken)
		console.log('getPartnerOfficeConnections output: ' + JSON.stringify(result))
		return result
	},
	getUserModelPermissionsForOffice: async (args) => {
		console.log('getUserModelPermissionsForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		if (!args.officeId) {
			return Promise.reject('Invalid office ID')
		}
		const result = await userAPI.getUserModelPermissionsForOffice(args.officeId, args.username)
		console.log('getUserModelPermissionsForOffice output: ' + JSON.stringify(result))
		return result
	},
	getUserPagePermissionsForOffice: async (args) => {
		console.log('getUserPagePermissionsForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		if (!args.officeId) {
			return Promise.reject('Invalid office ID')
		}
		const result = await userAPI.getUserPagePermissionsForOffice(args.officeId, args.username)
		console.log('getUserPagePermissionsForOffice output: ' + JSON.stringify(result))
		return result
	},

	/* Mutations */
	updateOfficeDetails: async (args) => {
		console.log('updateOfficeDetails input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.updateOfficeDetails(args.username, args.requestInput, args.condition)
		console.log('updateOfficeDetails output: ' + JSON.stringify(result))
		return result
	},
	updateUserProfileDetails: async (args) => {
		console.log('updateUserProfileDetails input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await userAPI.updateUserProfileDetails(args.username, args.requestInput, args.condition)
		console.log('updateUserProfileDetails output: ' + JSON.stringify(result))
		return result
	},
	createVehicleForOffice: async (args) => {
		console.log('createVehicleForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.createVehicleForOffice(args.officeId, args.username, args.requestInput, args.condition)
		console.log('createVehicleForOffice output: ' + JSON.stringify(result))
		return result
	},
	updateVehicleForOffice: async (args) => {
		console.log('updateVehicleForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.updateVehicleForOffice(args.officeId, args.username, args.requestInput, args.condition)
		console.log('updateVehicleForOffice output: ' + JSON.stringify(result))
		return result
	},
	deleteVehicleForOffice: async (args) => {
		console.log('deleteVehicleForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.deleteVehicleForOffice(args.officeId, args.username, args.requestInput, args.condition)
		console.log('deleteVehicleForOffice output: ' + JSON.stringify(result))
		return result
	},
	createContractForOffice: async (args) => {
		console.log('createContractForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.createContractForOffice(args.officeId, args.username, args.requestInput, args.condition) //TODO implement
		console.log('createContractForOffice output: ' + JSON.stringify(result))
		return result
	},
	updateContractForOffice: async (args) => {
		console.log('updateContractForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.updateContractForOffice(args.officeId, args.username, args.requestInput, args.condition) //TODO implement
		console.log('updateContractForOffice output: ' + JSON.stringify(result))
		return result
	},
	deleteContractForOffice: async (args) => {
		console.log('deleteContractForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.deleteContractForOffice(args.officeId, args.username, args.requestInput, args.condition) //TODO implement
		console.log('deleteContractForOffice output: ' + JSON.stringify(result))
		return result
	},
	createCustomerForOffice: async (args) => {
		console.log('createCustomerForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.createCustomerForOffice(args.officeId, args.username, args.requestInput, args.condition) //TODO implement
		console.log('createCustomerForOffice output: ' + JSON.stringify(result))
		return result
	},
	createOfficeRequest: async (args) => {
		console.log('createOfficeRequest input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await requestAPI.createOfficeRequest(args.username, args.email, args.groups, args.requestInput)
		console.log('createOfficeRequest output: ' + JSON.stringify(result))
		return result
	},
	createInviteEmployeeToOfficeRequest: async (args) => {
		console.log('createInviteEmployeeToOfficeRequest input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await requestAPI.createInviteEmployeeToOfficeRequest(args.username, args.email, args.groups, args.requestInput)
		console.log('createInviteEmployeeToOfficeRequest output: ' + JSON.stringify(result))
		return result
	},
	createInviteContractorToOfficeRequest: async (args) => {
		console.log('createInviteContractorToOfficeRequest input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await requestAPI.createInviteContractorToOfficeRequest(args.username, args.email, args.groups, args.requestInput)
		console.log('createInviteContractorToOfficeRequest output: ' + JSON.stringify(result))
		return result
	},
	createOfficeConnectionRequest: async (args) => {
		console.log('createOfficeConnectionRequest input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await requestAPI.createOfficeConnectionRequest(args.username, args.email, args.groups, args.requestInput)
		console.log('createOfficeConnectionRequest output: ' + JSON.stringify(result))
		return result
	},
	deleteRequestsSentByMe: async (args) => {
		console.log('deleteRequestsSentByMe input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await requestAPI.deleteRequestsSentByMe(args.username, args.email, args.groups, args.requestInput, args.condition)
		console.log('deleteRequestsSentByMe output: ' + JSON.stringify(result))
		return result
	},
	createOfficeAccessConnectionForOffice: async (args) => {
		console.log('createOfficeAccessConnectionForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
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
			return Promise.reject('Invalid username or unauthenticated user.')
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
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.deleteOfficeAccessConnectionForOffice(args.username, args.requestInput, args.condition) //TODO implement
		console.log('deleteOfficeAccessConnectionForOffice output: ' + JSON.stringify(result))
		return result
	},
	createMyUserCalendarEvent: async (args) => {
		const username = args.username
		const payload = args.payload
		const condition = args.condition
		console.log('createMyUserCalendarEvent input: ' + [username, JSON.stringify(payload), JSON.stringify(condition)])

		if (!username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}

		if (!payload) {
			return Promise.reject('Payload can\'t be empty or null.')
		}

		// Expand the condition to require that the caller is also the owner of the profile
		const mutation = /* GraphQL */ `
			mutation createMyUserCalendarEvent($input: CreateUserCalendarEventInput!, $condition: ModelUserCalendarEventConditionInput) {
				createUserCalendarEvent(input: $input, condition: $condition) {
					id
					username
					createdAt
					updatedAt
				}
			}
		`

		const input = {
			payload: payload,
			username: username
		}

		const result = await gqlUtil.execute({
			input: input,
			condition: condition
		}, mutation, 'createMyUserCalendarEvent')
			.then(response => response.data.createUserCalendarEvent)
			.catch(err => console.error(`Unhandled error in createMyUserCalendarEvent: ${JSON.stringify(err)}`))

		if (!result) {
			return Promise.reject('Failed to create Calendar Event.')
		}

		console.log('createMyUserCalendarEvent output: ' + JSON.stringify(result))
		return result
	},
	updateMyUserCalendarEvents: async (args) => {
		const username = args.username
		const input = args.input
		const condition = args.condition
		console.log('updateMyUserCalendarEvents input: ' + [username, input, condition])
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}

		const allowed = ['id', 'username', 'payload']
		const sanitized_input = Object.keys(input)
			.filter((key) => allowed.includes(key))
			.reduce((obj, key) => {
				obj[key] = input[key]
				return obj
			}, {})
		const expanded_condition = {and: [condition || {username: {ne: ''}}, {username: {eq: username}}]}
		const mutation = /* GraphQL */ `
			mutation updateMyUserCalendarEvents($input: UpdateUserCalendarEventInput!, $condition: ModelUserCalendarEventConditionInput) {
				updateUserCalendarEvent(input: $input, condition: $condition) {
					id
				}
			}
		`
		const response = await gqlUtil.execute(
			{input: sanitized_input, condition: expanded_condition},
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
			return Promise.reject('Invalid username or unauthenticated user.')
		}

		const expanded_condition = {and: [condition || {senderUsername: {ne: ''}}, {username: {eq: username}}]}
		const mutation = /* GraphQL */ `
			mutation deleteMyUserCalendarEvents($input: DeleteUserCalendarEventInput!, $condition: ModelUserCalendarEventConditionInput) {
				deleteUserCalendarEvent(input: $input, condition: $condition) {
					id
				}
			}
		`
		const response = await gqlUtil.execute({
			input: input,
			condition: expanded_condition
		}, mutation, 'deleteMyUserCalendarEvents')
		const result = response.data.deleteUserCalendarEvent
		console.log('deleteMyUserCalendarEvents output: ' + JSON.stringify(result))
		return result
	},
	updateEmployeeModelPermissionsForOffice: async (args) => {
		console.log('updateEmployeeModelPermissionsForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
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
			return Promise.reject('Invalid username or unauthenticated user.')
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
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await ddbUtil.removeEmployeeFromOffice(args.officeId, args.username, args.empUsername)
		console.log('deleteEmployeeForOffice output: ' + JSON.stringify(result))
		return result
	},
	updateContractorModelPermissionsForOffice: async (args) => {
		console.log('updateContractorModelPermissionsForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
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
			return Promise.reject('Invalid username or unauthenticated user.')
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
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await userAPI.deleteContractorForOffice(args.officeId, args.username, args.contractorUsername) //TODO implement
		console.log('deleteContractorForOffice output: ' + JSON.stringify(result))
		return result
	},
	getUserRoleByUsername: async (args) => {
		console.log('getUserRoleByUsername input: ' + args.username)
		const result = await userAPI.getUserRoleByUsername(args.username)
		console.log('getUserRoleByUsername output: ' + JSON.stringify(result))
		return result
	},
	getAllInsuranceCompanies: async (args) => {
		console.log('getAllInsuranceCompanies input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.getAllInsuranceCompanies(args.username)
		console.log('getAllInsuranceCompanies output: ' + JSON.stringify(result))
		return result
	},
	getAvailableInsuranceCompaniesForOffice: async (args) => {
		console.log('getAvailableInsuranceCompaniesForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await officeAPI.getAvailableInsuranceCompaniesForOffice(args.office, args.username)
		console.log('getAvailableInsuranceCompaniesForOffice output: ' + JSON.stringify(result))
		return result
	},
	getS3Object: async (args) => {
		console.log('getS3Object input: ' + JSON.stringify(args))
		if (!args.groups || args.groups.indexOf('admin') < 0) {
			return Promise.reject('Insufficient privileges.')
		}
		if (!args.username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const result = await adminAPI.getS3Object(args.username, args.email, args.s3obj, args.groups)
		console.log('getS3Object preview output: ' + JSON.stringify(result.contentType))
		return result
	},
	getUserProfileByUsername: async (args) => {
		console.log('getUserProfileByUsername input: ' + JSON.stringify(args))
		if (!args.groups || args.groups.indexOf('admin') < 0) {
			return Promise.reject('Insufficient privileges.')
		}
		if (!args.caller_username) {
			return Promise.reject('Invalid caller username or unauthenticated user.')
		}
		if (!args.username) {
			return Promise.reject('Invalid username.')
		}
		const result = await adminAPI.getUserProfileByUsername(args.username)
		console.log('getUserProfileByUsername preview output: ' + JSON.stringify(result))
		return result
	},
	createUnverifiedOffice: async (args) => {
		console.log('createUnverifiedOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject('Invalid username.')
		}
		const result = await officeAPI.createUnverifiedOffice(args.username, args.input)
		console.log('createUnverifiedOffice output: ' + JSON.stringify(result))
		return result
	},
	test: async (args) => {
		console.log('test input: ' + JSON.stringify(args))
		const testAPI = require('./unittests/index')
		const res = await testAPI.run(args)
		console.log('test output: ' + JSON.stringify(res))
		return res
	}
}
