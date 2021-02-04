var AWS = require('aws-sdk')
AWS.config.update({ region: process.env.REGION })
var lambda = new AWS.Lambda({
  region: process.env.REGION,
})

exports.handler = async (event, context, callback) => {
  const targetFunctionName = 'asyncactions-' + process.env.ENV
  const payload = {
    action: 'InitUser',
    username: event.username,
    uuid: context.awsRequestId,
  }

  console.log(
    'Attempting to create user resources for ' +
      JSON.stringify({
        target: targetFunctionName,
        payload: payload,
      }),
  )

  try {
    await lambda
      .invoke({
        FunctionName: targetFunctionName,
        Payload: JSON.stringify(payload),
      })
      .promise()
    callback(null, event)
  } catch (e) {
    callback(e)
  }
}
