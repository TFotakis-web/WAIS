const ddbAPI = require('../api/ddb_queries')
const gqlAPI = require('../api/new_gql_queries')
const utils = require('../api/utils')

/**
 * High-level API.
 * Should be the single point of entry for ALL user queries.
 * Branches out to other AWS APIs (e.g GQL and DDB).
 */
module.exports = {
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
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  updateOfficeDetails: async args => {
    return gqlAPI.updateOfficeDetails(args.username, args.requestInput, args.condition)
  },
  updateUserProfileDetails: async args => {
    return gqlAPI.updateUserProfileDetails(args.username, args.requestInput, args.condition)
  },
  createVehicleForOffice: async args => {
    return gqlAPI.createVehicleForOffice(args.officeId, args.username, args.requestInput, args.condition)
  },
}
