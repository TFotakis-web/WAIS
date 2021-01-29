module.exports = {
  createAdminRequest: `mutation createAdminRequest($input: CreateAdminRequestInput!) {
      createAdminRequest(input: $input) {
        expiresAt
      }
    }
    `,
}
