const ddbAPI = require('../api/ddb_queries')
const gqlAPI = require('../api/gql_queries')
const utils = require('../api/utils')

module.exports = {
  /**
   * Retrieves all customers the input user can access.
   * @param {Dict} input
   */
  listCustomersForUserInOffice: async input => {
    //List customers request input item
    //Office
    const office = input.office
    if (!office) {
      throw new Error('Office not found.')
    }
    const filter = JSON.parse(input.filter || '{"id":{"ne":" "}}')
    let item = createOfficeDefaultItem(input.limit, input.nextToken, filter)
    item.tradeName = office.tradeName

    //Retrieve the customers
    const allCustomers = await gqlAPI.listCustomers(item)
    if (!allCustomers) {
      return []
    }

    return allCustomers
  },

  /**
   * Retrieves all contracts the input user can access.
   */
  listContractsForUserInOffice: async input => {
    //Office
    const office = input.office
    if (!office) {
      throw new Error('Office not found.')
    }

    //List customers request input item
    const filter = JSON.parse(input.filter || '{"id":{"ne":" "}}')
    let item = createOfficeDefaultItem(input.limit, input.nextToken, filter)
    item.tradeName = office.tradeName

    const allContracts = await gqlAPI.listContracts(item)
    if (!allContracts) {
      return []
    }

    return allContracts
  },

  /**
   * Retrieves all customers the input user can access.
   */
  listEmployeesForUserInOffice: async input => {
    //Office
    const office = input.office
    if (!office) {
      throw new Error('Office not found.')
    }
    const filter = {
      and: [
        {
          employeeType: { eq: 'STANDARD' },
        },
        JSON.parse(input.filter || '{"id":{"ne":" "}}'),
      ],
    }
    let item = createOfficeDefaultItem(input.limit, input.nextToken, filter)
    item.tradeName = office.tradeName

    const connections = await gqlAPI.getTradeUserConnectionsForTradeName(item)
    if (!connections) {
      return []
    }
    return connections
  },

  /**
   * Retrieves all customers the input user can access.
   */
  listContractorsForUserInOffice: async input => {
    //Office
    const office = input.office
    if (!office) {
      throw new Error('Office not found.')
    }
    const filter = {
      and: [
        {
          employeeType: { eq: 'CONTRACTOR' },
        },
        JSON.parse(input.filter || '{"id":{"ne":" "}}'),
      ],
    }
    let item = createOfficeDefaultItem(input.limit, input.nextToken, filter)
    item.tradeName = office.tradeName

    const connections = await gqlAPI.getTradeUserConnectionsForTradeName(item)
    if (!connections) {
      return []
    }
    return connections
  },

  manageEmployees: async input => {
    //Parse the payload
    if (!input.payload) {
      throw new Error('Empty payload.')
    }
    const payload = JSON.parse(input.payload)
    console.log('Input payload: ' + JSON.stringify(payload))

    //Validation check
    if (!('username' in payload)) {
      throw new Error('username not in payload')
    }
    const empUsername = payload.username

    //Check if user is in some groups
    const userGroups = input.groups || []
    if (utils.itemContainsInvalidKeys(payload)) {
      throw new Error(`The following keys are not permitted in this entry: [createdAt, updatedAt, __typename]`)
    }

    //User Permissions check
    const userTradeConn = await gqlAPI.getUserPermissionsAndTrade(empUsername, input.tradeName)
    if (!userTradeConn) {
      throw new Error('Employee and tradeName have no connection')
    }
    if (!userTradeConn.trade.ownerUsername !== input.username) {
      throw new Error('Employee`s boss and caller usernames don`t match.')
    }

    //Actions
    switch (input.action) {
      case 'UPDATE_PERMISSIONS': {
        return await gqlAPI.updateUserPermissionsByTUCId(userTradeConn.id, payload)
      }
      case 'REMOVE': {
        if (!userTradeConn.members) {
          throw new Error('Contractor-Office connection has no members.')
        }
        //Get the index of the username in the office members field
        const membersIdx = userTradeConn.members.indexOf(empUsername)
        if (membersIdx < 0) {
          throw new Error('Employee not found in Office.')
        }
        return await ddbAPI.removeEmployeeFromOffice(userTradeConn.id, input.tradeName, membersIdx)
      }
      default: {
        throw new Error('Invalid action provided: ' + JSON.stringify(input.action))
      }
    }
  },
  manageContractors: async input => {
    //Parse the payload
    if (!input.payload) {
      throw new Error('Empty payload.')
    }
    const payload = JSON.parse(input.payload)
    console.log('Input payload: ' + JSON.stringify(payload))

    //Validation check
    if (!('username' in payload)) {
      throw new Error('username not in payload')
    }
    const empUsername = payload.username

    //Check if user is in some groups
    const userGroups = input.groups || []
    if (utils.itemContainsInvalidKeys(payload)) {
      throw new Error(`The following keys are not permitted in this entry: [createdAt, updatedAt, __typename]`)
    }

    //User Permissions check
    const userTradeConn = await gqlAPI.getUserPermissionsAndTrade(empUsername, input.tradeName)
    if (!userTradeConn) {
      throw new Error('Contractor and tradeName have no connection')
    }
    if (!userTradeConn.trade.ownerUsername !== input.username) {
      throw new Error('Contractor`s boss and caller usernames don`t match.')
    }

    //Actions
    switch (input.action) {
      case 'UPDATE_PERMISSIONS': {
        return await gqlAPI.updateUserPermissionsByTUCId(userTradeConn.id, payload)
      }
      case 'REMOVE': {
        if (!userTradeConn.members) {
          throw new Error('Contractor-Office connection has no members.')
        }
        //Get the index of the username in the office members field
        const membersIdx = userTradeConn.members.indexOf(empUsername)
        if (membersIdx < 0) {
          throw new Error('Contractor not found in Office.')
        }
        return await ddbAPI.removeEmployeeFromOffice(userTradeConn.id, input.tradeName, membersIdx)
      }
      default: {
        throw new Error('Invalid action provided: ' + JSON.stringify(input.action))
      }
    }
  },

  manageCustomers: async input => {
    //Parse the payload
    if (!input.payload) {
      throw new Error('Empty payload.')
    }
    const payload = JSON.parse(input.payload)
    const userGroups = input.groups || []
    if (utils.itemContainsInvalidKeys(payload)) {
      throw new Error(`The following keys are not permitted in this entry: [createdAt,updatedAt,__typename]`)
    }
    console.log('Input payload: ' + JSON.stringify(payload))

    //User Permissions check
    const userTradeConn = await gqlAPI.getUserPermissionsAndTrade(input.username, input.tradeName)
    if (!userTradeConn) {
      throw new Error('User and Trade have no connection')
    }

    //Actions
    switch (input.action) {
      case 'CREATE': {
        let newCustomer = payload
        delete newCustomer.id
        console.log(`Attempting to add new customer: ${JSON.stringify(newCustomer)}`)
        newCustomer.tradeName = input.tradeName
        return await gqlAPI.createCustomer(newCustomer)
      }
      case 'UPDATE': {
        let customerData = payload
        if (!('admin' in userGroups || [])) {
          if (!userTradeConn.trade.tradeName) {
            throw new Error('Failed to retrieve tradeName')
          }
          customerData.tradeName = userTradeConn.trade.tradeName
        }
        console.log(`Attempting to update customer with the following data: ${JSON.stringify(customerData)}`)
        customerData.tradeName = input.tradeName
        return await gqlAPI.updateCustomer(customerData)
      }
      case 'DELETE': {
        const customerData = payload
        console.log(`Attempting to delete customer with the following data: ${JSON.stringify(customerData)}`)
        return await gqlAPI.deleteCustomer(customerData)
      }
      default: {
        throw new Error('Invalid action provided: ' + JSON.stringify(input.action))
      }
    }
  },

  manageContracts: async input => {
    //Parse the payload
    if (!input.payload) {
      throw new Error('Empty payload.')
    }
    const payload = JSON.parse(input.payload)
    const userGroups = input.groups || []
    if (utils.itemContainsInvalidKeys(payload)) {
      throw new Error(`The following keys are not permitted in this entry: [createdAt,updatedAt,__typename]`)
    }
    console.log('Input payload: ' + JSON.stringify(payload))

    //User Permissions check
    const userTradeConn = await gqlAPI.getUserPermissionsAndTrade(input.username, input.tradeName)
    if (!userTradeConn) {
      throw new Error('User and Trade have no connection')
    }

    //Actions
    switch (input.action) {
      case 'CREATE': {
        let newContract = payload
        delete newContract.id
        console.log(`Attempting to add new contract: ${JSON.stringify(newContract)}`)
        newContract.tradeName = input.tradeName
        return await gqlAPI.createContract(newContract)
      }
      case 'UPDATE': {
        let contractData = payload
        if (!('admin' in userGroups || [])) {
          if (!userTradeConn.trade.tradeName) {
            throw new Error('Failed to retrieve tradeName')
          }
          contractData.tradeName = userTradeConn.trade.tradeName
        }
        console.log(`Attempting to update contract with the following data: ${JSON.stringify(contractData)}`)
        contractData.tradeName = input.tradeName
        return await gqlAPI.updateContract(contractData)
      }
      case 'DELETE': {
        const contractData = payload
        console.log(`Attempting to delete contract with the following data: ${JSON.stringify(contractData)}`)
        return await gqlAPI.deleteContract(contractData)
      }
      default: {
        throw new Error('Invalid action provided: ' + JSON.stringify(input.action))
      }
    }
  },
}

//Initialize a REST API call item with the necessary GQL API params (e.g filter,nextToken,...)
const createOfficeDefaultItem = (limit, nextToken, filter) => {
  let item = {}
  if (filter) {
    item.filter = filter
  }
  if (limit) {
    item.limit = limit
  } else {
    item.limit = 100
  }
  if (nextToken) {
    item.nextToken = nextToken
  } else {
    item.nextToken = null
  }
  return item
}
