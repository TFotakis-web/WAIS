const aws = require('aws-sdk')

const lambda = new aws.Lambda({
  region: process.env.REGION,
})

exports.handler = async (event, context, callback) => {
  try {
    await lambda
      .invoke({
        FunctionName: `addUser-${process.env.ENV}`,
        Payload: JSON.stringify(event, null, 2),
        InvocationType: 'Event',
      })
      .promise()
  } catch (error) {
    callback(error)
  }
  callback(null, event)
}
