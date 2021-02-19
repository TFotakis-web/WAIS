/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const sendRequest = /* GraphQL */ `
  mutation SendRequest($requestType: RequestType!, $payload: String!) {
    sendRequest(requestType: $requestType, payload: $payload)
  }
`;
export const resolveRequest = /* GraphQL */ `
  mutation ResolveRequest($id: ID!, $payload: String!) {
    resolveRequest(id: $id, payload: $payload)
  }
`;
export const createOffice = /* GraphQL */ `
  mutation CreateOffice(
    $input: CreateOfficeInput!
    $condition: ModelOfficeConditionInput
  ) {
    createOffice(input: $input, condition: $condition) {
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
      privateData {
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
      }
      members
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
      privateData {
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
      }
      members
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
      privateData {
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
      }
      members
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
      files {
        bucket
        region
        key
        name
      }
      updateFields
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
export const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile(
    $input: UpdateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    updateUserProfile(input: $input, condition: $condition) {
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
      files {
        bucket
        region
        key
        name
      }
      updateFields
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
export const deleteUserProfile = /* GraphQL */ `
  mutation DeleteUserProfile(
    $input: DeleteUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    deleteUserProfile(input: $input, condition: $condition) {
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
      files {
        bucket
        region
        key
        name
      }
      updateFields
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
        name
      }
      updateFields
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
        name
      }
      updateFields
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
        name
      }
      updateFields
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
export const updateContract = /* GraphQL */ `
  mutation UpdateContract(
    $input: UpdateContractInput!
    $condition: ModelContractConditionInput
  ) {
    updateContract(input: $input, condition: $condition) {
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
export const deleteContract = /* GraphQL */ `
  mutation DeleteContract(
    $input: DeleteContractInput!
    $condition: ModelContractConditionInput
  ) {
    deleteContract(input: $input, condition: $condition) {
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
        privateData {
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
        surname
        name
        fathers_name
        address
        zip_code
        mobile
        phone
        tin
        files {
          bucket
          region
          key
          name
        }
        updateFields
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
        privateData {
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
        surname
        name
        fathers_name
        address
        zip_code
        mobile
        phone
        tin
        files {
          bucket
          region
          key
          name
        }
        updateFields
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
        privateData {
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
        surname
        name
        fathers_name
        address
        zip_code
        mobile
        phone
        tin
        files {
          bucket
          region
          key
          name
        }
        updateFields
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
        privateData {
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
        privateData {
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
        privateData {
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
        privateData {
          tin
          professionStartDate
          chamberRecordNumber
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          bankAccountInfo
        }
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
        privateData {
          tin
          professionStartDate
          chamberRecordNumber
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          bankAccountInfo
        }
        members
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
        privateData {
          tin
          professionStartDate
          chamberRecordNumber
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          bankAccountInfo
        }
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
        privateData {
          tin
          professionStartDate
          chamberRecordNumber
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          bankAccountInfo
        }
        members
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
        privateData {
          tin
          professionStartDate
          chamberRecordNumber
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          bankAccountInfo
        }
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
        privateData {
          tin
          professionStartDate
          chamberRecordNumber
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          bankAccountInfo
        }
        members
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
        files {
          bucket
          region
          key
          name
        }
        updateFields
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
        surname
        name
        fathers_name
        address
        zip_code
        mobile
        phone
        tin
        files {
          bucket
          region
          key
          name
        }
        updateFields
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
        files {
          bucket
          region
          key
          name
        }
        updateFields
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
        surname
        name
        fathers_name
        address
        zip_code
        mobile
        phone
        tin
        files {
          bucket
          region
          key
          name
        }
        updateFields
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
        files {
          bucket
          region
          key
          name
        }
        updateFields
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
        surname
        name
        fathers_name
        address
        zip_code
        mobile
        phone
        tin
        files {
          bucket
          region
          key
          name
        }
        updateFields
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
export const createRequests = /* GraphQL */ `
  mutation CreateRequests(
    $input: CreateRequestsInput!
    $condition: ModelRequestsConditionInput
  ) {
    createRequests(input: $input, condition: $condition) {
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
export const updateRequests = /* GraphQL */ `
  mutation UpdateRequests(
    $input: UpdateRequestsInput!
    $condition: ModelRequestsConditionInput
  ) {
    updateRequests(input: $input, condition: $condition) {
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
export const deleteRequests = /* GraphQL */ `
  mutation DeleteRequests(
    $input: DeleteRequestsInput!
    $condition: ModelRequestsConditionInput
  ) {
    deleteRequests(input: $input, condition: $condition) {
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
