const assert = require('assert')
const util = require('util');

module.exports = {
	test: async (ddb, gql, gateway) => {
		const f = await gateway.getContractorUserProfilesForManagerUsername({username: 'tfotakis'})
		console.log(JSON.stringify(f))
	}
}
