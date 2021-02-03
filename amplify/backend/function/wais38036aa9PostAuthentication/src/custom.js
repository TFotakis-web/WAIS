var AWS = require('aws-sdk')
AWS.config.update({ region: process.env.REGION })
var lambda = new aws.Lambda({
  region: process.env.REGION,
})

exports.handler = (event, context, callback) => {
  console.log('Attempting to create a NEW UserProfile entry for ' + event.username)
  item = {
    action: 'createUserProfile',
    username: event.username,
    uuid: context.awsRequestId,
  }
  lambda.invoke(
    {
      FunctionName: process.env.ASYNCACTIONS_NAME,
      Payload: JSON.stringify(item, null, 2),
    },
    function (error, data) {
      if (error) {
        context.done('error', error)
      }
      if (data.Payload) {
        context.succeed(data.Payload)
      }
    },
  )

  callback(null, event)
}
