const gqlUtil = require('../gql')
const userAPI = require('../api/user')
const officeAPI = require('../api/office')

const AWS = require('aws-sdk')
AWS.config.update({
	region: process.env.REGION,
})
const s3 = new AWS.S3()
const bucket = process.env.STORAGE_WAISSTORAGE_BUCKETNAME

const docClient = new AWS.DynamoDB.DocumentClient();
const ddbSuffix = '-' + process.env.API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT + '-' + process.env.ENV

module.exports = {
	/* Queries */
	getS3Object: (username, email, s3obj) => {
		const path = `${s3obj.level}/${s3obj.idToken}/${s3obj.filePath}/${s3obj.filename}`
		return s3.getObject({Bucket: bucket, Key: path}).promise()
			.then(data => {
				const parsed_data = data.Body.toString('base64')
				return {
					content: parsed_data,
					size: parsed_data.length,
					path: path,
					contentType: s3obj.contentType || null
				}
			})
	},
	getUserProfileByUsername: (username) => {
		return userAPI.getUserProfileByUsername(username)
	},
	getCreateOfficeRequests: (filter, limit, nextToken) => {
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
		return gqlUtil.execute(
			{type: "CREATE_OFFICE", filter: filter || {id: {ne: ''}}, limit: limit || 100, nextToken: nextToken}, query, 'getRequestsForUser')
			.then(result => {
				result = result?.listRequestsByType
				if (result === undefined) {
					return Promise.reject(new Error('Failed to get Requests.'))
				}
				return result
			})
	},
	addInsuranceCompaniesToOffice(officeId, newInsuranceCompanies) {
		return officeAPI.getOfficeById(officeId)
			.then(office => newInsuranceCompanies.map(newCompany => {
				newCompany.officeId = office.id
				newCompany.officeName = office.officeName
			}))
			.then(enrichedInsuranceCompanies => docClient.update({
				TableName: 'Office' + ddbSuffix,
				Key: {id: officeId},
				KeyConditionExpression: 'SET #ownedInsuranceCompanies = list_append(#ownedInsuranceCompanies, :newInsuranceCompanies)',
				ExpressionAttributeNames: {'#ownedInsuranceCompanies': 'ownedInsuranceCompanies'},
				ExpressionAttributeValues: {':newInsuranceCompanies': enrichedInsuranceCompanies},
			}).promise())
	},
	getInsuranceCompaniesOfOffice(officeId) {
		return docClient.get({
			TableName: 'Office' + ddbSuffix,
			Key: {id: officeId},
			ProjectionExpression: "allInsuranceCompanies",
		})
			.promise()
			.then(res => res.Item)
	},
	removeInsuranceCompaniesFromOffice(officeId, insuranceCompanyCodes) {
		return module.exports.getInsuranceCompaniesOfOffice(officeId)
			.then((companies) => companies.filter((company) => !insuranceCompanyCodes.contains(company.code)))
			.then(new_companies => docClient.update({
					TableName: 'Office' + ddbSuffix,
					Key: {id: officeId},
					KeyConditionExpression: 'SET #ownedInsuranceCompanies = :newInsuranceCompanies',
					ExpressionAttributeNames: {'#ownedInsuranceCompanies': 'ownedInsuranceCompanies'},
					ExpressionAttributeValues: {':newInsuranceCompanies': new_companies},
				}).promise()
			)
			.then(() => officeId)
	}
}
