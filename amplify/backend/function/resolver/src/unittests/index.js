const crud_tests = require('./tests/crud_tests')
const office_user_partnership_tests = require('./tests/office_user_partnership_tests')

const gateway = require('../gateway')
const gql = require('../utils/gql')

module.exports = {
	run: () => {
		return crud_tests.UserProfile(gql, gateway)
			.then(() => office_user_partnership_tests.officeConnectionsTest(gql, gateway))
	}
}
