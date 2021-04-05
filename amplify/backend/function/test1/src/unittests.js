const gqlAPI = require('./api/utils/gql_utils')
const ddbAPI = require('./api/utils/ddb_utils')
const fs = require('fs')

module.exports = {
	run: async (event) => {
		console.log("debugAPI.run: " + JSON.stringify(event))
		const context = event.debug
		if (context.truncate_data) {
			await module.exports.truncate_data(context)
		}
		if (context.load_data) {
			await module.exports.load_data(context)
		}
		console.log("debugAPI.result: " + JSON.stringify(event))
	},
	truncate_data: async (context) => {

	},
	load_data: async (context) => {
		fs.readFile(context["data_location"], 'utf8', function (err, data) {
			if (err) {
				return console.log(err);
			}
			console.log(data);
		});
	}
}
