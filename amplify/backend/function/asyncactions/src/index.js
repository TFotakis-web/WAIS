/* Amplify Params - DO NOT EDIT
	API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
	API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT
	AUTH_WAISAUTH_USERPOOLID
	ENV
	REGION
	STORAGE_WAISSTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

const queries = require('./queries')
const {CognitoIdentityServiceProvider} = require('aws-sdk')
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider()

/**
 * Get user pool information from environment variables.
 */
const COGNITO_USERPOOL_ID = process.env.AUTH_WAISAUTH_USERPOOLID
if (!COGNITO_USERPOOL_ID) {
	throw new Error(`Function requires a valid pool ID`)
}

exports.handler = async event => {
	console.log(JSON.stringify(event, null, 2))
	const caller_username = event.username
	if (!caller_username) {
		return Promise.reject(new Error('Invalid or missing caller username.'))
	}

	let resultPromise
	switch (event.action) {
		case 'CheckUniqueEmail':
			resultPromise = queries.getUserProfileByEmail(event.email).then(id => {
				return !id
			})
			break
		case 'InitUser':
			resultPromise = queries.createUserProfile({
				username: event.username,
				email: event.email,
				telephone: event.phone_number,
				role: 'UNKNOWN',
				name: null,
				fathers_name: null,
				address: null,
				zip_code: null,
				mobile: null,
				tin: null,
				family_name: null,
				gender: null,
				birthdate: null,
				city: null,
				profilePicture: null,
				preferences: "{}",
				locale: null,
				files: [],
				officeConnection: null
			})
			break
		default:
			resultPromise = Promise.reject(new Error('Default case in asyncactions switch statement.'))
	}

	return resultPromise
		.then(result => {
			console.log('Result: ' + JSON.stringify(result, null, 2))
			return result
		})
		.catch(async function (reason) {
			const cognitoResult = await cognitoIdentityServiceProvider.adminDeleteUser({
				UserPoolId: COGNITO_USERPOOL_ID,
				Username: caller_username,
			}).promise()
			console.log(`Cognito User deletion result: ${JSON.stringify(cognitoResult)}`)
			return reason
		})
}
