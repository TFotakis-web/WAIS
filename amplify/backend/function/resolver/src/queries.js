module.exports = {
  listTestTypes: `query listTestTypes(){
    listTestTypes {
      items {
        id
      }
    }
  }`,
  getUserProfileByUsername: `query getUserProfileByUsername($username: String){
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
  getUserPermissions: `query getUserPermissions($username: String!, $tradeName: String!){
    listTradeUserConnections(filter: {and: [{tradeName: {eq: $username}},{username: {eq: $tradeName}}]}) {
      items {
        permissions {
          department
          write
          read
        }
      }
    }
  }`,
  createAdminRequest: `mutation createAdminRequest($input: CreateAdminRequestInput!) {
    createAdminRequests(input: $input) {
      expiresAt
    }
  }`,
  getAdminRequest: `query getAdminRequest($input: ID!){
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
  listContracts: `query listContracts($filter: ModelContractFilterInput,$limit: Int,$nextToken: String){
    listContracts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        co_name
        co_TRN
        contractId
        contractState
        contractorId
        creationDate
        createdAt
        customerId
        discount
        data
        driversLicense {
          Category {
            category
            expiresAt
            issueDate
          }
          LicenseID
          DriversLicenseType
        }
        duration
        endDate
        id
        insuranceClass
        insuranceCoverage
        insuranceUsage
        jointWorth
        netWorth
        startDate
        second_tradeId
        tradeName
        vehicle {
          file {
            bucket
            key
            region
          }
          color
          createdAt
          displacement
          eurotax
          fuelType
          firstRegistrationDate
          id
          manufacturer
          model
          vin
          vehicle_owner
          usage
          value
          trim
          updatedAt
          tradeName
          taxableHorsepower
          purchaseDate
          passengers
          numberPlate
        }
        voucherId
        version
        vehicleNumberPlate
        vehicleId
      }
      nextToken
    }
  }`,
}
