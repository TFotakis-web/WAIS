const AWS = require('aws-sdk')
const REGION = process.env.REGION
AWS.config.update({ region: REGION })
const ddb = new AWS.DynamoDB.DocumentClient()
const ddbSuffix = '-' + process.env.API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT + '-' + process.env.ENV

module.exports = {
  insertUserProfile: async (userProfileItem) => {
    console.log('insertUserProfile request: ' + JSON.stringify(userProfileItem))
    let resp = { data: '', error: '' }
    try {
      resp.data = await ddb
        .put({
          TableName: 'UserProfile' + ddbSuffix,
          Item: userProfileItem,
        })
        .promise()
    } catch (err) {
      resp.error = err
    }
    console.log('insertUserProfile result: ' + JSON.stringify(resp))
    return resp
  },
  insertUserWallet: async (userWalletItem) => {
    console.log('insertUserWallet request: ' + JSON.stringify(userWalletItem))
    let resp = { data: '', error: '' }
    try {
      resp.data = await ddb
        .put({
          TableName: 'UserWallet' + ddbSuffix,
          Item: userWalletItem,
        })
        .promise()
    } catch (err) {
      resp.error = err
    }
    console.log('insertUserWallet result: ' + JSON.stringify(resp))
    return resp
  },
}
