//Init the DDB client and update regional settings
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

	getRequestById: async (id) => {
		console.log('getRequestById id: ' + id)
		try {
			const resp = await ddb
				.get({
					TableName: 'Requests' + ddbSuffix,
					Key: {id: id},
				})
				.promise()
			console.log('getRequestById result: ' + JSON.stringify(resp))
			if (!resp.Item) {
				return null
			}
			return resp.Item
		} catch (err) {
			return err
		}
	},

	getUserProfileByEmail: async (email) => {
		console.log('getUserProfileByEmail email: ' + email)
		try {
			const resp = await ddb
				.query({
					TableName: 'UserProfile' + ddbSuffix,
					IndexName: 'byEmail',
					ExpressionAttributeNames: {'#emailField': 'email'},
					ExpressionAttributeValues: {':emailValue': email},
					KeyConditionExpression: '#emailField = :emailValue',
				})
				.promise()
			console.log('getUserProfileByEmail result: ' + JSON.stringify(resp))
			if (!resp.Items) {
				return null
			}
			return resp.Items[0]
		} catch (err) {
			return err
		}
	},

	getUserProfileByUsername: async (username) => {
		console.log('getUserProfileByUsername username: ' + username)
		try {
			const resp = await ddb
				.query({
					TableName: 'UserProfile' + ddbSuffix,
					IndexName: 'byUsername',
					ExpressionAttributeNames: {'#usernameField': 'username'},
					ExpressionAttributeValues: {':usernameValue': username},
					KeyConditionExpression: '#usernameField = :usernameValue',
				})
				.promise()
			console.log('getUserProfileByUsername result: ' + JSON.stringify(resp))
			if (!resp.Items) {
				return null
			}
			return resp.Items[0]
		} catch (err) {
			return err
		}
	},

	getUserProfileByEmailConsistently: async (email) => {
		console.log('getUserProfileByEmailConsistently email: ' + email)
		try {
			const resp = await ddb
				.query({
					TableName: 'UserProfile' + ddbSuffix,
					IndexName: 'byEmail',
					ConsistentRead: true,
					ExpressionAttributeNames: {'#emailField': 'email'},
					ExpressionAttributeValues: {':emailValue': email},
					KeyConditionExpression: '#emailField = :emailValue',
				})
				.promise()
			console.log('getUserProfileByEmailConsistently result: ' + JSON.stringify(resp))
			if (!resp.Items) {
				return null
			}
			return resp.Items[0]
		} catch (err) {
			return err
		}
	},

	getOfficeByOwnerUsername: async (username) => {
		console.log('getOfficeByOwnerUsername username: ' + username)
		try {
			const resp = await ddb
				.query({
					TableName: 'Office' + ddbSuffix,
					IndexName: 'byOwnerUsername',
					ExpressionAttributeNames: {'#ownerUsernameFieldName': 'ownerUsername'},
					KeyConditionExpression: '#ownerUsernameFieldName = :inputUsername',
					ExpressionAttributeValues: {':inputUsername': username},
				})
				.promise()
			console.log('getOfficeByOwnerUsername result: ' + JSON.stringify(resp))
			if (!resp.Items) {
				return null
			}
			return resp.Items[0]
		} catch (err) {
			return err
		}
	},
	createOfficeIfNotExists: async (item) => {
		console.log('Attempting to add a new Office: ' + JSON.stringify(item))
		try {
			const resp = await ddb
				.Put({
					TableName: 'Office' + ddbSuffix,
					Item: item,
				})
				.promise()
			console.log("Result of 'createOfficeIfNotExists': " + JSON.stringify(resp))
			return resp
		} catch (err) {
			return err
		}
	},

	deleteRequestById: async (id) => {
		console.log('Deleting request with ID: ' + id)
		try {
			const resp = await ddb
				.Delete({
					TableName: 'Office' + ddbSuffix,
					Key: {id: id},
				})
				.promise()
			console.log("Result of 'deleteRequestById': " + JSON.stringify(resp))
			return resp
		} catch (err) {
			return err
		}
	},

	/**
	 * Deletes all requested IDs in their respective tables.
	 * @param tableItems A dictionary of table names and a list of IDs in each table that need to be deleted.
	 */
	deleteItemsFromTables: async (tableItems) => {
		console.log(`Deleting items`)

		for (let tableName of Object.keys(tableItems)) {
			const ids = tableItems[tableName]
			const idGroups = [];

			for (let i = 0; i < ids.length; i += 25) {
				idGroups.push(ids.slice(i, i + 25));
			}

			for (let gs of idGroups) {
				let delReqs = [];
				for (let id of gs) {
					delReqs.push({DeleteRequest: {Key: {id}}});
				}
				let RequestItems = {};
				RequestItems[tableName] = delReqs;
				let error
				await ddb
					.batchWrite({RequestItems})
					.promise()
					.catch((e) => error = e);
				if (error) {
					throw error
				}
			}
			console.log(`Deleted ${ids.length} items from table ${tableName}.`)
		}
		console.log('Deleted all requested items.')
	}
}
