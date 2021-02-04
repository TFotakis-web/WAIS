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
        username
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
        tradeCon{
          tradeName
          employeeType
          permissions{
            department
            read
            write
          }
        }
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
  listCustomers: `query listCustomers($filter: ModelCustomerFilterInput,$limit: Int,$nextToken: String){
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        address
        birthDate
        creationDate
        createdAt
        doy
        driversLicense {
          Category {
            category
            expiresAt
            issueDate
          }
          DriversLicenseType
          LicenseID
        }
        email
        familyStatus
        fathersName
        firstName
        files {
          bucket
          key
          region
        }
        gender
        id
        lastName
        mobile
        postcode
        tin
        tradeName
        updatedAt
      }
      nextToken
    }
  }`,
}
