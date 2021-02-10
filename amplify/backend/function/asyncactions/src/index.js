/* Amplify Params - DO NOT EDIT
	API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
	API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT
	AUTH_WAISAUTH_USERPOOLID
	ENV
	REGION
	STORAGE_WAISSTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

const ddbQueries = require('./ddb_queries.js')

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
  }
  let statusCode = 200

  //Create the following data structures for a new user
  //UserProfile, UserWallet
  switch (event.action) {
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
      const userProfileResponse = ddbQueries.insertUserProfile(userProfileItem)
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
      const userWalletResponse = ddbQueries.insertUserWallet(walletItem)
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
