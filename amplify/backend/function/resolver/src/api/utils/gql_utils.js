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
	 * @param {*} input
	 * @param {*} gql
	 * @param {String} operation
	 */
	execute: async (item, gql, operation) => {
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
				result.on('data', (data) => {
					const result = JSON.parse(data.toString())
					console.log('GQL result: ' + JSON.stringify(result))
					resolve(result)
				})
			})

			httpRequest.write(req.body)
			httpRequest.end()
		})
	},
}
