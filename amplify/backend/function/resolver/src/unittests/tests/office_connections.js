const assert = require('assert')
const util = require('util');

module.exports = {
	test: async (ddb, gql, gateway) => {
		// await gateway.getOfficesOfUser({username: 'tfotakis'})
		// await gateway.getContractorUserProfilesForManagerUsername({username: 'tfotakis'})
		// await gateway.getEmployeeUserProfilesForManagerUsername({username: 'tfotakis'})

		await gateway.getPartnerSummary({username: 'tfotakis'})
	}
}
