const ddbAPI = require('./api/utils/ddb_utils')
const gateway = require('./gateway')
const AWS = require('aws-sdk')
const https = require('https')

const APPSYNC_URL = 'http://172.29.128.1:20002'
const ENDPOINT = 'http://172.29.128.1:20002/graphql'
const REGION = 'eu-central-1'

module.exports = {
	run: async (event) => {
		console.log("debugAPI.run: " + JSON.stringify(event))
		const context = event.debug
		await module.exports.test1()
		if (context.truncate_data) {
			await module.exports.truncate_data(context)
		}
		if (context.load_data) {
			await module.exports.load_data(context)
		}
		console.log("debugAPI.result: " + JSON.stringify(event))
	},
	test1: async () => {
		const resp = await module.exports.execute({}, `query q1{ listUserProfiles{ items{ id } } }`, 'q1')
		console.log('test1 Response: ' + JSON.stringify(resp))
	},
	truncate_data: async (context) => {

	},
	load_data: async (context) => {
		console.log('unittest.load_data input: ' + JSON.stringify(context))
		const root = require(context['data_location'])
		if (!root) {
			throw new Error('Failed to load data.')
		}
		root['UserProfile'].forEach(async up => {
			const mutation = `mutation createUserProfile($input: CreateUserProfileInput!){
				createUserProfile(input: $input) {
					id
				}
			}`
			const resp = await module.exports.execute({input: up}, mutation, 'createUserProfile')
			const result = resp.data.createUserProfile.id
			if (!result) {
				console.log(`UserProfile insertion failed at UserProfile: ${JSON.stringify(up)}`)
			}
			console.log("END_LOOP")
		});
		console.log('unittest.load_data output: ')
	},
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
	}
}
