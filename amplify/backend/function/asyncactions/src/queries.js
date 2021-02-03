module.exports = {
  createUserProfile: `
    mutation createUserProfile($input: CreateUserProfileInput!) {
      createUserProfile(input: $input) {
        id
        username
      }
    }
  `,
}
