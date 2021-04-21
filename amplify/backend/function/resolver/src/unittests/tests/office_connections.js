const assert = require('assert')
const util = require('util');

module.exports = {
	test: async (ddb, gql, gateway) => {
		// await gateway.getOfficesOfUser({username: 'tfotakis'})
		// await gateway.getContractorUserProfilesForManagerUsername({username: 'tfotakis'})
		// await gateway.getEmployeeUserProfilesForManagerUsername({username: 'tfotakis'})
		//await gateway.getPartnerSummary({username: 'tfotakis'})

		const office = await gateway.getOfficesOfUser({username: 'username_2'})
		console.log(JSON.stringify(office))
	}
}
