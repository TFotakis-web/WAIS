const AWS = require('aws-sdk');
AWS.config.update({region: process.env.REGION})
const lambda = new AWS.Lambda({
	region: process.env.REGION,
});

exports.handler = async (event, context, callback) => {
	return lambda
		.invoke({
			FunctionName: 'asyncactions-' + process.env.ENV,
			Payload: JSON.stringify({
				action: 'InitUser',
				username: event.userName,
				email: event.request.userAttributes.email,
				phone_number: event.request.userAttributes.phone_number,
			}),
		})
		.promise()
		.then(result => {
			const returnedPayload = JSON.parse(result?.Payload || '{}')
			if (returnedPayload) {
				console.log('User added successfully: ' + event.userName)
				callback(null, event)
			} else {
				return Promise.reject(new Error('Failed to initialize User.'))
			}
		})
		.catch(error => {
			console.log('Error: ' + JSON.stringify(error))
			callback(error)
		})
}
