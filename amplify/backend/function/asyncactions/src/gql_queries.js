const AWS = require('aws-sdk')
const https = require('https')

AWS.config.update({
  region: process.env.REGION,
})

const urlParse = require('url').URL
const APPSYNC_URL = process.env.API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
const REGION = process.env.REGION
const ENDPOINT = new urlParse(APPSYNC_URL).hostname.toString()

/**
 * Wrapper for GQL API calls.
 *
 * @param {*} input
 * @param {*} gql
 * @param {String} operation
 */
const gqlHelper = async (item, gql, operation) => {
  const req = new AWS.HttpRequest(APPSYNC_URL, REGION)
  req.method = 'POST'
  req.path = '/graphql'
  req.headers.host = ENDPOINT
  req.headers['Content-Type'] = 'application/json'
  req.body = JSON.stringify({
    query: gql,
    operationName: operation,
    variables: item,
  })

  const signer = new AWS.Signers.V4(req, 'appsync', true)
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate())

  const data = await new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req, host: ENDPOINT }, result => {
      result.on('data', data => {
        const result = JSON.parse(data.toString())
        console.log('GQL result: ' + JSON.stringify(result))
        resolve(result)
      })
    })

    httpRequest.write(req.body)
    httpRequest.end()
  })

  return data
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
    const query = `mutation createUserProfile($input: CreateUserProfileInput!){
        createUserProfile(input: $input) {
            id
            username
        }
    }`
    const resp = await gqlHelper({ input: item }, query, 'createUserProfile')
    const result = resp.data.createUserProfile.id || null
    console.log('createUserProfile output: ' + JSON.stringify(result))
    return result
  },

  /**
   * Retrieve a UserProfie via the GSI 'byEmail'.
   *
   * @param {String} email
   */
  getUserProfileIdByEmail: async email => {
    console.log('getUserProfileByEmail input: ' + email)
    const query = `query listUserProfileByEmail($email: String!) {
      listUserProfileByEmail(email: $email) {
        items {
          id
        }
      }
    }`
    const response = await gqlHelper({ email: email }, query, 'listUserProfileByEmail')
    const items = response.data.listUserProfileByEmail.items
    let result = null
    if (items.length > 0) {
      result = items[0]
    }
    console.log('getUserProfileByEmail output: ' + JSON.stringify(result))
    return result
  },
}
