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
    let result = await lambda
      .invoke({
        FunctionName: targetFunctionName,
        Payload: JSON.stringify(payload),
      })
      .promise()

    let returnedPayload = JSON.parse(result.Payload)
    if (returnedPayload.body.code == 200) {
      console.log('User added successfully: ' + event.userName)
      callback(null, event)
    }

    callback('User already exists.', event)
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
