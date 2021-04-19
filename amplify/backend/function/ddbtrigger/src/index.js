const AWS = require('aws-sdk')
const https = require('https')
AWS.config.update({
	region: process.env.REGION,
})
const urlParse = require('url').URL
const APPSYNC_URL = process.env.API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
const REGION = process.env.REGION
const ENDPOINT = new urlParse(APPSYNC_URL).hostname.toString()

const execute = async (item, gql, operation) => {
	const req = new AWS.HttpRequest(APPSYNC_URL, REGION)
	req.method = 'POST'
	req.path = '/graphql'
	req.headers.host = ENDPOINT
	req.headers['Content-Type'] = 'application/json'
	req.body = JSON.stringify({
		query: gql,
		operationName: operation,
		variables: item,
	})

	const signer = new AWS.Signers.V4(req, 'appsync', true)
	signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate())

	return await new Promise((resolve, reject) => {
		const httpRequest = https.request({...req, host: ENDPOINT}, (result) => {
			result.on('data', (contents) => {
				try {
					const result = JSON.parse(contents.toString())
					if ('errors' in result) {
						console.log('GQL error: ' + JSON.stringify(result))
						reject(result.message)
					} else {
						console.log('GQL data: ' + JSON.stringify(result))
						resolve(result)
					}
				} catch (err) {
					console.log('GQL parsing error: ' + JSON.stringify(err))
					reject(err.toString())
				}
			})
		})

		httpRequest.write(req.body)
		httpRequest.end()
	})
}

exports.handler = async event => {
	//eslint-disable-line
	console.log(JSON.stringify(event, null, 2));

	const createEvent = /*GraphQL*/`
	  mutation CreateEvents(
		$input: CreateEventsInput!
		$condition: ModelEventsConditionInput
	  ) {
		createEvents(input: $input, condition: $condition) {
		  id
		  payload
		  createdAt
		  updatedAt
		}
	  }
	`

	let promises = []
	event.Records.forEach(record => {
		const payload = JSON.stringify(record)
		console.log('Payload: %s', payload);
		const input = {payload: payload}
		const p = execute({input: input}, createEvent, 'CreateEvents')
			.then(msg => console.log(`Added new item result is: ${msg}`))
			.catch(err => console.error(`Failed to add new item, error is : ${err}`))
		promises.push(p)
	})
	await Promise.all(promises)

	return Promise.resolve('Successfully processed DynamoDB record(s)');
};
