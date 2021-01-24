/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTrade = /* GraphQL */ `
  subscription OnCreateTrade {
    onCreateTrade {
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
export const onUpdateTrade = /* GraphQL */ `
  subscription OnUpdateTrade {
    onUpdateTrade {
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
export const onDeleteTrade = /* GraphQL */ `
  subscription OnDeleteTrade {
    onDeleteTrade {
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
export const onCreateVehicle = /* GraphQL */ `
  subscription OnCreateVehicle {
    onCreateVehicle {
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
export const onUpdateVehicle = /* GraphQL */ `
  subscription OnUpdateVehicle {
    onUpdateVehicle {
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
export const onDeleteVehicle = /* GraphQL */ `
  subscription OnDeleteVehicle {
    onDeleteVehicle {
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
export const onCreateUserProfile = /* GraphQL */ `
  subscription OnCreateUserProfile {
    onCreateUserProfile {
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
export const onUpdateUserProfile = /* GraphQL */ `
  subscription OnUpdateUserProfile {
    onUpdateUserProfile {
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
export const onDeleteUserProfile = /* GraphQL */ `
  subscription OnDeleteUserProfile {
    onDeleteUserProfile {
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
