const https = require('https')
const queries = require('./queries.js')
const AWS = require('aws-sdk')
const urlParse = require('url').URL
const ses = new aws.SES({ region: 'us-west-2' })
const SourceEmailAddress = '' //TODO

const APPSYNC_URL = process.env.API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
const REGION = process.env.REGION
const ENDPOINT = new urlParse(APPSYNC_URL).hostname.toString()

AWS.config.update({ region: REGION })
const ddb = new AWS.DynamoDB().DocumentClient()
const ddbSuffix = '-' + process.env.API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT + '-' + process.env.ENV

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
  getUserProfile: (username) => {
    console.log('Resolving UserProfile for ' + username + '.')
    let userProfileResponse = getResponseFromApi(
      ENDPOINT,
      createSignedRequest(
        ENDPOINT,
        { username: username },
        queries.listUserProfileByUsername,
        'listUserProfileByUsername',
        REGION,
        APPSYNC_URL,
      ),
    )
    console.log('Fetched UserProfile for ' + username + ' : ' + JSON.stringify(userProfileResponse))
    return userProfileResponse.data.listUserProfileByUsername.items[0]
  },
  getUserProfileByEmail: () => {
    throw new Error('Unimplemented!')
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
  addEmployeeToOffice: (office, payload, uuid) => {
    console.log('Attempting to create new employee to office ' + JSON.stringify(office))

    //Get new employees details
    let empUsername = payload.employeeUsername
    let empEmail = payload.email

    //Have an updated member list prepared
    let newMembers = office.members
    if (!newMembers.includes(empUsername)) {
      newMembers.push(empUsername)
    }

    // Update members and put user into members iff remaining > 0 AND memebers dont contain empUsername
    // Put new tradecon
    // Atomically decrement the members counter by one
    data = dynamoDb.transactWriteItems({
      TransactItems: [
        {
          Update: {
            TableName: 'Office' + ddbSuffix,
            Key: {
              id: office.id,
            },
            ConditionExpression: 'not_contains(members,:new_emp_username) and remainingMembersAllowed > 0',
            UpdateExpression: 'SET members = list_append(members, :new_emp_username)',
            ExpressionAttributeValues: {
              ':new_emp_username': empUsername,
            },
            ReturnValues: 'UPDATED_NEW',
          },
        },
        {
          Put: {
            TableName: 'TradeUserConnection' + ddbSuffix,
            Item: {
              id: { S: uuid },
              tradeId: { S: office.tradeId },
              tradeName: { S: office.tradeName },
              userId: { S: '' },
              username: { S: empUsername },
              permissions: { L: [] },
              employeeType: { S: 'STANDARD' },
              preferences: { S: '' },
            },
          },
        },
        {
          Put: {
            TableName: 'UserProfile' + ddbSuffix,
            Item: {
              id: { S: uuid },
              username: { S: empUsername },
              email: { S: empEmail },
              telephone: { S: '' },
              tin: { S: '' },
              doy: { S: '' },
              familyStatus: { S: '' },
              chamberRecordNumber: { S: '' },
              insuranceLicenseExpirationDate: { S: '' },
              partnersNumberLimit: { S: '' },
              professionStartDate: { S: '' },
              file: { L: [] },
            },
          },
        },
      ],
    })
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
}
