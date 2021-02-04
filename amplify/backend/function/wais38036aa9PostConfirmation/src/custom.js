var AWS = require('aws-sdk')
AWS.config.update({ region: process.env.REGION })
var lambda = new AWS.Lambda({
  region: process.env.REGION,
})
exports.handler = (event, context, callback) => {
  console.log('Attempting to create a NEW UserProfile entry for ' + event.username)
  const item = {
    action: 'InitUser',
    username: event.username,
    uuid: context.awsRequestId,
  }
  lambda.invoke(
    {
      FunctionName: process.env.ASYNCACTIONS_NAME,
      Payload: JSON.stringify(item, null, 2),
    },
    function (error, data) {
      console.log(
        JSON.stringify({
          data: data,
          error: error,
        }),
      )
    },
  )
  callback(null, event)
}
