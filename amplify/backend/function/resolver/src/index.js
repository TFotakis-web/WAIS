/* Amplify Params - DO NOT EDIT
	API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
	API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT
	AUTH_WAIS38036AA9_USERPOOLID
	ENV
	FUNCTION_ASYNCACTIONS_NAME
	REGION
	STORAGE_WAISSTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

const { CognitoIdentityServiceProvider } = require('aws-sdk')
const AWS = require('aws-sdk')

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider()
const https = require('https')
const urlParse = require('url').URL
const queries = require('./queries.js')

const APPSYNC_URL = process.env.API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
const REGION = process.env.REGION
const ENDPOINT = new urlParse(APPSYNC_URL).hostname.toString()

/**
 * Get user pool information from environment variables.
 */
const COGNITO_USERPOOL_ID = process.env.AUTH_WAIS38036AA9_USERPOOLID
if (!COGNITO_USERPOOL_ID) {
  throw new Error(`Function requires a valid pool ID`)
}

const getUserProfile = (username) => {
  console.log('Resolving UserProfile for ' + username + '.')
  let userProfileResponse = getResponseFromApi(
    ENDPOINT,
    createSignedRequest(
      ENDPOINT,
      { username: username },
      queries.listUserProfileByUsername,
      'listUserProfileByUsername',
      REGION,
      APPSYNC_URL,
    ),
  )
  console.log('Fetched UserProfile for ' + username + ' : ' + JSON.stringify(userProfileResponse))
  console.log('Fetched UserProfile for ' + username + ' : ' + userProfileResponse)
  return userProfileResponse.data.listUserProfileByUsername.items[0]
}

const getUserPermissions = (username, tradeName) => {
  console.log('Resolving permissions for ' + username + '.')
  let userProfResponse = getResponseFromApi(
    ENDPOINT,
    createSignedRequest(
      ENDPOINT,
      { username: username, tradeName: tradeName },
      queries.getUserPermissions,
      'getUserPermissions',
      REGION,
      APPSYNC_URL,
    ),
  )
  console.log('Fetched UserPermissions for ' + username + ' : ' + JSON.stringify(userProfResponse))
  return userProfResponse.data.getUserPermissions.items
}

const getDefaultFunctionArgs = (event) => {
  let item = {}
  if (event.arguments.filter) {
    item.filter = {
      and: [
        {
          tradeName: { eq: event.source.tradeName },
        },
        event.arguments.filter,
      ],
    }
  } else {
    item.filter = {
      tradeName: { eq: event.source.tradeName },
    }
  }
  if (event.arguments.limit) {
    item.limit = event.arguments.limit
  } else {
    item.limit = 50
  }
  if (event.arguments.nextToken) {
    item.nextToken = event.arguments.nextToken
  } else {
    item.nextToken = null
  }
  return item
}

const getUserProfileFunctionArgs = (event, type) => {
  let item = {}
  if (event.arguments.filter) {
    item.filter = {
      and: [
        {
          employeeType: { eq: type },
        },
        event.arguments.filter,
      ],
    }
  } else {
    item.filter = {
      employeeType: { eq: type },
    }
  }
  if (event.arguments.limit) {
    item.limit = event.arguments.limit
  } else {
    item.limit = 50
  }
  if (event.arguments.nextToken) {
    item.nextToken = event.arguments.nextToken
  } else {
    item.nextToken = null
  }
  return item
}

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 */
const resolvers = {
  Office: {
    customers: (event) => {
      console.log('Resolving Office.customers')

      //Username and permissions
      let username = 'IAM'
      let permissions = ''

      if (event.identity.claims) {
        console.log('Credentials found..')
        username = event.identity.claims['cognito:username']
        permissions = getUserPermissions(username, event.source.tradeName)
      }

      //List customers request input item
      let item = getDefaultFunctionArgs(event)

      //Attempt the request
      console.log('Resolving user ' + username + ' with permissions: ' + permissions)

      //Response structure:
      //{ data: { listCustomers: { items: [], nextToken: null } }, errors: [{ path: '', location: '', message: '' }] }
      const customersResponse = getResponseFromApi(
        ENDPOINT,
        createSignedRequest(ENDPOINT, { input: item }, queries.listCustomers, 'listCustomers', REGION, APPSYNC_URL),
      )

      // Filter out customer fields based on permissions
      if (permissions) {
        //TODO
      }

      //Result
      const resolverResponse = customersResponse.data.listCustomers

      //Log the result
      console.log('Response of ' + item + ' was ' + resolverResponse)
      return resolverResponse
    },
    contracts: async (event) => {
      console.log('Resolving Office.contracts')

      //Username and permissions
      let username = 'IAM'
      let permissions = ''

      if (event.identity.claims) {
        console.log('Credentials found..')
        username = event.identity.claims['cognito:username']
        permissions = getUserPermissions(username, event.source.tradeName)
      }

      let item = getDefaultFunctionArgs(event)

      //Attempt the request
      console.log('Resolving user ' + username + ' with permissions: ' + permissions)

      //Attempt the request
      const contractsResponse = getResponseFromApi(
        ENDPOINT,
        createSignedRequest(ENDPOINT, { input: item }, queries.listContracts, 'listContracts', REGION, APPSYNC_URL),
      )

      // Filter out customer fields based on permissions
      if (permissions) {
        //TODO
      }

      //Result
      const resolverResponse = contractsResponse.data.listContracts

      //Filter out things..
      console.log('Response of ' + item + ' was ' + resolverResponse)
      return resolverResponse
    },
    employees: (event) => {
      console.log('Resolving Office.employees')

      //Username and permissions
      let username = 'IAM'
      let permissions = ''

      if (event.identity.claims) {
        console.log('Credentials found..')
        username = event.identity.claims['cognito:username']
        permissions = getUserPermissions(username, event.source.tradeName)
      }

      //List employees request input item
      let item = getUserProfileFunctionArgs(event, 'STANDARD')
      item.tradeName = tradeName

      //Attempt the request
      console.log('Resolving user ' + username + ' with permissions: ' + permissions)

      //Response structure:
      const employeesResponse = getResponseFromApi(
        ENDPOINT,
        createSignedRequest(
          ENDPOINT,
          { input: item },
          queries.listEmployeesByEmployeeType,
          'listEmployeesByEmployeeType',
          REGION,
          APPSYNC_URL,
        ),
      )

      // Filter out customer fields based on permissions
      if (permissions) {
        //TODO
      }

      //Result
      const resolverResponse = employeesResponse.data.listEmployeesByEmployeeType

      //Log the result
      console.log('Response of ' + item + ' was ' + resolverResponse)
      return resolverResponse
    },
    contractors: (event) => {
      console.log('Resolving Office.contractors')

      //Username and permissions
      let username = 'IAM'
      let permissions = ''

      if (event.identity.claims) {
        console.log('Credentials found..')
        username = event.identity.claims['cognito:username']
        permissions = getUserPermissions(username, event.source.tradeName)
      }

      //List contractors request input item
      let item = getUserProfileFunctionArgs(event, 'CONTRACTOR')
      item.tradeName = tradeName

      //Attempt the request
      console.log('Resolving user ' + username + ' with permissions: ' + permissions)

      //Response structure:
      const contractorsResponse = getResponseFromApi(
        ENDPOINT,
        createSignedRequest(
          ENDPOINT,
          { input: item },
          queries.listEmployeesByEmployeeType,
          'listEmployeesByEmployeeType',
          REGION,
          APPSYNC_URL,
        ),
      )

      // Filter out customer fields based on permissions
      if (permissions) {
        //TODO
      }

      //Result
      const resolverResponse = contractorsResponse.data.listEmployeesByEmployeeType

      //Log the result
      console.log('Response of ' + item + ' was ' + resolverResponse)
      return resolverResponse
    },
  },
  Query: {
    echo: (event) => {
      console.log('Resolving echo')
      try {
        return event.arguments.msg
      } catch (error) {
        throw new Error(e)
      }
    },
    me: async (event) => {
      console.log('Resolving me')
      try {
        if (!event.identity.claims) {
          throw new Error('This Query should only be called by authorized Users.')
        }
        return await cognitoIdentityServiceProvider
          .adminGetUser({
            UserPoolId: COGNITO_USERPOOL_ID,
            Username: event.identity.claims['cognito:username'],
          })
          .promise()
      } catch (e) {
        throw new Error(e)
      }
    },
    user: async (event) => {
      console.log('Resolving user')
      try {
        return await cognitoIdentityServiceProvider
          .adminGetUser({
            UserPoolId: COGNITO_USERPOOL_ID,
            Username: event.arguments.username,
          })
          .promise()
      } catch (e) {
        throw new Error(e)
      }
    },
    requestAdminAproval: (event) => {
      console.log('Resolving requestAdminAproval')

      //Username and permissions
      let username = 'IAM'
      let permissions = ''

      if (event.identity.claims) {
        console.log('Credentials found..')
        username = event.identity.claims['cognito:username']
        permissions = getUserPermissions(username, event.arguments.tradeName)
      }

      //Retrieve the caller UserProfile
      const selUserProfile = getUserProfile(username)

      //Expire this after 1 week
      var expiresAt = Date.now()
      expiresAt += 1000 * 60 * 60 * 24 * 7
      expiresAt = new Date(expiresAt)

      //New request
      const item = {
        id: event.uuid,
        expiresAt: expiresAt,
        message: event.arguments.message,
        tradeId: event.uuid,
        tradeName: event.arguments.tradeName,
        logo: '',
        info: '',
        postcode: '',
        profile: selUserProfile,
      }

      //Attempt the request
      console.log('Attempting to register new admin request: ' + item)
      const adminReqResponse = getResponseFromApi(
        ENDPOINT,
        createSignedRequest(ENDPOINT, { input: item }, queries.createAdminRequest, 'createAdminRequest', REGION, APPSYNC_URL),
      )
      const resolverResponse = adminReqResponse.data.createAdminRequest

      //Log the result
      console.log('Response of ' + item + ' was ' + resolverResponse)
      return resolverResponse
    },

    adminAproveRequest: (event) => {
      console.log('Resolving adminAproveRequest')

      //Username check, this shouldn't be called via IAM
      if (!event.identity.claims) {
        throw new Error('Invalid credentials')
      }

      //Input Args
      const approvedReqId = event.arguments.id

      //Retrieve the item of the request from DDB
      const adminRequestResponse = getResponseFromApi(
        ENDPOINT,
        createSignedRequest(ENDPOINT, { input: approvedReqId }, queries.getAdminRequest, 'getAdminRequest', REGION, APPSYNC_URL),
      )
      const selAdminReq = adminRequestResponse.data.getAdminRequest.items[0]

      //Create the Office and delete the now approved AdminRequest
      const adminReqInput = {
        id: event.arguments.id,
        officeInput: {
          id: selAdminReq.tradeId,
          tradeName: selAdminReq.tradeName,
          tin: selAdminReq.tin,
          logo: selAdminReq.logo,
          info: selAdminReq.info,
          postcode: selAdminReq.postcode,
          ownerId: selAdminReq.ownerId,
          ownerUsername: selAdminReq.ownerUsername,
          members: [],
        },
      }
      const apprResponse = getResponseFromApi(
        ENDPOINT,
        createSignedRequest(ENDPOINT, adminReqInput, queries.approveAdminRequest, 'approveAdminRequest', REGION, APPSYNC_URL),
      )
      const resolverResponse = apprResponse.data.approveAdminRequest

      //Log and return
      console.log('Response of adminAproveRequest was: ' + resolverResponse)
      return response
    },
  },

  Mutation: {
    manageOfficeEmployee: (event) => {
      console.log('Resolving manageOfficeEmployee')

      //Username check, this shouldn't be called via IAM
      if (!event.identity.claims) {
        throw new Error('Invalid credentials')
      }

      //Get args
      const argCustomer = event.arguments.customer
      const argAction = event.arguments.action

      //Get office stuff

      //Validate args
      let resolverResponse = ''
      switch (argAction) {
        case 'CREATE':
          break
        case 'UPDATE':
          break
        case 'DELETE':
          break

        default:
          throw new Error('Unknown CRUD action.')
      }
      return resolverResponse
    },
    manageCustomers: (event) => {
      return '{}'
    },
    manageContracts: (event) => {
      return '{}'
    },
    manageEmployees: (event) => {
      return '{}'
    },
  },
}

// event
// {
//   "typeName": "...", /* Filled dynamically based on @function usage location */
//   "fieldName": "function name", /* Filled dynamically based on @function usage location */
//   "arguments": { /* GraphQL field arguments via $ctx.arguments */ },
//   "identity": { /* AppSync identity object via $ctx.identity */ },
//   "source": { /* The object returned by the parent resolver. E.G. if resolving field 'Post.comments', the source is the Post object. */ },
//   "request": { /* AppSync request object. Contains things like headers. */ },
//   "prev": { /* If using the built-in pipeline resolver support, this contains the object returned by the previous function. */ },
// }
exports.handler = async (event) => {
  console.log('Resolving event: ' + JSON.stringify(event))
  const typeHandler = resolvers[event.typeName]
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName]
    if (resolver) {
      const res = await resolver(event)
      console.log('Resolver result is ' + JSON.stringify(res))
      return res
    }
  }
  throw new Error('Resolver not found.')
}

//
// create a signed graphql operation request
//
const createSignedRequest = (endpoint, item, operation, operationName, region, url) => {
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

//
// send a request to the appsync api and return the response data
//
const getResponseFromApi = (endpoint, request) => {
  return new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...request, host: endpoint }, (result) => {
      result.on('data', (data) => {
        resolve(JSON.parse(data.toString()))
      })
    })
    httpRequest.write(request.body)
    httpRequest.end()
  })
}
