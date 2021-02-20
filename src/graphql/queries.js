/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const me = /* GraphQL */ `
  query Me {
    me
  }
`;
export const echo = /* GraphQL */ `
  query Echo($msg: String!) {
    echo(msg: $msg)
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
        address
        office_email
        zip_code
        mobile
        phone
        partnersNumberLimit
        employeesNumberLimit
        verified
        customers
        contracts
        employees
        contractors
        manageCustomers
        manageContracts
        manageEmployees
        manageContractors
        updateFields
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
          postcode
          preferences
          locale
          tin
          professionStartDate
          chamberRecordNumber
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          bankAccountInfo
        }
        members
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
        address
        office_email
        zip_code
        mobile
        phone
        partnersNumberLimit
        employeesNumberLimit
        verified
        customers
        contracts
        employees
        contractors
        manageCustomers
        manageContracts
        manageEmployees
        manageContractors
        updateFields
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
          postcode
          preferences
          locale
          tin
          professionStartDate
          chamberRecordNumber
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          bankAccountInfo
        }
        members
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
      address
      office_email
      zip_code
      mobile
      phone
      partnersNumberLimit
      employeesNumberLimit
      verified
      customers
      contracts
      employees
      contractors
      manageCustomers
      manageContracts
      manageEmployees
      manageContractors
      updateFields
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
        postcode
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
        tin
        professionStartDate
        chamberRecordNumber
        insuranceLicenseExpirationDate
        civilLiabilityExpirationDate
        bankAccountInfo
        files {
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
      members
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
        address
        office_email
        zip_code
        mobile
        phone
        partnersNumberLimit
        employeesNumberLimit
        verified
        customers
        contracts
        employees
        contractors
        manageCustomers
        manageContracts
        manageEmployees
        manageContractors
        updateFields
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
          postcode
          preferences
          locale
          tin
          professionStartDate
          chamberRecordNumber
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          bankAccountInfo
        }
        members
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
        postcode
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
        tin
        files {
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
      postcode
      profilePicture {
        bucket
        region
        key
        name
      }
      preferences
      locale
      tin
      files {
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
      requests {
        items {
          id
          senderUsername
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
        postcode
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
        tin
        files {
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
        postcode
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
        tin
        files {
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
        updateFields
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
      updateFields
      createdAt
      updatedAt
    }
  }
`;
export const listVehiclesByTradeName = /* GraphQL */ `
  query ListVehiclesByTradeName(
    $tradeName: String
    $numberPlate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVehiclesByTradeName(
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
        updateFields
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
        updateFields
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
        updateFields
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
          updateFields
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
      updateFields
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
        updateFields
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
        updateFields
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
          updateFields
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
        updateFields
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
          updateFields
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
        updateFields
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
          updateFields
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
      updateFields
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
        updateFields
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listCustomersByTradeName = /* GraphQL */ `
  query ListCustomersByTradeName(
    $tradeName: String
    $firstNameLastName: ModelCustomerByTradeNameCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomersByTradeName(
      tradeName: $tradeName
      firstNameLastName: $firstNameLastName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        updateFields
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
        address
        office_email
        zip_code
        mobile
        phone
        partnersNumberLimit
        employeesNumberLimit
        verified
        customers
        contracts
        employees
        contractors
        manageCustomers
        manageContracts
        manageEmployees
        manageContractors
        updateFields
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
          postcode
          preferences
          locale
          tin
          professionStartDate
          chamberRecordNumber
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          bankAccountInfo
        }
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
        postcode
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
        tin
        files {
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
          address
          office_email
          zip_code
          mobile
          phone
          partnersNumberLimit
          employeesNumberLimit
          verified
          customers
          contracts
          employees
          contractors
          manageCustomers
          manageContracts
          manageEmployees
          manageContractors
          updateFields
          createdAt
          updatedAt
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
          postcode
          preferences
          locale
          tin
          updateFields
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
          address
          office_email
          zip_code
          mobile
          phone
          partnersNumberLimit
          employeesNumberLimit
          verified
          customers
          contracts
          employees
          contractors
          manageCustomers
          manageContracts
          manageEmployees
          manageContractors
          updateFields
          createdAt
          updatedAt
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
          postcode
          preferences
          locale
          tin
          updateFields
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
          address
          office_email
          zip_code
          mobile
          phone
          partnersNumberLimit
          employeesNumberLimit
          verified
          customers
          contracts
          employees
          contractors
          manageCustomers
          manageContracts
          manageEmployees
          manageContractors
          updateFields
          createdAt
          updatedAt
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
          postcode
          preferences
          locale
          tin
          updateFields
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
          address
          office_email
          zip_code
          mobile
          phone
          partnersNumberLimit
          employeesNumberLimit
          verified
          customers
          contracts
          employees
          contractors
          manageCustomers
          manageContracts
          manageEmployees
          manageContractors
          updateFields
          createdAt
          updatedAt
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
          postcode
          preferences
          locale
          tin
          updateFields
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listTradeUserConnectionsByTradeAndUser = /* GraphQL */ `
  query ListTradeUserConnectionsByTradeAndUser(
    $tradeName: String
    $username: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTradeUserConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTradeUserConnectionsByTradeAndUser(
      tradeName: $tradeName
      username: $username
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
          address
          office_email
          zip_code
          mobile
          phone
          partnersNumberLimit
          employeesNumberLimit
          verified
          customers
          contracts
          employees
          contractors
          manageCustomers
          manageContracts
          manageEmployees
          manageContractors
          updateFields
          createdAt
          updatedAt
          members
        }
        user {
          id
          username
          email
          telephone
          surname
          name
          fathers_name
          address
          zip_code
          mobile
          phone
          tin
          updateFields
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listTradeUserConnectionsByUsername = /* GraphQL */ `
  query ListTradeUserConnectionsByUsername(
    $username: String
    $tradeName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTradeUserConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTradeUserConnectionsByUsername(
      username: $username
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
          address
          office_email
          zip_code
          mobile
          phone
          partnersNumberLimit
          employeesNumberLimit
          verified
          customers
          contracts
          employees
          contractors
          manageCustomers
          manageContracts
          manageEmployees
          manageContractors
          updateFields
          createdAt
          updatedAt
          members
        }
        user {
          id
          username
          email
          telephone
          surname
          name
          fathers_name
          address
          zip_code
          mobile
          phone
          tin
          updateFields
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
        address
        office_email
        zip_code
        mobile
        phone
        partnersNumberLimit
        employeesNumberLimit
        verified
        customers
        contracts
        employees
        contractors
        manageCustomers
        manageContracts
        manageEmployees
        manageContractors
        updateFields
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
          postcode
          preferences
          locale
          tin
          professionStartDate
          chamberRecordNumber
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          bankAccountInfo
        }
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
        driversLicense {
          LicenseID
          DriversLicenseType
        }
        createdAt
        updateFields
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
          updateFields
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
          address
          office_email
          zip_code
          mobile
          phone
          partnersNumberLimit
          employeesNumberLimit
          verified
          customers
          contracts
          employees
          contractors
          manageCustomers
          manageContracts
          manageEmployees
          manageContractors
          updateFields
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
          updateFields
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listTradeContractConnectionByTradeId = /* GraphQL */ `
  query ListTradeContractConnectionByTradeId(
    $tradeId: ID
    $tradeName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTradeContractConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTradeContractConnectionByTradeId(
      tradeId: $tradeId
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
        contractId
        ownsContract
        createdAt
        updatedAt
        trade {
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
          postcode
          preferences
          locale
          tin
          doy
          familyStatus
          chamberRecordNumber
          insuranceLicenseExpirationDate
          partnersNumberLimit
          employeesNumberLimit
          verified
          customers
          contracts
          employees
          contractors
          manageCustomers
          manageContracts
          manageEmployees
          manageContractors
          updateFields
          createdAt
          updatedAt
          members
        }
        to {
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
          postcode
          preferences
          locale
          tin
          doy
          familyStatus
          chamberRecordNumber
          insuranceLicenseExpirationDate
          partnersNumberLimit
          employeesNumberLimit
          verified
          customers
          contracts
          employees
          contractors
          manageCustomers
          manageContracts
          manageEmployees
          manageContractors
          updateFields
          createdAt
          updatedAt
          members
        }
      }
      nextToken
    }
  }
`;
export const listCompanyAccessConnectionByToTradeName = /* GraphQL */ `
  query ListCompanyAccessConnectionByToTradeName(
    $toTradeName: String
    $fromTradeName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCompanyAccessConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanyAccessConnectionByToTradeName(
      toTradeName: $toTradeName
      fromTradeName: $fromTradeName
      sortDirection: $sortDirection
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
          address
          office_email
          zip_code
          mobile
          phone
          partnersNumberLimit
          employeesNumberLimit
          verified
          customers
          contracts
          employees
          contractors
          manageCustomers
          manageContracts
          manageEmployees
          manageContractors
          updateFields
          createdAt
          updatedAt
          members
        }
        to {
          id
          tradeName
          ownerUsername
          address
          office_email
          zip_code
          mobile
          phone
          partnersNumberLimit
          employeesNumberLimit
          verified
          customers
          contracts
          employees
          contractors
          manageCustomers
          manageContracts
          manageEmployees
          manageContractors
          updateFields
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
        postcode
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
        tin
        files {
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
        postcode
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
        tin
        files {
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
        requests {
          nextToken
        }
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
          surname
          name
          fathers_name
          address
          zip_code
          mobile
          phone
          tin
          updateFields
          createdAt
          updatedAt
        }
        receiver {
          id
          username
          email
          telephone
          surname
          name
          fathers_name
          address
          zip_code
          mobile
          phone
          tin
          updateFields
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listTransactionHistorybySenderUsername = /* GraphQL */ `
  query ListTransactionHistorybySenderUsername(
    $senderUsername: String
    $timestampReceiverUsername: ModelTransactionHistoryBySenderUsernameCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTransactionHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactionHistorybySenderUsername(
      senderUsername: $senderUsername
      timestampReceiverUsername: $timestampReceiverUsername
      sortDirection: $sortDirection
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
          postcode
          preferences
          locale
          tin
          updateFields
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
          postcode
          preferences
          locale
          tin
          updateFields
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listTransactionHistorybyReceiverUsername = /* GraphQL */ `
  query ListTransactionHistorybyReceiverUsername(
    $receiverUsername: String
    $timestampSenderUsername: ModelTransactionHistoryByReceiverUsernameCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTransactionHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactionHistorybyReceiverUsername(
      receiverUsername: $receiverUsername
      timestampSenderUsername: $timestampSenderUsername
      sortDirection: $sortDirection
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
          surname
          name
          fathers_name
          address
          zip_code
          mobile
          phone
          tin
          updateFields
          createdAt
          updatedAt
        }
        receiver {
          id
          username
          email
          telephone
          surname
          name
          fathers_name
          address
          zip_code
          mobile
          phone
          tin
          updateFields
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listRequestsBySenderEmail = /* GraphQL */ `
  query ListRequestsBySenderEmail(
    $senderEmail: String
    $sortDirection: ModelSortDirection
    $filter: ModelRequestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequestsBySenderEmail(
      senderEmail: $senderEmail
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        senderUsername
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
export const listRequestsByReceiverEmail = /* GraphQL */ `
  query ListRequestsByReceiverEmail(
    $receiverEmail: String
    $sortDirection: ModelSortDirection
    $filter: ModelRequestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequestsByReceiverEmail(
      receiverEmail: $receiverEmail
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        senderUsername
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
export const getRequests = /* GraphQL */ `
  query GetRequests($id: ID!) {
    getRequests(id: $id) {
      id
      senderUsername
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
        senderUsername
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
    user(username: $username)
  }
`;
