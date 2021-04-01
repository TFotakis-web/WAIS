const gqlAPI = require('./new_gql_queries.js')

/**
 * High-level API.
 * Should be the single point of entry for ALL user queries.
 * Branches out to other AWS APIs (e.g GQL and DDB).
 */
module.exports = {
	/* Queries */
	user: async (username) => {
		return await gqlAPI.getUserProfileByUsername(username)
	},
	getOfficesOfUser: async (args) => {
		return await gqlAPI.getOfficeDetailsAndPermissionsByUsername(args.username, args.filter, args.limit, args.nextToken)
	},
	getCallendarEventsOfUser: async (args) => {
		return await gqlAPI.getCallendarEventsForUser(args.username, args.filter, args.limit, args.nextToken)
	},
	getRequestsFromUser: async (args) => {
		return await gqlAPI.getRequestsFromUser(args.username, args.filter, args.limit, args.nextToken)
	},
	getRequestsForUser: async (args) => {
		return await gqlAPI.getRequestsForUser(args.username, args.filter, args.limit, args.nextToken)
	},
	resolveRequest: async (args) => {
		return await gqlAPI.resolveRequest(args.username, args.groups, args.id, args.decission, args.payload)
	},
	getEmployeeUserProfilesForManagerUsername: async (args) => {
		return await gqlAPI.getEmployeeUserProfilesForManagerUsername(args.username, args.filter, args.limit, args.nextToken)
	},
	getContractorUserProfilesForManagerUsername: async (args) => {
		return await gqlAPI.getContractorUserProfilesForManagerUsername(args.username, args.filter, args.limit, args.nextToken)
	},
	getCustomersForOfficeId: async (args) => {
		return await gqlAPI.getCustomersForOfficeId(args.officeId, args.filter, args.limit, args.nextToken)
	},
	getContractsForOfficeId: async (args) => {
		return await gqlAPI.getContractsForOfficeId(args.officeId, args.username, args.filter, args.limit, args.nextToken)
	},
	getPartnerOfficeConnections: async (args) => {
		return await gqlAPI.getPartnerOfficeConnections(args.officeId, args.username, args.filter, args.limit, args.nextToken)
	},
	getUserModelPermissionsForOffice: async (args) => {
		return await gqlAPI.getUserModelPermissionsForOffice(args.officeId, args.username)
	},
	getUserPagePermissionsForOffice: async (args) => {
		return await gqlAPI.getUserPagePermissionsForOffice(args.officeId, args.username)
	},

	/* Mutations */
	updateOfficeDetails: async (args) => {
		return await gqlAPI.updateOfficeDetails(args.username, args.requestInput, args.condition) // OK
	},
	updateUserProfileDetails: async (args) => {
		return await gqlAPI.updateUserProfileDetails(args.username, args.requestInput, args.condition) // OK
	},
	createVehicleForOffice: async (args) => {
		return await gqlAPI.createVehicleForOffice(args.officeId, args.username, args.requestInput, args.condition) // OK
	},
	updateVehicleForOffice: async (args) => {
		return await gqlAPI.updateVehicleForOffice(args.officeId, args.username, args.requestInput, args.condition) // OK
	},
	deleteVehicleForOffice: async (args) => {
		return await gqlAPI.deleteVehicleForOffice(args.officeId, args.username, args.requestInput, args.condition)
	},
	createContractForOffice: async (args) => {
		return await gqlAPI.createContractForOffice(args.officeId, args.username, args.requestInput, args.condition)
	},
	updateContractForOffice: async (args) => {
		return await gqlAPI.updateContractForOffice(args.officeId, args.username, args.requestInput, args.condition)
	},
	deleteContractForOffice: async (args) => {
		return await gqlAPI.deleteContractForOffice(args.officeId, args.username, args.requestInput, args.condition)
	},
	createCustomerForOffice: async (args) => {
		return await gqlAPI.createCustomerForOffice(args.officeId, args.username, args.requestInput, args.condition)
	},
	createOfficeRequest: async (args) => {
		return await gqlAPI.createOfficeRequest(args.username, args.email, args.groups, args.requestInput)
	},
	createInviteEmployeeToOfficeRequest: async (args) => {
		return await gqlAPI.createInviteEmployeeToOfficeRequest(args.username, args.email, args.groups, args.requestInput)
	},
	createInviteContractorToOfficeRequest: async (args) => {
		return await gqlAPI.createInviteContractorToOfficeRequest(args.username, args.email, args.groups, args.requestInput)
	},
	createOfficeConnectionRequest: async (args) => {
		return await gqlAPI.createOfficeConnectionRequest(args.username, args.email, args.groups, args.requestInput)
	},
	deleteRequestsSentByMe: async (args) => {
		return await gqlAPI.deleteRequestsSentByMe(args.username, args.email, args.groups, args.requestInput, args.condition) // OK
	},
	createOfficeAccessConnectionForOffice: async (args) => {
		return await gqlAPI.createOfficeAccessConnectionForOffice(args.officeId, args.username, args.requestInput, args.condition)
	},
	updateOfficeAccessConnectionForOffice: async (args) => {
		return await gqlAPI.updateOfficeAccessConnectionForOffice(args.officeId, args.username, args.requestInput, args.condition)
	},
	deleteOfficeAccessConnectionForOffice: async (args) => {
		return await gqlAPI.deleteOfficeAccessConnectionForOffice(args.username, args.requestInput, args.condition)
	},
	createMyUserCalendarEvent: async (args) => {
		return await gqlAPI.createMyUserCalendarEvent(args.username, args.requestInput, args.condition) // OK
	},
	updateMyUserCalendarEvents: async (args) => {
		return await gqlAPI.updateMyUserCalendarEvents(args.username, args.requestInput, args.condition) // OK
	},
	deleteMyUserCalendarEvents: async (args) => {
		return await gqlAPI.deleteMyUserCalendarEvents(args.username, args.requestInput, args.condition) // OK
	},
	updateEmployeeModelPermissionsForOffice: async (args) => {
		return await gqlAPI.updateEmployeeModelPermissionsForOffice(args.officeId, args.username, args.empUsername, args.modelPermissions)
	},
	updateEmployeePagePermissionsForOffice: async (args) => {
		return await gqlAPI.updateEmployeePagePermissionsForOffice(args.officeId, args.username, args.empUsername, args.pagePermissions)
	},
	deleteEmployeeForOffice: async (args) => {
		return await gqlAPI.deleteEmployeeForOffice(args.officeId, args.username, args.empUsername)
	},
	updateContractorModelPermissionsForOffice: async (args) => {
		return await gqlAPI.updateContractorModelPermissionsForOffice(
			args.officeId,
			args.username,
			args.contractorUsername,
			args.modelPermissions,
		)
	},
	updateContractorPagePermissionsForOffice: async (args) => {
		return await gqlAPI.updateContractorPagePermissionsForOffice(
			args.officeId,
			args.username,
			args.contractorUsername,
			args.pagePermissions,
		)
	},
	deleteContractorForOffice: async (args) => {
		return await gqlAPI.deleteContractorForOffice(args.officeId, args.username, args.contractorUsername)
	},
	getUserRoleByUsername: async (args) => {
		return await gqlAPI.getUserRoleByUsername(args.username)
	},
	getAllInsuranceCompanies: async (args) => {
		return await gqlAPI.getAllInsuranceCompanies(args.username)
	},
}
