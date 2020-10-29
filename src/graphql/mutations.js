/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTrade = /* GraphQL */ `
  mutation CreateTrade(
    $input: CreateTradeInput!
    $condition: ModelTradeConditionInput
  ) {
    createTrade(input: $input, condition: $condition) {
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
export const updateTrade = /* GraphQL */ `
  mutation UpdateTrade(
    $input: UpdateTradeInput!
    $condition: ModelTradeConditionInput
  ) {
    updateTrade(input: $input, condition: $condition) {
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
export const deleteTrade = /* GraphQL */ `
  mutation DeleteTrade(
    $input: DeleteTradeInput!
    $condition: ModelTradeConditionInput
  ) {
    deleteTrade(input: $input, condition: $condition) {
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
export const createVehicle = /* GraphQL */ `
  mutation CreateVehicle(
    $input: CreateVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    createVehicle(input: $input, condition: $condition) {
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
export const updateVehicle = /* GraphQL */ `
  mutation UpdateVehicle(
    $input: UpdateVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    updateVehicle(input: $input, condition: $condition) {
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
export const deleteVehicle = /* GraphQL */ `
  mutation DeleteVehicle(
    $input: DeleteVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    deleteVehicle(input: $input, condition: $condition) {
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
export const createUserProfile = /* GraphQL */ `
  mutation CreateUserProfile(
    $input: CreateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    createUserProfile(input: $input, condition: $condition) {
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
export const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile(
    $input: UpdateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    updateUserProfile(input: $input, condition: $condition) {
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
export const deleteUserProfile = /* GraphQL */ `
  mutation DeleteUserProfile(
    $input: DeleteUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    deleteUserProfile(input: $input, condition: $condition) {
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
