/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const me = /* GraphQL */ `
  query Me {
    me {
      Username
      UserAttributes {
        Name
        Value
      }
      UserCreateDate
      UserLastModifiedDate
      Enabled
      UserStatus
      MFAOptions {
        DeliveryMedium
        AttributeName
      }
      PreferredMfaSetting
      UserMFASettingList
    }
  }
`;
export const user = /* GraphQL */ `
  query User($username: String) {
    user(username: $username) {
      Username
      UserAttributes {
        Name
        Value
      }
      UserCreateDate
      UserLastModifiedDate
      Enabled
      UserStatus
      MFAOptions {
        DeliveryMedium
        AttributeName
      }
      PreferredMfaSetting
      UserMFASettingList
    }
  }
`;
export const echo = /* GraphQL */ `
  query Echo($msg: String) {
    echo(msg: $msg)
  }
`;
export const getTrade = /* GraphQL */ `
  query GetTrade($id: ID!) {
    getTrade(id: $id) {
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
export const listTrades = /* GraphQL */ `
  query ListTrades(
    $filter: ModelTradeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrades(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
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
      nextToken
    }
  }
`;
export const getVehicle = /* GraphQL */ `
  query GetVehicle($id: ID!) {
    getVehicle(id: $id) {
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
export const listVehicles = /* GraphQL */ `
  query ListVehicles(
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVehicles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
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
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          tradeName
          tin
          logo
          info
          postcode
          ownerId
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
      nextToken
    }
  }
`;
export const getCompanyAccessConnectionRequest = /* GraphQL */ `
  query GetCompanyAccessConnectionRequest($id: ID!) {
    getCompanyAccessConnectionRequest(id: $id) {
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
export const listCompanyAccessConnectionRequests = /* GraphQL */ `
  query ListCompanyAccessConnectionRequests(
    $filter: ModelCompanyAccessConnectionRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanyAccessConnectionRequests(
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
          tradeName
          tin
          logo
          info
          postcode
          ownerId
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
          createdAt
          updatedAt
        }
        expirationDate
        message
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
          tradeName
          tin
          logo
          info
          postcode
          ownerId
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
          createdAt
          updatedAt
        }
        expirationDate
        message
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserCalendarEvent = /* GraphQL */ `
  query GetUserCalendarEvent($id: ID!) {
    getUserCalendarEvent(id: $id) {
      id
      userId
      username
      createdAt
      payload
      updatedAt
    }
  }
`;
export const listUserCalendarEvents = /* GraphQL */ `
  query ListUserCalendarEvents(
    $filter: ModelUserCalendarEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserCalendarEvents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        username
        createdAt
        payload
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTestType = /* GraphQL */ `
  query GetTestType($id: ID!) {
    getTestType(id: $id) {
      id
      val
      createdAt
      updatedAt
    }
  }
`;
export const listTestTypes = /* GraphQL */ `
  query ListTestTypes(
    $filter: ModelTestTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTestTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        val
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
