module.exports = {
  createUserProfile: `
    mutation createUserProfile($input: CreateUserProfileInput!) {
      createUserProfile(input: $input) {
        id
        username
      }
    }
  `,
  createUserWallet: `
    mutation createUserWallet($input CreateUserWalletInput!){
      createUserWallet(input: $input) {
        id: ID
        username: String!
        balance: Float!
      }
    }
  `,
}
