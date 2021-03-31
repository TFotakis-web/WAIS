const gqlAPI = require('./new_gql_queries.js')

/**
 * High-level API.
 * Should be the single point of entry for ALL user queries.
 * Branches out to other AWS APIs (e.g GQL and DDB).
 */
module.exports = {
	/* Queries */
	user: async (username) => {
		return gqlAPI.getUserProfileByUsername(username)
	},
	getOfficesOfUser: async (args) => {
		return gqlAPI.getOfficeDetailsAndPermissionsByUsername(args.username, args.filter, args.limit, args.nextToken)
	},
	getCallendarEventsOfUser: async (args) => {
		return gqlAPI.getCallendarEventsForUser(args.username, args.filter, args.limit, args.nextToken)
	},
	getRequestsFromUser: async (args) => {
		return gqlAPI.getRequestsFromUser(args.username, args.filter, args.limit, args.nextToken)
	},
	getRequestsForUser: async (args) => {
		return gqlAPI.getRequestsForUser(args.username, args.filter, args.limit, args.nextToken)
	},
	resolveRequest: async (args) => {
		return gqlAPI.resolveRequest(args.username, args.groups, args.id, args.decission, args.payload)
	},
	getEmployeeUserProfilesForManagerUsername: async (args) => {
		return gqlAPI.getEmployeeUserProfilesForManagerUsername(args.username, args.filter, args.limit, args.nextToken)
	},
	getContractorUserProfilesForManagerUsername: async (args) => {
		return gqlAPI.getContractorUserProfilesForManagerUsername(args.username, args.filter, args.limit, args.nextToken)
	},
	getCustomersForOfficeId: async (args) => {
		return gqlAPI.getCustomersForOfficeId(args.officeId, args.filter, args.limit, args.nextToken)
	},
	getContractsForOfficeId: async (args) => {
		return gqlAPI.getContractsForOfficeId(args.officeId, args.username, args.filter, args.limit, args.nextToken)
	},
	getPartnerOfficeConnections: async (args) => {
		return gqlAPI.getPartnerOfficeConnections(args.officeId, args.username, args.filter, args.limit, args.nextToken)
	},
	getUserModelPermissionsForOffice: async (args) => {
		return gqlAPI.getUserModelPermissionsForOffice(args.officeId, args.username)
	},
	getUserPagePermissionsForOffice: async (args) => {
		return gqlAPI.getUserPagePermissionsForOffice(args.officeId, args.username)
	},

	/* Mutations */
	updateOfficeDetails: async (args) => {
		return gqlAPI.updateOfficeDetails(args.username, args.requestInput, args.condition) // OK
	},
	updateUserProfileDetails: async (args) => {
		return gqlAPI.updateUserProfileDetails(args.username, args.requestInput, args.condition) // OK
	},
	createVehicleForOffice: async (args) => {
		return gqlAPI.createVehicleForOffice(args.officeId, args.username, args.requestInput, args.condition) // OK
	},
	updateVehicleForOffice: async (args) => {
		return gqlAPI.updateVehicleForOffice(args.officeId, args.username, args.requestInput, args.condition) // OK
	},
	deleteVehicleForOffice: async (args) => {
		return gqlAPI.deleteVehicleForOffice(args.officeId, args.username, args.requestInput, args.condition)
	},
	createContractForOffice: async (args) => {
		return gqlAPI.createContractForOffice(args.officeId, args.username, args.requestInput, args.condition)
	},
	updateContractForOffice: async (args) => {
		return gqlAPI.updateContractForOffice(args.officeId, args.username, args.requestInput, args.condition)
	},
	deleteContractForOffice: async (args) => {
		return gqlAPI.deleteContractForOffice(args.officeId, args.username, args.requestInput, args.condition)
	},
	createCustomerForOffice: async (args) => {
		return gqlAPI.createCustomerForOffice(args.officeId, args.username, args.requestInput, args.condition)
	},
	createOfficeRequest: async (args) => {
		return gqlAPI.createOfficeRequest(args.username, args.email, args.groups, args.requestInput)
	},
	createInviteEmployeeToOfficeRequest: async (args) => {
		return gqlAPI.createInviteEmployeeToOfficeRequest(args.username, args.email, args.groups, args.requestInput)
	},
	createInviteContractorToOfficeRequest: async (args) => {
		return gqlAPI.createInviteContractorToOfficeRequest(args.username, args.email, args.groups, args.requestInput)
	},
	createOfficeConnectionRequest: async (args) => {
		return gqlAPI.createOfficeConnectionRequest(args.username, args.email, args.groups, args.requestInput)
	},
	deleteRequestsSentByMe: async (args) => {
		return gqlAPI.deleteRequestsSentByMe(args.username, args.email, args.groups, args.requestInput, args.condition) // OK
	},
	createOfficeAccessConnectionForOffice: async (args) => {
		return gqlAPI.createOfficeAccessConnectionForOffice(args.officeId, args.username, args.requestInput, args.condition)
	},
	updateOfficeAccessConnectionForOffice: async (args) => {
		return gqlAPI.updateOfficeAccessConnectionForOffice(args.officeId, args.username, args.requestInput, args.condition)
	},
	deleteOfficeAccessConnectionForOffice: async (args) => {
		return gqlAPI.deleteOfficeAccessConnectionForOffice(args.username, args.requestInput, args.condition)
	},
	createMyUserCalendarEvent: async (args) => {
		return gqlAPI.createMyUserCalendarEvent(args.username, args.requestInput, args.condition) // OK
	},
	updateMyUserCalendarEvents: async (args) => {
		return gqlAPI.updateMyUserCalendarEvents(args.username, args.requestInput, args.condition) // OK
	},
	deleteMyUserCalendarEvents: async (args) => {
		return gqlAPI.deleteMyUserCalendarEvents(args.username, args.requestInput, args.condition) // OK
	},
	updateEmployeeModelPermissionsForOffice: async (args) => {
		return gqlAPI.updateEmployeeModelPermissionsForOffice(args.officeId, args.username, args.empUsername, args.modelPermissions)
	},
	updateEmployeePagePermissionsForOffice: async (args) => {
		return gqlAPI.updateEmployeePagePermissionsForOffice(args.officeId, args.username, args.empUsername, args.pagePermissions)
	},
	deleteEmployeeForOffice: async (args) => {
		return gqlAPI.deleteEmployeeForOffice(args.officeId, args.username, args.empUsername)
	},
	updateContractorModelPermissionsForOffice: async (args) => {
		return gqlAPI.updateContractorModelPermissionsForOffice(
			args.officeId,
			args.username,
			args.contractorUsername,
			args.modelPermissions,
		)
	},
	updateContractorPagePermissionsForOffice: async (args) => {
		return gqlAPI.updateContractorPagePermissionsForOffice(args.officeId, args.username, args.contractorUsername, args.pagePermissions)
	},
	deleteContractorForOffice: async (args) => {
		return gqlAPI.deleteContractorForOffice(args.officeId, args.username, args.contractorUsername)
	},
}
