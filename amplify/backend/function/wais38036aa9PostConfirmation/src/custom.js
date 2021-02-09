var AWS = require('aws-sdk')
AWS.config.update({ region: process.env.REGION })
var lambda = new AWS.Lambda({
  region: process.env.REGION,
})

exports.handler = async (event, context, callback) => {
  const targetFunctionName = 'asyncactions-' + process.env.ENV
  const username = event.userName
  const payload = {
    action: 'InitUser',
    username: username,
    uuid: context.awsRequestId,
  }

  try {
    await lambda
      .invoke({
        FunctionName: targetFunctionName,
        Payload: JSON.stringify(payload),
      })
      .promise()
    callback(null, event)
    console.log('Completed confirmation trigger for user ' + username)
  } catch (e) {
    callback(e)
    console.log(
      'Failed confirmation trigger for the following input' +
        JSON.stringify({
          event: event,
          context: context,
          callback: callback,
          target: targetFunctionName,
          payload: payload,
        }),
    )
  }
}