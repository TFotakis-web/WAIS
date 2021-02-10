const AWS = require('aws-sdk')
const REGION = process.env.REGION
AWS.config.update({ region: REGION })
const ddb = new AWS.DynamoDB().DocumentClient()
const ddbSuffix = '-' + process.env.API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT + '-' + process.env.ENV

module.exports = {
  insertUserProfile: (userProfileItem) => {
    console.log('insertUserProfile request: ' + JSON.stringify(request))
    let resp = { data: '', error: '' }
    ddb.put(
      {
        TableName: 'UserProfile' + ddbSuffix,
        Item: userProfileItem,
      },
      function (err, data) {
        if (err) resp.error = err
        else resp.data = data
      },
    )
    console.log('insertUserProfile result: ' + JSON.stringify(resp))
    return resp
  },
  insertUserWallet: (userProfileItem) => {
    console.log('insertUserWallet request: ' + JSON.stringify(request))
    let resp = { data: '', error: '' }
    ddb.put(
      {
        TableName: 'UserWallet' + ddbSuffix,
        Item: userProfileItem,
      },
      function (err, data) {
        if (err) resp.error = err
        else resp.data = data
      },
    )
    console.log('insertUserWallet result: ' + JSON.stringify(resp))
    return resp
  },
}
