const gqlUtil = require('../utils/gql')
const AWS = require('aws-sdk')
AWS.config.update({
	region: process.env.REGION,
})

//DDB client
const ddb = new AWS.DynamoDB.DocumentClient({
	region: process.env.REGION,
})

//Amplify DDB table suffix
const ddbSuffix = '-' + process.env.API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT + '-' + process.env.ENV

module.exports = {
	/*
	 * Queries
	 */
	getUserProfileByEmail: (email) => {
		return ddb.query({
			TableName: 'UserProfile' + ddbSuffix,
			IndexName: 'byEmail',
			KeyConditionExpression: '#emailField = :emailValue',
			ExpressionAttributeNames: {'#emailField': 'email'},
			ExpressionAttributeValues: {':emailValue': email},
		})
			.promise()
			.then(data => data?.Items[0])
	},

	getUserProfileByUsername: (username) => {
		return ddb.query({
			TableName: 'UserProfile' + ddbSuffix,
			IndexName: 'byUsername',
			KeyConditionExpression: '#usernameField = :usernameValue',
			ExpressionAttributeNames: {'#usernameField': 'username'},
			ExpressionAttributeValues: {':usernameValue': username},
		})
			.promise()
			.then(data => data?.Items[0])
	},

	getUserRoleByUsername: (username) => {
		return ddb.query({
			TableName: 'UserProfile' + ddbSuffix,
			IndexName: 'byUsername',
			ProjectionExpression: "id, username, role",
			KeyConditionExpression: '#usernameField = :usernameValue',
			ExpressionAttributeNames: {'#usernameField': 'username'},
			ExpressionAttributeValues: {':usernameValue': username},
		})
			.promise()
			.then(data => data?.Items[0])
	},

	updateUserRoleByUserId: (id, role) => {
		if (!id) {
			return Promise.reject(new Error(`Invalid ID: ${id.toString()}`))
		}
		if (['EMPLOYEE', 'CONTRACTOR', 'MANAGER', 'UNKNOWN'].indexOf(role) < 0) {
			return Promise.reject(new Error(`Invalid role provided '${role.toString()}'`))
		}
		return ddb.update({
			TableName: 'UserProfile' + ddbSuffix,
			Key: {"id": id},
			UpdateExpression: "set role = :role",
			ExpressionAttributeValues: {":role": role}
		}).promise()
	},

	getUserModelPermissionsForOffice: (username, officeId) => {
		const query = /* GraphQL */ `
			query getUserModelPermissionsForOffice($username: String!, $filter: ModelOfficeUserConnectionConditionInput, $limit: Int) {
				listUserProfileByUsername(username: $username) {
					items {
						officeConnections(filter: $filter, limit: $limit) {
							items {
								modelPermissions
							}
						}
					}
				}
			}
		`

		return gqlUtil.execute(
			{username: username, filter: {and: [{officeId: {eq: officeId}}, {username: {eq: username}}]}, limit: 100},
			query, 'getUserModelPermissionsForOffice')
			.then(response => {
				const modelPermissionsSet = new Set()
				response?.data?.listUserProfileByUsername?.items?.forEach((userProfile) => {
					userProfile.officeConnections?.items?.forEach((oc) => {
						modelPermissionsSet.add(oc.modelPermissions)
					})
				})
				return modelPermissionsSet
			})
	},

	getUserPagePermissionsForOffice: (username, officeId) => {
		const query = /* GraphQL */ `
			query getUserPagePermissionsForOffice($username: String!, $filter: ModelOfficeUserConnectionConditionInput, $limit: Int) {
				listUserProfileByUsername(username: $username) {
					items {
						officeConnections(filter: $filter, limit: $limit) {
							items {
								pagePermissions
							}
						}
					}
				}
			}
		`

		return gqlUtil.execute(
			{username: username, filter: {and: [{officeId: {eq: officeId}}, {username: {eq: username}}]}, limit: 100},
			query, 'getUserPagePermissionsForOffice')
			.then(response => {
				const pagePermissionsSet = new Set()
				response?.data?.listUserProfileByUsername?.items?.forEach((userProfile) => {
					userProfile?.officeConnections?.items?.forEach((oc) => {
						pagePermissionsSet.add(oc.pagePermissions)
					})
				})
				return pagePermissionsSet
			})
	},

	checkIfUserIsUnemployed: (username) => {
		const query = /* GraphQL */ `
			query listUserProfileByUsername($username: String!) {
				listUserProfileByUsername(username: $username) {
					items {
						officeConnections {
							items {
								id
							}
						}
					}
				}
			}
		`
		return gqlUtil.execute({username: username}, query, 'listUserProfileByUsername')
			.then(response => {
				const conns = response?.data?.listUserProfileByUsername?.items[0]?.officeConnections[0]?.items
				if (conns === undefined) {
					return Promise.reject(new Error('Failed to retrieve caller/user.'))
				}
				return conns.length === 0
			})
	},

	/*
	 * Mutations
	 */
	updateUserProfileDetails: (username, input, condition) => {
		if (!username) {
			return Promise.reject(new Error('Invalid username or unauthenticated user.'))
		}

		//Sanitize input
		const allowed = [
			'id',
			'telephone',
			'name',
			'address',
			'mobile',
			'fathers_name',
			'zip_code',
			'gender',
			'family_name',
			'preferences',
			'locale',
			'files',
			'tin',
			'city',
			'profilePicture',
		]
		const sanitized_input = Object.keys(input)
			.filter((key) => allowed.includes(key))
			.reduce((obj, key) => {
				obj[key] = input[key]
				return obj
			}, {})

		//Expand the condition to require that the caller is also the owner of the profile
		const expanded_condition = {and: [condition || {username: {ne: ''}}, {username: {eq: username}}]}
		const mutation = /* GraphQL */ `
			mutation updateUserProfileDetails($input: UpdateUserProfileInput!, $condition: ModelUserProfileConditionInput) {
				updateUserProfile(input: $input, condition: $condition) {
					id
					username
					email
					telephone
					name
					fathers_name
					address
					zip_code
					mobile
					tin
					family_name
					gender
					birthdate
					city
					role
					profilePicture {
						level
						idToken
						filePath
						filename
						contentType
					}
					preferences
					locale
					createdAt
					updatedAt
					files {
						level
						idToken
						filePath
						filename
						contentType
					}
				}
			}
		`

		return gqlUtil.execute({
			input: sanitized_input,
			condition: expanded_condition
		}, mutation, 'updateUserProfileDetails')
			.then(response => {
				const result = response?.data?.updateUserProfile
				if (result === undefined) {
					return Promise.reject(new Error(`Unable to update UserProfile for user ${username} and input ${sanitized_input}.`))
				}
				return result
			})
	},

}
