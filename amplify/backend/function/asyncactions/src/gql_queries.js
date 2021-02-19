const AWS = require('aws-sdk')
const https = require('https')
const agent = new https.Agent({
  keepAlive: true,
  maxSockets: Infinity,
})
AWS.config.update({
  region: process.env.REGION,
  httpOptions: {
    agent,
  },
})
const urlParse = require('url').URL

const APPSYNC_URL = process.env.API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
const REGION = process.env.REGION
const ENDPOINT = new urlParse(APPSYNC_URL).hostname.toString()
/**
 * Create a signed graphql operation request.
 *
 * @param {*} endpoint
 * @param {*} item
 * @param {*} operation
 * @param {*} operationName
 * @param {*} region
 * @param {*} url
 */
const createSignedRequest = async (endpoint, item, operation, operationName, region, url) => {
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

/**
 * Send a request to the appsync api and return the response data.
 *
 * @param {*} endpoint
 * @param {*} request
 */
const getResponseFromApi = async (endpoint, request) => {
  return new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...request, host: endpoint }, result => {
      result.on('data', data => {
        let dataJSON = JSON.parse(data.toString())
        console.log(dataJSON)
        resolve(dataJSON)
      })
    })
    httpRequest.write(request.body)
    httpRequest.end()
  })
}

/**
 * Wrapper for GQL API calls.
 *
 * @param {*} input
 * @param {*} gql
 * @param {String} name
 */
const gqlHelper = async (input, gql, name) => {
  return await getResponseFromApi(ENDPOINT, createSignedRequest(ENDPOINT, input, gql, name, REGION, APPSYNC_URL))
}

/**
 * Get the first element of an array or null if nothing is present.
 *
 * @param {*} array
 */
const firstOrNull = async array => {
  if (array == null) return null
  return array[0]
}

//Methods visible to other functions.
module.exports = {
  /**
   * Creats a new UserProfile.
   *
   *  @param {String} username
   *  @param {String} tradeName
   */
  createUserProfile: async item => {
    console.log('createUserProfile input: ' + JSON.stringify(item))
    const query = `mutation createUserProfile($input: CreateUserProfileInput){
        createUserProfile(input: $input) {
            id
            username
        }
    }`
    const resp = await gqlHelper(item, query, 'createUserProfile')
    const result = {
      items: resp.createUserProfile.id,
      errors: resp.errors || [],
    }
    console.log('createUserProfile output: ' + JSON.stringify(result))
    return result
  },
}
