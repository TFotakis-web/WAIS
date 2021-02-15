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
export const echo = /* GraphQL */ `
  query Echo($msg: String!) {
    echo(msg: $msg)
  }
`;
export const sendRequest = /* GraphQL */ `
  query SendRequest($requestType: RequestType!, $payload: String!) {
    sendRequest(requestType: $requestType, payload: $payload)
  }
`;
export const resolveRequest = /* GraphQL */ `
  query ResolveRequest($id: ID!, $payload: String!) {
    resolveRequest(id: $id, payload: $payload)
  }
`;
export const listTradeByName = /* GraphQL */ `
  query ListTradeByName(
    $tradeName: String
    $ownerUsername: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOfficeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTradeByName(
      tradeName: $tradeName
      ownerUsername: $ownerUsername
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        customers
        contracts
        employees
        contractors
        createdAt
        updatedAt
        remainingMembersAllowed
        members
        ownerProfile {
          id
          username
          email
          telephone
          name
          family_name
          gender
          birthdate
          address
          city
          preferences
          locale
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
export const listTradeByOwnerUsername = /* GraphQL */ `
  query ListTradeByOwnerUsername(
    $ownerUsername: String
    $tradeName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOfficeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTradeByOwnerUsername(
      ownerUsername: $ownerUsername
      tradeName: $tradeName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        customers
        contracts
        employees
        contractors
        createdAt
        updatedAt
        remainingMembersAllowed
        members
        ownerProfile {
          id
          username
          email
          telephone
          name
          family_name
          gender
          birthdate
          address
          city
          preferences
          locale
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
export const getOffice = /* GraphQL */ `
  query GetOffice($id: ID!) {
    getOffice(id: $id) {
      id
      tradeName
      ownerUsername
      ownerId
      tin
      logo
      info
      postcode
      customers
      contracts
      employees
      contractors
      createdAt
      updatedAt
      remainingMembersAllowed
      members
      ownerProfile {
        id
        username
        email
        telephone
        name
        family_name
        gender
        birthdate
        address
        city
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
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
          name
        }
        permissions {
          department
          read
          write
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
        wallet {
          id
          username
          balance
          createdAt
          updatedAt
        }
        requests {
          nextToken
        }
      }
    }
  }
`;
export const listOffices = /* GraphQL */ `
  query ListOffices(
    $filter: ModelOfficeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOffices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        customers
        contracts
        employees
        contractors
        createdAt
        updatedAt
        remainingMembersAllowed
        members
        ownerProfile {
          id
          username
          email
          telephone
          name
          family_name
          gender
          birthdate
          address
          city
          preferences
          locale
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
        email
        telephone
        name
        family_name
        gender
        birthdate
        address
        city
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
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
          name
        }
        permissions {
          department
          read
          write
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
        wallet {
          id
          username
          balance
          createdAt
          updatedAt
        }
        requests {
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
      email
      telephone
      name
      family_name
      gender
      birthdate
      address
      city
      profilePicture {
        bucket
        region
        key
        name
      }
      preferences
      locale
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
        name
      }
      permissions {
        department
        read
        write
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
      wallet {
        id
        username
        balance
        createdAt
        updatedAt
      }
      requests {
        items {
          id
          expiresAt
          senderEmail
          receiverEmail
          type
          payload
          createdAt
          updatedAt
          metadata
        }
        nextToken
      }
    }
  }
`;
export const listUserProfileByEmail = /* GraphQL */ `
  query ListUserProfileByEmail(
    $email: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProfileByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        email
        telephone
        name
        family_name
        gender
        birthdate
        address
        city
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
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
          name
        }
        permissions {
          department
          read
          write
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
        wallet {
          id
          username
          balance
          createdAt
          updatedAt
        }
        requests {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listUserProfileByUsername = /* GraphQL */ `
  query ListUserProfileByUsername(
    $username: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProfileByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        email
        telephone
        name
        family_name
        gender
        birthdate
        address
        city
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
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
          name
        }
        permissions {
          department
          read
          write
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
        wallet {
          id
          username
          balance
          createdAt
          updatedAt
        }
        requests {
          nextToken
        }
      }
      nextToken
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
          name
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
        name
      }
      createdAt
      updatedAt
    }
  }
`;
export const listVehicleByTradeName = /* GraphQL */ `
  query ListVehicleByTradeName(
    $tradeName: String
    $numberPlate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVehicleByTradeName(
      tradeName: $tradeName
      numberPlate: $numberPlate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          name
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listVehiclesByOwner = /* GraphQL */ `
  query ListVehiclesByOwner(
    $vehicle_owner: String
    $tradeName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVehiclesByOwner(
      vehicle_owner: $vehicle_owner
      tradeName: $tradeName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          name
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
        contractId
        version
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
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getContract = /* GraphQL */ `
  query GetContract($id: ID!) {
    getContract(id: $id) {
      id
      contractId
      version
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
          name
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const listContractsByTradeName = /* GraphQL */ `
  query ListContractsByTradeName(
    $tradeName: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContractFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContractsByTradeName(
      tradeName: $tradeName
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        contractId
        version
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
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listContractsByVehicleNumberPlates = /* GraphQL */ `
  query ListContractsByVehicleNumberPlates(
    $vehicleNumberPlate: String
    $tradeName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContractFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContractsByVehicleNumberPlates(
      vehicleNumberPlate: $vehicleNumberPlate
      tradeName: $tradeName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        contractId
        version
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
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listContractsByCustomerId = /* GraphQL */ `
  query ListContractsByCustomerId(
    $customerId: String
    $tradeName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContractFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContractsByCustomerId(
      customerId: $customerId
      tradeName: $tradeName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        contractId
        version
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
          createdAt
          updatedAt
        }
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
        name
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
          name
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
        customers
        contracts
        employees
        contractors
        createdAt
        updatedAt
        remainingMembersAllowed
        members
        ownerProfile {
          id
          username
          email
          telephone
          name
          family_name
          gender
          birthdate
          address
          city
          preferences
          locale
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
      user {
        id
        username
        email
        telephone
        name
        family_name
        gender
        birthdate
        address
        city
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
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
          name
        }
        permissions {
          department
          read
          write
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
        wallet {
          id
          username
          balance
          createdAt
          updatedAt
        }
        requests {
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
          customers
          contracts
          employees
          contractors
          createdAt
          updatedAt
          remainingMembersAllowed
          members
        }
        user {
          id
          username
          email
          telephone
          name
          family_name
          gender
          birthdate
          address
          city
          preferences
          locale
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
export const listTradeUserConnectionsByTradeName = /* GraphQL */ `
  query ListTradeUserConnectionsByTradeName(
    $tradeName: String
    $userId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTradeUserConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTradeUserConnectionsByTradeName(
      tradeName: $tradeName
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          customers
          contracts
          employees
          contractors
          createdAt
          updatedAt
          remainingMembersAllowed
          members
        }
        user {
          id
          username
          email
          telephone
          name
          family_name
          gender
          birthdate
          address
          city
          preferences
          locale
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
export const listTradeUserConnectionsByEmployeeType = /* GraphQL */ `
  query ListTradeUserConnectionsByEmployeeType(
    $employeeType: EmployeeType
    $sortDirection: ModelSortDirection
    $filter: ModelTradeUserConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTradeUserConnectionsByEmployeeType(
      employeeType: $employeeType
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          customers
          contracts
          employees
          contractors
          createdAt
          updatedAt
          remainingMembersAllowed
          members
        }
        user {
          id
          username
          email
          telephone
          name
          family_name
          gender
          birthdate
          address
          city
          preferences
          locale
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
export const listTradeUserConnectionsByUserId = /* GraphQL */ `
  query ListTradeUserConnectionsByUserId(
    $userId: ID
    $tradeName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTradeUserConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTradeUserConnectionsByUserId(
      userId: $userId
      tradeName: $tradeName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          customers
          contracts
          employees
          contractors
          createdAt
          updatedAt
          remainingMembersAllowed
          members
        }
        user {
          id
          username
          email
          telephone
          name
          family_name
          gender
          birthdate
          address
          city
          preferences
          locale
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
export const getTradeContractConnection = /* GraphQL */ `
  query GetTradeContractConnection($id: ID!) {
    getTradeContractConnection(id: $id) {
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
        customers
        contracts
        employees
        contractors
        createdAt
        updatedAt
        remainingMembersAllowed
        members
        ownerProfile {
          id
          username
          email
          telephone
          name
          family_name
          gender
          birthdate
          address
          city
          preferences
          locale
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
      contract {
        id
        contractId
        version
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
          createdAt
          updatedAt
        }
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
          customers
          contracts
          employees
          contractors
          createdAt
          updatedAt
          remainingMembersAllowed
          members
        }
        contract {
          id
          contractId
          version
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
          createdAt
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
        customers
        contracts
        employees
        contractors
        createdAt
        updatedAt
        remainingMembersAllowed
        members
        ownerProfile {
          id
          username
          email
          telephone
          name
          family_name
          gender
          birthdate
          address
          city
          preferences
          locale
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
      to {
        id
        tradeName
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        customers
        contracts
        employees
        contractors
        createdAt
        updatedAt
        remainingMembersAllowed
        members
        ownerProfile {
          id
          username
          email
          telephone
          name
          family_name
          gender
          birthdate
          address
          city
          preferences
          locale
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
          customers
          contracts
          employees
          contractors
          createdAt
          updatedAt
          remainingMembersAllowed
          members
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
          customers
          contracts
          employees
          contractors
          createdAt
          updatedAt
          remainingMembersAllowed
          members
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
        username
        createdAt
        payload
        updatedAt
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
        email
        telephone
        name
        family_name
        gender
        birthdate
        address
        city
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
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
          name
        }
        permissions {
          department
          read
          write
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
        wallet {
          id
          username
          balance
          createdAt
          updatedAt
        }
        requests {
          nextToken
        }
      }
      receiver {
        id
        username
        email
        telephone
        name
        family_name
        gender
        birthdate
        address
        city
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
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
          name
        }
        permissions {
          department
          read
          write
        }
        createdAt
        updatedAt
        tradeCon {
          nextToken
        }
        wallet {
          id
          username
          balance
          createdAt
          updatedAt
        }
        requests {
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
          email
          telephone
          name
          family_name
          gender
          birthdate
          address
          city
          preferences
          locale
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
          email
          telephone
          name
          family_name
          gender
          birthdate
          address
          city
          preferences
          locale
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
export const getRequests = /* GraphQL */ `
  query GetRequests($id: ID!) {
    getRequests(id: $id) {
      id
      expiresAt
      senderEmail
      receiverEmail
      type
      payload
      createdAt
      updatedAt
      metadata
    }
  }
`;
export const listRequestss = /* GraphQL */ `
  query ListRequestss(
    $filter: ModelRequestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequestss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        expiresAt
        senderEmail
        receiverEmail
        type
        payload
        createdAt
        updatedAt
        metadata
      }
      nextToken
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
