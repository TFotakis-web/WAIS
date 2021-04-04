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
		availableInsuranceCompanies: async (event) => {
			return await api.getAvailableInsuranceCompaniesForOffice({
				office: event.source,
				username: event.identity.claims['cognito:username'],
			})
		},
	},
	Query: {
		echo: async (event) => {
			return event.arguments.msg
		},
		me: async (event) => {
			return await api.user({username: event.identity.claims['cognito:username']})
		},
		getOfficesIWorkIn: async (event) => {
			return await api.getOfficesOfUser({
				username: event.identity.claims['cognito:username'],
				filter: event.arguments.filter,
				limit: event.arguments.limit,
				nextToken: event.arguments.nextToken,
			})
		},
		getMyUserCalendarEvents: async (event) => {
			return await api.getCalendarEventsOfUser({
				username: event.identity.claims['cognito:username'],
				filter: event.arguments.filter,
				limit: event.arguments.limit,
				nextToken: event.arguments.nextToken,
			})
		},
		getMySentRequests: async (event) => {
			return await api.getRequestsFromUser({
				username: event.identity.claims['cognito:username'],
				filter: event.arguments.filter,
				limit: event.arguments.limit,
				nextToken: event.arguments.nextToken,
			})
		},
		getRequestsForMe: async (event) => {
			return await api.getRequestsForUser({
				username: event.identity.claims['cognito:username'],
				email: event.identity.claims['email'],
				groups: event.identity.groups,
				filter: event.arguments.filter,
				limit: event.arguments.limit,
				nextToken: event.arguments.nextToken,
			})
		},
		getEmployeeUserProfiles: async (event) => {
			return await api.getEmployeeUserProfilesForManagerUsername({
				username: event.identity.claims['cognito:username'],
				filter: event.arguments.filter,
				limit: event.arguments.limit,
				nextToken: event.arguments.nextToken,
			})
		},
		getContractorUserProfiles: async (event) => {
			return await api.getContractorUserProfilesForManagerUsername({
				username: event.identity.claims['cognito:username'],
				filter: event.arguments.filter,
				limit: event.arguments.limit,
				nextToken: event.arguments.nextToken,
			})
		},
		getCustomersForOfficeId: async (event) => {
			return await api.getCustomersForOfficeId({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				filter: event.arguments.filter,
				limit: event.arguments.limit,
				nextToken: event.arguments.nextToken,
			})
		},
		getContractsForOfficeId: async (event) => {
			return await api.getContractsForOfficeId({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				filter: event.arguments.filter,
				limit: event.arguments.limit,
				nextToken: event.arguments.nextToken,
			})
		},
		getPartnerOfficeConnections: async (event) => {
			return await api.getPartnerOfficeConnections({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				filter: event.arguments.filter,
				limit: event.arguments.limit,
				nextToken: event.arguments.nextToken,
			})
		},
		getS3Object: async (event) => {
			return await api.getS3Object({
				username: event.identity.claims['cognito:username'],
				email: event.identity.claims['email'],
				s3obj: event.arguments.obj,
				groups: event.identity.groups,
			})
		},
	},

	Mutation: {
		updateOfficeDetails: async (event) => {
			return await api.updateOfficeDetails({
				username: event.identity.claims['cognito:username'],
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		updateUserProfileDetails: async (event) => {
			return await api.updateUserProfileDetails({
				username: event.identity.claims['cognito:username'],
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		createVehicleForOffice: async (event) => {
			return await api.createVehicleForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		updateVehicleForOffice: async (event) => {
			return await api.updateVehicleForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		deleteVehicleForOffice: async (event) => {
			return await api.deleteVehicleForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		createContractForOffice: async (event) => {
			return await api.createContractForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		updateContractForOffice: async (event) => {
			return await api.updateContractForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		deleteContractForOffice: async (event) => {
			return await api.deleteContractForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		createCustomerForOffice: async (event) => {
			return await api.createCustomerForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		createOfficeRequest: async (event) => {
			return await api.createOfficeRequest({
				username: event.identity.claims['cognito:username'],
				email: event.identity.claims['email'],
				groups: event.identity.groups,
				requestInput: event.arguments.input,
			})
		},
		createInviteEmployeeToOfficeRequest: async (event) => {
			return await api.createInviteEmployeeToOfficeRequest({
				username: event.identity.claims['cognito:username'],
				email: event.identity.claims['email'],
				groups: event.identity.groups,
				requestInput: event.arguments.input,
			})
		},
		createInviteContractorToOfficeRequest: async (event) => {
			return await api.createInviteContractorToOfficeRequest({
				username: event.identity.claims['cognito:username'],
				email: event.identity.claims['email'],
				groups: event.identity.groups,
				requestInput: event.arguments.input,
			})
		},
		createOfficeConnectionRequest: async (event) => {
			return await api.createOfficeConnectionRequest({
				username: event.identity.claims['cognito:username'],
				email: event.identity.claims['email'],
				groups: event.identity.groups,
				requestInput: event.arguments.input,
			})
		},
		deleteRequestsSentByMe: async (event) => {
			return await api.deleteRequestsSentByMe({
				username: event.identity.claims['cognito:username'],
				email: event.identity.claims['email'],
				groups: event.identity.groups,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		resolveRequest: async (event) => {
			return await api.resolveRequest({
				username: event.identity.claims['cognito:username'],
				email: event.identity.claims['email'],
				groups: event.identity.groups,
				id: event.arguments.requestId,
				decision: event.arguments.decision,
				payload: event.arguments.payload,
			})
		},
		createOfficeAccessConnectionForOffice: async (event) => {
			return await api.createOfficeAccessConnectionForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		updateOfficeAccessConnectionForOffice: async (event) => {
			return await api.updateOfficeAccessConnectionForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		deleteOfficeAccessConnectionForOffice: async (event) => {
			return await api.deleteOfficeAccessConnectionForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},

		createMyUserCalendarEvent: async (event) => {
			return await api.createMyUserCalendarEvent({
				username: event.identity.claims['cognito:username'],
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		updateMyUserCalendarEvents: async (event) => {
			return await api.updateMyUserCalendarEvents({
				username: event.identity.claims['cognito:username'],
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		deleteMyUserCalendarEvents: async (event) => {
			return await api.deleteMyUserCalendarEvents({
				username: event.identity.claims['cognito:username'],
				requestInput: event.arguments.input,
				condition: event.arguments.condition,
			})
		},
		updateEmployeeModelPermissionsForOffice: async (event) => {
			return await api.updateEmployeeModelPermissionsForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				empUsername: event.arguments.empUsername,
				modelPermissions: event.arguments.modelPermissions,
			})
		},
		updateEmployeePagePermissionsForOffice: async (event) => {
			return await api.updateEmployeePagePermissionsForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				empUsername: event.arguments.empUsername,
				pagePermissions: event.arguments.pagePermissions,
			})
		},
		deleteEmployeeForOffice: async (event) => {
			return await api.deleteEmployeeForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				empUsername: event.arguments.empUsername,
			})
		},
		updateContractorModelPermissionsForOffice: async (event) => {
			return await api.updateContractorModelPermissionsForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				contractorUsername: event.arguments.contractorUsername,
				modelPermissions: event.arguments.modelPermissions,
			})
		},
		updateContractorPagePermissionsForOffice: async (event) => {
			return await api.updateContractorPagePermissionsForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				contractorUsername: event.arguments.contractorUsername,
				pagePermissions: event.arguments.pagePermissions,
			})
		},
		deleteContractorForOffice: async (event) => {
			return await api.deleteContractorForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
				contractorUsername: event.arguments.contractorUsername,
				permissions: event.arguments.permissions,
			})
		},
		getUserModelPermissionsForOffice: async (event) => {
			return await api.getUserModelPermissionsForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
			})
		},
		getUserPagePermissionsForOffice: async (event) => {
			return await api.getUserPagePermissionsForOffice({
				username: event.identity.claims['cognito:username'],
				officeId: event.arguments.officeId,
			})
		},
		getUserRole: async (event) => {
			return await api.getUserRoleByUsername({
				username: event.identity.claims['cognito:username'],
			})
		},
		getAvailableInsuranceCompanies: async (event) => {
			return await api.getAllInsuranceCompanies({
				username: event.identity.claims['cognito:username'],
			})
		},
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
exports.handler = async (event) => {
	console.log('Resolving event: ' + JSON.stringify(event))
	const typeHandler = resolvers[event.typeName]
	if (typeHandler) {
		const resolver = typeHandler[event.fieldName]
		if (resolver) {
			if (!event.identity.claims) {
				throw new Error('Invalid credentials.')
			}
			try {
				return await resolver(event)
			} catch (err) {
				console.log('Resolver error is ' + JSON.stringify(err))
				throw err //This will format the resolver's result in a specific way
			}
		}
	}
	throw new Error('Resolver not found.')
}
