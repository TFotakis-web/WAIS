/* Amplify Params - DO NOT EDIT
	API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
	API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT
	AUTH_WAIS38036AA9_USERPOOLID
	ENV
	REGION
	STORAGE_WAISSTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

const https = require('https')
const AWS = require('aws-sdk')
const urlParse = require('url').URL
const appsyncUrl = process.env.API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
const region = process.env.REGION
const endpoint = new urlParse(appsyncUrl).hostname.toString()
const graphqlQuery = require('./query.js').mutation
const apiKey = process.env.API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT

exports.handler = async (event) => {
  console.log('addUser called')
  const req = new AWS.HttpRequest(appsyncUrl, region)

  req.method = 'POST'
  req.path = '/graphql'
  req.headers.host = endpoint
  req.headers['Content-Type'] = 'application/json'
  req.body = JSON.stringify({
    query: graphqlQuery,
    operationName: 'createTestType',
    variables: {
      input: {
        id:'id1',
        val: 'val1',
      },
    },
  })

  if (apiKey) {
    req.headers['x-api-key'] = apiKey
  } else {
    const signer = new AWS.Signers.V4(req, 'appsync', true)
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate())
  }

  const data = await new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
      result.on('data', (data) => {
        resolve(JSON.parse(data.toString()))
      })
    })

    httpRequest.write(req.body)
    httpRequest.end()
  })
  
  console.log('addUser result: ' + data)

  return {
    statusCode: 200,
    body: data,
  }
}
