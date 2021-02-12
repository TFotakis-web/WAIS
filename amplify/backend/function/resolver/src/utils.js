const https = require('https')
const queries = require('./gql_queries.js')
const AWS = require('aws-sdk')
const urlParse = require('url').URL
const ses = new AWS.SES({ region: 'us-west-2' })
const SourceEmailAddress = '' //TODO

const APPSYNC_URL = process.env.API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
const REGION = process.env.REGION
const ENDPOINT = new urlParse(APPSYNC_URL).hostname.toString()

module.exports = {
  //
  // create a signed graphql operation request
  //
  createSignedRequest: (endpoint, item, operation, operationName, region, url) => {
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
  },

  //
  // send a request to the appsync api and return the response data
  //
  getResponseFromApi: (endpoint, request) => {
    return new Promise((resolve, reject) => {
      const httpRequest = https.request({ ...request, host: endpoint }, (result) => {
        result.on('data', (data) => {
          let dataJSON = JSON.parse(data.toString())
          console.log(dataJSON)
          resolve(dataJSON)
        })
      })
      httpRequest.write(request.body)
      httpRequest.end()
    })
  },

  getUserPermissions: (username, tradeName) => {
    console.log('Resolving permissions for ' + username + '.')
    let userProfResponse = getResponseFromApi(
      ENDPOINT,
      createSignedRequest(
        ENDPOINT,
        { username: username, tradeName: tradeName },
        queries.getUserPermissions,
        'getUserPermissions',
        REGION,
        APPSYNC_URL,
      ),
    )
    console.log('Fetched UserPermissions for ' + username + ' : ' + JSON.stringify(userProfResponse))
    return userProfResponse.data.getUserPermissions.items
  },
  getOfficeByOwnerUsername: (username) => {
    let getTradesByOwnerReq = utils.getResponseFromApi(
      ENDPOINT,
      utils.createSignedRequest(
        ENDPOINT,
        {
          input: {
            limit: 1,
            nextToken: null,
            tradeName: { eq: tradeName }, //SK
            username: username, //PK
          },
        },
        queries.listTradeByNameAndOwnerUsername,
        'listTradeByNameAndOwnerUsername',
        REGION,
        APPSYNC_URL,
      ),
    )
    console.log('Fetched Office for ' + username + ' : ' + JSON.stringify(getTradesByOwnerReq))
    return getTradesByOwnerReq.data.listTradeByNameAndOwnerUsername.items[0]
  },
  getDefaultFunctionArgs: (event) => {
    let item = {}
    if (event.arguments.filter) {
      item.filter = {
        and: [
          {
            tradeName: { eq: event.source.tradeName },
          },
          event.arguments.filter,
        ],
      }
    } else {
      item.filter = {
        tradeName: { eq: event.source.tradeName },
      }
    }
    if (event.arguments.limit) {
      item.limit = event.arguments.limit
    } else {
      item.limit = 50
    }
    if (event.arguments.nextToken) {
      item.nextToken = event.arguments.nextToken
    } else {
      item.nextToken = null
    }
    return item
  },

  getUserProfileFunctionArgs: (event, type) => {
    let item = {}
    if (event.arguments.filter) {
      item.filter = {
        and: [
          {
            employeeType: { eq: type },
          },
          event.arguments.filter,
        ],
      }
    } else {
      item.filter = {
        employeeType: { eq: type },
      }
    }
    if (event.arguments.limit) {
      item.limit = event.arguments.limit
    } else {
      item.limit = 50
    }
    if (event.arguments.nextToken) {
      item.nextToken = event.arguments.nextToken
    } else {
      item.nextToken = null
    }
    return item
  },
  sendEmail: async (subject, body, address) => {
    var params = {
      Destination: {
        ToAddresses: [address],
      },
      Message: {
        Body: {
          Text: { Data: body },
        },

        Subject: { Data: subject },
      },
      Source: SourceEmailAddress,
    }

    return ses.sendEmail(params).promise()
  },
  validateEmail: (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  },
}
