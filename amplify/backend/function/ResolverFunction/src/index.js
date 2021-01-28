/* Amplify Params - DO NOT EDIT
	API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
	API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT
	AUTH_WAIS38036AA9_USERPOOLID
	ENV
	FUNCTION_ADDUSER_NAME
	REGION
	STORAGE_WAISSTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

const { CognitoIdentityServiceProvider } = require('aws-sdk')
const aws = require('aws-sdk')
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider()

/**
 * Get user pool information from environment variables.
 */
const COGNITO_USERPOOL_ID = process.env.AUTH_WAIS38036AA9_USERPOOLID
if (!COGNITO_USERPOOL_ID) {
  throw new Error(`Function requires a valid pool ID`)
}

//Add user function ref
const lambda = new aws.Lambda({
  region: process.env.REGION,
})

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 */
const resolvers = {
  Query: {
    echo: (ctx) => {
      console.log('Resolving echo')
      return ctx.arguments.msg
    },
    me: async (ctx) => {
      console.log('Resolving me')
      try {
        return await cognitoIdentityServiceProvider
          .adminGetUser({
            UserPoolId: COGNITO_USERPOOL_ID,
            Username: ctx.identity.claims['cognito:username'],
          })
          .promise()
      } catch (e) {
        throw new Error(e)
      }
    },
    user: async (ctx) => {
      console.log('Resolving user')
      try {
        return await cognitoIdentityServiceProvider
          .adminGetUser({
            UserPoolId: COGNITO_USERPOOL_ID,
            Username: ctx.identity.claims[ctx.arguments.username],
          })
          .promise()
      } catch (e) {
        throw new Error(e)
      }
    },
    test1: async (ctx) => {
      console.log('Resolving test1')
      try {
        return await lambda
          .invoke({
            FunctionName: process.env.FUNCTION_ADDUSER_NAME,
            Payload: JSON.stringify(ctx.arguments.username)
          })
          .promise()
      } catch (e) {
        throw new Error(e)
      }
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
  console.log('Resolving event from ' + event.fieldName)
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