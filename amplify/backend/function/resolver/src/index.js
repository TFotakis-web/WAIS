/* Amplify Params - DO NOT EDIT
	API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
	API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT
	AUTH_WAISAUTH_USERPOOLID
	ENV
	REGION
	STORAGE_WAISSTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */
const { CognitoIdentityServiceProvider } = require('aws-sdk')
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider()

//API
const requestsAPI = require('./queries/requests')
const officeAPI = require('./queries/office')
const gql_queries = require('./api/gql_queries')

/**
 * Get user pool information from environment variables.
 */
const COGNITO_USERPOOL_ID = process.env.AUTH_WAISAUTH_USERPOOLID
if (!COGNITO_USERPOOL_ID) {
  throw new Error(`Function requires a valid pool ID`)
}

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 */
const resolvers = {
  Office: {
    customers: async event => {
      if (!event.identity.claims) {
        throw new Error('Invalid credentials.')
      }
      return {}
      // return await officeAPI.listCustomersForUserInOffice({
      //   username: event.identity.claims['cognito:username'],
      //   office: event.source,
      //   limit: event.arguments.limit,
      //   nextToken: event.arguments.nextToken,
      //   filter: event.arguments.filter,
      // })
    },
    contracts: async event => {
      if (!event.identity.claims) {
        throw new Error('Invalid credentials.')
      }
      return {}
      // return await officeAPI.listContractsForUserInOffice({
      //   username: event.identity.claims['cognito:username'],
      //   office: event.source,
      //   limit: event.arguments.limit,
      //   nextToken: event.arguments.nextToken,
      //   filter: event.arguments.filter,
      // })
    },
    employees: async event => {
      if (!event.identity.claims) {
        throw new Error('Invalid credentials.')
      }
      return {}
      // return await officeAPI.listEmployeesForUserInOffice({
      //   username: event.identity.claims['cognito:username'],
      //   office: event.source,
      //   limit: event.arguments.limit,
      //   nextToken: event.arguments.nextToken,
      //   filter: event.arguments.filter,
      // })
    },
    contractors: async event => {
      if (!event.identity.claims) {
        throw new Error('Invalid credentials.')
      }
      return {}
      // return await officeAPI.listContractorsForUserInOffice({
      //   username: event.identity.claims['cognito:username'],
      //   office: event.source,
      //   limit: event.arguments.limit,
      //   nextToken: event.arguments.nextToken,
      //   filter: event.arguments.filter,
      // })
    },
  },
  Query: {
    echo: async event => {
      return event.arguments.msg
    },
    me: async event => {
      if (!event.identity.claims) {
        throw new Error('Invalid credentials.')
      }
      return await gql_queries.getUserProfileByUsername(event.identity.username)
    },
    user: async event => {
      return await cognitoIdentityServiceProvider
        .adminGetUser({
          UserPoolId: COGNITO_USERPOOL_ID,
          Username: event.arguments.username,
        })
        .promise()
    },
  },

  Mutation: {
    manageCustomers: async event => {
      if (!event.identity.claims) {
        throw new Error('Invalid credentials.')
      }
      return {}
    },
    manageContracts: async event => {
      if (!event.identity.claims) {
        throw new Error('Invalid credentials.')
      }
      return {}
    },
    manageEmployees: async event => {
      if (!event.identity.claims) {
        throw new Error('Invalid credentials.')
      }
      return {}
      // return await officeAPI.manageEmployees({
      //   username: event.identity.claims['cognito:username'],
      //   office: event.source,
      //   action: event.arguments.action,
      //   payload: event.arguments.payload,
      // })
    },
    manageContractors: async event => {
      if (!event.identity.claims) {
        throw new Error('Invalid credentials.')
      }
      return {}
    },
    updateFields: async event => {
      if (!event.identity.claims) {
        throw new Error('Invalid credentials.')
      }
      return {}
    },
    sendMoneyToUserWithUsername: async event => {
      throw new Error('Not implemented yet.')
    },
    sendRequest: async event => {
      if (!event.identity.claims) {
        throw new Error('Invalid credentials.')
      }
      return await requestsAPI.sendRequest({
        username: event.identity.claims['cognito:username'],
        requestType: event.arguments.requestType,
        payload: event.arguments.payload,
      })
    },
    resolveRequest: async event => {
      if (!event.identity.claims) {
        throw new Error('Invalid credentials.')
      }
      return await requestsAPI.resolveRequest({
        username: event.identity.claims['cognito:username'],
        email: event.identity.claims['email'],
        groups: event.identity.groups,
        id: event.arguments.id,
        payload: event.arguments.payload,
      })
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
exports.handler = async event => {
  console.log('Resolving event: ' + JSON.stringify(event))
  const typeHandler = resolvers[event.typeName]
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName]
    if (resolver) {
      try {
        const res = await resolver(event)
        console.log('Resolver result is ' + res)
        return res
      } catch (err) {
        console.log('Resolver error is ' + JSON.stringify(err))
        throw err //This will format the resolver's result in a specific way
      }
    }
  }
  throw new Error('Resolver not found.')
}
