const ddbAPI = require('../api/ddb_queries')
const gqlAPI = require('../api/gql_queries')
const utils = require('../api/utils')

module.exports = {
  /**
   * Retrieves all customers the input user can access.
   * @param {Dict} input
   */
  listCustomersForUserInOffice: async input => {
    //User Permissions check
    const permissions = await gqlAPI.getEmployeePermissions(input.username)
    if (!permissions) {
      throw new Error(`No permissions found for user ${input.username}.`)
    }

    //List customers request input item
    const item = createOfficeDefaultItem(input.office.tradeName, input.limit, input.nextToken, input.filter)

    //Retrieve the customers
    const allCustomers = await gqlAPI.getCustomers(item)
    if (!allCustomers) {
      return []
    }

    // Filter out customer fields based on permissions
    let customers = allCustomers.slice()
    if (permissions) {
      //TODO
      //customers.remove(...)
    }

    return customers
  },

  /**
   * Retrieves all contracts the input user can access.
   */
  listContractsForUserInOffice: async input => {
    //User Permissions check
    const permissions = await gqlAPI.getEmployeePermissions(input.username)
    if (!permissions.items.length) {
      return {
        items: [],
        errors: permissions.errors,
      }
    }

    //List customers request input item
    const item = createOfficeDefaultItem(input.office.tradeName, input.limit, input.nextToken, input.filter)

    //Retrieve the customers
    const allContracts = await gqlAPI.getContracts(item)
    if (!allContracts.items.length) {
      return {
        items: [],
        errors: allContracts.errors,
      }
    }

    // Filter out customer fields based on permissions
    let contracts = allContracts.items.slice()
    if (permissions) {
      //TODO
      //contracts.remove(...)
    }

    return contracts
  },

  /**
   * Retrieves all customers the input user can access.
   */
  listEmployeesForUserInOffice: async args => {
    //Unpack args and validate
    const input = Object.keys(args).map(e => ({ Key: e, Value: args[e] }))

    //User Permissions check
    const permissions = await gqlAPI.getEmployeePermissions(input.username)
    if (!permissions.items.length) {
      return {
        items: [],
        errors: permissions.errors,
      }
    }

    //List customers request input item
    let item = createUserProfileDefaultItem(input.limit, input.nextToken, input.filter, 'STANDARD')
    item.tradeName = input.office.tradeName

    //Retrieve the customers
    const allEmployees = await gqlAPI.getEmployeesByType(item)
    if (!allEmployees.items.length) {
      return {
        items: [],
        errors: allEmployees.errors,
      }
    }

    // Filter out customer fields based on permissions
    let employees = allEmployees.items.slice()
    if (permissions) {
      //TODO
      //employees.remove(...)
    }

    return employees
  },

  /**
   * Retrieves all customers the input user can access.
   */
  listContractorsForUserInOffice: async args => {
    //Unpack args and validate
    const input = Object.keys(args).map(e => ({ Key: e, Value: args[e] }))

    //User Permissions check
    const permissions = await gqlAPI.getEmployeePermissions(input.username)
    if (!permissions.items.length) {
      return {
        items: [],
        errors: permissions.errors,
      }
    }

    //List customers request input item
    let item = createUserProfileDefaultItem(input.limit, input.nextToken, input.filter, 'CONTRACTOR')
    item.tradeName = input.office.tradeName

    //Retrieve the customers
    const allContracts = await gqlAPI.getEmployeesByType(item)
    if (!allContracts.items.length) {
      return {
        items: [],
        errors: allContracts.errors,
      }
    }

    // Filter out customer fields based on permissions
    let contractors = allContracts.items.slice()
    if (permissions) {
      //TODO
      //contractors.remove(...)
    }

    return contractors
  },

  /**
   *
   * @param {String} callerUsername
   * @param {Object} office
   * @param {String} action
   * @param {Dict} payload
   */
  manageEmployees: async (callerUsername, tradeName, action, payload) => {
    //User Permissions check
    const callerPermissions = await gqlAPI.getUserPermissionsForTrade(callerUsername, tradeName)
    if (!callerPermissions.length) {
      throw new Error('Insufficient permissions.')
    }

    //Check for user-member permissions
    // if (callerPermissions.items[0] != '...') {
    //   throw new Error('Insufficient permissions.')
    // }

    //Update and merge user permissions
    function merge(a, b) {
      var hash = {}
      var i
      for (i = 0; i < a.length; i++) {
        hash[a[i]] = true
      }
      for (i = 0; i < b.length; i++) {
        hash[b[i]] = true
      }
      return Object.keys(hash)
    }
    const newUserPermissions = merge(payload.permissions, callerPermissions)

    //Actions
    switch (action) {
      case 'UPDATE_PERMISSIONS': {
        return await gqlAPI.updateUserPermissions(callerUsername, tradeName, newUserPermissions)
      }
      case 'REMOVE': {
        //Get the index of the username in the office members field
        // const membersIdx = office.members.indexOf(payload.username)
        // if (membersIdx < 0) {
        //   throw new Error('User not found in Office.')
        // }
        // return await ddbAPI.removeEmployeeFromOffice(callerPermissions.id, tradeName, membersIdx)
        break
      }
      default: {
        throw new Error('Invalid action provided: ' + JSON.stringify(action))
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
}

//Initialize a REST API call item with the necessary GQL API params (e.g filter,nextToken,...)
const createOfficeDefaultItem = (tradeName, limit, nextToken, filter) => {
  let item = {}
  if (filter) {
    item.filter = {
      and: [
        {
          tradeName: { eq: tradeName },
        },
        filter,
      ],
    }
  } else {
    item.filter = {
      tradeName: { eq: tradeName },
    }
  }
  if (limit) {
    item.limit = limit
  } else {
    item.limit = 50
  }
  if (nextToken) {
    item.nextToken = nextToken
  } else {
    item.nextToken = null
  }
  return item
}

const createUserProfileDefaultItem = (limit, nextToken, filter, type) => {
  let item = {}
  if (filter) {
    item.filter = {
      and: [
        {
          employeeType: { eq: type },
        },
        filter,
      ],
    }
  } else {
    item.filter = {
      employeeType: { eq: type },
    }
  }
  if (limit) {
    item.limit = limit
  } else {
    item.limit = 50
  }
  if (nextToken) {
    item.nextToken = nextToken
  } else {
    item.nextToken = null
  }
  return item
}
