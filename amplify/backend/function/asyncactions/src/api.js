const queries = require('./queries')
module.exports = {
	/**
	 * Initialize all required data structures for a new user.
	 *
	 * @param {Dict} event
	 */
	initUser: (event) => {
		console.log('InitUser with event: ' + JSON.stringify(event))
		const userProfileItem = {
			username: event.username,
			email: event.email,
			telephone: event.phone_number,
			role: 'UNKNOWN',
			name: null,
			fathers_name: null,
			address: null,
			zip_code: null,
			mobile: null,
			tin: null,
			family_name: null,
			gender: null,
			birthdate: null,
			city: null,
			profilePicture: null,
			preferences: "{}",
			locale: null,
			files: [],
		}
		return queries.createUserProfile(userProfileItem)
	},

	checkUniqueEmail: (email) => {
		return queries.getUserProfileByEmail(email)
			.then(id => {
				return !id;
			})
	},
}
