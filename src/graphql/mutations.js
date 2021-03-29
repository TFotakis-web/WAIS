/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateOfficeDetails = /* GraphQL */ `
  mutation UpdateOfficeDetails(
    $input: UpdateOfficeInput!
    $condition: ModelOfficeConditionInput
  ) {
    updateOfficeDetails(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const updateUserProfileDetails = /* GraphQL */ `
  mutation UpdateUserProfileDetails(
    $input: UpdateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    updateUserProfileDetails(input: $input, condition: $condition) {
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
      tin
      family_name
      gender
      birthdate
      city
      profilePicture {
        bucket
        region
        key
        name
      }
      preferences
      locale
      files {
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
export const createVehicleForOffice = /* GraphQL */ `
  mutation CreateVehicleForOffice(
    $officeId: ID!
    $input: CreateVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    createVehicleForOffice(
      officeId: $officeId
      input: $input
      condition: $condition
    ) {
      id
      numberPlate
      officeId
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
export const updateVehicleForOffice = /* GraphQL */ `
  mutation UpdateVehicleForOffice(
    $officeId: ID!
    $input: UpdateVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    updateVehicleForOffice(
      officeId: $officeId
      input: $input
      condition: $condition
    ) {
      id
      numberPlate
      officeId
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
export const deleteVehicleForOffice = /* GraphQL */ `
  mutation DeleteVehicleForOffice(
    $officeId: ID!
    $input: DeleteVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    deleteVehicleForOffice(
      officeId: $officeId
      input: $input
      condition: $condition
    ) {
      id
      numberPlate
      officeId
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
export const createContractForOffice = /* GraphQL */ `
  mutation CreateContractForOffice(
    $officeId: ID!
    $input: CreateContractInput!
    $condition: ModelContractConditionInput
  ) {
    createContractForOffice(
      officeId: $officeId
      input: $input
      condition: $condition
    ) {
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
    }
  }
`;
export const updateContractForOffice = /* GraphQL */ `
  mutation UpdateContractForOffice(
    $officeId: ID!
    $input: UpdateContractInput!
    $condition: ModelContractConditionInput
  ) {
    updateContractForOffice(
      officeId: $officeId
      input: $input
      condition: $condition
    ) {
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
    }
  }
`;
export const deleteContractForOffice = /* GraphQL */ `
  mutation DeleteContractForOffice(
    $officeId: ID!
    $input: DeleteContractInput!
    $condition: ModelContractConditionInput
  ) {
    deleteContractForOffice(
      officeId: $officeId
      input: $input
      condition: $condition
    ) {
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
    }
  }
`;
export const createCustomerForOffice = /* GraphQL */ `
  mutation CreateCustomerForOffice(
    $officeId: ID!
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomerForOffice(
      officeId: $officeId
      input: $input
      condition: $condition
    ) {
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
export const updateCustomerForOffice = /* GraphQL */ `
  mutation UpdateCustomerForOffice(
    $officeId: ID!
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomerForOffice(
      officeId: $officeId
      input: $input
      condition: $condition
    ) {
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
export const deleteCustomerForOffice = /* GraphQL */ `
  mutation DeleteCustomerForOffice(
    $officeId: ID!
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomerForOffice(
      officeId: $officeId
      input: $input
      condition: $condition
    ) {
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
export const createRequest = /* GraphQL */ `
  mutation CreateRequest(
    $input: CreateRequestsInput!
    $condition: ModelRequestsConditionInput
  ) {
    createRequest(input: $input, condition: $condition) {
      id
      senderUsername
      senderEmail
      receiverUsername
      receiverEmail
      type
      payload {
        createTradePayload {
          tradeName
          address
          office_email
          zip_code
          mobile
          phone
          tin
          professionStartDate
          chamberRecordNumber
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          bankAccountInfo
        }
        createCompanyConnectionPayload {
          office_email
        }
        inviteEmployeeToOfficePayload {
          email
          empModelPermissions
          empPagePermissions
        }
        inviteContractorToOfficePayload {
          ctrModelPermissions
          ctrPagePermissions
          email
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateRequestsSentByMe = /* GraphQL */ `
  mutation UpdateRequestsSentByMe(
    $input: UpdateRequestsInput!
    $condition: ModelRequestsConditionInput
  ) {
    updateRequestsSentByMe(input: $input, condition: $condition) {
      id
      senderUsername
      senderEmail
      receiverUsername
      receiverEmail
      type
      payload {
        createTradePayload {
          tradeName
          address
          office_email
          zip_code
          mobile
          phone
          tin
          professionStartDate
          chamberRecordNumber
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          bankAccountInfo
        }
        createCompanyConnectionPayload {
          office_email
        }
        inviteEmployeeToOfficePayload {
          email
          empModelPermissions
          empPagePermissions
        }
        inviteContractorToOfficePayload {
          ctrModelPermissions
          ctrPagePermissions
          email
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteRequestsSentByMe = /* GraphQL */ `
  mutation DeleteRequestsSentByMe(
    $input: DeleteRequestsInput!
    $condition: ModelRequestsConditionInput
  ) {
    deleteRequestsSentByMe(input: $input, condition: $condition) {
      id
      senderUsername
      senderEmail
      receiverUsername
      receiverEmail
      type
      payload {
        createTradePayload {
          tradeName
          address
          office_email
          zip_code
          mobile
          phone
          tin
          professionStartDate
          chamberRecordNumber
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          bankAccountInfo
        }
        createCompanyConnectionPayload {
          office_email
        }
        inviteEmployeeToOfficePayload {
          email
          empModelPermissions
          empPagePermissions
        }
        inviteContractorToOfficePayload {
          ctrModelPermissions
          ctrPagePermissions
          email
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const resolveRequest = /* GraphQL */ `
  mutation ResolveRequest(
    $requestId: ID!
    $decission: RequestDecision!
    $payload: ResolveRequestPayloadInput!
  ) {
    resolveRequest(
      requestId: $requestId
      decission: $decission
      payload: $payload
    )
  }
`;
export const createCompanyAccessConnectionForOffice = /* GraphQL */ `
  mutation CreateCompanyAccessConnectionForOffice(
    $officeId: ID!
    $input: CreateCompanyAccessConnectionInput!
    $condition: ModelCompanyAccessConnectionConditionInput
  ) {
    createCompanyAccessConnectionForOffice(
      officeId: $officeId
      input: $input
      condition: $condition
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
      }
      nextToken
    }
  }
`;
export const updateCompanyAccessConnectionForOffice = /* GraphQL */ `
  mutation UpdateCompanyAccessConnectionForOffice(
    $officeId: ID!
    $input: UpdateCompanyAccessConnectionInput!
    $condition: ModelCompanyAccessConnectionConditionInput
  ) {
    updateCompanyAccessConnectionForOffice(
      officeId: $officeId
      input: $input
      condition: $condition
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
      }
      nextToken
    }
  }
`;
export const deleteCompanyAccessConnectionForOffice = /* GraphQL */ `
  mutation DeleteCompanyAccessConnectionForOffice(
    $officeId: ID!
    $input: DeleteCompanyAccessConnectionInput!
    $condition: ModelCompanyAccessConnectionConditionInput
  ) {
    deleteCompanyAccessConnectionForOffice(
      officeId: $officeId
      input: $input
      condition: $condition
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
      }
      nextToken
    }
  }
`;
export const createMyUserCalendarEvent = /* GraphQL */ `
  mutation CreateMyUserCalendarEvent(
    $input: CreateUserCalendarEventInput!
    $condition: ModelUserCalendarEventConditionInput
  ) {
    createMyUserCalendarEvent(input: $input, condition: $condition) {
      id
      username
      payload
      createdAt
      updatedAt
    }
  }
`;
export const updateMyUserCalendarEvents = /* GraphQL */ `
  mutation UpdateMyUserCalendarEvents(
    $input: UpdateUserCalendarEventInput!
    $condition: ModelUserCalendarEventConditionInput
  ) {
    updateMyUserCalendarEvents(input: $input, condition: $condition) {
      id
      username
      payload
      createdAt
      updatedAt
    }
  }
`;
export const deleteMyUserCalendarEvents = /* GraphQL */ `
  mutation DeleteMyUserCalendarEvents(
    $input: DeleteUserCalendarEventInput!
    $condition: ModelUserCalendarEventConditionInput
  ) {
    deleteMyUserCalendarEvents(input: $input, condition: $condition) {
      id
      username
      payload
      createdAt
      updatedAt
    }
  }
`;
export const updateEmployeeModelPermissionsForOffice = /* GraphQL */ `
  mutation UpdateEmployeeModelPermissionsForOffice(
    $officeId: ID!
    $empUsername: String!
    $modelPermissions: [ModelPermission]!
  ) {
    updateEmployeeModelPermissionsForOffice(
      officeId: $officeId
      empUsername: $empUsername
      modelPermissions: $modelPermissions
    )
  }
`;
export const updateEmployeePagePermissionsForOffice = /* GraphQL */ `
  mutation UpdateEmployeePagePermissionsForOffice(
    $officeId: ID!
    $empUsername: String!
    $pagePermissions: AWSJSON!
  ) {
    updateEmployeePagePermissionsForOffice(
      officeId: $officeId
      empUsername: $empUsername
      pagePermissions: $pagePermissions
    )
  }
`;
export const deleteEmployeeForOffice = /* GraphQL */ `
  mutation DeleteEmployeeForOffice($officeId: ID!, $empUsername: String!) {
    deleteEmployeeForOffice(officeId: $officeId, empUsername: $empUsername)
  }
`;
export const updateContractorModelPermissionsForOffice = /* GraphQL */ `
  mutation UpdateContractorModelPermissionsForOffice(
    $officeId: ID!
    $contractorUsername: String!
    $modelPermissions: [ModelPermission]!
  ) {
    updateContractorModelPermissionsForOffice(
      officeId: $officeId
      contractorUsername: $contractorUsername
      modelPermissions: $modelPermissions
    )
  }
`;
export const updateContractorPagePermissionsForOffice = /* GraphQL */ `
  mutation UpdateContractorPagePermissionsForOffice(
    $officeId: ID!
    $contractorUsername: String!
    $pagePermissions: AWSJSON!
  ) {
    updateContractorPagePermissionsForOffice(
      officeId: $officeId
      contractorUsername: $contractorUsername
      pagePermissions: $pagePermissions
    )
  }
`;
export const deleteContractorForOffice = /* GraphQL */ `
  mutation DeleteContractorForOffice(
    $officeId: ID!
    $contractorUsername: String!
  ) {
    deleteContractorForOffice(
      officeId: $officeId
      contractorUsername: $contractorUsername
    )
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
      createdAt
      updatedAt
      officeContracts {
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
          startDate
          endDate
          data
          discount
          jointWorth
          netWorth
          createdAt
          updatedAt
        }
        nextToken
      }
      officeCustomers {
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
          createdAt
          updatedAt
        }
        nextToken
      }
      workforce {
        items {
          id
          tradeId
          tradeName
          userId
          username
          pagePermissions
          modelPermissions
          employeeType
          preferences
          createdAt
          updatedAt
        }
        nextToken
      }
      companyConnections {
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
      address
      office_email
      zip_code
      mobile
      phone
      partnersNumberLimit
      employeesNumberLimit
      verified
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
      createdAt
      updatedAt
      officeContracts {
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
          startDate
          endDate
          data
          discount
          jointWorth
          netWorth
          createdAt
          updatedAt
        }
        nextToken
      }
      officeCustomers {
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
          createdAt
          updatedAt
        }
        nextToken
      }
      workforce {
        items {
          id
          tradeId
          tradeName
          userId
          username
          pagePermissions
          modelPermissions
          employeeType
          preferences
          createdAt
          updatedAt
        }
        nextToken
      }
      companyConnections {
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
      address
      office_email
      zip_code
      mobile
      phone
      partnersNumberLimit
      employeesNumberLimit
      verified
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
      createdAt
      updatedAt
      officeContracts {
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
          startDate
          endDate
          data
          discount
          jointWorth
          netWorth
          createdAt
          updatedAt
        }
        nextToken
      }
      officeCustomers {
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
          createdAt
          updatedAt
        }
        nextToken
      }
      workforce {
        items {
          id
          tradeId
          tradeName
          userId
          username
          pagePermissions
          modelPermissions
          employeeType
          preferences
          createdAt
          updatedAt
        }
        nextToken
      }
      companyConnections {
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
      email
      telephone
      surname
      name
      fathers_name
      address
      zip_code
      mobile
      tin
      family_name
      gender
      birthdate
      city
      profilePicture {
        bucket
        region
        key
        name
      }
      preferences
      locale
      files {
        bucket
        region
        key
        name
      }
      createdAt
      updatedAt
      officeConnections {
        items {
          id
          tradeId
          tradeName
          userId
          username
          pagePermissions
          modelPermissions
          employeeType
          preferences
          createdAt
          updatedAt
        }
        nextToken
      }
      callendarEvents {
        items {
          id
          username
          payload
          createdAt
          updatedAt
        }
        nextToken
      }
      requestsSentByMe {
        items {
          id
          senderUsername
          senderEmail
          receiverUsername
          receiverEmail
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      requestsForMe {
        items {
          id
          senderUsername
          senderEmail
          receiverUsername
          receiverEmail
          type
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
      email
      telephone
      surname
      name
      fathers_name
      address
      zip_code
      mobile
      tin
      family_name
      gender
      birthdate
      city
      profilePicture {
        bucket
        region
        key
        name
      }
      preferences
      locale
      files {
        bucket
        region
        key
        name
      }
      createdAt
      updatedAt
      officeConnections {
        items {
          id
          tradeId
          tradeName
          userId
          username
          pagePermissions
          modelPermissions
          employeeType
          preferences
          createdAt
          updatedAt
        }
        nextToken
      }
      callendarEvents {
        items {
          id
          username
          payload
          createdAt
          updatedAt
        }
        nextToken
      }
      requestsSentByMe {
        items {
          id
          senderUsername
          senderEmail
          receiverUsername
          receiverEmail
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      requestsForMe {
        items {
          id
          senderUsername
          senderEmail
          receiverUsername
          receiverEmail
          type
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
      email
      telephone
      surname
      name
      fathers_name
      address
      zip_code
      mobile
      tin
      family_name
      gender
      birthdate
      city
      profilePicture {
        bucket
        region
        key
        name
      }
      preferences
      locale
      files {
        bucket
        region
        key
        name
      }
      createdAt
      updatedAt
      officeConnections {
        items {
          id
          tradeId
          tradeName
          userId
          username
          pagePermissions
          modelPermissions
          employeeType
          preferences
          createdAt
          updatedAt
        }
        nextToken
      }
      callendarEvents {
        items {
          id
          username
          payload
          createdAt
          updatedAt
        }
        nextToken
      }
      requestsSentByMe {
        items {
          id
          senderUsername
          senderEmail
          receiverUsername
          receiverEmail
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      requestsForMe {
        items {
          id
          senderUsername
          senderEmail
          receiverUsername
          receiverEmail
          type
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
      officeId
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
export const updateVehicle = /* GraphQL */ `
  mutation UpdateVehicle(
    $input: UpdateVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    updateVehicle(input: $input, condition: $condition) {
      id
      numberPlate
      officeId
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
export const deleteVehicle = /* GraphQL */ `
  mutation DeleteVehicle(
    $input: DeleteVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    deleteVehicle(input: $input, condition: $condition) {
      id
      numberPlate
      officeId
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
        officeId
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
        officeId
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
        officeId
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
      pagePermissions
      modelPermissions
      employeeType
      preferences
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
        createdAt
        updatedAt
        officeContracts {
          nextToken
        }
        officeCustomers {
          nextToken
        }
        workforce {
          nextToken
        }
        companyConnections {
          nextToken
        }
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
        tin
        family_name
        gender
        birthdate
        city
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
        files {
          bucket
          region
          key
          name
        }
        createdAt
        updatedAt
        officeConnections {
          nextToken
        }
        callendarEvents {
          nextToken
        }
        requestsSentByMe {
          nextToken
        }
        requestsForMe {
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
      pagePermissions
      modelPermissions
      employeeType
      preferences
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
        createdAt
        updatedAt
        officeContracts {
          nextToken
        }
        officeCustomers {
          nextToken
        }
        workforce {
          nextToken
        }
        companyConnections {
          nextToken
        }
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
        tin
        family_name
        gender
        birthdate
        city
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
        files {
          bucket
          region
          key
          name
        }
        createdAt
        updatedAt
        officeConnections {
          nextToken
        }
        callendarEvents {
          nextToken
        }
        requestsSentByMe {
          nextToken
        }
        requestsForMe {
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
      pagePermissions
      modelPermissions
      employeeType
      preferences
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
        createdAt
        updatedAt
        officeContracts {
          nextToken
        }
        officeCustomers {
          nextToken
        }
        workforce {
          nextToken
        }
        companyConnections {
          nextToken
        }
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
        tin
        family_name
        gender
        birthdate
        city
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
        files {
          bucket
          region
          key
          name
        }
        createdAt
        updatedAt
        officeConnections {
          nextToken
        }
        callendarEvents {
          nextToken
        }
        requestsSentByMe {
          nextToken
        }
        requestsForMe {
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
        createdAt
        updatedAt
        officeContracts {
          nextToken
        }
        officeCustomers {
          nextToken
        }
        workforce {
          nextToken
        }
        companyConnections {
          nextToken
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
          officeId
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
        createdAt
        updatedAt
        officeContracts {
          nextToken
        }
        officeCustomers {
          nextToken
        }
        workforce {
          nextToken
        }
        companyConnections {
          nextToken
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
          officeId
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
        createdAt
        updatedAt
        officeContracts {
          nextToken
        }
        officeCustomers {
          nextToken
        }
        workforce {
          nextToken
        }
        companyConnections {
          nextToken
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
          officeId
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
        createdAt
        updatedAt
        officeContracts {
          nextToken
        }
        officeCustomers {
          nextToken
        }
        workforce {
          nextToken
        }
        companyConnections {
          nextToken
        }
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
        createdAt
        updatedAt
        officeContracts {
          nextToken
        }
        officeCustomers {
          nextToken
        }
        workforce {
          nextToken
        }
        companyConnections {
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
        address
        office_email
        zip_code
        mobile
        phone
        partnersNumberLimit
        employeesNumberLimit
        verified
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
        createdAt
        updatedAt
        officeContracts {
          nextToken
        }
        officeCustomers {
          nextToken
        }
        workforce {
          nextToken
        }
        companyConnections {
          nextToken
        }
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
        createdAt
        updatedAt
        officeContracts {
          nextToken
        }
        officeCustomers {
          nextToken
        }
        workforce {
          nextToken
        }
        companyConnections {
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
        address
        office_email
        zip_code
        mobile
        phone
        partnersNumberLimit
        employeesNumberLimit
        verified
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
        createdAt
        updatedAt
        officeContracts {
          nextToken
        }
        officeCustomers {
          nextToken
        }
        workforce {
          nextToken
        }
        companyConnections {
          nextToken
        }
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
        createdAt
        updatedAt
        officeContracts {
          nextToken
        }
        officeCustomers {
          nextToken
        }
        workforce {
          nextToken
        }
        companyConnections {
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
      payload
      createdAt
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
      payload
      createdAt
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
      payload
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
        email
        telephone
        surname
        name
        fathers_name
        address
        zip_code
        mobile
        tin
        family_name
        gender
        birthdate
        city
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
        files {
          bucket
          region
          key
          name
        }
        createdAt
        updatedAt
        officeConnections {
          nextToken
        }
        callendarEvents {
          nextToken
        }
        requestsSentByMe {
          nextToken
        }
        requestsForMe {
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
        tin
        family_name
        gender
        birthdate
        city
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
        files {
          bucket
          region
          key
          name
        }
        createdAt
        updatedAt
        officeConnections {
          nextToken
        }
        callendarEvents {
          nextToken
        }
        requestsSentByMe {
          nextToken
        }
        requestsForMe {
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
        tin
        family_name
        gender
        birthdate
        city
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
        files {
          bucket
          region
          key
          name
        }
        createdAt
        updatedAt
        officeConnections {
          nextToken
        }
        callendarEvents {
          nextToken
        }
        requestsSentByMe {
          nextToken
        }
        requestsForMe {
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
        tin
        family_name
        gender
        birthdate
        city
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
        files {
          bucket
          region
          key
          name
        }
        createdAt
        updatedAt
        officeConnections {
          nextToken
        }
        callendarEvents {
          nextToken
        }
        requestsSentByMe {
          nextToken
        }
        requestsForMe {
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
        tin
        family_name
        gender
        birthdate
        city
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
        files {
          bucket
          region
          key
          name
        }
        createdAt
        updatedAt
        officeConnections {
          nextToken
        }
        callendarEvents {
          nextToken
        }
        requestsSentByMe {
          nextToken
        }
        requestsForMe {
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
        tin
        family_name
        gender
        birthdate
        city
        profilePicture {
          bucket
          region
          key
          name
        }
        preferences
        locale
        files {
          bucket
          region
          key
          name
        }
        createdAt
        updatedAt
        officeConnections {
          nextToken
        }
        callendarEvents {
          nextToken
        }
        requestsSentByMe {
          nextToken
        }
        requestsForMe {
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
      receiverUsername
      receiverEmail
      type
      payload {
        createTradePayload {
          tradeName
          address
          office_email
          zip_code
          mobile
          phone
          tin
          professionStartDate
          chamberRecordNumber
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          bankAccountInfo
        }
        createCompanyConnectionPayload {
          office_email
        }
        inviteEmployeeToOfficePayload {
          email
          empModelPermissions
          empPagePermissions
        }
        inviteContractorToOfficePayload {
          ctrModelPermissions
          ctrPagePermissions
          email
        }
      }
      createdAt
      updatedAt
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
      receiverUsername
      receiverEmail
      type
      payload {
        createTradePayload {
          tradeName
          address
          office_email
          zip_code
          mobile
          phone
          tin
          professionStartDate
          chamberRecordNumber
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          bankAccountInfo
        }
        createCompanyConnectionPayload {
          office_email
        }
        inviteEmployeeToOfficePayload {
          email
          empModelPermissions
          empPagePermissions
        }
        inviteContractorToOfficePayload {
          ctrModelPermissions
          ctrPagePermissions
          email
        }
      }
      createdAt
      updatedAt
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
      receiverUsername
      receiverEmail
      type
      payload {
        createTradePayload {
          tradeName
          address
          office_email
          zip_code
          mobile
          phone
          tin
          professionStartDate
          chamberRecordNumber
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          bankAccountInfo
        }
        createCompanyConnectionPayload {
          office_email
        }
        inviteEmployeeToOfficePayload {
          email
          empModelPermissions
          empPagePermissions
        }
        inviteContractorToOfficePayload {
          ctrModelPermissions
          ctrPagePermissions
          email
        }
      }
      createdAt
      updatedAt
    }
  }
`;
