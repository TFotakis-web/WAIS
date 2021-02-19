const gqlQueries = require('./gql_queries')
module.exports = {
  /**
   * Initialize all required data structures for a new user.
   *
   * @param {Dict} event
   */
  initUser: async event => {
    console.log('InitUser with event: ' + JSON.stringify(event))
    const userProfileItem = {
      username: event.username,
      email: event.email,
      telephone: event.phone_number,
      surname: null,
      name: null,
      fathers_name: null,
      address: null,
      zip_code: null,
      mobile: null,
      phone: null,
      tin: null,
      verified: false,
      files: [],
    }
    return await gqlQueries.createUserProfile(userProfileItem)
  },

  checkUniqueEmail: async email => {
    console.log('CheckUniqueEmail with event: ' + email)
    let existingProfile = await gqlQueries.getUserProfileByEmailConsistently(email)
    return Object.keys(existingProfile.data).length == 0 ? 'ACCEPT' : 'REJECT'
  },
}
