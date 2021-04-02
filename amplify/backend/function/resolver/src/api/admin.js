const gqlUtil = require('./utils/gql_utils')

const AWS = require('aws-sdk')
AWS.config.update({
	region: process.env.REGION,
})
const s3 = new AWS.S3()
const bucket = process.env.STORAGE_WAISSTORAGE_BUCKETNAME

module.exports = {
	/* Queries */
	getS3Object: async (username, email, s3obj, groups) => {
		console.log('admin.getS3Object input: ' + [username, email, JSON.stringify(s3obj), JSON.stringify(groups)])
		const path = `${s3obj.level}/${s3obj.idToken}/${s3obj.filePath}/${s3obj.filename}`
		const data = await s3.getObject({ Bucket: bucket, Key: path }).promise()
		const result = data.Body.toString('base64')
		console.log('admin.getS3Object preview output: ' + JSON.stringify(result.substring(0, 10)))
		return result
	},
}
