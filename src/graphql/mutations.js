/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTrade = /* GraphQL */ `
  mutation CreateTrade(
    $input: CreateTradeInput!
    $condition: ModelTradeConditionInput
  ) {
    createTrade(input: $input, condition: $condition) {
      id
      ownerId
      name
      tin
      logo
      info
      postcode
      owner {
        id
        username
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
        owner
      }
      employees {
        items {
          id
          tradeId
          userId
          info
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      contractors {
        items {
          id
          tradeId
          userId
          info
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
          active
          info
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      toCompanyAccess {
        items {
          id
          fromId
          toId
          expirationDate
          active
          info
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      customers {
        items {
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
          tradeId
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
      ownerId
      name
      tin
      logo
      info
      postcode
      owner {
        id
        username
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
        owner
      }
      employees {
        items {
          id
          tradeId
          userId
          info
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      contractors {
        items {
          id
          tradeId
          userId
          info
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
          active
          info
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      toCompanyAccess {
        items {
          id
          fromId
          toId
          expirationDate
          active
          info
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      customers {
        items {
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
          tradeId
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
      ownerId
      name
      tin
      logo
      info
      postcode
      owner {
        id
        username
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
        owner
      }
      employees {
        items {
          id
          tradeId
          userId
          info
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      contractors {
        items {
          id
          tradeId
          userId
          info
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
          active
          info
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      toCompanyAccess {
        items {
          id
          fromId
          toId
          expirationDate
          active
          info
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      customers {
        items {
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
          tradeId
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
        ownerId
        name
        tin
        logo
        info
        postcode
        owner {
          id
          username
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
          createdAt
          updatedAt
          owner
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        createdAt
        updatedAt
      }
      to {
        id
        ownerId
        name
        tin
        logo
        info
        postcode
        owner {
          id
          username
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
          createdAt
          updatedAt
          owner
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        createdAt
        updatedAt
      }
      expirationDate
      active
      info
      createdAt
      updatedAt
      owner
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
        ownerId
        name
        tin
        logo
        info
        postcode
        owner {
          id
          username
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
          createdAt
          updatedAt
          owner
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        createdAt
        updatedAt
      }
      to {
        id
        ownerId
        name
        tin
        logo
        info
        postcode
        owner {
          id
          username
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
          createdAt
          updatedAt
          owner
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        createdAt
        updatedAt
      }
      expirationDate
      active
      info
      createdAt
      updatedAt
      owner
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
        ownerId
        name
        tin
        logo
        info
        postcode
        owner {
          id
          username
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
          createdAt
          updatedAt
          owner
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        createdAt
        updatedAt
      }
      to {
        id
        ownerId
        name
        tin
        logo
        info
        postcode
        owner {
          id
          username
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
          createdAt
          updatedAt
          owner
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        createdAt
        updatedAt
      }
      expirationDate
      active
      info
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
        ownerId
        name
        tin
        logo
        info
        postcode
        owner {
          id
          username
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
          createdAt
          updatedAt
          owner
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        createdAt
        updatedAt
      }
      user {
        id
        username
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
        owner
      }
      info
      createdAt
      updatedAt
      owner
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
        ownerId
        name
        tin
        logo
        info
        postcode
        owner {
          id
          username
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
          createdAt
          updatedAt
          owner
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        createdAt
        updatedAt
      }
      user {
        id
        username
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
        owner
      }
      info
      createdAt
      updatedAt
      owner
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
        ownerId
        name
        tin
        logo
        info
        postcode
        owner {
          id
          username
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
          createdAt
          updatedAt
          owner
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
          nextToken
        }
        createdAt
        updatedAt
      }
      user {
        id
        username
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
        owner
      }
      info
      createdAt
      updatedAt
      owner
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
      owner
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
      owner
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
      tradeId
      trade {
        id
        ownerId
        name
        tin
        logo
        info
        postcode
        owner {
          id
          username
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
          createdAt
          updatedAt
          owner
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
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
      tradeId
      trade {
        id
        ownerId
        name
        tin
        logo
        info
        postcode
        owner {
          id
          username
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
          createdAt
          updatedAt
          owner
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
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
      tradeId
      trade {
        id
        ownerId
        name
        tin
        logo
        info
        postcode
        owner {
          id
          username
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
          createdAt
          updatedAt
          owner
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
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
        files {
          name
          url
        }
        driversLicense {
          LicenseID
          DriversLicenseType
        }
        tradeId
        trade {
          id
          ownerId
          name
          tin
          logo
          info
          postcode
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
      trade {
        id
        ownerId
        name
        tin
        logo
        info
        postcode
        owner {
          id
          username
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
          createdAt
          updatedAt
          owner
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
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
        files {
          name
          url
        }
        driversLicense {
          LicenseID
          DriversLicenseType
        }
        tradeId
        trade {
          id
          ownerId
          name
          tin
          logo
          info
          postcode
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
      trade {
        id
        ownerId
        name
        tin
        logo
        info
        postcode
        owner {
          id
          username
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
          createdAt
          updatedAt
          owner
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
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
        files {
          name
          url
        }
        driversLicense {
          LicenseID
          DriversLicenseType
        }
        tradeId
        trade {
          id
          ownerId
          name
          tin
          logo
          info
          postcode
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
      trade {
        id
        ownerId
        name
        tin
        logo
        info
        postcode
        owner {
          id
          username
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
          createdAt
          updatedAt
          owner
        }
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
        customers {
          nextToken
        }
        contracts {
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
export const createUserCallendarMessage = /* GraphQL */ `
  mutation CreateUserCallendarMessage(
    $input: CreateUserCallendarMessageInput!
    $condition: ModelUserCallendarMessageConditionInput
  ) {
    createUserCallendarMessage(input: $input, condition: $condition) {
      id
      userId
      tradeID
      username
      createdAt
      payload
      updatedAt
      owner
    }
  }
`;
export const updateUserCallendarMessage = /* GraphQL */ `
  mutation UpdateUserCallendarMessage(
    $input: UpdateUserCallendarMessageInput!
    $condition: ModelUserCallendarMessageConditionInput
  ) {
    updateUserCallendarMessage(input: $input, condition: $condition) {
      id
      userId
      tradeID
      username
      createdAt
      payload
      updatedAt
      owner
    }
  }
`;
export const deleteUserCallendarMessage = /* GraphQL */ `
  mutation DeleteUserCallendarMessage(
    $input: DeleteUserCallendarMessageInput!
    $condition: ModelUserCallendarMessageConditionInput
  ) {
    deleteUserCallendarMessage(input: $input, condition: $condition) {
      id
      userId
      tradeID
      username
      createdAt
      payload
      updatedAt
      owner
    }
  }
`;
