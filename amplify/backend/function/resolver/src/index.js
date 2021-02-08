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
const urlParse = require('url').URL
const queries = require('./queries.js')
const utils = require('./utils')

const APPSYNC_URL = process.env.API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
const REGION = process.env.REGION
const ENDPOINT = new urlParse(APPSYNC_URL).hostname.toString()

AWS.config.update({ region: REGION })
var ddb = new AWS.DynamoDB().DocumentClient()
const ddbSuffix = '-' + process.env.API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT + '-' + process.env.ENV

/**
 * Get user pool information from environment variables.
 */
const COGNITO_USERPOOL_ID = process.env.AUTH_WAIS38036AA9_USERPOOLID
if (!COGNITO_USERPOOL_ID) {
  throw new Error(`Function requires a valid pool ID`)
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
        permissions = utils.getUserPermissions(username, event.source.tradeName)
      }

      //List customers request input item
      let item = utils.getDefaultFunctionArgs(event)

      //Attempt the request
      console.log('Resolving user ' + username + ' with permissions: ' + permissions)

      //Response structure:
      //{ data: { listCustomers: { items: [], nextToken: null } }, errors: [{ path: '', location: '', message: '' }] }
      const customersResponse = utils.getResponseFromApi(
        ENDPOINT,
        utils.createSignedRequest(ENDPOINT, { input: item }, queries.listCustomers, 'listCustomers', REGION, APPSYNC_URL),
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
        permissions = utils.getUserPermissions(username, event.source.tradeName)
      }

      let item = utils.getDefaultFunctionArgs(event)

      //Attempt the request
      console.log('Resolving user ' + username + ' with permissions: ' + permissions)

      //Attempt the request
      const contractsResponse = utils.getResponseFromApi(
        ENDPOINT,
        utils.createSignedRequest(ENDPOINT, { input: item }, queries.listContracts, 'listContracts', REGION, APPSYNC_URL),
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
        permissions = utils.getUserPermissions(username, event.source.tradeName)
      }

      //List employees request input item
      let item = utils.getUserProfileFunctionArgs(event, 'STANDARD')
      item.tradeName = tradeName

      //Attempt the request
      console.log('Resolving user ' + username + ' with permissions: ' + permissions)

      //Response structure:
      const employeesResponse = utils.getResponseFromApi(
        ENDPOINT,
        utils.createSignedRequest(
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
        permissions = utils.getUserPermissions(username, event.source.tradeName)
      }

      //List contractors request input item
      let item = utils.getUserProfileFunctionArgs(event, 'CONTRACTOR')
      item.tradeName = tradeName

      //Attempt the request
      console.log('Resolving user ' + username + ' with permissions: ' + permissions)

      //Response structure:
      const contractorsResponse = utils.getResponseFromApi(
        ENDPOINT,
        utils.createSignedRequest(
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
    sendRequest: (event) => {
      console.log('Resolving sendRequest')

      // Retrieve username and permissions
      if (!event.identity.claims) {
        throw new Error('Credential not found.')
      }

      //Unpack arguments
      let senderUsername = event.identity.claims['cognito:username']
      let payload = event.arguments.payload
      let requestType = event.arguments.requestType
      let tradeName = payload.tradeName
      let id = event.uuid
      let metadata = {}

      //Retrieve the caller UserProfile
      let selUserProfile = utils.getUserProfile(username)

      //Get permissions
      let callerPermissions = null
      if (tradeName) {
        callerPermissions = utils.getUserPermissions(senderUsername, tradeName)
      }

      // Halt this request if permissions don't match
      // ... TODO
      if (callerPermissions == null) {
        throw new Error('User has insufficent permissions.')
      }

      //Expire this after 1 week
      let expiresAt = Date.now()
      expiresAt += 1000 * 60 * 60 * 24 * 7
      expiresAt = new Date(expiresAt)

      //Get the receiver of this request based on the request payload and type
      let receiver = 'undefined'

      switch (requestType) {
        case 'CREATE_COMPANY_CONNECTION':
          let tradeOwnerEmail = payload.tradeOwnerEmail
          let userProfile = utils.getUserProfileByEmail(tradeOwnerEmail)
          receiver = userProfile.username
          break
        case 'CREATE_TRADE':
          break
        default:
          console.log('Receiver of request with id=[' + id + '] could not be determined.')
      }

      //New request
      const item = {
        id: id,
        expiresAt: expiresAt,
        payload: payload,
        type: requestType,
        senderUsername: senderUsername,
        receiverUsername: receiver,
        metadata: metadata,
      }

      //Attempt the request
      console.log('Attempting to register new request: ' + item)
      const adminReqResponse = utils.getResponseFromApi(
        ENDPOINT,
        utils.createSignedRequest(ENDPOINT, { input: item }, queries.createAdminRequest, 'createAdminRequest', REGION, APPSYNC_URL),
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
      const adminRequestResponse = utils.getResponseFromApi(
        ENDPOINT,
        utils.createSignedRequest(ENDPOINT, { input: approvedReqId }, queries.getAdminRequest, 'getAdminRequest', REGION, APPSYNC_URL),
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
      const apprResponse = utils.getResponseFromApi(
        ENDPOINT,
        utils.createSignedRequest(ENDPOINT, adminReqInput, queries.approveAdminRequest, 'approveAdminRequest', REGION, APPSYNC_URL),
      )
      const resolverResponse = apprResponse.data.approveAdminRequest

      //Log and return
      console.log('Response of adminAproveRequest was: ' + resolverResponse)
      return response
    },
  },

  Mutation: {
    manageEmployees: async (event) => {
      console.log('Resolving manageOfficeEmployee')

      //Username check, this shouldn't be called via IAM
      if (!event.identity.claims) {
        throw new Error('Invalid credentials')
      }

      //Get args
      let managerUsername = event.identity.claims['cognito:username']
      let payload = event.arguments.payload
      let action = event.arguments.action
      let uuid = event.uuid
      //Get caller Office
      let office = utils.getOfficeByOwnerUsername(managerUsername)
      if (!office) {
        throw new Error('User is either not valid or not the owner of the provided trade name.')
      } else {
        console.log('Retrieved office: ' + JSON.stringify(office))
      }

      //Actions
      let resolverResponse = ''
      switch (action) {
        case 'INSERT':
          resolverResponse = utils.addEmployeeToOffice(office, payload, uuid)
          break
        case 'UPDATE':
          break
        case 'DELETE':
          break
        default:
          throw new Error('Invalid action.')
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
