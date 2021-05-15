const AWS = require('aws-sdk')
const https = require('https')
AWS.config.update({
	region: process.env.REGION,
})
const urlParse = require('url').URL
const APPSYNC_URL = process.env.API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
const REGION = process.env.REGION
const ENDPOINT = new urlParse(APPSYNC_URL).hostname.toString()

module.exports = {
	/**
	 * Wrapper for GQL API calls.
	 *
	 * @param item
	 * @param {*} gql
	 * @param {String} operation
	 */
	execute: (item, gql, operation) => {
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

		return new Promise((resolve, reject) => {
			const httpRequest = https.request({...req, host: ENDPOINT}, (response) => {
				let chunks_of_data = [];

				response.on('data', (fragments) => chunks_of_data.push(fragments))

				response.on('error', (error) => reject(error));

				response.on('end', () => {
					const contents = Buffer.concat(chunks_of_data).toString();
					try {
						const result = JSON.parse(contents.toString())
						if ('errors' in result) {
							const err = JSON.stringify(result.errors, null, 2)
							console.log('GQL error: ' + err)
							reject(err)
						} else if ('data' in result) {
							const data = result.data
							console.log('GQL data: ' + JSON.stringify(data))
							resolve(data)
						} else {
							reject(new Error('Unhandled GQL response error for result: ' + JSON.stringify(result, null, 2)))
						}
					} catch (err) {
						console.log('GQL parsing error: ' + JSON.stringify(err))
						reject(err)
					}
				});
			})

			httpRequest.write(req.body)
			httpRequest.end()
		})
	}
}
