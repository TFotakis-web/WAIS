/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTrade = /* GraphQL */ `
  query GetTrade($id: ID!) {
    getTrade(id: $id) {
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
export const listTrades = /* GraphQL */ `
  query ListTrades(
    $filter: ModelTradeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrades(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCompanyAccessConnection = /* GraphQL */ `
  query GetCompanyAccessConnection($id: ID!) {
    getCompanyAccessConnection(id: $id) {
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
export const listCompanyAccessConnections = /* GraphQL */ `
  query ListCompanyAccessConnections(
    $filter: ModelCompanyAccessConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanyAccessConnections(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getTradeUserConnection = /* GraphQL */ `
  query GetTradeUserConnection($id: ID!) {
    getTradeUserConnection(id: $id) {
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
export const listTradeUserConnections = /* GraphQL */ `
  query ListTradeUserConnections(
    $filter: ModelTradeUserConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTradeUserConnections(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
        }
        user {
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
        info
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
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
export const listUserProfiles = /* GraphQL */ `
  query ListUserProfiles(
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
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
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`;
export const getContract = /* GraphQL */ `
  query GetContract($id: ID!) {
    getContract(id: $id) {
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
export const listContracts = /* GraphQL */ `
  query ListContracts(
    $filter: ModelContractFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContracts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        driversLicense {
          LicenseID
          DriversLicenseType
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
          tradeId
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        owner
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
export const getUserCallendarMessage = /* GraphQL */ `
  query GetUserCallendarMessage($id: ID!) {
    getUserCallendarMessage(id: $id) {
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
export const listUserCallendarMessages = /* GraphQL */ `
  query ListUserCallendarMessages(
    $filter: ModelUserCallendarMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserCallendarMessages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        tradeID
        username
        createdAt
        payload
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
