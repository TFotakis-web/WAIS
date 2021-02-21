const AWS = require('aws-sdk')
const https = require('https')
// const agent = new https.Agent({
//   keepAlive: true,
//   maxSockets: Infinity,
// })
AWS.config.update({
  region: process.env.REGION,
  // httpOptions: {
  //   agent,
  // },
})
const urlParse = require('url').URL
const APPSYNC_URL = process.env.API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
const REGION = process.env.REGION
const ENDPOINT = new urlParse(APPSYNC_URL).hostname.toString()

/**
 * Wrapper for GQL API calls.
 *
 * @param {*} input
 * @param {*} gql
 * @param {String} operation
 */
const gqlHelper = async (item, gql, operation) => {
  const req = new AWS.HttpRequest(APPSYNC_URL, REGION)
  req.method = 'POST'
  req.path = '/graphql'
  req.headers.host = ENDPOINT
  req.headers['Content-Type'] = 'application/json'
  req.body = JSON.stringify({
    query: gql,
    operationName: operation,
    variables: item,
  })

  const signer = new AWS.Signers.V4(req, 'appsync', true)
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate())

  const data = await new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req, host: ENDPOINT }, result => {
      result.on('data', data => {
        const result = JSON.parse(data.toString())
        console.log('GQL result: ' + JSON.stringify(result))
        resolve(result)
      })
    })

    httpRequest.write(req.body)
    httpRequest.end()
  })

  return data
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
    const query = `query getTradeConnection($username: String!, $tradeName: String!){
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
    }`
    const resp = await gqlHelper({ username: username, tradeName: tradeName }, query, 'getTradeConnectionForUsernameAndTrade')
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
    const query = `query userPermissions($username: String) {
      listTradeUserConnectionsByUsername(filter: {employeeType: {eq: STANDARD}},  username: $username) {
        items {
          permissions {
            department
            read
            write
          }
        }
      }
    }`
    const resp = await gqlHelper({ username: username }, query, 'getUserPermissionsForStandardUser')
    const res = firstOrNull(resp.listTradeUserConnectionsByUsername.items)
    let items = null
    if (res.permissions) {
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
    const query = `query listCustomers($filter: ModelCustomerFilterInput,$limit: Int,$nextToken: String){
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
    }`
    const customersResponse = await gqlHelper(item, query, 'listCustomers')
    const result = {
      items: customersResponse.listCustomers.items || null,
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
    const query = `query listContracts($filter: ModelContractFilterInput, $limit: Int, $nextToken: String){
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
    }`
    const contractsResponse = await gqlHelper(item, query, 'listContracts')
    const result = {
      items: contractsResponse.listContracts.items || null,
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
    const query = `query listEmployees($filter: ModelUserProfileFilterInput,$limit: Int, $nextToken: String, $tradeName: String!){
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
            id
            username
            email
            telephone
            surname
            name
            fathers_name
            address
            zip_code
            mobile
            tin
            family_name
            gender
            birthdate
            city
            profilePicture{
              bucket
              region
              key
              name
            }
            preferences
            locale
          }
        }
        nextToken
      }
    }`
    const employeeResponse = await gqlHelper(item, query, 'listEmployeesByEmployeeType')
    const result = {
      items: employeeResponse.listTradeUserConnectionsByTradeName.items || null,
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
  createRequest: async params => {
    console.log('createRequest request: ' + JSON.stringify(params))
    const query = `mutation createRequests($input: CreateRequestsInput!) {
      createRequests(input: $input) {
        id
      }
    }`
    const createRequestResponse = await gqlHelper({ input: params }, query, 'createRequests')
    const result = createRequestResponse.data.createRequests || null
    console.log('createRequest output: ' + JSON.stringify(result))
    return result
  },

  /**
   * Delete the request with the given id.
   *
   * @param {String} id
   */
  deleteRequest: async id => {
    console.log('deleteRequest request: ' + id)
    const query = `mutation deleteRequestById($id: ID!) {
      deleteRequests(input: {id: $id}) {
        id
      }
    }`
    const response = await gqlHelper({ id: id }, query, 'deleteRequestById')
    const result = response.data.deleteRequests || null
    console.log('deleteRequest output: ' + JSON.stringify(result))
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
    const connResponse = await this.getTradeConnectionForUserAndTrade(username, tradeName)
    if (connResponse.errors) {
      return {
        data: null,
        errors: connResponse.errors,
      }
    }
    const query = `mutation updateUserPermissionsMutation($id: String, $permissions: [UserPermissionsInput]) {
      updateTradeUserConnection(input: {id: $id, permissions: $permissions}) {
        id
      }
    }`

    //Update the connection's permissions
    const response = await gqlHelper({ id: connResponse.id, permissions: permissions }, query, 'updateUserPermissionsForTUCId')
    const result = {
      data: response.data.updateTradeUserConnection,
      errors: response.errors || [],
    }
    console.log('updateUserPermissions output: ' + JSON.stringify(result))
    return result
  },

  /**
   * Create a new Office item iff the trade name does not already exist.
   *
   * @param {Dict<String>} params
   */
  createOfficeIfNotExists: async params => {
    console.log('createOfficeIfNotExists request: ' + JSON.stringify(params))
    const query = `mutation createOffice($input: CreateOfficeInput!) {
      createOffice(input: $input) {
        id
      }
    }`
    console.log('Office params: ' + JSON.stringify(params))
    const response = await gqlHelper({ input: params }, query, 'createOffice')
    const result = response.data.createOffice || null
    console.log('createOfficeIfNotExists output: ' + JSON.stringify(result))
    return result
  },

  /**
   * Retrieve a UserProfie via the GSI 'byUsername'.
   *
   * @param {String} username
   */
  getUserProfileByUsername: async username => {
    console.log('getUserProfileByUsername input: ' + username)
    const query = `query listUserProfileByUsername($username: String!) {
      listUserProfileByUsername(username: $username) {
        items {
          id
          username
          email
          telephone
          surname
          name
          fathers_name
          address
          zip_code
          mobile
          tin
          family_name
          gender
          birthdate
          city
          profilePicture{
            bucket
            region
            key
            name
          }
          preferences
          locale
          createdAt
          updatedAt
          files {
            bucket
            key
            name
            region
          }
        }
      }
    }`
    const response = await gqlHelper({ username: username }, query, 'listUserProfileByUsername')
    const result = response.data.listUserProfileByUsername.items[0] || null
    console.log('getUserProfileByUsername output: ' + JSON.stringify(result))
    return result
  },

  /**
   * Retrieve a UserProfie via the GSI 'byEmail'.
   *
   * @param {String} email
   */
  getUserProfileByEmail: async email => {
    console.log('getUserProfileByEmail input: ' + email)
    const query = `query listUserProfileByEmail($email: String!) {
      listUserProfileByEmail(email: $email) {
        items {
          id
          username
          email
          telephone
          surname
          name
          fathers_name
          address
          zip_code
          mobile
          tin
          family_name
          gender
          birthdate
          city
          profilePicture{
            bucket
            region
            key
            name
          }
          preferences
          locale
          createdAt
          updatedAt
          files {
            bucket
            key
            name
            region
          }
        }
      }
    }`
    const response = await gqlHelper({ email: email }, query, 'listUserProfileByEmail')
    const result = response.data.listUserProfileByUsername.items[0] || null
    console.log('getUserProfileByEmail output: ' + JSON.stringify(result))
    return result
  },

  /**
   * Creates a new TradeUserConnection between a user and an office.
   *
   */
  createTradeUserConnection: async params => {
    console.log('createTradeUserConnection input: ' + JSON.stringify(params))
    const query = `mutation createTradeUserConnection($input: CreateTradeUserConnectionInput!) {
      createTradeUserConnection(input: $input) {
        id
      }
    }`
    const response = await gqlHelper({ input: params }, query, 'createTradeUserConnection')
    const result = response.data.createTradeUserConnection || null
    console.log('createTradeUserConnection output: ' + JSON.stringify(result))
    return result
  },

  /**
   * Retrieves the Request entry with a specific ID.
   *
   * @param {String} id
   */
  getRequestById: async id => {
    console.log('getRequestById input: ' + JSON.stringify(id))
    const query = `query listRequestss($filter: ModelRequestsFilterInput!) {
      listRequestss(filter: $filter) {
        items {
          id
          senderUsername
          metadata
          createdAt
          payload
          receiverEmail
          senderEmail
          type
          updatedAt
        }
      }
    }`
    const response = await gqlHelper({ filter: { id: { eq: id } } }, query, 'listRequestss')
    const result = response.data.listRequestss.items[0] || null
    console.log('getRequestById output: ' + JSON.stringify(result))
    return result
  },

  /**
   * Retrieves an Office entry with a specific username.
   *
   * @param {String} username
   */
  getOfficeByOwnerUsername: async username => {
    console.log('getOfficeByOwnerUsername input: ' + username)
    const query = `query listTradeByOwnerUsername($ownerUsername: String!) {
      listTradeByOwnerUsername(ownerUsername: $ownerUsername) {
        items {
          id
          address
          createdAt
          employeesNumberLimit
          members
          mobile
          office_email
          ownerUsername
          partnersNumberLimit
          phone
          tradeName
          privateData {
            bankAccountInfo
            chamberRecordNumber
            civilLiabilityExpirationDate
            insuranceLicenseExpirationDate
            professionStartDate
            tin
            files {
              bucket
              key
              name
              region
            }
          }
          zip_code
          verified
          updatedAt
        }
      }
    }`
    const response = await gqlHelper({ ownerUsername: username }, query, 'listTradeByOwnerUsername')
    const result = response.data.listTradeByOwnerUsername.items[0] || null
    console.log('getOfficeByOwnerUsername output: ' + JSON.stringify(result))
    return result
  },

  getUserIdFromUsername: async username => {
    console.log('getUserIdFromUsername input: ' + username)
    const query = `query listUserProfileByUsername($username: String!) {
      listUserProfileByUsername(username: $username) {
        items {
          id
        }
      }
    }`
    const response = await gqlHelper({ username: username }, query, 'listUserProfileByUsername')
    const result = response.data.listUserProfileByUsername.items[0].id || null
    console.log('getUserIdFromUsername output: ' + JSON.stringify(result))
    return result
  },

  checkIfUserIsUnemployed: async username => {
    console.log('checkIfUserIsUnemployed input: ' + username)
    const query = `query listUserProfileByUsername($username: String!){
      listUserProfileByUsername(username: $username){
        items{
          tradeCon {
            nextToken
          }
        }
      }
    }`
    const response = await gqlHelper({ username: username }, query, 'listUserProfileByUsername')
    const result = response.data.listUserProfileByUsername.items[0].tradeCon.nextToken == null
    console.log('checkIfUserIsUnemployed output: ' + result)
    return result
  },

  getOfficeByOfficeEmail: async email => {
    console.log('getOfficeByOfficeEmail input: ' + email)
    const query = `query listTradeByOfficeEmail($office_email: String!) {
      listTradeByOfficeEmail(office_email: $office_email) {
        items {
          id
          address
          createdAt
          employeesNumberLimit
          members
          mobile
          office_email
          ownerUsername
          partnersNumberLimit
          phone
          tradeName
          privateData {
            bankAccountInfo
            chamberRecordNumber
            civilLiabilityExpirationDate
            insuranceLicenseExpirationDate
            professionStartDate
            tin
            files {
              bucket
              key
              name
              region
            }
          }
          zip_code
          verified
          updatedAt
        }
      }
    }`
    const response = await gqlHelper({ office_email: email }, query, 'listTradeByOfficeEmail')
    const result = response.data.listTradeByOfficeEmail.items[0] || null
    console.log('getOfficeByOfficeEmail output: ' + JSON.stringify(result))
    return result
  },
}
