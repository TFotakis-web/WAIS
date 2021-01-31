module.exports = {
  listTestTypes: `query listTestTypes(){
    listTestTypes {
      items {
        id
      }
    }
  }`
  ,getUserProfileByUsername: `query getUserProfileByUsername($username: username){
    listUserProfiles(filter: {username: {eq: $username}}, limit: 1) {
      items {
        id
        chamberRecordNumber
        createdAt
        doy
        familyStatus
        file {
          bucket
          key
          region
        }
        insuranceLicenseExpirationDate
        partnersNumberLimit
        professionStartDate
        telephone
        tin
        updatedAt
        username
      }
    }
  }`,
  createAdminRequest: `mutation createAdminRequest($input: CreateAdminRequestInput!) {
    createAdminRequests(input: $input) {
      expiresAt
    }
  }`,
  approveAdminRequest: `mutation approveAdminRequest($id: id!, $tradeInput: CreateTradeInput!) {
    deleteAdminRequests(input: $id) {
      id
    }
  }`,
}
