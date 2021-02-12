/* Amplify Params - DO NOT EDIT
	API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
	API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT
	AUTH_WAISAUTH_USERPOOLID
	ENV
	REGION
	STORAGE_WAISSTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

const ddbQueries = require('./ddb_queries.js')
const { CognitoIdentityServiceProvider } = require('aws-sdk')
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider()

/**
 * Get user pool information from environment variables.
 */
const COGNITO_USERPOOL_ID = process.env.AUTH_WAISAUTH_USERPOOLID
if (!COGNITO_USERPOOL_ID) {
  throw new Error(`Function requires a valid pool ID`)
}

exports.handler = async (event) => {
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
  let statusCode = 200

  //Create the following data structures for a new user
  //UserProfile, UserWallet
  switch (event.action) {
    case 'CheckUniqueEmail':
      console.log('CheckUniqueEmail with event: ' + JSON.stringify(event))
      let existingProfile = await ddbQueries.getUserProfileByEmailConsistently(event.email)
      if (Object.keys(existingProfile.data).length == 0) {
        response.ActionResponse = 'ACCEPT'
      } else { 
        response.ActionResponse = 'REJECT'
      }
      console.log('CheckUniqueEmail decision with email ' + event.email + ' is ' + response.ActionResponse)
      break
    case 'InitUser':
      console.log('InitUser with event: ' + JSON.stringify(event))

      let initUserResponse = {
        UserProfileResponse: '',
        UserProfileErrors: '',
        UserWalletResponse: '',
        UserWalletErrors: '',
      }

      //Create a UserProfile
      let userProfileItem = {
        id: event.email,
        username: event.username,
        email: event.email,
        telephone: event.phone_number,
        tin: 'undefined',
        doy: 'undefined',
        familyStatus: 'undefined',
        chamberRecordNumber: 'undefined',
        insuranceLicenseExpirationDate: new Date().toISOString(),
        partnersNumberLimit: 0,
        professionStartDate: new Date().toISOString(),
        file: [],
      }
      let userProfileResponse
      try {
        userProfileResponse = await ddbQueries.insertUserProfile(userProfileItem)
      } catch (e) {
        response.ActionResponse = initUserResponse
        statusCode = 400
        break
      }
      if (userProfileResponse.errors) {
        initUserResponse.UserProfileErrors = userProfileResponse.errors
        response.ActionResponse = initUserResponse
        statusCode = 400
        break
      } else {
        initUserResponse.UserProfileResponse = userProfileResponse
      }

      //Create the UserProfile
      let walletItem = {
        id: event.email,
        username: event.username,
        balance: 0.0,
      }

      let userWalletResponse
      try {
        userWalletResponse = await ddbQueries.insertUserWallet(walletItem)
      } catch (e) {
        response.ActionResponse = initUserResponse
        statusCode = 400
        break
      }
      if (userWalletResponse.errors) {
        initUserResponse.UserWalletErrors = userWalletResponse.errors
        response.ActionResponse = initUserResponse
        statusCode = 400
        break
      } else {
        initUserResponse.UserWalletResponse = userWalletResponse
      }
      response.ActionResponse = initUserResponse
      break

    default:
      response.LambdaErrors = 'Default case in switch statement.'
  }

  //Return the status code
  response.code = statusCode

  //Delete user on failure since that means that the user credentials are already present in the Wais DB
  if (statusCode !== 200) {
    try {
      let resp = await cognitoIdentityServiceProvider
        .adminDeleteUser({
          UserPoolId: COGNITO_USERPOOL_ID,
          Username: username,
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
    statusCode: statusCode,
    body: response,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
}
