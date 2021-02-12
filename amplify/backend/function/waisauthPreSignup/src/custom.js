var AWS = require('aws-sdk')
AWS.config.update({ region: process.env.REGION })
var lambda = new AWS.Lambda({
  region: process.env.REGION,
})

exports.handler = async (event, context, callback) => {
  console.log('PreSignUp trigger with event=[' + JSON.stringify(event) + '] and context=[' + JSON.stringify(context) + ']')

  const targetFunctionName = 'asyncactions-' + process.env.ENV
  const email = event.request.userAttributes.email
  const payload = {
    action: 'CheckUniqueEmail',
    username: event.userName,
    email: email,
  }

  try {
    let result = await lambda
      .invoke({
        FunctionName: targetFunctionName,
        Payload: JSON.stringify(payload),
      })
      .promise()
    console.log('Completed PreSignUp trigger for user with email ' + email + ' and result ' + JSON.stringify(result))
    let returnedPayload = JSON.parse(result.Payload)
    if (returnedPayload.body.ActionResponse === 'ACCEPT') {
      callback(null, event)
    } else {
      callback('Input e-mail already exists', event)
    }
  } catch (e) {
    console.log(
      'Failed PreSignUp trigger for the following input' +
        JSON.stringify({
          event: event,
          context: context,
          callback: callback,
          target: targetFunctionName,
          payload: payload,
        }),
    )
    callback(e, event)
  }
}
