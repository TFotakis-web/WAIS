/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTrade = /* GraphQL */ `
  query GetTrade($id: ID!) {
    getTrade(id: $id) {
      id
      name
      info
      postcode
      tin
      logo
      companyAccess {
        companyName
        from
        expirationDate
        active
        info
      }
      owner
      employees
      contractors
      customers {
        id
        tin
        name
        surname
        fathersName
        birthDate
        gender
        email
        mobile
        postcode
        doy
        address
        familyStatus
        creationDate
        files {
          name
          url
        }
        driversLicense {
          LicenseID
          DriversLicenseType
        }
      }
      contracts {
        id
        customer {
          id
          tin
          name
          surname
          fathersName
          birthDate
          gender
          email
          mobile
          postcode
          doy
          address
          familyStatus
          creationDate
        }
        contractId
        voucherID
        contractState
        tradeAdmin
        assignee
        partner
        company
        insuranceClass
        insuranceCoverage
        insuranceUsage
        vehicle {
          id
          numberPlate
          color
          manufacturer
          model
          owner
          trim
          fuelType
          usage
          displacement
          eurotax
          firstRegistrationDate
          passengers
          purchaseDate
          taxableHorsepower
          vin
          value
          createdAt
          updatedAt
        }
        duration
        creationDate
        startDate
        endDate
        data
        discount
        jointWorth
        netWorth
        driversLicense {
          LicenseID
          DriversLicenseType
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTrades = /* GraphQL */ `
  query ListTrades(
    $filter: ModelTradeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrades(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        info
        postcode
        tin
        logo
        companyAccess {
          companyName
          from
          expirationDate
          active
          info
        }
        owner
        employees
        contractors
        customers {
          id
          tin
          name
          surname
          fathersName
          birthDate
          gender
          email
          mobile
          postcode
          doy
          address
          familyStatus
          creationDate
        }
        contracts {
          id
          contractId
          voucherID
          contractState
          tradeAdmin
          assignee
          partner
          company
          insuranceClass
          insuranceCoverage
          insuranceUsage
          duration
          creationDate
          startDate
          endDate
          data
          discount
          jointWorth
          netWorth
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getVehicle = /* GraphQL */ `
  query GetVehicle($id: ID!) {
    getVehicle(id: $id) {
      id
      numberPlate
      color
      manufacturer
      model
      owner
      trim
      fuelType
      usage
      displacement
      eurotax
      firstRegistrationDate
      passengers
      purchaseDate
      taxableHorsepower
      vin
      value
      file {
        name
        url
      }
      createdAt
      updatedAt
    }
  }
`;
export const listVehicles = /* GraphQL */ `
  query ListVehicles(
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVehicles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        numberPlate
        color
        manufacturer
        model
        owner
        trim
        fuelType
        usage
        displacement
        eurotax
        firstRegistrationDate
        passengers
        purchaseDate
        taxableHorsepower
        vin
        value
        file {
          name
          url
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      id
      userID
      permissions {
        department
        read
        write
      }
      preferences
      telephone
      tin
      doy
      familyStatus
      creationDate
      chamberRecordNumber
      insuranceLicenseExpirationDate
      partnersNumberLimit
      professionStartDate
      message
      valid
      file {
        name
        url
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUserProfiles = /* GraphQL */ `
  query ListUserProfiles(
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        permissions {
          department
          read
          write
        }
        preferences
        telephone
        tin
        doy
        familyStatus
        creationDate
        chamberRecordNumber
        insuranceLicenseExpirationDate
        partnersNumberLimit
        professionStartDate
        message
        valid
        file {
          name
          url
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
