/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        createdAt
        updatedAt
        customers {
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
          createdAt
          updatedAt
        }
        contracts {
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
        employees {
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
        contractors {
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
        createdAt
        updatedAt
        customers {
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
          createdAt
          updatedAt
        }
        contracts {
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
        employees {
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
        contractors {
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
      createdAt
      updatedAt
      customers {
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
        }
        createdAt
        updatedAt
      }
      contracts {
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
      employees {
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
      contractors {
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
        createdAt
        updatedAt
        customers {
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
          createdAt
          updatedAt
        }
        contracts {
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
        employees {
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
        contractors {
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
      }
      nextToken
    }
  }
`;
export const listUserProfileByDoy = /* GraphQL */ `
  query ListUserProfileByDoy(
    $doy: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProfileByDoy(
      doy: $doy
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
          tradeName
          userId
          username
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
      }
      createdAt
      updatedAt
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
        }
        createdAt
        updatedAt
      }
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
        customers {
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
          createdAt
          updatedAt
        }
        contracts {
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
        employees {
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
        contractors {
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
        ownerUsername
        ownerId
        tin
        logo
        info
        postcode
        createdAt
        updatedAt
        customers {
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
          createdAt
          updatedAt
        }
        contracts {
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
        employees {
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
        contractors {
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
        customers {
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
          createdAt
          updatedAt
        }
        contracts {
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
        employees {
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
        contractors {
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
          ownerUsername
          ownerId
          tin
          logo
          info
          postcode
          createdAt
          updatedAt
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
          createdAt
          updatedAt
          members
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
        createdAt
        updatedAt
        customers {
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
          createdAt
          updatedAt
        }
        contracts {
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
        employees {
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
        contractors {
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
          createdAt
          updatedAt
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
        createdAt
        updatedAt
        customers {
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
          createdAt
          updatedAt
        }
        contracts {
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
        employees {
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
        contractors {
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
        customers {
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
          createdAt
          updatedAt
        }
        contracts {
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
        employees {
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
        contractors {
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
          createdAt
          updatedAt
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
          createdAt
          updatedAt
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
      expiresAt
      message
      userId
      tradeId
      tradeName
      logo
      info
      tin
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
export const listAdminRequestss = /* GraphQL */ `
  query ListAdminRequestss(
    $filter: ModelAdminRequestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdminRequestss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        expiresAt
        message
        userId
        tradeId
        tradeName
        logo
        info
        tin
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
          createdAt
          updatedAt
        }
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
export const requestAdminAproval = /* GraphQL */ `
  query RequestAdminAproval($tradeName: String!, $message: String!) {
    requestAdminAproval(tradeName: $tradeName, message: $message)
  }
`;
export const adminAproveRequest = /* GraphQL */ `
  query AdminAproveRequest($id: String!) {
    adminAproveRequest(id: $id)
  }
`;
