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

//Add user function ref
const lambda = new AWS.Lambda({
  region: process.env.REGION,
})

const getUserProfile = (username) => {
  //Retrieve the caller UserProfile
  const userProfiles = getResponseFromApi(
    ENDPOINT,
    createSignedRequest(
      ENDPOINT,
      { username: username },
      queries.getUserProfileByUsername,
      'getUserProfileByUsername',
      REGION,
      APPSYNC_URL,
    ),
  )
  return userProfiles[0]
}

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 */
const resolvers = {
  Office: {
    customers: (event, srcObj) => {
      console.log('Resolving Office.customers')
      if (!event.identity.claims) {
        throw new Error('Invalid credentials')
      }

      //Get user profile (includes permissions)
      const userProfile = getUserProfile(event.identity.claims['cognito:username'])
      const permissions = userProfile.tradeCon[0].permissions

      // TODO add permsission check
      // ...

      //List customers request input item
      let item = {}
      if (event.arguments.filter) {
        item.filter = {
          and: [
            {
              tradeName: { eq: srcObj.tradeName },
            },
            event.arguments.filter,
          ],
        }
      } else {
        item.filter = {
          tradeName: { eq: srcObj.tradeName },
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

      //Attempt the request
      console.log('Attempting to register new admin request: ' + item)
      const customersResponse = getResponseFromApi(
        ENDPOINT,
        createSignedRequest(ENDPOINT, { input: item }, queries.listCustomers, 'listCustomers', REGION, APPSYNC_URL),
      )

      // Filter out customer fields based on permissions
      // TODO ...

      //Log the result
      console.log('Response of ' + item + ' was ' + customersResponse)
      return response
    },
    contracts: (event, srcObj) => {},
    employees: (event, srcObj) => {},
    contractors: (event, srcObj) => {},
  },
  Query: {
    echo: (event, srcObj) => {
      console.log('Resolving echo')
      try {
        return event.arguments.msg
      } catch (error) {
        throw new Error(e)
      }
    },
    me: async (event, srcObj) => {
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
    user: async (event, srcObj) => {
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
    requestAdminAproval: (event, srcObj) => {
      console.log('Resolving requestAdminAproval')

      if (!event.identity.claims) {
        throw new Error('Invalid credentials')
      }

      //Retrieve the caller UserProfile
      const selUserProfile = getUserProfile(event.identity.claims['cognito:username'])

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
      const response = getResponseFromApi(
        ENDPOINT,
        createSignedRequest(ENDPOINT, { input: item }, queries.createAdminRequest, 'createAdminRequest', REGION, APPSYNC_URL),
      )

      //Log the result
      console.log('Response of ' + item + ' was ' + response)
      return response
    },

    adminAproveRequest: (event, srcObj) => {
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
      const selAdminReq = adminRequestResponse[0]

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
      const response = getResponseFromApi(
        ENDPOINT,
        createSignedRequest(ENDPOINT, adminReqInput, queries.approveAdminRequest, 'approveAdminRequest', REGION, APPSYNC_URL),
      )

      //Log and return
      console.log('Response of adminAproveRequest was: ' + response)
      return response
    },
  },

  Mutation: {},
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
  console.log('Resolving event from ' + event.fieldName)
  const typeHandler = resolvers[event.typeName]
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName]
    if (resolver) {
      const res = await resolver(event, source)
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
