var AWS = require('aws-sdk')
AWS.config.update({ region: process.env.REGION })
var lambda = new AWS.Lambda({
  region: process.env.REGION,
})

exports.handler = async (event, context, callback) => {
  const targetFunctionName = 'asyncactions-' + process.env.ENV
  const payload = {
    action: 'InitUser',
    username: event.userName,
    email: event.request.userAttributes.email,
    phone_number: event.request.userAttributes.phone_number,
  }
  try {
    await lambda
      .invoke({
        FunctionName: targetFunctionName,
        Payload: JSON.stringify(payload),
      })
      .promise()
    console.log('Completed confirmation trigger for user ' + event.userName)
    callback(null, event)
  } catch (e) {
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
    callback(e)
  }
}
