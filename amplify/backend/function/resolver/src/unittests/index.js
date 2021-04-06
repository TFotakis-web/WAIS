const ddb = require('../utils/ddb')
const gql = require('../utils/gql')
const crud_tests = require('./tests/crud_tests')

module.exports = {
	run: async (input) => {
		console.log("debugAPI.run: " + JSON.stringify(input))
		const args = input.arguments
		const username = input.username

		//Connection test
		const query = /* GraphQL */ `
			query getUserProfileByUsername($username: String!) {
				listUserProfileByUsername(username: $username) {
					items {
						username
					}
				}
			}
		`
		const response = await gql.execute({username: username}, query, 'getUserProfileByUsername')
		console.log(`Connection check: ${JSON.stringify(response.data.listUserProfileByUsername.items[0])}`)

		//tests
		await crud_tests.UserProfile(ddb, gql)

		console.log("debugAPI.result: " + JSON.stringify(input))
	}
}
