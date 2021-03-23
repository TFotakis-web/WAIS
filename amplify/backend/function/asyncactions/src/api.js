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
      tin: null,
      family_name: null,
      gender: null,
      birthdate: null,
      city: null,
      profilePicture: null,
      preferences: null,
      locale: null,
      pagePermissions: JSON.stringify({}),
      modelPermissions: JSON.stringify({}),
      files: [],
    }
    return await gqlQueries.createUserProfile(userProfileItem)
  },

  checkUniqueEmail: async email => {
    console.log('CheckUniqueEmail input: ' + email)
    let existingProfile = await gqlQueries.getUserProfileIdByEmail(email)
    let result = existingProfile ? 'REJECT' : 'ACCEPT'
    console.log('CheckUniqueEmail output: ' + result)
    return result
  },
}
