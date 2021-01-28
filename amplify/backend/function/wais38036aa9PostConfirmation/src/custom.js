const aws = require('aws-sdk')

const lambda = new aws.Lambda({
  region: process.env.REGION,
})

exports.handler = (event, context, callback) => {
  //Call the user init function
  lambda.invoke(
    {
      FunctionName: `addUser-${process.env.ENV}`,
      Payload: JSON.stringify(event, null, 2),
      InvocationType: 'Event',
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
}
