const AWS = require('aws-sdk')
const https = require('https')
const agent = new https.Agent({
  keepAlive: true,
  maxSockets: Infinity,
})
AWS.config.update({
  region: process.env.REGION,
  httpOptions: {
    agent,
  },
})
const urlParse = require('url').URL

const APPSYNC_URL = process.env.API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
const REGION = process.env.REGION
const ENDPOINT = new urlParse(APPSYNC_URL).hostname.toString()

/**
 * Create a signed graphql operation request.
 *
 * @param {*} endpoint
 * @param {*} item
 * @param {*} operation
 * @param {*} operationName
 * @param {*} region
 * @param {*} url
 */
const createSignedRequest = async (endpoint, item, operation, operationName, region, url) => {
  console.log('Executing GraphQL query: ' + operation)
  const request = new AWS.HttpRequest(url, region)
  request.method = 'POST'
  request.path = '/graphql'
  request.headers.host = endpoint
  request.headers['Content-Type'] = 'application/json'
  request.body = JSON.stringify({
    query: operation,
    operationName: operationName,
    variables: item,
  })
  const signer = new AWS.Signers.V4(request, 'appsync', true)
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate())
  return request
}

/**
 * Send a request to the appsync api and return the response data.
 *
 * @param {*} endpoint
 * @param {*} request
 */
const getResponseFromApi = async (endpoint, request) => {
  return new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...request, host: endpoint }, result => {
      result.on('data', data => {
        let dataJSON = JSON.parse(data.toString())
        console.log(dataJSON)
        resolve(dataJSON)
      })
    })
    httpRequest.write(request.body)
    httpRequest.end()
  })
}

/**
 * Get the first element of an array or null if nothing is present.
 *
 * @param {*} array
 */
const firstOrNull = async array => {
  if (array == null) return null
  return array[0]
}

//Methods visible to other functions.
module.exports = {
  /**
   * Retrieves the trade-user connection.
   *
   *  @param {String} username
   *  @param {String} tradeName
   */
  getTradeConnectionForUserAndTrade: async (username, tradeName) => {
    console.log('getTradeConnectionForUserAndTrade input: ' + [username, tradeName])
    const resp = await getResponseFromApi(
      ENDPOINT,
      createSignedRequest(
        ENDPOINT,
        { username: username, tradeName: tradeName },
        gqlQueries.getTradeConnection,
        'getTradeConnection',
        REGION,
        APPSYNC_URL,
      ),
    )
    const result = {
      items: firstOrNull(resp.listTradeUserConnectionsByTradeAndUser.items),
      errors: resp.errors || [],
    }
    console.log('getTradeConnectionForUserAndTrade output: ' + JSON.stringify(result))
    return result
  },

  /**
   * Retrieves the permissions of specific user in the given office.
   *
   * @param {String} username
   * @param {String} trade
   */
  getUserPermissionsForTrade: async (username, tradeName) => {
    console.log('getUserPermissionsForTrade input: ' + [username, tradeName])
    const res = await this.getTradeConnectionForUserAndTrade(username, tradeName)
    let items = res.items
    if (items == null) {
      return res
    }
    Object.keys(items).map((key, index) => (items[key] = items[key].permissions))
    const finalResponse = {
      items: items,
      errors: res.errors,
    }
    console.log('getUserPermissionsForTrade output: ' + JSON.stringify(finalResponse))
    return finalResponse
  },

  /**
   * Retrieves input user permissions.
   * Assumes that the input User only works in *1* office.
   *
   * @param {String} username
   * @param {String} tradeName
   */
  getUserPermissions: async username => {
    console.log('getTradeConnectionForUserAndTrade input: ' + username)
    const resp = await getResponseFromApi(
      ENDPOINT,
      createSignedRequest(
        ENDPOINT,
        { username: username },
        gqlQueries.getUserPermissionsForStandardUser,
        'getUserPermissionsForStandardUser',
        REGION,
        APPSYNC_URL,
      ),
    )
    const res = firstOrNull(resp.listTradeUserConnectionsByUsername.items)
    let items = null
    if (result.permissions) {
      items = res.permissions
    }
    const result = {
      items: items,
      errors: resp.errors || [],
    }
    console.log('getTradeConnectionForUserAndTrade output: ' + JSON.stringify(result))
    return result
  },

  /**
   * Get all customers based on input arguments.
   */
  getCustomers: async item => {
    console.log('getCustomers input: ' + JSON.stringify(item))
    const customersResponse = await getResponseFromApi(
      ENDPOINT,
      createSignedRequest(ENDPOINT, { input: item }, gqlQueries.listCustomers, 'listCustomers', REGION, APPSYNC_URL),
    )
    const result = {
      items: customersResponse.listCustomers.items || [],
      errors: customersResponse.errors || [],
    }
    console.log('getCustomers output: ' + JSON.stringify(result))
    return result
  },

  /**
   * Get all contracts based on input arguments.
   *
   * @param {Dict} item
   */
  getContracts: async item => {
    console.log('getContracts input: ' + JSON.stringify(item))
    const contractsResponse = await getResponseFromApi(
      ENDPOINT,
      createSignedRequest(ENDPOINT, { input: item }, gqlQueries.listContracts, 'listContracts', REGION, APPSYNC_URL),
    )
    const result = {
      items: contractsResponse.listContracts.items || [],
      errors: contractsResponse.errors || [],
    }
    console.log('getContracts output: ' + JSON.stringify(result))
    return result
  },
  /**
   * Get all employees based on input params..
   *
   * @param {Dict} item
   */
  getEmployeesByType: async item => {
    console.log('getEmployeesByType input: ' + JSON.stringify(item))
    const employeeResponse = await getResponseFromApi(
      ENDPOINT,
      createSignedRequest(
        ENDPOINT,
        { input: item },
        gqlQueries.listEmployeesByEmployeeType,
        'listEmployeesByEmployeeType',
        REGION,
        APPSYNC_URL,
      ),
    )
    const result = {
      items: employeeResponse.listTradeUserConnectionsByTradeName.items || [],
      errors: employeeResponse.errors || [],
    }
    console.log('getEmployeesByType output: ' + JSON.stringify(result))
    return result
  },

  /**
   * Add a new user request to the DB.
   *
   * @param {Dict} request
   */
  createRequest: async request => {
    console.log('createRequest request: ' + JSON.stringify(request))
    const createRequestResponse = await getResponseFromApi(
      ENDPOINT,
      createSignedRequest(ENDPOINT, { input: request }, gqlQueries.createRequest, 'createRequest', REGION, APPSYNC_URL),
    )
    const result = {
      items: createRequestResponse.createRequests.items || null,
      errors: createRequestResponse.errors || [],
    }
    console.log('createRequest output: ' + JSON.stringify(result))
    return result
  },

  /**
   * Get all Requests for the given email.
   *
   * @param {String} email
   */
  getRequestsByEmail: async email => {
    console.log('getRequestByEmail request: ' + email)
    const response = await getResponseFromApi(
      ENDPOINT,
      createSignedRequest(ENDPOINT, { input: email }, gqlQueries.getRequestByEmail, 'getRequestByEmail', REGION, APPSYNC_URL),
    )
    const result = {
      items: response.listRequestsByReceiverEmail.items || [],
      errors: response.errors || [],
    }
    console.log('getRequestByEmail output: ' + JSON.stringify(result))
    return result
  },

  /**
   * Get the request for the given id.
   *
   * @param {String} id
   */
  getRequestById: async id => {
    console.log('getRequestById request: ' + id)
    const response = await getResponseFromApi(
      ENDPOINT,
      createSignedRequest(ENDPOINT, { input: id }, gqlQueries.getRequestById, 'getRequestById', REGION, APPSYNC_URL),
    )
    const result = {
      items: firstOrNull(response.listRequestss.items),
      errors: response.errors || [],
    }
    console.log('getRequestById output: ' + JSON.stringify(result))
    return result
  },

  /**
   * Delete the request with the given id.
   *
   * @param {String} id
   */
  deleteRequest: async id => {
    console.log('deleteRequest request: ' + id)
    const response = await getResponseFromApi(
      ENDPOINT,
      createSignedRequest(ENDPOINT, { input: id }, gqlQueries.deleteRequestById, 'deleteRequestById', REGION, APPSYNC_URL),
    )
    const result = {
      items: response.deleteRequests || null,
      errors: response.errors || [],
    }
    console.log('deleteRequest output: ' + JSON.stringify(result))
    return result
  },

  /**
   * Retrieve a UserProfile based on owner's email.
   *
   * @param {String} email
   */
  getUserProfileByEmail: async email => {
    console.log('getUserProfileByEmail request: ' + email)
    const response = await getResponseFromApi(
      ENDPOINT,
      createSignedRequest(ENDPOINT, { input: email }, gqlQueries.getUserProfileByEmail, 'getUserProfileByEmail', REGION, APPSYNC_URL),
    )
    const result = {
      items: firstOrNull(response.listUserProfileByEmail),
      errors: response.errors || [],
    }
    console.log('getUserProfileByEmail output: ' + JSON.stringify(result))
    return result
  },

  /**
   * Retrieve an Office entry based on the owner's username.
   *
   * @param {String} username
   */
  getOfficeByOwnerUsername: async username => {
    console.log('getOfficeByOwnerUsername request: ' + username)
    const response = await getResponseFromApi(
      ENDPOINT,
      createSignedRequest(
        ENDPOINT,
        { input: username },
        gqlQueries.getOfficeByOwnerUsername,
        'getOfficeByOwnerUsername',
        REGION,
        APPSYNC_URL,
      ),
    )
    const result = {
      items: firstOrNull(response.listTradeByOwnerUsername),
      errors: response.errors || [],
    }
    console.log('getOfficeByOwnerUsername output: ' + JSON.stringify(result))
    return result
  },

  /**
   * Replace the user's permissions field with the given set of permissions.
   *
   * @param {String} username
   * @param {String} tradeName
   * @param {Array[Dict<String>]} permissions
   */
  updateUserPermissions: async (username, tradeName, permissions) => {
    console.log('updateUserPermissions request: ' + [username, tradeName, permissions])

    //Get the connection entry
    const conn = await this.getTradeConnectionForUserAndTrade(username, tradeName)

    //Update the connection's permissions
    const response = await getResponseFromApi(
      ENDPOINT,
      createSignedRequest(
        ENDPOINT,
        { id: conn.id, permissions: permissions },
        gqlQueries.updateUserPermissionsForTUCId,
        'updateUserPermissionsForTUCId',
        REGION,
        APPSYNC_URL,
      ),
    )
    const result = {
      items: response.updateTradeUserConnection || null,
      errors: response.errors || [],
    }
    console.log('updateUserPermissions output: ' + JSON.stringify(result))
    return result
  },
}

/**
 * GQL raw queries
 */
const gqlQueries = {
  updateUserPermissionsForTUCId: `mutation MyMutation($id: String, $permissions: [UserPermissionsInput]) {
    updateTradeUserConnection(input: {id: $id, permissions: $permissions}) {
      id
    }
  }`,
  getUserPermissionsForStandardUser: `query userPermissions($username: String) {
    listTradeUserConnectionsByUsername(filter: {employeeType: {eq: STANDARD}},  username: $username) {
      items {
        permissions {
          department
          read
          write
        }
      }
    }
  }`,
  getTradeConnection: `query getTradeConnection($username: String!, $tradeName: String!){
    listTradeUserConnectionsByTradeAndUser(tradeName:$tradeName, username: $username) {
      items {
        id
        tradeName
        tradeId
				username
        userId
        permissions {
          department
          write
          read
        }
      }
    }
  }`,
  createRequest: `mutation createRequest($input: CreateRequestsInput!) {
    createRequests(input: $input) {
      id
    }
  }`,
  getRequestByEmail: `mutation getRequestByEmail($receiverEmail: String){
    listRequestsByReceiverEmail(receiverEmail: $receiverEmail, limit: 1) {
      items {
        id
        payload
        metadata
        receiverEmail
        senderUsername
        senderEmail
        type
        updatedAt
        expiresAt
        createdAt
      }
    }
  }`,
  getRequestById: `query getRequestById($id: String){
    listRequestss(filter: {id: {eq: $id}}) {
      items {
        id
        payload
        metadata
        receiverEmail
        senderUsername
        senderEmail
        type
        updatedAt
        expiresAt
        createdAt
      }
    }
  }`,
  deleteRequestById: `mutation deleteRequestById($id: String) {
    deleteRequests(input: {id: $id}) {
      id
    }
  }`,
  listCustomers: `query listCustomers($filter: ModelCustomerFilterInput,$limit: Int,$nextToken: String){
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        address
        birthDate
        creationDate
        createdAt
        doy
        driversLicense {
          Category {
            category
            expiresAt
            issueDate
          }
          DriversLicenseType
          LicenseID
        }
        email
        familyStatus
        fathersName
        firstName
        files {
          bucket
          key
          region
        }
        gender
        id
        lastName
        mobile
        postcode
        tin
        tradeName
        updatedAt
      }
      nextToken
    }
  }`,
  listContracts: `query listContracts($filter: ModelContractFilterInput,$limit: Int,$nextToken: String){
    listContracts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        co_name
        co_TRN
        contractId
        contractState
        contractorId
        creationDate
        createdAt
        customerId
        discount
        data
        driversLicense {
          Category {
            category
            expiresAt
            issueDate
          }
          LicenseID
          DriversLicenseType
        }
        duration
        endDate
        id
        insuranceClass
        insuranceCoverage
        insuranceUsage
        jointWorth
        netWorth
        startDate
        second_tradeId
        tradeName
        vehicle {
          file {
            bucket
            key
            region
          }
          color
          createdAt
          displacement
          eurotax
          fuelType
          firstRegistrationDate
          id
          manufacturer
          model
          vin
          vehicle_owner
          usage
          value
          trim
          updatedAt
          tradeName
          taxableHorsepower
          purchaseDate
          passengers
          numberPlate
        }
        voucherId
        version
        vehicleNumberPlate
        vehicleId
      }
      nextToken
    }
  }`,
  listEmployeesByEmployeeType: `query listEmployees($filter: ModelUserProfileFilterInput,$limit: Int, $nextToken: String, $tradeName: String!){
    listTradeUserConnectionsByTradeName($filter: ModelUserProfileFilterInput,$limit: Int, $nextToken: String, $tradeName: String!) {
      items {
        id
        employeeType
        tradeName
        createdAt
        permissions {
          department
          read
          write
        }
        preferences
        updatedAt
        user {
          doy
          familyStatus
          createdAt
          tin
          telephone
          professionStartDate
          partnersNumberLimit
          insuranceLicenseExpirationDate
          username
        }
      }
      nextToken
    }   filter: {tradeName: {eq: $tradeName}
  }`,
  getUserProfileByEmail: `query getRequestById($email: String) {
    listUserProfileByEmail(email: $email) {
      items {
        chamberRecordNumber
        createdAt
        doy
        email
        familyStatus
        file {
          bucket
          key
          name
          region
        }
        id
        insuranceLicenseExpirationDate
        partnersNumberLimit
        professionStartDate
        telephone
        tin
        updatedAt
        username
      }
    }
  }`,
  getOfficeByOwnerUsername: `query getOfficeByOwnerUsername($ownerUsername: String) {
    listTradeByOwnerUsername(ownerUsername: $ownerUsername) {
      items {
        contractors
        createdAt
        id
        info
        logo
        members
        ownerId
        ownerUsername
        postcode
        remainingMembersAllowed
        tin
        tradeName
        updatedAt
      }
    }
  }
  `,
}
