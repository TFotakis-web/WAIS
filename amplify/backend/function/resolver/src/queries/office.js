const ddbAPI = require('../api/ddb_queries')
const gqlAPI = require('../api/gql_queries')
const utils = require('../api/utils')

module.exports = {
  /**
   * Retrieves all customers the input user can access.
   * @param {Dict} input
   */
  listCustomersForUserInOffice: async input => { //List customers request input item
    //Office
    const office = input.office
    if (!office) {
      throw new Error('Office not found.')
    }

    // Get the 'default' GQL params 
    const item = createOfficeDefaultItem(office.tradeName, input.limit, input.nextToken, input.filter)

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
    const item = createOfficeDefaultItem(office.tradeName, input.limit, input.nextToken, input.filter)

    //Retrieve the customers
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
    const connections = await gqlAPI.getEmployeeTradeConnectionsForTradeName(office.tradeName)
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
    const connections = await gqlAPI.getContractorTradeConnectionsForTradeName(office.tradeName)
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
      throw new Error('Employee`s owner and caller usernames don`t match.')
    }

    //Actions
    switch (input.action) {
      case 'UPDATE_PERMISSIONS':
        {
          return await gqlAPI.updateUserPermissions(empUsername, input.tradeName, payload)
        }
      case 'REMOVE':
        {
          //Get the index of the username in the office members field
          const membersIdx = userTradeConn.members.indexOf(empUsername)
          if (membersIdx < 0) {
            throw new Error('User not found in Office.')
          }
          return await ddbAPI.removeEmployeeFromOffice(userTradeConn.id, input.tradeName, membersIdx)
        }
      default:
        {
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
      case 'CREATE':
        {
          let newCustomer = payload
          delete newCustomer.id
          console.log(`Attempting to add new customer: ${JSON.stringify(newCustomer)}`)
          newCustomer.tradeName = input.tradeName
          return await gqlAPI.createCustomer(newCustomer)
        }
      case 'UPDATE':
        {
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
      case 'DELETE':
        {
          const customerData = payload
          console.log(`Attempting to delete customer with the following data: ${JSON.stringify(customerData)}`)
          return await gqlAPI.deleteCustomer(customerData)
        }
      default:
        {
          throw new Error('Invalid action provided: ' + JSON.stringify(input.action))
        }
    }
  },
}

//Initialize a REST API call item with the necessary GQL API params (e.g filter,nextToken,...)
const createOfficeDefaultItem = (tradeName, limit, nextToken, filter) => {
  let item = {}
  if (filter) {
    item.filter = filter
  }
  if (limit) {
    item.limit = limit
  }
  else {
    item.limit = 50
  }
  if (nextToken) {
    item.nextToken = nextToken
  }
  else {
    item.nextToken = null
  }
  item.tradeName = tradeName
  return item
}
