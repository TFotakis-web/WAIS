/* Amplify Params - DO NOT EDIT
	API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
	API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT
	AUTH_WAISAUTH_USERPOOLID
	ENV
	REGION
	STORAGE_WAISSTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */
//const { CognitoIdentityServiceProvider } = require('aws-sdk')
//const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider()

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
      return await officeAPI.listCustomersForUserInOffice({
        office: event.source,
        limit: event.arguments.limit,
        nextToken: event.arguments.nextToken,
        tradeName: event.arguments.tradeName,
        filter: event.arguments.filter,
      })
    },
    contracts: async event => {
      return await officeAPI.listContractsForUserInOffice({
        office: event.source,
        limit: event.arguments.limit,
        nextToken: event.arguments.nextToken,
        tradeName: event.arguments.tradeName,
        filter: event.arguments.filter,
      })
    },
    employees: async event => {
      return await officeAPI.listEmployeesForUserInOffice({
        office: event.source,
        limit: event.arguments.limit,
        nextToken: event.arguments.nextToken,
        filter: event.arguments.filter,
      })
    },
    contractors: async event => {
      return await officeAPI.listContractorsForUserInOffice({
        office: event.source,
        limit: event.arguments.limit,
        nextToken: event.arguments.nextToken,
        filter: event.arguments.filter,
      })
    },
    partnerOffices: async event => {
      if (!event.identity.claims) {
        throw new Error('Invalid credentials.')
      }
      return await officeAPI.listOfficePartners({
        office: event.source,
        limit: event.arguments.limit,
        nextToken: event.arguments.nextToken,
        filter: event.arguments.filter,
      })
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
      return await gql_queries.getUserProfileByUsername(event.identity.claims['cognito:username'])
    },
    user: async event => {
      return await gql_queries.getUserProfileByUsername(event.arguments.username)
    },
  },

  Mutation: {
    manageCustomers: async event => {
      if (!event.identity.claims) {
        throw new Error('Invalid credentials.')
      }
      return await officeAPI.manageCustomers({
        username: event.identity.claims['cognito:username'],
        tradeName: event.arguments.tradeName,
        action: event.arguments.action,
        payload: event.arguments.payload,
        groups: event.identity.groups,
      })
    },
    manageContracts: async event => {
      if (!event.identity.claims) {
        throw new Error('Invalid credentials.')
      }
      return await officeAPI.manageContracts({
        username: event.identity.claims['cognito:username'],
        office: event.source,
        action: event.arguments.action,
        payload: event.arguments.payload,
      })
    },
    manageEmployees: async event => {
      if (!event.identity.claims) {
        throw new Error('Invalid credentials.')
      }
      return await officeAPI.manageEmployees({
        username: event.identity.claims['cognito:username'],
        office: event.source,
        action: event.arguments.action,
        payload: event.arguments.payload,
      })
    },
    manageContractors: async event => {
      if (!event.identity.claims) {
        throw new Error('Invalid credentials.')
      }
      return await officeAPI.manageContractors({
        username: event.identity.claims['cognito:username'],
        office: event.source,
        action: event.arguments.action,
        payload: event.arguments.payload,
      })
    },
    updateFields: async event => {
      if (!event.identity.claims) {
        throw new Error('Invalid credentials.')
      }
      return await officeAPI.updateFields({
        username: event.identity.claims['cognito:username'],
        email: event.identity.claims['email'],
        groups: event.identity.groups,
        typename: event.arguments.typename,
        id: event.arguments.id,
        fields: event.arguments.fields,
      })
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
        console.log('Resolver error is ' + err)
        throw err //This will format the resolver's result in a specific way
      }
    }
  }
  throw new Error('Resolver not found.')
}
