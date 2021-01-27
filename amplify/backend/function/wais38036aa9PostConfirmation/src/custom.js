const aws = require("aws-sdk");

const lambda = new aws.Lambda({
  region: process.env.REGION,
});

exports.handler = (event, context, callback) => {
  try {
    await lambda
      .invoke({
        FunctionName: `addUser-${process.env.ENV}`, // my other function
        Payload: JSON.stringify(event, null, 2),
      })
      .promise();
  } catch (error) {
    callback(error);
  }

  callback(null, event);
};
