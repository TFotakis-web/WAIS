/* Amplify Params - DO NOT EDIT
	API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
	API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT
	AUTH_WAISAUTH_USERPOOLID
	ENV
	REGION
	STORAGE_WAISSTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

const api = require('./api')
const { CognitoIdentityServiceProvider } = require('aws-sdk')
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider()

/**
 * Get user pool information from environment variables.
 */
const COGNITO_USERPOOL_ID = process.env.AUTH_WAISAUTH_USERPOOLID
if (!COGNITO_USERPOOL_ID) {
  throw new Error(`Function requires a valid pool ID`)
}

exports.handler = async event => {
  //Request must contain an 'action' entry
  if (!('action' in event)) {
    return {
      statusCode: 401,
      body: 'No action field found.',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  }

  //Lambda response
  let response = {
    LambdaInput: event,
    LambdaErrors: '',
    ActionResponse: '',
    code: 200,
  }

  //Create the following data structures for a new user
  //UserProfile, UserWallet
  switch (event.action) {
    case 'CheckUniqueEmail':
      try {
        response.ActionResponse = await api.checkUniqueEmail(event.email)
        response.statusCode = 200
      } catch (err) {
        response.LambdaErrors = err
        response.code = 401
      }
      break
    case 'InitUser':
      try {
        response.ActionResponse = await api.initUser(event)
        response.statusCode = 200
      } catch (err) {
        response.LambdaErrors = err
        response.code = 401
      }
      break
    default:
      response.code = 401
      response.LambdaErrors = 'Default case in switch statement.'
  }

  //Delete user on failure since that means that the user credentials are already present in the Wais DB
  if (response.code !== 200) {
    try {
      let resp = await cognitoIdentityServiceProvider
        .adminDeleteUser({
          UserPoolId: COGNITO_USERPOOL_ID,
          Username: event.username,
        })
        .promise()
      response.ActionResponse = JSON.stringify(resp)
    } catch (e) {
      response.LambdaErrors = JSON.stringify(e)
    }
  }

  //Return the status map
  console.log(JSON.stringify(response))
  return {
    statusCode: response.code,
    body: response,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
}
