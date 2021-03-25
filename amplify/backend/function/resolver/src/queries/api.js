const ddbAPI = require('../api/ddb_queries')
const gqlAPI = require('../api/new_gql_queries')
const utils = require('../api/utils')

/**
 * High-level API.
 * Should be the single point of entry for ALL user queries.
 * Branches out to other AWS APIs (e.g GQL and DDB).
 */
module.exports = {
  /* Queries */
  user: async username => {
    return gqlAPI.getUserProfileByUsername(username)
  },
  getOfficesOfUser: async args => {
    return gqlAPI.getOfficeDetailsAndPermissionsByUsername(args.username, args.filter, args.limit, args.nextToken)
  },
  getCallendarEventsOfUser: async args => {
    return gqlAPI.getCallendarEventsForUser(args.username, args.filter, args.limit, args.nextToken)
  },
  getRequestsFromUser: async args => {
    return gqlAPI.getRequestsFromUser(args.username, args.filter, args.limit, args.nextToken)
  },
  getRequestsForUser: async args => {
    return gqlAPI.getRequestsForUser(args.username, args.filter, args.limit, args.nextToken)
  },
  getEmployeeUserProfilesForManagerUsername: async args => {
    return gqlAPI.getEmployeeUserProfilesForManagerUsername(args.username, args.filter, args.limit, args.nextToken)
  },
  getContractorUserProfilesForManagerUsername: async args => {
    return gqlAPI.getContractorUserProfilesForManagerUsername(args.username, args.filter, args.limit, args.nextToken)
  },
  getCustomersForOfficeId: async args => {
    return gqlAPI.getCustomersForOfficeId(args.officeId, args.filter, args.limit, args.nextToken)
  },
  getContractsForOfficeId: async args => {
    return gqlAPI.getContractsForOfficeId(args.officeId, args.username, args.filter, args.limit, args.nextToken)
  },
  getPartnerOfficeConnections: async args => {
    return gqlAPI.getPartnerOfficeConnections(args.officeId, args.username, args.filter, args.limit, args.nextToken)
  },

  /* Mutations */
  updateOfficeDetails: async args => {
    return gqlAPI.updateOfficeDetails(args.username, args.requestInput, args.condition)
  },
  updateUserProfileDetails: async args => {
    return gqlAPI.updateUserProfileDetails(args.username, args.requestInput, args.condition)
  },
  createVehicleForOffice: async args => {
    return gqlAPI.createVehicleForOffice(args.officeId, args.username, args.requestInput, args.condition)
  },
  updateVehicleForOffice: async args => {
    return gqlAPI.updateVehicleForOffice(args.officeId, args.username, args.requestInput, args.condition)
  },
  deleteVehicleForOffice: async args => {
    return gqlAPI.deleteVehicleForOffice(args.officeId, args.username, args.requestInput, args.condition)
  },
  createContractForOffice: async args => {
    return gqlAPI.createContractForOffice(args.officeId, args.username, args.requestInput, args.condition)
  },
  updateContractForOffice: async args => {
    return gqlAPI.updateContractForOffice(args.officeId, args.username, args.requestInput, args.condition)
  },
  deleteContractForOffice: async args => {
    return gqlAPI.deleteContractForOffice(args.officeId, args.username, args.requestInput, args.condition)
  },
  createCustomerForOffice: async args => {
    return gqlAPI.createCustomerForOffice(args.officeId, args.username, args.requestInput, args.condition)
  },
  createRequest: async args => {
    return gqlAPI.createRequest(args.username, args.requestInput, args.condition)
  },
  updateRequestsSentByMe: async args => {
    return gqlAPI.updateRequestsSentByMe(args.username, args.email, args.groups, args.requestInput, args.condition)
  },
  deleteRequestsSentByMe: async args => {
    return gqlAPI.deleteRequestsSentByMe(args.officeId, args.username, args.requestInput, args.condition)
  },
  createCompanyAccessConnectionForOffice: async args => {
    return gqlAPI.createCompanyAccessConnectionForOffice(args.officeId, args.username, args.requestInput, args.condition)
  },
  updateCompanyAccessConnectionForOffice: async args => {
    return gqlAPI.updateCompanyAccessConnectionForOffice(args.officeId, args.username, args.requestInput, args.condition)
  },
  deleteCompanyAccessConnectionForOffice: async args => {
    return gqlAPI.deleteCompanyAccessConnectionForOffice(args.username, args.requestInput, args.condition)
  },
  createMyUserCalendarEvent: async args => {
    return gqlAPI.createMyUserCalendarEvent(args.username, args.requestInput, args.condition)
  },
  updateMyUserCalendarEvents: async args => {
    return gqlAPI.updateMyUserCalendarEvents(args.username, args.requestInput, args.condition)
  },
  deleteMyUserCalendarEvents: async args => {
    return gqlAPI.deleteMyUserCalendarEvents(args.username, args.requestInput, args.condition)
  },
  addEmployeeToOffice: async args => {
    return gqlAPI.addEmployeeToOffice(args.officeId, args.username, args.empUsername, args.modelPermissions, args.pagePermissions)
  },
  updateEmployeeModelPermissionsForOffice: async args => {
    return gqlAPI.updateEmployeeModelPermissionsForOffice(args.officeId, args.username, args.empUsername, args.modelPermissions)
  },
  updateEmployeePagePermissionsForOffice: async args => {
    return gqlAPI.updateEmployeePagePermissionsForOffice(args.officeId, args.username, args.empUsername, args.pagePermissions)
  },
  deleteEmployeeForOffice: async args => {
    return gqlAPI.deleteEmployeeForOffice(args.officeId, args.username, args.empUsername)
  },
  addContractorToOffice: async args => {
    return gqlAPI.addContractorToOffice(args.officeId, args.username, args.contractorUsername, args.modelPermissions, args.pagePermissions)
  },
  updateContractorModelPermissionsForOffice: async args => {
    return gqlAPI.updateContractorModelPermissionsForOffice(args.officeId, args.username, args.contractorUsername, args.modelPermissions)
  },
  updateContractorPagePermissionsForOffice: async args => {
    return gqlAPI.updateContractorPagePermissionsForOffice(args.officeId, args.username, args.contractorUsername, args.pagePermissions)
  },
  deleteContractorForOffice: async args => {
    return gqlAPI.deleteContractorForOffice(args.officeId, args.username, args.contractorUsername)
  },
}
