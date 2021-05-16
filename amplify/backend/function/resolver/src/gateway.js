const gqlUtil = require('./gql')

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
	user: (args) => {
		console.log('user input: ' + args.username)
		if (!args.username) {
			return Promise.reject(new Error('Invalid caller username or unauthenticated user.'))
		}
		const result = userAPI.getUserProfileByUsername(args.username)
		console.log('user output: ' + JSON.stringify(result))
		return result
	},
	getWorkEnvironment: (args) => {
		console.log('getWorkEnvironment input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid caller username or unauthenticated user.'))
		}
		const result = officeAPI.getWorkEnvironment(args.username)
		console.log('getWorkEnvironment output: ' + JSON.stringify(result))
		return result
	},
	getCalendarEventsOfUser: (args) => {
		console.log('getCalendarEventsForUser input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
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
		const result = gqlUtil.execute(
			{
				username: args.username,
				filter: args.filter || {id: {ne: ''}},
				limit: args.limit || 50,
				nextToken: args.nextToken
			},
			query,
			'getCalendarEventsForUser',
		)
		console.log('getCalendarEventsForUser output: ' + JSON.stringify(result))
		return result
	},
	getRequestsFromUser: (args) => {
		console.log('getRequestsFromUser input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = requestAPI.getRequestsFromUser(args.username, args.filter, args.limit, args.nextToken)
		console.log('getRequestsFromUser output: ' + JSON.stringify(result))
		return result
	},
	getRequestsForUser: (args) => {
		console.log('getRequestsForUser input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		//Admin users just need the Create Office requests
		let result
		if (args.groups != null && args.groups.indexOf('admin') > -1) {
			result = adminAPI.getCreateOfficeRequests(args.filter, args.limit, args.nextToken)
		} else {
			result = requestAPI.getRequestsForUser(args.username, args.email, args.filter, args.limit, args.nextToken)
		}
		console.log('getRequestsForUser output: ' + JSON.stringify(result))
		return result
	},
	resolveRequest: (args) => {
		console.log('resolveRequest input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = requestAPI.resolveRequest(args.username, args.email, args.groups, args.id, args.decision, args.payload)
		console.log('resolveRequest output: ' + JSON.stringify(result))
		return result
	},
	getEmployeeUserProfilesForManagerUsername: (args) => {
		console.log('getEmployeeUserProfilesForManagerUsername input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid manager username'))
		}
		const result = officeAPI.getEmployeeUserProfilesForManagerUsername(
			args.username,
			'STANDARD',
			args.filter,
			args.limit,
			args.nextToken,
		)
		console.log('getEmployeeUserProfilesForManagerUsername output: ' + JSON.stringify(result))
		return result
	},
	getContractorUserProfilesForManagerUsername: (args) => {
		console.log('getContractorUserProfilesForManagerUsername input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid manager username'))
		}
		const result = officeAPI.getEmployeeUserProfilesForManagerUsername(
			args.username,
			'CONTRACTOR',
			args.filter,
			args.limit,
			args.nextToken,
		)
		console.log('getContractorUserProfilesForManagerUsername output: ' + JSON.stringify(result))
		return result
	},
	getCustomersForOfficeId: (args) => {
		console.log('getCustomersForOfficeId input: ' + JSON.stringify(args))
		if (!args.officeId) {
			return Promise.reject(new Error('Invalid office ID'))
		}
		const result = officeAPI.getCustomersForOfficeId(args.officeId, args.filter, args.limit, args.nextToken)
		console.log('getCustomersForOfficeId output: ' + JSON.stringify(result))
		return result
	},
	getContractsForOfficeId: (args) => {
		console.log('getContractsForOfficeId input: ' + JSON.stringify(args))
		if (!args.officeId) {
			return Promise.reject(new Error('Invalid office ID'))
		}
		const result = officeAPI.getContractsForOfficeId(args.officeId, args.username, args.filter, args.limit, args.nextToken)
		console.log('getContractsForOfficeId output: ' + JSON.stringify(result))
		return result
	},
	getInsuranceCompaniesOfMyOffice: (args) => {
		return Promise.resolve(null)
			.then(() => console.log('getInsuranceCompaniesOfMyOffice input: ' + JSON.stringify(args)))
			.then(() => {
				if (!args.username) {
					return Promise.reject(new Error('Invalid username or unauthenticated user.'))
				}
			})
			.then(() => officeAPI.getInsuranceCompaniesOfMyOffice(args.username))
			.then((result) => {
				console.log('getInsuranceCompaniesOfMyOffice output: ' + JSON.stringify(result))
				return result
			})
	},
	getUserModelPermissionsForOffice: (args) => {
		console.log('getUserModelPermissionsForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		if (!args.officeId) {
			return Promise.reject(new Error('Invalid office ID'))
		}
		const result = userAPI.getUserModelPermissionsForOffice(args.officeId, args.username)
		console.log('getUserModelPermissionsForOffice output: ' + JSON.stringify(result))
		return result
	},
	getUserPagePermissionsForOffice: (args) => {
		console.log('getUserPagePermissionsForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		if (!args.officeId) {
			return Promise.reject(new Error('Invalid office ID'))
		}
		const result = userAPI.getUserPagePermissionsForOffice(args.officeId, args.username)
		console.log('getUserPagePermissionsForOffice output: ' + JSON.stringify(result))
		return result
	},

	/* Mutations */
	updateOfficeDetails: (args) => {
		console.log('updateOfficeDetails input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = officeAPI.updateOfficeDetails(args.username, args.requestInput, args.condition)
		console.log('updateOfficeDetails output: ' + JSON.stringify(result))
		return result
	},
	updateUserProfileDetails: (args) => {
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		return userAPI.updateUserProfileDetails(args.username, args.requestInput, args.condition)
	},
	createVehicleForOffice: (args) => {
		console.log('createVehicleForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = officeAPI.createVehicleForOffice(args.officeId, args.username, args.requestInput, args.condition)
		console.log('createVehicleForOffice output: ' + JSON.stringify(result))
		return result
	},
	updateVehicleForOffice: (args) => {
		console.log('updateVehicleForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = officeAPI.updateVehicleForOffice(args.officeId, args.username, args.requestInput, args.condition)
		console.log('updateVehicleForOffice output: ' + JSON.stringify(result))
		return result
	},
	deleteVehicleForOffice: (args) => {
		console.log('deleteVehicleForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = officeAPI.deleteVehicleForOffice(args.officeId, args.username, args.requestInput, args.condition)
		console.log('deleteVehicleForOffice output: ' + JSON.stringify(result))
		return result
	},
	createContractForOffice: (args) => {
		console.log('createContractForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = officeAPI.createContractForOffice(args.officeId, args.username, args.requestInput, args.condition) //TODO implement
		console.log('createContractForOffice output: ' + JSON.stringify(result))
		return result
	},
	updateContractForOffice: (args) => {
		console.log('updateContractForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = officeAPI.updateContractForOffice(args.officeId, args.username, args.requestInput, args.condition) //TODO implement
		console.log('updateContractForOffice output: ' + JSON.stringify(result))
		return result
	},
	deleteContractForOffice: (args) => {
		console.log('deleteContractForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = officeAPI.deleteContractForOffice(args.officeId, args.username, args.requestInput, args.condition) //TODO implement
		console.log('deleteContractForOffice output: ' + JSON.stringify(result))
		return result
	},
	createCustomerForOffice: (args) => {
		console.log('createCustomerForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = officeAPI.createCustomerForOffice(args.officeId, args.username, args.requestInput, args.condition) //TODO implement
		console.log('createCustomerForOffice output: ' + JSON.stringify(result))
		return result
	},
	verifyOfficeRequest: (args) => {
		console.log('verifyOfficeRequest input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = requestAPI.verifyOfficeRequest(args.username, args.email, args.groups, args.message)
		console.log('verifyOfficeRequest output: ' + JSON.stringify(result))
		return result
	},
	createInviteEmployeeToOfficeRequest: (args) => {
		console.log('createInviteEmployeeToOfficeRequest input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = requestAPI.createInviteEmployeeToOfficeRequest(args.username, args.email, args.groups, args.requestInput)
		console.log('createInviteEmployeeToOfficeRequest output: ' + JSON.stringify(result))
		return result
	},
	createInviteContractorToOfficeRequest: (args) => {
		console.log('createInviteContractorToOfficeRequest input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = requestAPI.createInviteContractorToOfficeRequest(args.username, args.email, args.groups, args.requestInput)
		console.log('createInviteContractorToOfficeRequest output: ' + JSON.stringify(result))
		return result
	},
	offerInsuranceCompanyToOfficeRequest: (args) => {
		console.log('offerInsuranceCompanyToOfficeRequest input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = requestAPI.offerInsuranceCompanyToOfficeRequest(args.username, args.email, args.requestInput)
		console.log('offerInsuranceCompanyToOfficeRequest output: ' + JSON.stringify(result))
		return result
	},
	deleteRequestsSentByMe: (args) => {
		console.log('deleteRequestsSentByMe input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = requestAPI.deleteRequestsSentByMe(args.username, args.email, args.groups, args.requestInput, args.condition)
		console.log('deleteRequestsSentByMe output: ' + JSON.stringify(result))
		return result
	},
	createOfficeCollaborationConnectionForOffice: (args) => {
		console.log('createOfficeCollaborationConnectionForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = officeAPI.createOfficeCollaborationConnectionForOffice(
			args.officeId,
			args.username,
			args.requestInput,
			args.condition,
		) //TODO implement
		console.log('createOfficeCollaborationConnectionForOffice output: ' + JSON.stringify(result))
		return result
	},
	updateOfficeCollaborationConnectionForOffice: (args) => {
		console.log('updateOfficeCollaborationConnectionForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = officeAPI.updateOfficeCollaborationConnectionForOffice(
			args.officeId,
			args.username,
			args.requestInput,
			args.condition,
		) //TODO implement
		console.log('updateOfficeCollaborationConnectionForOffice output: ' + JSON.stringify(result))
		return result
	},
	deleteOfficeCollaborationConnectionForOffice: (args) => {
		console.log('deleteOfficeCollaborationConnectionForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = officeAPI.deleteOfficeCollaborationConnectionForOffice(args.username, args.requestInput, args.condition) //TODO implement
		console.log('deleteOfficeCollaborationConnectionForOffice output: ' + JSON.stringify(result))
		return result
	},
	createMyUserCalendarEvent: (args) => {
		const username = args.username
		const payload = args.payload
		const condition = args.condition
		console.log('createMyUserCalendarEvent input: ' + [username, JSON.stringify(payload), JSON.stringify(condition)])

		if (!username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}

		if (!payload) {
			return Promise.reject(new Error('Payload can\'t be empty or null.'))
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

		const result = gqlUtil.execute({
			input: input,
			condition: condition
		}, mutation, 'createMyUserCalendarEvent')
			.catch(err => console.error(`Unhandled error in createMyUserCalendarEvent: ${JSON.stringify(err)}`))

		if (!result) {
			return Promise.reject(new Error('Failed to create Calendar Event.'))
		}

		console.log('createMyUserCalendarEvent output: ' + JSON.stringify(result))
		return result
	},
	updateMyUserCalendarEvents: (args) => {
		const username = args.username
		const input = args.input
		const condition = args.condition
		console.log('updateMyUserCalendarEvents input: ' + [username, input, condition])
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
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
		const result = gqlUtil.execute(
			{input: sanitized_input, condition: expanded_condition},
			mutation,
			'updateMyUserCalendarEvents',
		)
		console.log('updateMyUserCalendarEvents output: ' + JSON.stringify(result))
		return result
	},
	deleteMyUserCalendarEvents: (args) => {
		const username = args.username
		const input = args.input
		const condition = args.condition
		console.log('deleteMyUserCalendarEvents input: ' + [username, input, condition])
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}

		const expanded_condition = {and: [condition || {senderUsername: {ne: ''}}, {username: {eq: username}}]}
		const mutation = /* GraphQL */ `
			mutation deleteMyUserCalendarEvents($input: DeleteUserCalendarEventInput!, $condition: ModelUserCalendarEventConditionInput) {
				deleteUserCalendarEvent(input: $input, condition: $condition) {
					id
				}
			}
		`
		const result = gqlUtil.execute({
			input: input,
			condition: expanded_condition
		}, mutation, 'deleteMyUserCalendarEvents')
		console.log('deleteMyUserCalendarEvents output: ' + JSON.stringify(result))
		return result
	},
	updateEmployeeModelPermissionsForOffice: (args) => {
		console.log('updateEmployeeModelPermissionsForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = userAPI.updateEmployeeModelPermissionsForOffice(
			args.officeId,
			args.username,
			args.empUsername,
			args.modelPermissions,
		)
		console.log('updateEmployeeModelPermissionsForOffice output: ' + JSON.stringify(result))
		return result
	},
	updateEmployeePagePermissionsForOffice: (args) => {
		console.log('updateEmployeePagePermissionsForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = userAPI.updateEmployeePagePermissionsForOffice(
			args.officeId,
			args.username,
			args.empUsername,
			args.modelPermissions,
		)
		console.log('updateEmployeePagePermissionsForOffice output: ' + JSON.stringify(result))
		return result
	},
	deleteEmployeeForOffice: (args) => {
		//TODO finish
		console.log('deleteEmployeeForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = ddbUtil.removeEmployeeFromOffice(args.officeId, args.username, args.empUsername)
		console.log('deleteEmployeeForOffice output: ' + JSON.stringify(result))
		return result
	},
	updateContractorModelPermissionsForOffice: (args) => {
		console.log('updateContractorModelPermissionsForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = userAPI.updateContractorModelPermissionsForOffice(
			args.officeId,
			args.username,
			args.contractorUsername,
			args.modelPermissions,
		) //TODO implement
		console.log('updateContractorModelPermissionsForOffice output: ' + JSON.stringify(result))
		return result
	},
	updateContractorPagePermissionsForOffice: (args) => {
		console.log('updateContractorPagePermissionsForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = userAPI.updateContractorPagePermissionsForOffice(
			args.officeId,
			args.username,
			args.contractorUsername,
			args.modelPermissions,
		) //TODO implement
		console.log('updateContractorPagePermissionsForOffice output: ' + JSON.stringify(result))
		return result
	},
	deleteContractorForOffice: (args) => {
		console.log('deleteContractorForOffice input: ' + JSON.stringify(args))
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		const result = userAPI.deleteContractorForOffice(args.officeId, args.username, args.contractorUsername) //TODO implement
		console.log('deleteContractorForOffice output: ' + JSON.stringify(result))
		return result
	},
	getUserRoleByUsername: (args) => {
		console.log('getUserRoleByUsername input: ' + args.username)
		const result = userAPI.getUserRoleByUsername(args.username)
		console.log('getUserRoleByUsername output: ' + JSON.stringify(result))
		return result
	},
	getAvailableInsuranceCompaniesForOffice: (args) => {
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		return officeAPI.getAvailableInsuranceCompaniesForOffice(args.office, args.username)
	},
	getS3Object: (args) => {
		if (!args.groups || args.groups.indexOf('admin') < 0) {
			return Promise.reject(new Error('Insufficient privileges.'))
		}
		if (!args.username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}
		return adminAPI.getS3Object(args.username, args.email, args.s3obj)
	},
	getUserProfileByUsername: (args) => {
		if (!args.groups || args.groups.indexOf('admin') < 0) {
			return Promise.reject(new Error('Insufficient privileges.'))
		}
		if (!args.caller_username) {
			return Promise.reject(new Error('Invalid caller username or unauthenticated user.'))
		}
		if (!args.username) {
			return Promise.reject(new Error('Invalid username.'))
		}
		return adminAPI.getUserProfileByUsername(args.username)
	},
	createUnverifiedOffice: (args) => {
		if (!args.username) {
			return Promise.reject(new Error('Invalid username.'))
		}
		return officeAPI.createUnverifiedOffice(args.username, args.input)
	},
	addInsuranceCompaniesToOffice(args) {
		return Promise.resolve(null)
			.then(() => console.log('addInsuranceCompaniesToOffice input: ' + JSON.stringify(args)))
			.then(() => {
				if (!args.groups || args.groups.indexOf('admin') < 0) {
					return Promise.reject(new Error('Insufficient privileges.'))
				}
			})
			.then(() => {
				if (!args.username) {
					return Promise.reject(new Error('Invalid username.'))
				}
				if (!args.officeId) {
					return Promise.reject(new Error('Invalid officeId.'))
				}
				if (!args.insuranceCompanies) {
					return Promise.reject(new Error('Invalid (or empty) insuranceCompanies.'))
				}
			})
			.then(() => adminAPI.addInsuranceCompaniesToOffice(args.officeId, args.insuranceCompanies))
			.then((result) => {
				console.log('addInsuranceCompaniesToOffice output: ' + JSON.stringify(result))
				return result
			})
	},
	getInsuranceCompaniesOfOffice(args) {
		return Promise.resolve(null)
			.then(() => console.log('getInsuranceCompaniesOfOffice input: ' + JSON.stringify(args)))
			.then(() => {
				if (!args.officeId) {
					return Promise.reject(new Error('Invalid officeId.'))
				}
			})
			.then(() => officeAPI.getInsuranceCompaniesForOffice(args.officeId))
			.then((result) => {
				console.log('getInsuranceCompaniesOfOffice output: ' + JSON.stringify(result))
				return result
			})
	},
	getOutgoingOfficeConnections(args) {
		return Promise.resolve(null)
			.then(() => console.log('getOutgoingOfficeConnections input: ' + JSON.stringify(args)))
			.then(() => {
				if (!args.officeId) {
					return Promise.reject(new Error('Invalid officeId.'))
				}
			})
			.then(() => officeAPI.getOutgoingOfficeConnections(args.officeId))
			.then((result) => {
				console.log('getOutgoingOfficeConnections output: ' + JSON.stringify(result))
				return result
			})
	},
	getIncomingOfficeConnections(args) {
		return Promise.resolve(null)
			.then(() => console.log('getIncomingOfficeConnections input: ' + JSON.stringify(args)))
			.then(() => {
				if (!args.officeId) {
					return Promise.reject(new Error('Invalid officeId.'))
				}
			})
			.then(() => officeAPI.getIncomingOfficeConnections(args.officeId))
			.then((result) => {
				console.log('getIncomingOfficeConnections output: ' + JSON.stringify(result))
				return result
			})
	},
	removeInsuranceCompaniesFromOffice(args) {
		return Promise.resolve(null)
			.then(() => console.log('removeInsuranceCompaniesFromOffice input: ' + JSON.stringify(args)))
			.then(() => {
				if (!args.groups || args.groups.indexOf('admin') < 0) {
					return Promise.reject(new Error('Insufficient privileges.'))
				}
			})
			.then(() => {
				if (!args.username) {
					return Promise.reject(new Error('Invalid username.'))
				}
				if (!args.officeId) {
					return Promise.reject(new Error('Invalid officeId.'))
				}
				if (!args.insuranceCompanies) {
					return Promise.reject(new Error('Invalid (or empty) insuranceCompanies.'))
				}
			})
			.then(() => adminAPI.removeInsuranceCompaniesFromOffice(args.officeId, args.insuranceCompanyCodes))
			.then((result) => {
				console.log('removeInsuranceCompaniesFromOffice output: ' + JSON.stringify(result))
				return result
			})
	},
	test: (args) => {
		const testAPI = require('./unittests/index')
		return testAPI.run()
	}
}
