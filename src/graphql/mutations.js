/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOffice = /* GraphQL */ `
  mutation CreateOffice(
    $input: CreateOfficeInput!
    $condition: ModelOfficeConditionInput
  ) {
    createOffice(input: $input, condition: $condition) {
      id
      tradeName
      ownerUsername
      ownerId
      tin
      logo
      info
      postcode
      createdAt
      updatedAt
      members
      ownerProfile {
        id
        username
        telephone
        tin
        doy
        familyStatus
        chamberRecordNumber
        insuranceLicenseExpirationDate
        partnersNumberLimit
        professionStartDate
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
      }
      customers {
        items {
          id
          tin
          tradeName
          firstName
          lastName
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
          members
          createdAt
          updatedAt
        }
        nextToken
      }
      employees {
        items {
          id
          tradeId
          tradeName
          userId
          username
          employeeType
          preferences
          members
          createdAt
          updatedAt
        }
        nextToken
      }
      contractors {
        items {
          id
          tradeId
          tradeName
          userId
          username
          employeeType
          preferences
          members
          createdAt
          updatedAt
        }
        nextToken
      }
      contractConnections {
        items {
          id
          tradeId
          tradeName
          contractId
          ownsContract
          createdAt
          updatedAt
        }
        nextToken
      }
      fromCompanyAccess {
        items {
          id
          fromId
          fromTradeName
          toId
          toTradeName
          expirationDate
          message
          createdAt
          updatedAt
        }
        nextToken
      }
      toCompanyAccess {
        items {
          id
          fromId
          fromTradeName
          toId
          toTradeName
          expirationDate
          message
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateOffice = /* GraphQL */ `
  mutation UpdateOffice(
    $input: UpdateOfficeInput!
    $condition: ModelOfficeConditionInput
  ) {
    updateOffice(input: $input, condition: $condition) {
      id
      tradeName
      ownerUsername
      ownerId
      tin
      logo
      info
      postcode
      createdAt
      updatedAt
      members
      ownerProfile {
        id
        username
        telephone
        tin
        doy
        familyStatus
        chamberRecordNumber
        insuranceLicenseExpirationDate
        partnersNumberLimit
        professionStartDate
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
      }
      customers {
        items {
          id
          tin
          tradeName
          firstName
          lastName
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
          members
          createdAt
          updatedAt
        }
        nextToken
      }
      employees {
        items {
          id
          tradeId
          tradeName
          userId
          username
          employeeType
          preferences
          members
          createdAt
          updatedAt
        }
        nextToken
      }
      contractors {
        items {
          id
          tradeId
          tradeName
          userId
          username
          employeeType
          preferences
          members
          createdAt
          updatedAt
        }
        nextToken
      }
      contractConnections {
        items {
          id
          tradeId
          tradeName
          contractId
          ownsContract
          createdAt
          updatedAt
        }
        nextToken
      }
      fromCompanyAccess {
        items {
          id
          fromId
          fromTradeName
          toId
          toTradeName
          expirationDate
          message
          createdAt
          updatedAt
        }
        nextToken
      }
      toCompanyAccess {
        items {
          id
          fromId
          fromTradeName
          toId
          toTradeName
          expirationDate
          message
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteOffice = /* GraphQL */ `
  mutation DeleteOffice(
    $input: DeleteOfficeInput!
    $condition: ModelOfficeConditionInput
  ) {
    deleteOffice(input: $input, condition: $condition) {
      id
      tradeName
      ownerUsername
      ownerId
      tin
      logo
      info
      postcode
      createdAt
      updatedAt
      members
      ownerProfile {
        id
        username
        telephone
        tin
        doy
        familyStatus
        chamberRecordNumber
        insuranceLicenseExpirationDate
        partnersNumberLimit
        professionStartDate
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
      }
      customers {
        items {
          id
          tin
          tradeName
          firstName
          lastName
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
          members
          createdAt
          updatedAt
        }
        nextToken
      }
      employees {
        items {
          id
          tradeId
          tradeName
          userId
          username
          employeeType
          preferences
          members
          createdAt
          updatedAt
        }
        nextToken
      }
      contractors {
        items {
          id
          tradeId
          tradeName
          userId
          username
          employeeType
          preferences
          members
          createdAt
          updatedAt
        }
        nextToken
      }
      contractConnections {
        items {
          id
          tradeId
          tradeName
          contractId
          ownsContract
          createdAt
          updatedAt
        }
        nextToken
      }
      fromCompanyAccess {
        items {
          id
          fromId
          fromTradeName
          toId
          toTradeName
          expirationDate
          message
          createdAt
          updatedAt
        }
        nextToken
      }
      toCompanyAccess {
        items {
          id
          fromId
          fromTradeName
          toId
          toTradeName
          expirationDate
          message
          createdAt
          updatedAt
        }
        nextToken
      }
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
      username
      telephone
      tin
      doy
      familyStatus
      chamberRecordNumber
      insuranceLicenseExpirationDate
      partnersNumberLimit
      professionStartDate
      file {
        bucket
        region
        key
      }
      createdAt
      updatedAt
      tradeCon {
        items {
          id
          tradeId
          tradeName
          userId
          username
          employeeType
          preferences
          members
          createdAt
          updatedAt
        }
        nextToken
      }
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
      username
      telephone
      tin
      doy
      familyStatus
      chamberRecordNumber
      insuranceLicenseExpirationDate
      partnersNumberLimit
      professionStartDate
      file {
        bucket
        region
        key
      }
      createdAt
      updatedAt
      tradeCon {
        items {
          id
          tradeId
          tradeName
          userId
          username
          employeeType
          preferences
          members
          createdAt
          updatedAt
        }
        nextToken
      }
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
      username
      telephone
      tin
      doy
      familyStatus
      chamberRecordNumber
      insuranceLicenseExpirationDate
      partnersNumberLimit
      professionStartDate
      file {
        bucket
        region
        key
      }
      createdAt
      updatedAt
      tradeCon {
        items {
          id
          tradeId
          tradeName
          userId
          username
          employeeType
          preferences
          members
          createdAt
          updatedAt
        }
        nextToken
      }
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
      tradeName
      color
      manufacturer
      model
      vehicle_owner
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
        bucket
        region
        key
      }
      members
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
      tradeName
      color
      manufacturer
      model
      vehicle_owner
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
        bucket
        region
        key
      }
      members
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
      tradeName
      color
      manufacturer
      model
      vehicle_owner
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
        bucket
        region
        key
      }
      members
      createdAt
      updatedAt
    }
  }
`;
export const createContract = /* GraphQL */ `
  mutation CreateContract(
    $input: CreateContractInput!
    $condition: ModelContractConditionInput
  ) {
    createContract(input: $input, condition: $condition) {
      id
      vehicleNumberPlate
      vehicleId
      voucherId
      customerId
      tradeName
      second_tradeId
      contractorId
      co_name
      co_TRN
      contractState
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
      driversLicense {
        LicenseID
        DriversLicenseType
        Category {
          category
          issueDate
          expiresAt
        }
      }
      members
      createdAt
      updatedAt
      vehicle {
        id
        numberPlate
        tradeName
        color
        manufacturer
        model
        vehicle_owner
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
          bucket
          region
          key
        }
        members
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateContract = /* GraphQL */ `
  mutation UpdateContract(
    $input: UpdateContractInput!
    $condition: ModelContractConditionInput
  ) {
    updateContract(input: $input, condition: $condition) {
      id
      vehicleNumberPlate
      vehicleId
      voucherId
      customerId
      tradeName
      second_tradeId
      contractorId
      co_name
      co_TRN
      contractState
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
      driversLicense {
        LicenseID
        DriversLicenseType
        Category {
          category
          issueDate
          expiresAt
        }
      }
      members
      createdAt
      updatedAt
      vehicle {
        id
        numberPlate
        tradeName
        color
        manufacturer
        model
        vehicle_owner
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
          bucket
          region
          key
        }
        members
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteContract = /* GraphQL */ `
  mutation DeleteContract(
    $input: DeleteContractInput!
    $condition: ModelContractConditionInput
  ) {
    deleteContract(input: $input, condition: $condition) {
      id
      vehicleNumberPlate
      vehicleId
      voucherId
      customerId
      tradeName
      second_tradeId
      contractorId
      co_name
      co_TRN
      contractState
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
      driversLicense {
        LicenseID
        DriversLicenseType
        Category {
          category
          issueDate
          expiresAt
        }
      }
      members
      createdAt
      updatedAt
      vehicle {
        id
        numberPlate
        tradeName
        color
        manufacturer
        model
        vehicle_owner
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
          bucket
          region
          key
        }
        members
        createdAt
        updatedAt
      }
    }
  }
`;
export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
      id
      tin
      tradeName
      firstName
      lastName
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
        bucket
        region
        key
      }
      driversLicense {
        LicenseID
        DriversLicenseType
        Category {
          category
          issueDate
          expiresAt
        }
      }
      members
      createdAt
      updatedAt
    }
  }
`;
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
      id
      tin
      tradeName
      firstName
      lastName
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
        bucket
        region
        key
      }
      driversLicense {
        LicenseID
        DriversLicenseType
        Category {
          category
          issueDate
          expiresAt
        }
      }
      members
      createdAt
      updatedAt
    }
  }
`;
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
      id
      tin
      tradeName
      firstName
      lastName
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
        bucket
        region
        key
      }
      driversLicense {
        LicenseID
        DriversLicenseType
        Category {
          category
          issueDate
          expiresAt
        }
      }
      members
      createdAt
      updatedAt
    }
  }
`;
export const createTradeUserConnection = /* GraphQL */ `
  mutation CreateTradeUserConnection(
    $input: CreateTradeUserConnectionInput!
    $condition: ModelTradeUserConnectionConditionInput
  ) {
    createTradeUserConnection(input: $input, condition: $condition) {
      id
      tradeId
      tradeName
      userId
      username
      permissions {
        department
        read
        write
      }
      employeeType
      preferences
      members
      createdAt
      updatedAt
      trade {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        createdAt
        updatedAt
        members
        ownerProfile {
          id
          username
          telephone
          tin
          doy
          familyStatus
          chamberRecordNumber
          insuranceLicenseExpirationDate
          partnersNumberLimit
          professionStartDate
          createdAt
          updatedAt
        }
        customers {
          nextToken
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractConnections {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
      }
      user {
        id
        username
        telephone
        tin
        doy
        familyStatus
        chamberRecordNumber
        insuranceLicenseExpirationDate
        partnersNumberLimit
        professionStartDate
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
      }
    }
  }
`;
export const updateTradeUserConnection = /* GraphQL */ `
  mutation UpdateTradeUserConnection(
    $input: UpdateTradeUserConnectionInput!
    $condition: ModelTradeUserConnectionConditionInput
  ) {
    updateTradeUserConnection(input: $input, condition: $condition) {
      id
      tradeId
      tradeName
      userId
      username
      permissions {
        department
        read
        write
      }
      employeeType
      preferences
      members
      createdAt
      updatedAt
      trade {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        createdAt
        updatedAt
        members
        ownerProfile {
          id
          username
          telephone
          tin
          doy
          familyStatus
          chamberRecordNumber
          insuranceLicenseExpirationDate
          partnersNumberLimit
          professionStartDate
          createdAt
          updatedAt
        }
        customers {
          nextToken
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractConnections {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
      }
      user {
        id
        username
        telephone
        tin
        doy
        familyStatus
        chamberRecordNumber
        insuranceLicenseExpirationDate
        partnersNumberLimit
        professionStartDate
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
      }
    }
  }
`;
export const deleteTradeUserConnection = /* GraphQL */ `
  mutation DeleteTradeUserConnection(
    $input: DeleteTradeUserConnectionInput!
    $condition: ModelTradeUserConnectionConditionInput
  ) {
    deleteTradeUserConnection(input: $input, condition: $condition) {
      id
      tradeId
      tradeName
      userId
      username
      permissions {
        department
        read
        write
      }
      employeeType
      preferences
      members
      createdAt
      updatedAt
      trade {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        createdAt
        updatedAt
        members
        ownerProfile {
          id
          username
          telephone
          tin
          doy
          familyStatus
          chamberRecordNumber
          insuranceLicenseExpirationDate
          partnersNumberLimit
          professionStartDate
          createdAt
          updatedAt
        }
        customers {
          nextToken
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractConnections {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
      }
      user {
        id
        username
        telephone
        tin
        doy
        familyStatus
        chamberRecordNumber
        insuranceLicenseExpirationDate
        partnersNumberLimit
        professionStartDate
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
      }
    }
  }
`;
export const createCompanyAccessConnectionRequest = /* GraphQL */ `
  mutation CreateCompanyAccessConnectionRequest(
    $input: CreateCompanyAccessConnectionRequestInput!
    $condition: ModelCompanyAccessConnectionRequestConditionInput
  ) {
    createCompanyAccessConnectionRequest(input: $input, condition: $condition) {
      id
      fromId
      toId
      expirationDate
      message
      createdAt
      updatedAt
      from {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        createdAt
        updatedAt
        members
        ownerProfile {
          id
          username
          telephone
          tin
          doy
          familyStatus
          chamberRecordNumber
          insuranceLicenseExpirationDate
          partnersNumberLimit
          professionStartDate
          createdAt
          updatedAt
        }
        customers {
          nextToken
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractConnections {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
      }
      to {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        createdAt
        updatedAt
        members
        ownerProfile {
          id
          username
          telephone
          tin
          doy
          familyStatus
          chamberRecordNumber
          insuranceLicenseExpirationDate
          partnersNumberLimit
          professionStartDate
          createdAt
          updatedAt
        }
        customers {
          nextToken
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractConnections {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
      }
    }
  }
`;
export const updateCompanyAccessConnectionRequest = /* GraphQL */ `
  mutation UpdateCompanyAccessConnectionRequest(
    $input: UpdateCompanyAccessConnectionRequestInput!
    $condition: ModelCompanyAccessConnectionRequestConditionInput
  ) {
    updateCompanyAccessConnectionRequest(input: $input, condition: $condition) {
      id
      fromId
      toId
      expirationDate
      message
      createdAt
      updatedAt
      from {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        createdAt
        updatedAt
        members
        ownerProfile {
          id
          username
          telephone
          tin
          doy
          familyStatus
          chamberRecordNumber
          insuranceLicenseExpirationDate
          partnersNumberLimit
          professionStartDate
          createdAt
          updatedAt
        }
        customers {
          nextToken
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractConnections {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
      }
      to {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        createdAt
        updatedAt
        members
        ownerProfile {
          id
          username
          telephone
          tin
          doy
          familyStatus
          chamberRecordNumber
          insuranceLicenseExpirationDate
          partnersNumberLimit
          professionStartDate
          createdAt
          updatedAt
        }
        customers {
          nextToken
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractConnections {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
      }
    }
  }
`;
export const deleteCompanyAccessConnectionRequest = /* GraphQL */ `
  mutation DeleteCompanyAccessConnectionRequest(
    $input: DeleteCompanyAccessConnectionRequestInput!
    $condition: ModelCompanyAccessConnectionRequestConditionInput
  ) {
    deleteCompanyAccessConnectionRequest(input: $input, condition: $condition) {
      id
      fromId
      toId
      expirationDate
      message
      createdAt
      updatedAt
      from {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        createdAt
        updatedAt
        members
        ownerProfile {
          id
          username
          telephone
          tin
          doy
          familyStatus
          chamberRecordNumber
          insuranceLicenseExpirationDate
          partnersNumberLimit
          professionStartDate
          createdAt
          updatedAt
        }
        customers {
          nextToken
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractConnections {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
      }
      to {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        createdAt
        updatedAt
        members
        ownerProfile {
          id
          username
          telephone
          tin
          doy
          familyStatus
          chamberRecordNumber
          insuranceLicenseExpirationDate
          partnersNumberLimit
          professionStartDate
          createdAt
          updatedAt
        }
        customers {
          nextToken
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractConnections {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
      }
    }
  }
`;
export const createTradeContractConnection = /* GraphQL */ `
  mutation CreateTradeContractConnection(
    $input: CreateTradeContractConnectionInput!
    $condition: ModelTradeContractConnectionConditionInput
  ) {
    createTradeContractConnection(input: $input, condition: $condition) {
      id
      tradeId
      tradeName
      contractId
      ownsContract
      createdAt
      updatedAt
      trade {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        createdAt
        updatedAt
        members
        ownerProfile {
          id
          username
          telephone
          tin
          doy
          familyStatus
          chamberRecordNumber
          insuranceLicenseExpirationDate
          partnersNumberLimit
          professionStartDate
          createdAt
          updatedAt
        }
        customers {
          nextToken
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractConnections {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
      }
      contract {
        id
        vehicleNumberPlate
        vehicleId
        voucherId
        customerId
        tradeName
        second_tradeId
        contractorId
        co_name
        co_TRN
        contractState
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
        driversLicense {
          LicenseID
          DriversLicenseType
        }
        members
        createdAt
        updatedAt
        vehicle {
          id
          numberPlate
          tradeName
          color
          manufacturer
          model
          vehicle_owner
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
          members
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const updateTradeContractConnection = /* GraphQL */ `
  mutation UpdateTradeContractConnection(
    $input: UpdateTradeContractConnectionInput!
    $condition: ModelTradeContractConnectionConditionInput
  ) {
    updateTradeContractConnection(input: $input, condition: $condition) {
      id
      tradeId
      tradeName
      contractId
      ownsContract
      createdAt
      updatedAt
      trade {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        createdAt
        updatedAt
        members
        ownerProfile {
          id
          username
          telephone
          tin
          doy
          familyStatus
          chamberRecordNumber
          insuranceLicenseExpirationDate
          partnersNumberLimit
          professionStartDate
          createdAt
          updatedAt
        }
        customers {
          nextToken
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractConnections {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
      }
      contract {
        id
        vehicleNumberPlate
        vehicleId
        voucherId
        customerId
        tradeName
        second_tradeId
        contractorId
        co_name
        co_TRN
        contractState
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
        driversLicense {
          LicenseID
          DriversLicenseType
        }
        members
        createdAt
        updatedAt
        vehicle {
          id
          numberPlate
          tradeName
          color
          manufacturer
          model
          vehicle_owner
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
          members
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const deleteTradeContractConnection = /* GraphQL */ `
  mutation DeleteTradeContractConnection(
    $input: DeleteTradeContractConnectionInput!
    $condition: ModelTradeContractConnectionConditionInput
  ) {
    deleteTradeContractConnection(input: $input, condition: $condition) {
      id
      tradeId
      tradeName
      contractId
      ownsContract
      createdAt
      updatedAt
      trade {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        createdAt
        updatedAt
        members
        ownerProfile {
          id
          username
          telephone
          tin
          doy
          familyStatus
          chamberRecordNumber
          insuranceLicenseExpirationDate
          partnersNumberLimit
          professionStartDate
          createdAt
          updatedAt
        }
        customers {
          nextToken
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractConnections {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
      }
      contract {
        id
        vehicleNumberPlate
        vehicleId
        voucherId
        customerId
        tradeName
        second_tradeId
        contractorId
        co_name
        co_TRN
        contractState
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
        driversLicense {
          LicenseID
          DriversLicenseType
        }
        members
        createdAt
        updatedAt
        vehicle {
          id
          numberPlate
          tradeName
          color
          manufacturer
          model
          vehicle_owner
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
          members
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const createCompanyAccessConnection = /* GraphQL */ `
  mutation CreateCompanyAccessConnection(
    $input: CreateCompanyAccessConnectionInput!
    $condition: ModelCompanyAccessConnectionConditionInput
  ) {
    createCompanyAccessConnection(input: $input, condition: $condition) {
      id
      fromId
      fromTradeName
      toId
      toTradeName
      expirationDate
      message
      createdAt
      updatedAt
      from {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        createdAt
        updatedAt
        members
        ownerProfile {
          id
          username
          telephone
          tin
          doy
          familyStatus
          chamberRecordNumber
          insuranceLicenseExpirationDate
          partnersNumberLimit
          professionStartDate
          createdAt
          updatedAt
        }
        customers {
          nextToken
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractConnections {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
      }
      to {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        createdAt
        updatedAt
        members
        ownerProfile {
          id
          username
          telephone
          tin
          doy
          familyStatus
          chamberRecordNumber
          insuranceLicenseExpirationDate
          partnersNumberLimit
          professionStartDate
          createdAt
          updatedAt
        }
        customers {
          nextToken
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractConnections {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
      }
    }
  }
`;
export const updateCompanyAccessConnection = /* GraphQL */ `
  mutation UpdateCompanyAccessConnection(
    $input: UpdateCompanyAccessConnectionInput!
    $condition: ModelCompanyAccessConnectionConditionInput
  ) {
    updateCompanyAccessConnection(input: $input, condition: $condition) {
      id
      fromId
      fromTradeName
      toId
      toTradeName
      expirationDate
      message
      createdAt
      updatedAt
      from {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        createdAt
        updatedAt
        members
        ownerProfile {
          id
          username
          telephone
          tin
          doy
          familyStatus
          chamberRecordNumber
          insuranceLicenseExpirationDate
          partnersNumberLimit
          professionStartDate
          createdAt
          updatedAt
        }
        customers {
          nextToken
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractConnections {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
      }
      to {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        createdAt
        updatedAt
        members
        ownerProfile {
          id
          username
          telephone
          tin
          doy
          familyStatus
          chamberRecordNumber
          insuranceLicenseExpirationDate
          partnersNumberLimit
          professionStartDate
          createdAt
          updatedAt
        }
        customers {
          nextToken
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractConnections {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
      }
    }
  }
`;
export const deleteCompanyAccessConnection = /* GraphQL */ `
  mutation DeleteCompanyAccessConnection(
    $input: DeleteCompanyAccessConnectionInput!
    $condition: ModelCompanyAccessConnectionConditionInput
  ) {
    deleteCompanyAccessConnection(input: $input, condition: $condition) {
      id
      fromId
      fromTradeName
      toId
      toTradeName
      expirationDate
      message
      createdAt
      updatedAt
      from {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        createdAt
        updatedAt
        members
        ownerProfile {
          id
          username
          telephone
          tin
          doy
          familyStatus
          chamberRecordNumber
          insuranceLicenseExpirationDate
          partnersNumberLimit
          professionStartDate
          createdAt
          updatedAt
        }
        customers {
          nextToken
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractConnections {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
      }
      to {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        createdAt
        updatedAt
        members
        ownerProfile {
          id
          username
          telephone
          tin
          doy
          familyStatus
          chamberRecordNumber
          insuranceLicenseExpirationDate
          partnersNumberLimit
          professionStartDate
          createdAt
          updatedAt
        }
        customers {
          nextToken
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractConnections {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
      }
    }
  }
`;
export const createUserCalendarEvent = /* GraphQL */ `
  mutation CreateUserCalendarEvent(
    $input: CreateUserCalendarEventInput!
    $condition: ModelUserCalendarEventConditionInput
  ) {
    createUserCalendarEvent(input: $input, condition: $condition) {
      id
      username
      createdAt
      payload
      updatedAt
    }
  }
`;
export const updateUserCalendarEvent = /* GraphQL */ `
  mutation UpdateUserCalendarEvent(
    $input: UpdateUserCalendarEventInput!
    $condition: ModelUserCalendarEventConditionInput
  ) {
    updateUserCalendarEvent(input: $input, condition: $condition) {
      id
      username
      createdAt
      payload
      updatedAt
    }
  }
`;
export const deleteUserCalendarEvent = /* GraphQL */ `
  mutation DeleteUserCalendarEvent(
    $input: DeleteUserCalendarEventInput!
    $condition: ModelUserCalendarEventConditionInput
  ) {
    deleteUserCalendarEvent(input: $input, condition: $condition) {
      id
      username
      createdAt
      payload
      updatedAt
    }
  }
`;
export const createUserWallet = /* GraphQL */ `
  mutation CreateUserWallet(
    $input: CreateUserWalletInput!
    $condition: ModelUserWalletConditionInput
  ) {
    createUserWallet(input: $input, condition: $condition) {
      id
      username
      balance
      createdAt
      updatedAt
    }
  }
`;
export const updateUserWallet = /* GraphQL */ `
  mutation UpdateUserWallet(
    $input: UpdateUserWalletInput!
    $condition: ModelUserWalletConditionInput
  ) {
    updateUserWallet(input: $input, condition: $condition) {
      id
      username
      balance
      createdAt
      updatedAt
    }
  }
`;
export const deleteUserWallet = /* GraphQL */ `
  mutation DeleteUserWallet(
    $input: DeleteUserWalletInput!
    $condition: ModelUserWalletConditionInput
  ) {
    deleteUserWallet(input: $input, condition: $condition) {
      id
      username
      balance
      createdAt
      updatedAt
    }
  }
`;
export const createTransactionHistory = /* GraphQL */ `
  mutation CreateTransactionHistory(
    $input: CreateTransactionHistoryInput!
    $condition: ModelTransactionHistoryConditionInput
  ) {
    createTransactionHistory(input: $input, condition: $condition) {
      id
      senderUserProfileId
      receiverUserProfileId
      timestamp
      senderUsername
      receiverUsername
      transactionAmount
      createdAt
      updatedAt
      sender {
        id
        username
        telephone
        tin
        doy
        familyStatus
        chamberRecordNumber
        insuranceLicenseExpirationDate
        partnersNumberLimit
        professionStartDate
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
      }
      receiver {
        id
        username
        telephone
        tin
        doy
        familyStatus
        chamberRecordNumber
        insuranceLicenseExpirationDate
        partnersNumberLimit
        professionStartDate
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
      }
      senderWallet {
        id
        username
        balance
        createdAt
        updatedAt
      }
      receiverWallet {
        id
        username
        balance
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateTransactionHistory = /* GraphQL */ `
  mutation UpdateTransactionHistory(
    $input: UpdateTransactionHistoryInput!
    $condition: ModelTransactionHistoryConditionInput
  ) {
    updateTransactionHistory(input: $input, condition: $condition) {
      id
      senderUserProfileId
      receiverUserProfileId
      timestamp
      senderUsername
      receiverUsername
      transactionAmount
      createdAt
      updatedAt
      sender {
        id
        username
        telephone
        tin
        doy
        familyStatus
        chamberRecordNumber
        insuranceLicenseExpirationDate
        partnersNumberLimit
        professionStartDate
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
      }
      receiver {
        id
        username
        telephone
        tin
        doy
        familyStatus
        chamberRecordNumber
        insuranceLicenseExpirationDate
        partnersNumberLimit
        professionStartDate
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
      }
      senderWallet {
        id
        username
        balance
        createdAt
        updatedAt
      }
      receiverWallet {
        id
        username
        balance
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteTransactionHistory = /* GraphQL */ `
  mutation DeleteTransactionHistory(
    $input: DeleteTransactionHistoryInput!
    $condition: ModelTransactionHistoryConditionInput
  ) {
    deleteTransactionHistory(input: $input, condition: $condition) {
      id
      senderUserProfileId
      receiverUserProfileId
      timestamp
      senderUsername
      receiverUsername
      transactionAmount
      createdAt
      updatedAt
      sender {
        id
        username
        telephone
        tin
        doy
        familyStatus
        chamberRecordNumber
        insuranceLicenseExpirationDate
        partnersNumberLimit
        professionStartDate
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
      }
      receiver {
        id
        username
        telephone
        tin
        doy
        familyStatus
        chamberRecordNumber
        insuranceLicenseExpirationDate
        partnersNumberLimit
        professionStartDate
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
      }
      senderWallet {
        id
        username
        balance
        createdAt
        updatedAt
      }
      receiverWallet {
        id
        username
        balance
        createdAt
        updatedAt
      }
    }
  }
`;
export const createAdminRequests = /* GraphQL */ `
  mutation CreateAdminRequests(
    $input: CreateAdminRequestsInput!
    $condition: ModelAdminRequestsConditionInput
  ) {
    createAdminRequests(input: $input, condition: $condition) {
      id
      expiresAt
      message
      userId
      tradeId
      tradeName
      logo
      info
      postcode
      createdAt
      updatedAt
      profile {
        id
        username
        telephone
        tin
        doy
        familyStatus
        chamberRecordNumber
        insuranceLicenseExpirationDate
        partnersNumberLimit
        professionStartDate
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
      }
    }
  }
`;
export const updateAdminRequests = /* GraphQL */ `
  mutation UpdateAdminRequests(
    $input: UpdateAdminRequestsInput!
    $condition: ModelAdminRequestsConditionInput
  ) {
    updateAdminRequests(input: $input, condition: $condition) {
      id
      expiresAt
      message
      userId
      tradeId
      tradeName
      logo
      info
      postcode
      createdAt
      updatedAt
      profile {
        id
        username
        telephone
        tin
        doy
        familyStatus
        chamberRecordNumber
        insuranceLicenseExpirationDate
        partnersNumberLimit
        professionStartDate
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
      }
    }
  }
`;
export const deleteAdminRequests = /* GraphQL */ `
  mutation DeleteAdminRequests(
    $input: DeleteAdminRequestsInput!
    $condition: ModelAdminRequestsConditionInput
  ) {
    deleteAdminRequests(input: $input, condition: $condition) {
      id
      expiresAt
      message
      userId
      tradeId
      tradeName
      logo
      info
      postcode
      createdAt
      updatedAt
      profile {
        id
        username
        telephone
        tin
        doy
        familyStatus
        chamberRecordNumber
        insuranceLicenseExpirationDate
        partnersNumberLimit
        professionStartDate
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
      }
    }
  }
`;
export const requestAdminAproval = /* GraphQL */ `
  mutation RequestAdminAproval($tradeId: String!, $message: String!) {
    requestAdminAproval(tradeId: $tradeId, message: $message)
  }
`;
export const adminAproveRequest = /* GraphQL */ `
  mutation AdminAproveRequest($id: String!) {
    adminAproveRequest(id: $id)
  }
`;
export const createCompanyConnectionRequest = /* GraphQL */ `
  mutation CreateCompanyConnectionRequest($email: String) {
    createCompanyConnectionRequest(email: $email)
  }
`;
export const replyToCompanyConnectionRequest = /* GraphQL */ `
  mutation ReplyToCompanyConnectionRequest($id: ID, $status: ConnectionStatus) {
    replyToCompanyConnectionRequest(id: $id, status: $status)
  }
`;
export const addEmployeeToTrade = /* GraphQL */ `
  mutation AddEmployeeToTrade($username: String!) {
    addEmployeeToTrade(username: $username)
  }
`;
export const putFile = /* GraphQL */ `
  mutation PutFile($name: String, $key: String) {
    putFile(name: $name, key: $key)
  }
`;
export const getFile = /* GraphQL */ `
  mutation GetFile($name: String) {
    getFile(name: $name)
  }
`;
export const sendMoneyToUserWithUsername = /* GraphQL */ `
  mutation SendMoneyToUserWithUsername(
    $receiverUsername: String
    $amount: Float!
  ) {
    sendMoneyToUserWithUsername(
      receiverUsername: $receiverUsername
      amount: $amount
    )
  }
`;
