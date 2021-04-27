const gqlUtil = require('../utils/gql')

const AWS = require('aws-sdk')
AWS.config.update({
	region: process.env.REGION,
})
const s3 = new AWS.S3()
const bucket = process.env.STORAGE_WAISSTORAGE_BUCKETNAME

module.exports = {
	/* Queries */
	getS3Object: async (username, email, s3obj, groups) => {
		console.log('adminAPI.getS3Object input: ' + [username, email, JSON.stringify(s3obj), JSON.stringify(groups)])
		const path = `${s3obj.level}/${s3obj.idToken}/${s3obj.filePath}/${s3obj.filename}`
		const data = await s3.getObject({Bucket: bucket, Key: path}).promise()
		const parsed_data = data.Body.toString('base64')
		const result = {
			content: parsed_data,
			size: parsed_data.length,
			path: path,
			contentType: s3obj.contentType || null
		}
		console.log('adminAPI.getS3Object preview output: ' + JSON.stringify({
			content: parsed_data.substring(0, 10),
			size: parsed_data.length,
			path: path,
			contentType: s3obj.contentType || null
		}))
		return result
	},
	getUserProfileByUsername: async (username) => {
		console.log('adminAPI.getUserProfileByUsername input: ' + [username])
		const query = /* GraphQL */ `
			query getUserProfileByUsername($username: String!) {
				listUserProfileByUsername(username: $username) {
					items {
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
			}
		`
		const response = await gqlUtil.execute({username: username}, query, 'getUserProfileByUsername')
		let result = response.data.listUserProfileByUsername
		if (result.items.length > 0) {
			result = result.items[0]
		} else {
			return Promise.reject('UserProfile not found.')
		}
		console.log('adminAPI.getUserProfileByUsername output: ' + [username])
		return result
	},
	getCreateOfficeRequests: async (filter, limit, nextToken) => {
		console.log('adminAPI.getCreateOfficeRequests input: ' + [JSON.stringify(filter), limit, nextToken])
		const query = /* GraphQL */ `
			query getRequestsForUser($type: RequestType, $filter: ModelRequestsFilterInput, $limit: Int, $nextToken: String) {
				listRequestsByType(type: $type, limit: $limit, nextToken: $nextToken, filter: $filter) {
					items {
						id
						type
						senderUsername
						senderEmail
						receiverEmail
						createdAt
						updatedAt
						payload {
							createOfficePayload {
								officeName
								zip_code
								tin
								professionStartDate
								phone
								office_email
								mobile
								insuranceLicenseExpirationDate
								address
								chamberRecordNumber
								civilLiabilityExpirationDate
								comments
								office_logo {
									level
									idToken
									filePath
									filename
									contentType
								}
								files {
									level
									idToken
									filePath
									filename
									contentType
								}
							}
						}
					}
					nextToken
				}
			}
		`
		const response = await gqlUtil.execute(
			{type: "CREATE_OFFICE", filter: filter || {id: {ne: ''}}, limit: limit || 100, nextToken: nextToken},
			query,
			'getRequestsForUser',
		)
		const result = response.data.listRequestsByType
		console.log('adminAPI.getCreateOfficeRequests output: ' + JSON.stringify(result))
		return result
	}
}
