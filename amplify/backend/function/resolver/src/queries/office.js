const ddbAPI = require('../api/ddb_queries')
const gqlAPI = require('../api/gql_queries')

module.exports = {
  /**
   * Retrieves all customers the input user can access.
   */
  listCustomersForUserInOffice: async args => {
    //Unpack args and validate
    const input = Object.keys(args).map(e => ({ Key: e, Value: args[e] }))

    //User Permissions check
    const permissions = await gqlAPI.getUserPermissions(input.username)
    if (!permissions.items.length) {
      return {
        items: [],
        errors: permissions.errors,
      }
    }

    //List customers request input item
    const item = createOfficeDefaultItem(input.office, input.limit, input.nextToken, input.filter)

    //Retrieve the customers
    const allCustomers = await gqlAPI.getCustomers(item)
    if (!allCustomers.items.length) {
      return {
        items: [],
        errors: allCustomers.errors,
      }
    }

    // Filter out customer fields based on permissions
    let customers = allCustomers.items.slice()
    if (permissions) {
      //TODO
      //customers.remove(...)
    }

    return customers
  },

  /**
   * Retrieves all contracts the input user can access.
   */
  listContractsForUserInOffice: async args => {
    //Unpack args and validate
    const input = Object.keys(args).map(e => ({ Key: e, Value: args[e] }))

    //User Permissions check
    const permissions = await gqlAPI.getUserPermissions(input.username)
    if (!permissions.items.length) {
      return {
        items: [],
        errors: permissions.errors,
      }
    }

    //List customers request input item
    const item = createOfficeDefaultItem(input.office, input.limit, input.nextToken, input.filter)

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
    const permissions = await gqlAPI.getUserPermissions(input.username)
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
    const permissions = await gqlAPI.getUserPermissions(input.username)
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
  manageEmployees: async (callerUsername, office, action, payload) => {
    //User Permissions check
    const callerPermissions = await gqlAPI.getUserPermissions(callerUsername, office)
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
        return await gqlAPI.updateUserPermissions(callerUsername, office.tradeName, newUserPermissions)
      }
      case 'REMOVE': {
        //Get the index of the username in the office members field
        const membersIdx = office.members.indexOf(payload.username)
        if (membersIdx < 0) {
          throw new Error('User not found in Office.')
        }
        return await ddbAPI.removeEmployeeFromOffice(callerPermissions.id, office.tradeName, membersIdx)
      }
      default: {
        throw new Error('Invalid action provided: ' + JSON.stringify(action))
      }
    }
  },
}

//Initialize a REST API call item with the necessary GQL API params (e.g filter,nextToken,...)
const createOfficeDefaultItem = (office, limit, nextToken, filter) => {
  let item = {}
  if (filter) {
    item.filter = {
      and: [
        {
          tradeName: { eq: office.tradeName },
        },
        filter,
      ],
    }
  } else {
    item.filter = {
      tradeName: { eq: office.tradeName },
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
