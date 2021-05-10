/* Amplify Params - DO NOT EDIT
	API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
	API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT
	AUTH_WAISAUTH_USERPOOLID
	ENV
	REGION
	STORAGE_WAISSTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

//API
const api = require('./gateway')

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 * User permission checks are done inside the API.
 * Exceptions will be thrown on error.
 */
const resolvers = {
	Office: {
		allInsuranceCompanies: (event) => {
			return api.getInsuranceCompaniesOfOffice({
				office: event.source?.officeId
			})
		},
		outgoingOfficeConnections: (event) => {
			return api.getOutgoingOfficeConnections({
				office: event.source?.officeId
			})
		},
		incomingOfficeConnections: (event) => {
			return api.getIncomingOfficeConnections({
				office: event.source?.officeId
			})
		},
	},
	Query: {
		echo: (event) => {
			return event.arguments.msg
		},
		me: (event) => {
			return api.user({username: event.identity.claims['cognito:username']})
		},
		getWorkEnvironment: (event) => {
			return api.getWorkEnvironment({
				username: event.identity.claims['cognito:username']
			})
		},
		getMyUserCalendarEvents: (event) => {
			return api.getCalendarEventsOfUser({
				username: event.identity.claims['cognito:username'],
				filter: event.arguments.filter,
				limit: event.arguments.limit,
				nextToken: event.arguments.nextToken,
			})
		},
		getMySentRequests: (event) => {
			return api.getRequestsFromUser({
				username: event.identity.claims['cognito:username'],
				filter: event.arguments.filter,
				limit: event.arguments.limit,
				nextToken: event.arguments.nextToken,
			})
		},
		getRequestsForMe: (event) => {
			return api.getRequestsForUser({
				username: event.identity.claims['cognito:username'],
				email: event.identity.claims['email'],
				groups: event.identity.groups,
				filter: event.arguments.filter,
				limit: event.arguments.limit,
				nextToken: event.arguments.nextToken,
			})
		},
		getEmployeeUserProfiles: (event) => {
			return api.getEmployeeUserProfilesForManagerUsername({
				username: event.identity.claims['cognito:username'],
				filter: event.arguments.filter,
				limit: event.arguments.limit,
				nextToken: event.arguments.nextToken,
			})
		},
		getContractorUserProfiles: (event) => {
			return api.getContractorUserProfilesForManagerUsername({
				username: event.identity.claims['cognito:username'],
				filter: event.arguments.filter,
				limit: event.arguments.limit,
				nextToken: event.arguments.nextToken,
			})
		},
		getCustomersForOfficeId: (event) => {
			return api.getCustomersForOfficeId({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				filter: event.arguments.filter,
				limit: event.arguments.limit,
				nextToken: event.arguments.nextToken,
			})
		},
		getContractsForOfficeId: (event) => {
			return api.getContractsForOfficeId({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				filter: event.arguments.filter,
				limit: event.arguments.limit,
				nextToken: event.arguments.nextToken,
			})
		},
		getInsuranceCompaniesOfMyOffice: (event) => {
			return api.getInsuranceCompaniesOfMyOffice({
				username: event.identity.claims['cognito:username']
			})
		},
		getInsuranceCompaniesOfOffice: (event) => {
			return api.getInsuranceCompaniesOfOffice({
				officeId: event.arguments.officeId
			})
		},
		getS3Object: (event) => {
			return api.getS3Object({
				username: event.identity.claims['cognito:username'],
				email: event.identity.claims['email'],
				s3obj: event.arguments.obj,
				groups: event.identity.groups,
			})
		},
		getUserProfileByUsername: (event) => {
			return api.getUserProfileByUsername({
				caller_username: event.identity.claims['cognito:username'],
				username: event.arguments.username,
				groups: event.identity.groups
			})
		}
	},
	Mutation: {
		updateOfficeDetails: (event) => {
			return api.updateOfficeDetails({
				username: event.identity.claims['cognito:username'],
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		updateUserProfileDetails: (event) => {
			return api.updateUserProfileDetails({
				username: event.identity.claims['cognito:username'],
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		createVehicleForOffice: (event) => {
			return api.createVehicleForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		updateVehicleForOffice: (event) => {
			return api.updateVehicleForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		deleteVehicleForOffice: (event) => {
			return api.deleteVehicleForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		createContractForOffice: (event) => {
			return api.createContractForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		updateContractForOffice: (event) => {
			return api.updateContractForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		deleteContractForOffice: (event) => {
			return api.deleteContractForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		createCustomerForOffice: (event) => {
			return api.createCustomerForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		verifyOfficeRequest: (event) => {
			return api.verifyOfficeRequest({
				username: event.identity.claims['cognito:username'],
				email: event.identity.claims['email'],
				groups: event.identity.groups,
				message: event.arguments.message,
			})
		},
		createInviteEmployeeToOfficeRequest: (event) => {
			return api.createInviteEmployeeToOfficeRequest({
				username: event.identity.claims['cognito:username'],
				email: event.identity.claims['email'],
				groups: event.identity.groups,
				requestInput: event.arguments.input,
			})
		},
		createInviteContractorToOfficeRequest: (event) => {
			return api.createInviteContractorToOfficeRequest({
				username: event.identity.claims['cognito:username'],
				email: event.identity.claims['email'],
				groups: event.identity.groups,
				requestInput: event.arguments.input,
			})
		},
		deleteRequestsSentByMe: (event) => {
			return api.deleteRequestsSentByMe({
				username: event.identity.claims['cognito:username'],
				email: event.identity.claims['email'],
				groups: event.identity.groups,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		resolveRequest: (event) => {
			return api.resolveRequest({
				username: event.identity.claims['cognito:username'],
				email: event.identity.claims['email'],
				groups: event.identity.groups,
				id: event.arguments.requestId,
				decision: event.arguments.decision,
				payload: event.arguments.payload,
			})
		},
		createOfficeCollaborationConnectionForOffice: (event) => {
			return api.createOfficeCollaborationConnectionForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		updateOfficeCollaborationConnectionForOffice: (event) => {
			return api.updateOfficeCollaborationConnectionForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		deleteOfficeCollaborationConnectionForOffice: (event) => {
			return api.deleteOfficeCollaborationConnectionForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},

		createMyUserCalendarEvent: (event) => {
			return api.createMyUserCalendarEvent({
				username: event.identity.claims['cognito:username'],
				payload: event.arguments.input.payload,
				condition: event.arguments.condition,
			})
		},
		updateMyUserCalendarEvents: (event) => {
			return api.updateMyUserCalendarEvents({
				username: event.identity.claims['cognito:username'],
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		deleteMyUserCalendarEvents: (event) => {
			return api.deleteMyUserCalendarEvents({
				username: event.identity.claims['cognito:username'],
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		updateEmployeeModelPermissionsForOffice: (event) => {
			return api.updateEmployeeModelPermissionsForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				empUsername: event.arguments.empUsername,
				modelPermissions: event.arguments.modelPermissions,
			})
		},
		updateEmployeePagePermissionsForOffice: (event) => {
			return api.updateEmployeePagePermissionsForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				empUsername: event.arguments.empUsername,
				pagePermissions: event.arguments.pagePermissions,
			})
		},
		deleteEmployeeForOffice: (event) => {
			return api.deleteEmployeeForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				empUsername: event.arguments.empUsername,
			})
		},
		updateContractorModelPermissionsForOffice: (event) => {
			return api.updateContractorModelPermissionsForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				contractorUsername: event.arguments.contractorUsername,
				modelPermissions: event.arguments.modelPermissions,
			})
		},
		updateContractorPagePermissionsForOffice: (event) => {
			return api.updateContractorPagePermissionsForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				contractorUsername: event.arguments.contractorUsername,
				pagePermissions: event.arguments.pagePermissions,
			})
		},
		deleteContractorForOffice: (event) => {
			return api.deleteContractorForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				contractorUsername: event.arguments.contractorUsername,
				permissions: event.arguments.permissions,
			})
		},
		getUserModelPermissionsForOffice: (event) => {
			return api.getUserModelPermissionsForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
			})
		},
		getUserPagePermissionsForOffice: (event) => {
			return api.getUserPagePermissionsForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
			})
		},
		getUserRole: (event) => {
			return api.getUserRoleByUsername({
				username: event.identity.claims['cognito:username'],
			})
		},
		createUnverifiedOffice: (event) => {
			return api.createUnverifiedOffice({
				username: event.identity.claims['cognito:username'],
				input: event.arguments.input
			})
		},
		addInsuranceCompaniesToOffice: (event) => {
			return api.addInsuranceCompaniesToOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				insuranceCompanies: event.arguments.insuranceCompanies
			})
		},
		removeInsuranceCompaniesFromOffice: (event) => {
			return api.removeInsuranceCompaniesFromOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				insuranceCompanyCodes: event.arguments.insuranceCompanyCodes
			})
		},

		// Testing
		test: (event) => {
			return api.test({
				username: event.identity.claims['cognito:username'],
				arguments: event.arguments
			})
		}
	},
}

// event
// {
//   "typeName": "...", /* Filled dynamically based on @function usage location */
//   "fieldName": "function name", /* Filled dynamically based on @function usage location */
//   "arguments": { /* GraphQL field arguments via $ctx.arguments */ },
//   "identity": { /* AppSync identity object via $ctx.identity */ },
//   "source": { /* The object returned by the parent resolver. E.G. if resolving field 'Post.comments', the source is the Post object. */ },
//   "request": { /* AppSync request object. Contains things like headers. */ },
//   "prev": { /* If using the built-in pipeline resolver support, this contains the object returned by the previous function. */ },
// }
exports.handler = (event, context) => {
	console.log('Resolving event: ' + JSON.stringify(event))
	if (!event.identity.claims) {
		return Promise.reject(new Error('Invalid credentials.'))
	}
	const typeHandler = resolvers[event.typeName]
	if (typeHandler) {
		const resolver = typeHandler[event.fieldName]
		if (resolver) {
			return resolver(event)
				.then(value => {
					console.log('Resolver data: ' + JSON.stringify(value, null, 2))
					return value
				})
				.catch(reason => {
					console.error(reason)
					throw reason
				})
		} else {
			return Promise.reject(new Error('Resolver not found.'))
		}
	} else {
		return Promise.reject(new Error('Type handler not found.'))
	}
}
