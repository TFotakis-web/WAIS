/* Amplify Params - DO NOT EDIT
	API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
	API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT
	AUTH_WAIS38036AA9_USERPOOLID
	ENV
	REGION
	STORAGE_WAISSTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk')
const https = require('https')
const urlParse = require('url').URL
const queries = require('./queries.js')

const APPSYNC_URL = process.env.API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
const REGION = process.env.REGION
const ENDPOINT = new urlParse(APPSYNC_URL).hostname.toString()

//
// create a signed graphql operation request
//
const createSignedRequest = (endpoint, item, operation, operationName, region, url) => {
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

exports.handler = async (event) => {
  //Request must contain an 'action' entry
  if (!('action' in event)) {
    return {
      statusCode: 401,
      body: JSON.stringify('No action field found.'),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  }

  //Lambda response
  const response = {}

  //Create the following data structures for a new user
  //UserProfile, UserWallet
  switch (event.action) {
    case 'InitUser':
      let response = {
        ['LambdaInput']: JSON.stringify(event),
        ['LambdaErrors']: '',
        ['UserProfileResponse']: '',
        ['UserProfileErrors']: '',
        ['UserWalletResponse']: '',
        ['UserWalletErrors']: '',
      }

      //Create a UserProfile
      const userProfileResponse = await getResponseFromApi(
        ENDPOINT,
        createSignedRequest(
          ENDPOINT,
          {
            input: {
              id: event.uuid,
              username: event.username,
              telephone: 'UNKNOWN',
              tin: 'UNKNOWN',
              doy: 'UNKNOWN',
              familyStatus: 'UNKNOWN',
              chamberRecordNumber: 'UNKNOWN',
              insuranceLicenseExpirationDate: new Date().toISOString(),
              partnersNumberLimit: 0,
              professionStartDate: new Date().toISOString(),
              file: [],
            },
          },
          queries.createUserProfile,
          'createUserProfile',
          REGION,
          APPSYNC_URL,
        ),
      )
      if (userProfileResponse.errors) {
        response['UserProfileErrors'] = JSON.stringify(userProfileResponse.errors)
        break
      } else {
        response['UserProfileResponse'] = JSON.stringify(userProfileResponse)
      }

      //Create the UserProfile
      const userWalletResponse = await getResponseFromApi(
        ENDPOINT,
        createSignedRequest(
          ENDPOINT,
          {
            input: {
              id: event.uuid,
              username: event.username,
              balance: 0.0,
            },
          },
          queries.createUserWallet,
          'createUserWallet',
          REGION,
          APPSYNC_URL,
        ),
      )
      if (userWalletResponse.errors) {
        response['UserWalletErrors'] = JSON.stringify(userWalletResponse.errors)
        break
      } else {
        response['UserWalletResponse'] = JSON.stringify(userWalletResponse)
      }
      break

    default:
      response['UserWalletResponse'] = JSON.stringify('Default case in switch statement.')
  }

  //Determine the status code
  const statusCode = 200
  if (response['UserProfileErrors'] === '' || response['UserWalletErrors'] === '') {
    statusCode = 400
  }

  //Return the status map
  return {
    statusCode: statusCode,
    body: JSON.stringify(response),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
}
