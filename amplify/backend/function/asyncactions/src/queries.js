const AWS = require('aws-sdk')
const https = require('https')
const urlParse = require('url').URL

const APPSYNC_URL = process.env.API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
const REGION = process.env.REGION
const ENDPOINT = new urlParse(APPSYNC_URL).hostname.toString()

AWS.config.update({
	region: REGION,
})

//DDB client
const ddb = new AWS.DynamoDB.DocumentClient({
	region: REGION,
})

//Amplify DDB table suffix
const ddbSuffix = '-' + process.env.API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT + '-' + process.env.ENV


/**
 * Wrapper for GQL API calls.
 *
 * @param item
 * @param {*} gql
 * @param {String} operation
 */
const gqlHelper = async (item, gql, operation) => {
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
						console.log('GQL error: ' + JSON.stringify(result))
						reject(result)
					} else {
						console.log('GQL data: ' + JSON.stringify(result))
						resolve(result)
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


//Methods visible to other functions.
module.exports = {
	/**
	 * Create a new UserProfile.
	 */
	createUserProfile: (item) => {
		const query = `mutation createUserProfile($input: CreateUserProfileInput!){
			createUserProfile(input: $input) {
				id
			}
		}`
		return gqlHelper({input: item}, query, 'createUserProfile')
			.then(resp => {
				const result = resp?.data?.createUserProfile?.id
				if (result === undefined) {
					return Promise.reject(new Error('Failed to create UserProfile.'))
				}
				return result
			})
	},

	getUserProfileByEmail: (email) => {
		return ddb.query({
			TableName: 'UserProfile' + ddbSuffix,
			IndexName: 'byEmail',
			ProjectionExpression: "id",
			ExpressionAttributeNames: {'#emailField': 'email'},
			ExpressionAttributeValues: {':emailValue': email},
			KeyConditionExpression: '#emailField = :emailValue',
		})
			.promise()
			.then(data => data?.Items[0])
	},
}
