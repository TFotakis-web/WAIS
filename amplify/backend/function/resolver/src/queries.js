module.exports = {
  listTestTypes: `query listTestTypes(){
    listTestTypes {
      items {
        id
      }
    }
  }`,
  getUserProfileByUsername: `query getUserProfileByUsername($username: username){
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
  getAdminRequest: `query getAdminRequest($input: requestId){
    listAdminRequestss(filter: {id: {eq: "$input"}}) {
      items {
        id
        info
        logo
        tin
        postcode
        userId
        updatedAt
        tradeName
        tradeId
      }
    }
  }`,
  approveAdminRequest: `mutation approveAdminRequest($id: ID, $officeInput: CreateOfficeInput){
    deleteAdminRequests(input: {id: $id}) {
      tradeName
    }
    createOffice(input: $officeInput) {
      tradeName
    }
  }`,
}
