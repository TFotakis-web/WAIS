/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        ownerUsername
        createdAt
        updatedAt
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractAccess {
          nextToken
        }
        fromCompanyAccess {
          nextToken
        }
        toCompanyAccess {
          nextToken
        }
      }
      nextToken
    }
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
      ownerUsername
      createdAt
      updatedAt
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
      employees {
        items {
          id
          tradeId
          userId
          employeeType
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
          employeeType
          preferences
          createdAt
          updatedAt
        }
        nextToken
      }
      contractAccess {
        items {
          id
          tradeId
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
          userId
          employeeType
          preferences
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const getVehicle = /* GraphQL */ `
  query GetVehicle($id: ID!) {
    getVehicle(id: $id) {
      id
      tradeId
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
        bucket
        region
        key
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
          bucket
          region
          key
        }
        createdAt
        updatedAt
      }
      nextToken
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
        createdAt
        voucherId
        vehicleId
        customerId
        tradeId
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
      createdAt
      voucherId
      vehicleId
      customerId
      tradeId
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
      updatedAt
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
      createdAt
      updatedAt
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
          bucket
          region
          key
        }
        driversLicense {
          LicenseID
          DriversLicenseType
        }
        createdAt
        updatedAt
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
      permissions {
        department
        read
        write
      }
      employeeType
      preferences
      createdAt
      updatedAt
      trade {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        ownerUsername
        createdAt
        updatedAt
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractAccess {
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
        permissions {
          department
          read
          write
        }
        employeeType
        preferences
        createdAt
        updatedAt
        trade {
          id
          tradeName
          tin
          logo
          info
          postcode
          ownerId
          ownerUsername
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
      expirationDate
      message
      createdAt
      updatedAt
      from {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        ownerUsername
        createdAt
        updatedAt
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractAccess {
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
        tin
        logo
        info
        postcode
        ownerId
        ownerUsername
        createdAt
        updatedAt
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractAccess {
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
        expirationDate
        message
        createdAt
        updatedAt
        from {
          id
          tradeName
          tin
          logo
          info
          postcode
          ownerId
          ownerUsername
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
          ownerUsername
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getTradeContractConnection = /* GraphQL */ `
  query GetTradeContractConnection($id: ID!) {
    getTradeContractConnection(id: $id) {
      id
      tradeId
      contractId
      ownsContract
      createdAt
      updatedAt
      trade {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        ownerUsername
        createdAt
        updatedAt
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractAccess {
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
        createdAt
        voucherId
        vehicleId
        customerId
        tradeId
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
        updatedAt
      }
    }
  }
`;
export const listTradeContractConnections = /* GraphQL */ `
  query ListTradeContractConnections(
    $filter: ModelTradeContractConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTradeContractConnections(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tradeId
        contractId
        ownsContract
        createdAt
        updatedAt
        trade {
          id
          tradeName
          tin
          logo
          info
          postcode
          ownerId
          ownerUsername
          createdAt
          updatedAt
        }
        contract {
          id
          createdAt
          voucherId
          vehicleId
          customerId
          tradeId
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
          updatedAt
        }
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
      expirationDate
      message
      createdAt
      updatedAt
      from {
        id
        tradeName
        tin
        logo
        info
        postcode
        ownerId
        ownerUsername
        createdAt
        updatedAt
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractAccess {
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
        tin
        logo
        info
        postcode
        ownerId
        ownerUsername
        createdAt
        updatedAt
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
        employees {
          nextToken
        }
        contractors {
          nextToken
        }
        contractAccess {
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
        expirationDate
        message
        createdAt
        updatedAt
        from {
          id
          tradeName
          tin
          logo
          info
          postcode
          ownerId
          ownerUsername
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
          ownerUsername
          createdAt
          updatedAt
        }
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
      createdAt
      payload
      updatedAt
      owner
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
        createdAt
        payload
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listUserWallets = /* GraphQL */ `
  query ListUserWallets(
    $filter: ModelUserWalletFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserWallets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        balance
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserWallet = /* GraphQL */ `
  query GetUserWallet($id: ID!) {
    getUserWallet(id: $id) {
      id
      username
      balance
      createdAt
      updatedAt
    }
  }
`;
export const getTransactionHistory = /* GraphQL */ `
  query GetTransactionHistory($id: ID!) {
    getTransactionHistory(id: $id) {
      id
      timestamp
      senderId
      receiverId
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
export const listTransactionHistorys = /* GraphQL */ `
  query ListTransactionHistorys(
    $filter: ModelTransactionHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactionHistorys(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        timestamp
        senderId
        receiverId
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
          createdAt
          updatedAt
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
          createdAt
          updatedAt
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
      nextToken
    }
  }
`;
export const getAdminRequests = /* GraphQL */ `
  query GetAdminRequests($id: ID!) {
    getAdminRequests(id: $id) {
      id
      tradeId
      expiresAt
      message
      createdAt
      updatedAt
    }
  }
`;
export const listAdminRequestss = /* GraphQL */ `
  query ListAdminRequestss(
    $filter: ModelAdminRequestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdminRequestss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tradeId
        expiresAt
        message
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
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
  query User($username: String!) {
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
  query Echo($msg: String!) {
    echo(msg: $msg)
  }
`;
export const getTestType = /* GraphQL */ `
  query GetTestType($id: ID!) {
    getTestType(id: $id) {
      id
      val
      createdAt
      updatedAt
      owner
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
        owner
      }
      nextToken
    }
  }
`;
