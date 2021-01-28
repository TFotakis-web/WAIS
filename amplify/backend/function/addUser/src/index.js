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

const APPSYNC_URL = process.env.API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
const REGION = process.env.REGION
const ENDPOINT = new urlParse(APPSYNC_URL).hostname.toString()

exports.handler = async event => {
  console.log('addUser called')
  
  const item = {
    input: {
      id: 'id1',
      val: 'val1',
    },
  }
  const operation = require('./query.js').mutation
  const operationName = 'createTestType'

  const request = createSignedRequest(ENDPOINT, item, operation, operationName, REGION, APPSYNC_URL)
  return getResponseFromApi(ENDPOINT, request)
}

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
    const httpRequest = https.request({ ...request, host: endpoint }, result => {
      result.on('data', data => {
        resolve(JSON.parse(data.toString()))
      })
    })
    httpRequest.write(request.body)
    httpRequest.end()
  })
}
