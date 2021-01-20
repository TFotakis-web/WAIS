/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTrade = /* GraphQL */ `
  mutation CreateTrade(
    $input: CreateTradeInput!
    $condition: ModelTradeConditionInput
  ) {
    createTrade(input: $input, condition: $condition) {
      id
      tradeName
      tin
      logo
      info
      postcode
      ownerId
      owner {
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
          name
          url
        }
        tradeCon {
          nextToken
        }
        createdAt
        updatedAt
      }
      employees {
        items {
          id
          tradeId
          userId
          preferences
          createdAt
          updatedAt
        }
        nextToken
      }
      contractors {
        items {
          id
          tradeId
          userId
          preferences
          createdAt
          updatedAt
        }
        nextToken
      }
      customers {
        items {
          id
          tradeId
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
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      contracts {
        items {
          id
          voucherId
          vehicleId
          customerId
          tradeId
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
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      fromCompanyAccess {
        items {
          id
          fromId
          toId
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
          toId
          expirationDate
          message
          createdAt
          updatedAt
        }
        nextToken
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
      tradeName
      tin
      logo
      info
      postcode
      ownerId
      owner {
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
          name
          url
        }
        tradeCon {
          nextToken
        }
        createdAt
        updatedAt
      }
      employees {
        items {
          id
          tradeId
          userId
          preferences
          createdAt
          updatedAt
        }
        nextToken
      }
      contractors {
        items {
          id
          tradeId
          userId
          preferences
          createdAt
          updatedAt
        }
        nextToken
      }
      customers {
        items {
          id
          tradeId
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
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      contracts {
        items {
          id
          voucherId
          vehicleId
          customerId
          tradeId
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
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      fromCompanyAccess {
        items {
          id
          fromId
          toId
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
          toId
          expirationDate
          message
          createdAt
          updatedAt
        }
        nextToken
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
      tradeName
      tin
      logo
      info
      postcode
      ownerId
      owner {
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
          name
          url
        }
        tradeCon {
          nextToken
        }
        createdAt
        updatedAt
      }
      employees {
        items {
          id
          tradeId
          userId
          preferences
          createdAt
          updatedAt
        }
        nextToken
      }
      contractors {
        items {
          id
          tradeId
          userId
          preferences
          createdAt
          updatedAt
        }
        nextToken
      }
      customers {
        items {
          id
          tradeId
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
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      contracts {
        items {
          id
          voucherId
          vehicleId
          customerId
          tradeId
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
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      fromCompanyAccess {
        items {
          id
          fromId
          toId
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
          toId
          expirationDate
          message
          createdAt
          updatedAt
        }
        nextToken
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
        name
        url
      }
      tradeCon {
        items {
          id
          tradeId
          userId
          preferences
          createdAt
          updatedAt
        }
        nextToken
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
        name
        url
      }
      tradeCon {
        items {
          id
          tradeId
          userId
          preferences
          createdAt
          updatedAt
        }
        nextToken
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
        name
        url
      }
      tradeCon {
        items {
          id
          tradeId
          userId
          preferences
          createdAt
          updatedAt
        }
        nextToken
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
      tradeId
      contractId
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
      contract {
        id
        voucherId
        vehicleId
        customerId
        tradeId
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
        driversLicense {
          LicenseID
          DriversLicenseType
        }
        vehicle {
          id
          tradeId
          contractId
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
        customer {
          id
          tradeId
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
          createdAt
          updatedAt
          owner
        }
        trade {
          id
          tradeName
          tin
          logo
          info
          postcode
          ownerId
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        owner
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
      tradeId
      contractId
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
      contract {
        id
        voucherId
        vehicleId
        customerId
        tradeId
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
        driversLicense {
          LicenseID
          DriversLicenseType
        }
        vehicle {
          id
          tradeId
          contractId
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
        customer {
          id
          tradeId
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
          createdAt
          updatedAt
          owner
        }
        trade {
          id
          tradeName
          tin
          logo
          info
          postcode
          ownerId
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        owner
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
      tradeId
      contractId
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
      contract {
        id
        voucherId
        vehicleId
        customerId
        tradeId
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
        driversLicense {
          LicenseID
          DriversLicenseType
        }
        vehicle {
          id
          tradeId
          contractId
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
        customer {
          id
          tradeId
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
          createdAt
          updatedAt
          owner
        }
        trade {
          id
          tradeName
          tin
          logo
          info
          postcode
          ownerId
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
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
      voucherId
      vehicleId
      customerId
      tradeId
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
      driversLicense {
        LicenseID
        DriversLicenseType
        Category {
          category
          issueDate
          expiresAt
        }
      }
      vehicle {
        id
        tradeId
        contractId
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
        contract {
          id
          voucherId
          vehicleId
          customerId
          tradeId
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
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
      }
      customer {
        id
        tradeId
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
        trade {
          id
          tradeName
          tin
          logo
          info
          postcode
          ownerId
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
      trade {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
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
      voucherId
      vehicleId
      customerId
      tradeId
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
      driversLicense {
        LicenseID
        DriversLicenseType
        Category {
          category
          issueDate
          expiresAt
        }
      }
      vehicle {
        id
        tradeId
        contractId
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
        contract {
          id
          voucherId
          vehicleId
          customerId
          tradeId
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
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
      }
      customer {
        id
        tradeId
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
        trade {
          id
          tradeName
          tin
          logo
          info
          postcode
          ownerId
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
      trade {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
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
      voucherId
      vehicleId
      customerId
      tradeId
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
      driversLicense {
        LicenseID
        DriversLicenseType
        Category {
          category
          issueDate
          expiresAt
        }
      }
      vehicle {
        id
        tradeId
        contractId
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
        contract {
          id
          voucherId
          vehicleId
          customerId
          tradeId
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
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
      }
      customer {
        id
        tradeId
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
        trade {
          id
          tradeName
          tin
          logo
          info
          postcode
          ownerId
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
      trade {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
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
      tradeId
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
        Category {
          category
          issueDate
          expiresAt
        }
      }
      trade {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
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
      tradeId
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
        Category {
          category
          issueDate
          expiresAt
        }
      }
      trade {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
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
      tradeId
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
        Category {
          category
          issueDate
          expiresAt
        }
      }
      trade {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
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
      userId
      trade {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
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
          name
          url
        }
        tradeCon {
          nextToken
        }
        createdAt
        updatedAt
      }
      permissions {
        department
        read
        write
      }
      preferences
      createdAt
      updatedAt
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
      userId
      trade {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
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
          name
          url
        }
        tradeCon {
          nextToken
        }
        createdAt
        updatedAt
      }
      permissions {
        department
        read
        write
      }
      preferences
      createdAt
      updatedAt
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
      userId
      trade {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
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
          name
          url
        }
        tradeCon {
          nextToken
        }
        createdAt
        updatedAt
      }
      permissions {
        department
        read
        write
      }
      preferences
      createdAt
      updatedAt
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
      from {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
      }
      to {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
      }
      expirationDate
      message
      createdAt
      updatedAt
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
      from {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
      }
      to {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
      }
      expirationDate
      message
      createdAt
      updatedAt
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
      from {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
      }
      to {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
      }
      expirationDate
      message
      createdAt
      updatedAt
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
      toId
      from {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
      }
      to {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
      }
      expirationDate
      message
      createdAt
      updatedAt
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
      toId
      from {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
      }
      to {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
      }
      expirationDate
      message
      createdAt
      updatedAt
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
      toId
      from {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
      }
      to {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        owner {
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        createdAt
        updatedAt
      }
      expirationDate
      message
      createdAt
      updatedAt
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
      userId
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
      userId
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
      userId
      username
      createdAt
      payload
      updatedAt
    }
  }
`;
export const createTestType = /* GraphQL */ `
  mutation CreateTestType(
    $input: CreateTestTypeInput!
    $condition: ModelTestTypeConditionInput
  ) {
    createTestType(input: $input, condition: $condition) {
      id
      val
      createdAt
      updatedAt
    }
  }
`;
export const updateTestType = /* GraphQL */ `
  mutation UpdateTestType(
    $input: UpdateTestTypeInput!
    $condition: ModelTestTypeConditionInput
  ) {
    updateTestType(input: $input, condition: $condition) {
      id
      val
      createdAt
      updatedAt
    }
  }
`;
export const deleteTestType = /* GraphQL */ `
  mutation DeleteTestType(
    $input: DeleteTestTypeInput!
    $condition: ModelTestTypeConditionInput
  ) {
    deleteTestType(input: $input, condition: $condition) {
      id
      val
      createdAt
      updatedAt
    }
  }
`;
