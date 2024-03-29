const crud_tests = require('./tests/crud_tests')
const office_user_partnership_tests = require('./tests/office_user_partnership_tests')
const office_connections_tests = require('./tests/office_connections')

const gateway = require('../gateway')
const ddb = require('../utils/ddb')
const gql = require('../utils/gql')

module.exports = {
	run: async (input) => {
		console.log("debugAPI.run: " + JSON.stringify(input))

		//tests
		try {
			await crud_tests.UserProfile(ddb, gql, gateway)
			await office_user_partnership_tests.officeConnectionsTest(ddb, gql, gateway)
			await office_connections_tests.test(ddb, gql, gateway)
		} catch (err) {
			console.error(err)
		}

		console.log("debugAPI.result: " + JSON.stringify({'status': 'OK'}))
		return {}
	}
}
