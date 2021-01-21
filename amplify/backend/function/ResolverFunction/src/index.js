/* Amplify Params - DO NOT EDIT
	API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
	API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT
	AUTH_WAIS38036AA9_USERPOOLID
	ENV
	REGION
	STORAGE_WAISSTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

const { CognitoIdentityServiceProvider } = require("aws-sdk");
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

/**
 * Get user pool information from environment variables.
 */
const COGNITO_USERPOOL_ID = process.env.AUTH_WAIS38036AA9_USERPOOLID;
if (!COGNITO_USERPOOL_ID) {
  throw new Error(
    `Function requires a valid pool ID`
  );
}

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 */
const resolvers = {
  Query: {
    echo: (ctx) => {
      return ctx.arguments.msg;
    },
    me: async (ctx) => {
      var params = {
        UserPoolId: COGNITO_USERPOOL_ID,
        Username: ctx.identity.claims["cognito:username"],
      };
      try {
        return await cognitoIdentityServiceProvider
          .adminGetUser(params)
          .promise();
      } catch (e) {
        throw new Error(`NOT FOUND`);
      }
    },
    user: async (ctx) => {
      var params = {
        UserPoolId: COGNITO_USERPOOL_ID,
        Username: ctx.identity.claims[ctx.arguments.username],
      };
      try {
        return await cognitoIdentityServiceProvider
          .adminGetUser(params)
          .promise();
      } catch (e) {
        throw new Error(`NOT FOUND`);
      }
    },
  },
};

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
  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return await resolver(event);
    }
  }
  throw new Error("Resolver not found.");
};
