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
        return {
          data: [],
          errors: [{ message: 'Invalid credentials.' }],
        }
      }
      try {
        return await officeAPI.listCustomersForUserInOffice({
          username: event.identity.claims['cognito:username'],
          office: event.source,
          limit: event.arguments.limit,
          nextToken: event.arguments.nextToken,
          filter: event.arguments.filter,
        })
      } catch (e) {
        return {
          data: [],
          errors: [{ message: JSON.stringify(e) }],
        }
      }
    },
    contracts: async event => {
      if (!event.identity.claims) {
        return {
          data: [],
          errors: [{ message: 'Invalid credentials.' }],
        }
      }
      try {
        return await officeAPI.listContractsForUserInOffice({
          username: event.identity.claims['cognito:username'],
          office: event.source,
          limit: event.arguments.limit,
          nextToken: event.arguments.nextToken,
          filter: event.arguments.filter,
        })
      } catch (e) {
        return {
          data: [],
          errors: [{ message: JSON.stringify(e) }],
        }
      }
    },
    employees: async event => {
      if (!event.identity.claims) {
        return {
          data: [],
          errors: [{ message: 'Invalid credentials.' }],
        }
      }
      try {
        return await officeAPI.listEmployeesForUserInOffice({
          username: event.identity.claims['cognito:username'],
          office: event.source,
          limit: event.arguments.limit,
          nextToken: event.arguments.nextToken,
          filter: event.arguments.filter,
        })
      } catch (e) {
        return {
          data: [],
          errors: [{ message: JSON.stringify(e) }],
        }
      }
    },
    contractors: async event => {
      if (!event.identity.claims) {
        return {
          data: [],
          errors: [{ message: 'Invalid credentials.' }],
        }
      }
      try {
        return await officeAPI.listContractorsForUserInOffice({
          username: event.identity.claims['cognito:username'],
          office: event.source,
          limit: event.arguments.limit,
          nextToken: event.arguments.nextToken,
          filter: event.arguments.filter,
        })
      } catch (e) {
        return {
          data: [],
          errors: [{ message: JSON.stringify(e) }],
        }
      }
    },
    manageEmployees: async event => {
      if (!event.identity.claims) {
        return {
          data: [],
          errors: [{ message: 'Invalid credentials.' }],
        }
      }
      try {
        return await officeAPI.manageEmployees({
          username: event.identity.claims['cognito:username'],
          office: event.source,
          action: event.arguments.action,
          payload: event.arguments.payload,
        })
      } catch (e) {
        return {
          data: [],
          errors: [{ message: JSON.stringify(e) }],
        }
      }
    },
    manageCustomers: async event => {
      return {
        data: [],
        errors: [{ message: 'Not implemented yet.' }],
      }
    },
    manageContracts: async event => {
      return {
        data: [],
        errors: [{ message: 'Not implemented yet.' }],
      }
    },
    manageContractors: async event => {
      return {
        data: [],
        errors: [{ message: 'Not implemented yet.' }],
      }
    },
  },
  Query: {
    echo: async event => {
      try {
        return event.arguments.msg
      } catch (e) {
        return {
          data: [],
          errors: [{ message: JSON.stringify(e) }],
        }
      }
    },
    me: async event => {
      if (!event.identity.claims) {
        return {
          data: [],
          errors: [{ message: 'Invalid credentials.' }],
        }
      }
      try {
        return await cognitoIdentityServiceProvider
          .adminGetUser({
            UserPoolId: COGNITO_USERPOOL_ID,
            Username: event.identity.claims['cognito:username'],
          })
          .promise()
      } catch (e) {
        return {
          data: [],
          errors: [{ message: JSON.stringify(e) }],
        }
      }
    },
    user: async event => {
      if (!event.identity.claims) {
        return {
          data: [],
          errors: [{ message: 'Invalid credentials.' }],
        }
      }
      try {
        return await cognitoIdentityServiceProvider
          .adminGetUser({
            UserPoolId: COGNITO_USERPOOL_ID,
            Username: event.arguments.username,
          })
          .promise()
      } catch (e) {
        return {
          data: [],
          errors: [{ message: JSON.stringify(e) }],
        }
      }
    },
    sendRequest: async event => {
      if (!event.identity.claims) {
        return {
          data: [],
          errors: [{ message: 'Invalid credentials.' }],
        }
      }
      try {
        return await requestsAPI.sendRequest({
          username: event.identity.claims['cognito:username'],
          office: event.source,
          limit: event.arguments.limit,
          nextToken: event.arguments.nextToken,
          filter: event.arguments.filter,
        })
      } catch (e) {
        return {
          data: [],
          errors: [{ message: JSON.stringify(e) }],
        }
      }
    },
    resolveRequest: async event => {
      if (!event.identity.claims) {
        return {
          data: [],
          errors: [{ message: 'Invalid credentials.' }],
        }
      }
      try {
        return await requestsAPI.resolveRequest({
          username: event.identity.claims['cognito:username'],
          office: event.source,
          limit: event.arguments.limit,
          nextToken: event.arguments.nextToken,
          filter: event.arguments.filter,
        })
      } catch (e) {
        return {
          data: [],
          errors: [{ message: JSON.stringify(e) }],
        }
      }
    },
  },

  Mutation: {
    sendMoneyToUserWithUsername: async event => {
      return null
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
        console.log('Resolver result is ' + JSON.stringify(res))
        return res
      } catch (err) {
        console.log('Resolver error is ' + JSON.stringify(err))
        return err
      }
    }
  }
  throw new Error('Resolver not found.')
}
