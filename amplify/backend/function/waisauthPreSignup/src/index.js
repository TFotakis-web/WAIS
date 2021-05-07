const AWS = require('aws-sdk');
AWS.config.update({region: process.env.REGION})
const lambda = new AWS.Lambda({
	region: process.env.REGION,
})

exports.handler = (event, context, callback) => {
	console.log('PreSignUp trigger with event=[' + JSON.stringify(event, null, 2) + '] and context=[' + JSON.stringify(context, null, 2) + ']')
	return lambda
		.invoke({
			FunctionName: 'asyncactions-' + process.env.ENV,
			Payload: JSON.stringify({
				action: 'CheckUniqueEmail',
				username: event.userName,
				email: event.request.userAttributes.email,
			}),
		})
		.promise()
		.then(result => {
			console.log('Lambda response: ' + JSON.stringify(result))
			const returnedPayload = JSON.parse(result?.Payload || '{}')
			if (returnedPayload === false) {
				callback(null, event)
			} else {
				return Promise.reject(new Error('Input e-mail already exists'))
			}
		})
		.catch(error => {
			console.log('Error: ' + JSON.stringify(error))
			callback(error)
		})
}
