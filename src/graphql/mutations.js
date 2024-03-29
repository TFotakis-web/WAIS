/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateOfficeDetails = /* GraphQL */ `
  mutation UpdateOfficeDetails(
    $input: UpdateOfficeInput!
    $condition: ModelOfficeConditionInput
  ) {
    updateOfficeDetails(input: $input, condition: $condition) {
      id
      officeName
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
      office_logo {
        level
        idToken
        filePath
        filename
        contentType
      }
      insuranceLicenseExpirationDate
      civilLiabilityExpirationDate
      bankAccountInfo
      files {
        level
        idToken
        filePath
        filename
        contentType
      }
      insuranceCompanies {
        name
        code
      }
      insuranceCompaniesAvailable
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
      role
      telephone
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
        level
        idToken
        filePath
        filename
        contentType
      }
      preferences
      locale
      files {
        level
        idToken
        filePath
        filename
        contentType
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
      officeName
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
        level
        idToken
        filePath
        filename
        contentType
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
      officeName
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
        level
        idToken
        filePath
        filename
        contentType
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
      officeName
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
        level
        idToken
        filePath
        filename
        contentType
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
      officeName
      second_officeId
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
      officeName
      second_officeId
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
      officeName
      second_officeId
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
      officeName
      firstName
      lastName
      fathersName
      birthDate
      gender
      email
      mobile
      zip_code
      doy
      address
      familyStatus
      files {
        level
        idToken
        filePath
        filename
        contentType
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
      officeName
      firstName
      lastName
      fathersName
      birthDate
      gender
      email
      mobile
      zip_code
      doy
      address
      familyStatus
      files {
        level
        idToken
        filePath
        filename
        contentType
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
      officeName
      firstName
      lastName
      fathersName
      birthDate
      gender
      email
      mobile
      zip_code
      doy
      address
      familyStatus
      files {
        level
        idToken
        filePath
        filename
        contentType
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
export const createOfficeRequest = /* GraphQL */ `
  mutation CreateOfficeRequest($input: CreateOfficeRequestPayloadInput!) {
    createOfficeRequest(input: $input) {
      id
      senderUsername
      senderEmail
      receiverEmail
      type
      payload {
        createOfficePayload {
          officeName
          address
          office_email
          zip_code
          mobile
          phone
          tin
          professionStartDate
          chamberRecordNumber
          office_logo {
            level
            idToken
            filePath
            filename
            contentType
          }
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          comments
          files {
            level
            idToken
            filePath
            filename
            contentType
          }
        }
        createUnverifiedOfficePayload {
          officeName
          address
          office_email
          zip_code
          mobile
          phone
          tin
          professionStartDate
          chamberRecordNumber
          office_logo {
            level
            idToken
            filePath
            filename
            contentType
          }
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          comments
          files {
            level
            idToken
            filePath
            filename
            contentType
          }
          contractorPagePermissions
          contractorModelPermissions
        }
        createOfficeConnectionPayload {
          manager_email
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
export const createInviteEmployeeToOfficeRequest = /* GraphQL */ `
  mutation CreateInviteEmployeeToOfficeRequest(
    $input: InviteEmployeeRequestPayloadInput!
  ) {
    createInviteEmployeeToOfficeRequest(input: $input) {
      id
      senderUsername
      senderEmail
      receiverEmail
      type
      payload {
        createOfficePayload {
          officeName
          address
          office_email
          zip_code
          mobile
          phone
          tin
          professionStartDate
          chamberRecordNumber
          office_logo {
            level
            idToken
            filePath
            filename
            contentType
          }
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          comments
          files {
            level
            idToken
            filePath
            filename
            contentType
          }
        }
        createUnverifiedOfficePayload {
          officeName
          address
          office_email
          zip_code
          mobile
          phone
          tin
          professionStartDate
          chamberRecordNumber
          office_logo {
            level
            idToken
            filePath
            filename
            contentType
          }
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          comments
          files {
            level
            idToken
            filePath
            filename
            contentType
          }
          contractorPagePermissions
          contractorModelPermissions
        }
        createOfficeConnectionPayload {
          manager_email
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
export const createInviteContractorToOfficeRequest = /* GraphQL */ `
  mutation CreateInviteContractorToOfficeRequest(
    $input: InviteContractorRequestPayloadInput!
  ) {
    createInviteContractorToOfficeRequest(input: $input) {
      id
      senderUsername
      senderEmail
      receiverEmail
      type
      payload {
        createOfficePayload {
          officeName
          address
          office_email
          zip_code
          mobile
          phone
          tin
          professionStartDate
          chamberRecordNumber
          office_logo {
            level
            idToken
            filePath
            filename
            contentType
          }
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          comments
          files {
            level
            idToken
            filePath
            filename
            contentType
          }
        }
        createUnverifiedOfficePayload {
          officeName
          address
          office_email
          zip_code
          mobile
          phone
          tin
          professionStartDate
          chamberRecordNumber
          office_logo {
            level
            idToken
            filePath
            filename
            contentType
          }
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          comments
          files {
            level
            idToken
            filePath
            filename
            contentType
          }
          contractorPagePermissions
          contractorModelPermissions
        }
        createOfficeConnectionPayload {
          manager_email
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
export const createOfficeConnectionRequest = /* GraphQL */ `
  mutation CreateOfficeConnectionRequest(
    $input: OfficeConnectionRequestPayloadInput!
  ) {
    createOfficeConnectionRequest(input: $input) {
      id
      senderUsername
      senderEmail
      receiverEmail
      type
      payload {
        createOfficePayload {
          officeName
          address
          office_email
          zip_code
          mobile
          phone
          tin
          professionStartDate
          chamberRecordNumber
          office_logo {
            level
            idToken
            filePath
            filename
            contentType
          }
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          comments
          files {
            level
            idToken
            filePath
            filename
            contentType
          }
        }
        createUnverifiedOfficePayload {
          officeName
          address
          office_email
          zip_code
          mobile
          phone
          tin
          professionStartDate
          chamberRecordNumber
          office_logo {
            level
            idToken
            filePath
            filename
            contentType
          }
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          comments
          files {
            level
            idToken
            filePath
            filename
            contentType
          }
          contractorPagePermissions
          contractorModelPermissions
        }
        createOfficeConnectionPayload {
          manager_email
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
    }
  }
`;
export const resolveRequest = /* GraphQL */ `
  mutation ResolveRequest(
    $requestId: ID!
    $decision: RequestDecision!
    $payload: ResolveRequestPayloadInput
  ) {
    resolveRequest(
      requestId: $requestId
      decision: $decision
      payload: $payload
    ) {
      id
    }
  }
`;
export const createOfficeAccessConnectionForOffice = /* GraphQL */ `
  mutation CreateOfficeAccessConnectionForOffice(
    $officeId: ID!
    $input: CreateOfficeAccessConnectionInput!
    $condition: ModelOfficeAccessConnectionConditionInput
  ) {
    createOfficeAccessConnectionForOffice(
      officeId: $officeId
      input: $input
      condition: $condition
    ) {
      items {
        id
        fromId
        fromOfficeName
        toId
        toOfficeName
        expirationDate
        message
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const updateOfficeAccessConnectionForOffice = /* GraphQL */ `
  mutation UpdateOfficeAccessConnectionForOffice(
    $officeId: ID!
    $input: UpdateOfficeAccessConnectionInput!
    $condition: ModelOfficeAccessConnectionConditionInput
  ) {
    updateOfficeAccessConnectionForOffice(
      officeId: $officeId
      input: $input
      condition: $condition
    ) {
      items {
        id
        fromId
        fromOfficeName
        toId
        toOfficeName
        expirationDate
        message
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const deleteOfficeAccessConnectionForOffice = /* GraphQL */ `
  mutation DeleteOfficeAccessConnectionForOffice(
    $officeId: ID!
    $input: DeleteOfficeAccessConnectionInput!
    $condition: ModelOfficeAccessConnectionConditionInput
  ) {
    deleteOfficeAccessConnectionForOffice(
      officeId: $officeId
      input: $input
      condition: $condition
    ) {
      items {
        id
        fromId
        fromOfficeName
        toId
        toOfficeName
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
    ) {
      id
    }
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
    ) {
      id
    }
  }
`;
export const deleteEmployeeForOffice = /* GraphQL */ `
  mutation DeleteEmployeeForOffice($officeId: ID!, $empUsername: String!) {
    deleteEmployeeForOffice(officeId: $officeId, empUsername: $empUsername) {
      id
    }
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
    ) {
      id
    }
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
    ) {
      id
    }
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
    ) {
      id
    }
  }
`;
export const createUnverifiedOffice = /* GraphQL */ `
  mutation CreateUnverifiedOffice($input: CreateUnverifiedOfficePayloadInput!) {
    createUnverifiedOffice(input: $input) {
      id
    }
  }
`;
export const createOffice = /* GraphQL */ `
  mutation CreateOffice(
    $input: CreateOfficeInput!
    $condition: ModelOfficeConditionInput
  ) {
    createOffice(input: $input, condition: $condition) {
      id
      officeName
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
      subscriptionExpirationDate
      office_logo {
        level
        idToken
        filePath
        filename
        contentType
      }
      files {
        level
        idToken
        filePath
        filename
        contentType
      }
      insuranceCompanies {
        name
        code
      }
      insuranceCompaniesAvailable
      availableInsuranceCompanies {
        id
        officeName
        insuranceCompanies {
          name
          code
        }
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
          officeName
          second_officeId
          contractorId
          co_name
          co_TRN
          contractState
          insuranceCompanyName
          insuranceCompanyCode
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
            officeName
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
              level
              idToken
              filePath
              filename
              contentType
            }
            createdAt
            updatedAt
          }
        }
        nextToken
      }
      officeCustomers {
        items {
          id
          tin
          officeName
          firstName
          lastName
          fathersName
          birthDate
          gender
          email
          mobile
          zip_code
          doy
          address
          familyStatus
          files {
            level
            idToken
            filePath
            filename
            contentType
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
        nextToken
      }
      workforce {
        items {
          id
          officeId
          officeName
          userId
          username
          pagePermissions
          modelPermissions
          employeeType
          preferences
          createdAt
          updatedAt
          office {
            id
            officeName
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
            subscriptionExpirationDate
            office_logo {
              level
              idToken
              filePath
              filename
              contentType
            }
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
            insuranceCompanies {
              name
              code
            }
            insuranceCompaniesAvailable
            availableInsuranceCompanies {
              id
              officeName
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
            officeConnections {
              nextToken
            }
          }
          user {
            id
            username
            email
            telephone
            role
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
              level
              idToken
              filePath
              filename
              contentType
            }
            preferences
            locale
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
            createdAt
            updatedAt
            officeConnections {
              nextToken
            }
            requestsSentByMe {
              nextToken
            }
            requestsForMe {
              nextToken
            }
            calendarEvents {
              nextToken
            }
          }
        }
        nextToken
      }
      officeConnections {
        items {
          id
          insuranceCompanyName
          insuranceCompanyCode
          fromId
          fromOfficeName
          toId
          toOfficeName
          expirationDate
          message
          createdAt
          updatedAt
          from {
            id
            officeName
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
            subscriptionExpirationDate
            office_logo {
              level
              idToken
              filePath
              filename
              contentType
            }
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
            insuranceCompanies {
              name
              code
            }
            insuranceCompaniesAvailable
            availableInsuranceCompanies {
              id
              officeName
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
            officeConnections {
              nextToken
            }
          }
          to {
            id
            officeName
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
            subscriptionExpirationDate
            office_logo {
              level
              idToken
              filePath
              filename
              contentType
            }
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
            insuranceCompanies {
              name
              code
            }
            insuranceCompaniesAvailable
            availableInsuranceCompanies {
              id
              officeName
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
            officeConnections {
              nextToken
            }
          }
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
      officeName
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
      subscriptionExpirationDate
      office_logo {
        level
        idToken
        filePath
        filename
        contentType
      }
      files {
        level
        idToken
        filePath
        filename
        contentType
      }
      insuranceCompanies {
        name
        code
      }
      insuranceCompaniesAvailable
      availableInsuranceCompanies {
        id
        officeName
        insuranceCompanies {
          name
          code
        }
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
          officeName
          second_officeId
          contractorId
          co_name
          co_TRN
          contractState
          insuranceCompanyName
          insuranceCompanyCode
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
            officeName
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
              level
              idToken
              filePath
              filename
              contentType
            }
            createdAt
            updatedAt
          }
        }
        nextToken
      }
      officeCustomers {
        items {
          id
          tin
          officeName
          firstName
          lastName
          fathersName
          birthDate
          gender
          email
          mobile
          zip_code
          doy
          address
          familyStatus
          files {
            level
            idToken
            filePath
            filename
            contentType
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
        nextToken
      }
      workforce {
        items {
          id
          officeId
          officeName
          userId
          username
          pagePermissions
          modelPermissions
          employeeType
          preferences
          createdAt
          updatedAt
          office {
            id
            officeName
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
            subscriptionExpirationDate
            office_logo {
              level
              idToken
              filePath
              filename
              contentType
            }
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
            insuranceCompanies {
              name
              code
            }
            insuranceCompaniesAvailable
            availableInsuranceCompanies {
              id
              officeName
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
            officeConnections {
              nextToken
            }
          }
          user {
            id
            username
            email
            telephone
            role
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
              level
              idToken
              filePath
              filename
              contentType
            }
            preferences
            locale
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
            createdAt
            updatedAt
            officeConnections {
              nextToken
            }
            requestsSentByMe {
              nextToken
            }
            requestsForMe {
              nextToken
            }
            calendarEvents {
              nextToken
            }
          }
        }
        nextToken
      }
      officeConnections {
        items {
          id
          insuranceCompanyName
          insuranceCompanyCode
          fromId
          fromOfficeName
          toId
          toOfficeName
          expirationDate
          message
          createdAt
          updatedAt
          from {
            id
            officeName
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
            subscriptionExpirationDate
            office_logo {
              level
              idToken
              filePath
              filename
              contentType
            }
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
            insuranceCompanies {
              name
              code
            }
            insuranceCompaniesAvailable
            availableInsuranceCompanies {
              id
              officeName
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
            officeConnections {
              nextToken
            }
          }
          to {
            id
            officeName
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
            subscriptionExpirationDate
            office_logo {
              level
              idToken
              filePath
              filename
              contentType
            }
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
            insuranceCompanies {
              name
              code
            }
            insuranceCompaniesAvailable
            availableInsuranceCompanies {
              id
              officeName
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
            officeConnections {
              nextToken
            }
          }
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
      officeName
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
      subscriptionExpirationDate
      office_logo {
        level
        idToken
        filePath
        filename
        contentType
      }
      files {
        level
        idToken
        filePath
        filename
        contentType
      }
      insuranceCompanies {
        name
        code
      }
      insuranceCompaniesAvailable
      availableInsuranceCompanies {
        id
        officeName
        insuranceCompanies {
          name
          code
        }
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
          officeName
          second_officeId
          contractorId
          co_name
          co_TRN
          contractState
          insuranceCompanyName
          insuranceCompanyCode
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
            officeName
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
              level
              idToken
              filePath
              filename
              contentType
            }
            createdAt
            updatedAt
          }
        }
        nextToken
      }
      officeCustomers {
        items {
          id
          tin
          officeName
          firstName
          lastName
          fathersName
          birthDate
          gender
          email
          mobile
          zip_code
          doy
          address
          familyStatus
          files {
            level
            idToken
            filePath
            filename
            contentType
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
        nextToken
      }
      workforce {
        items {
          id
          officeId
          officeName
          userId
          username
          pagePermissions
          modelPermissions
          employeeType
          preferences
          createdAt
          updatedAt
          office {
            id
            officeName
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
            subscriptionExpirationDate
            office_logo {
              level
              idToken
              filePath
              filename
              contentType
            }
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
            insuranceCompanies {
              name
              code
            }
            insuranceCompaniesAvailable
            availableInsuranceCompanies {
              id
              officeName
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
            officeConnections {
              nextToken
            }
          }
          user {
            id
            username
            email
            telephone
            role
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
              level
              idToken
              filePath
              filename
              contentType
            }
            preferences
            locale
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
            createdAt
            updatedAt
            officeConnections {
              nextToken
            }
            requestsSentByMe {
              nextToken
            }
            requestsForMe {
              nextToken
            }
            calendarEvents {
              nextToken
            }
          }
        }
        nextToken
      }
      officeConnections {
        items {
          id
          insuranceCompanyName
          insuranceCompanyCode
          fromId
          fromOfficeName
          toId
          toOfficeName
          expirationDate
          message
          createdAt
          updatedAt
          from {
            id
            officeName
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
            subscriptionExpirationDate
            office_logo {
              level
              idToken
              filePath
              filename
              contentType
            }
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
            insuranceCompanies {
              name
              code
            }
            insuranceCompaniesAvailable
            availableInsuranceCompanies {
              id
              officeName
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
            officeConnections {
              nextToken
            }
          }
          to {
            id
            officeName
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
            subscriptionExpirationDate
            office_logo {
              level
              idToken
              filePath
              filename
              contentType
            }
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
            insuranceCompanies {
              name
              code
            }
            insuranceCompaniesAvailable
            availableInsuranceCompanies {
              id
              officeName
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
            officeConnections {
              nextToken
            }
          }
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
      role
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
        level
        idToken
        filePath
        filename
        contentType
      }
      preferences
      locale
      files {
        level
        idToken
        filePath
        filename
        contentType
      }
      createdAt
      updatedAt
      officeConnections {
        items {
          id
          officeId
          officeName
          userId
          username
          pagePermissions
          modelPermissions
          employeeType
          preferences
          createdAt
          updatedAt
          office {
            id
            officeName
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
            subscriptionExpirationDate
            office_logo {
              level
              idToken
              filePath
              filename
              contentType
            }
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
            insuranceCompanies {
              name
              code
            }
            insuranceCompaniesAvailable
            availableInsuranceCompanies {
              id
              officeName
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
            officeConnections {
              nextToken
            }
          }
          user {
            id
            username
            email
            telephone
            role
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
              level
              idToken
              filePath
              filename
              contentType
            }
            preferences
            locale
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
            createdAt
            updatedAt
            officeConnections {
              nextToken
            }
            requestsSentByMe {
              nextToken
            }
            requestsForMe {
              nextToken
            }
            calendarEvents {
              nextToken
            }
          }
        }
        nextToken
      }
      requestsSentByMe {
        items {
          id
          senderUsername
          senderEmail
          receiverEmail
          type
          payload {
            createOfficePayload {
              officeName
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
              comments
            }
            createUnverifiedOfficePayload {
              officeName
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
              comments
              contractorPagePermissions
              contractorModelPermissions
            }
            createOfficeConnectionPayload {
              manager_email
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
        nextToken
      }
      requestsForMe {
        items {
          id
          senderUsername
          senderEmail
          receiverEmail
          type
          payload {
            createOfficePayload {
              officeName
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
              comments
            }
            createUnverifiedOfficePayload {
              officeName
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
              comments
              contractorPagePermissions
              contractorModelPermissions
            }
            createOfficeConnectionPayload {
              manager_email
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
        nextToken
      }
      calendarEvents {
        items {
          id
          username
          payload
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
      role
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
        level
        idToken
        filePath
        filename
        contentType
      }
      preferences
      locale
      files {
        level
        idToken
        filePath
        filename
        contentType
      }
      createdAt
      updatedAt
      officeConnections {
        items {
          id
          officeId
          officeName
          userId
          username
          pagePermissions
          modelPermissions
          employeeType
          preferences
          createdAt
          updatedAt
          office {
            id
            officeName
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
            subscriptionExpirationDate
            office_logo {
              level
              idToken
              filePath
              filename
              contentType
            }
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
            insuranceCompanies {
              name
              code
            }
            insuranceCompaniesAvailable
            availableInsuranceCompanies {
              id
              officeName
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
            officeConnections {
              nextToken
            }
          }
          user {
            id
            username
            email
            telephone
            role
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
              level
              idToken
              filePath
              filename
              contentType
            }
            preferences
            locale
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
            createdAt
            updatedAt
            officeConnections {
              nextToken
            }
            requestsSentByMe {
              nextToken
            }
            requestsForMe {
              nextToken
            }
            calendarEvents {
              nextToken
            }
          }
        }
        nextToken
      }
      requestsSentByMe {
        items {
          id
          senderUsername
          senderEmail
          receiverEmail
          type
          payload {
            createOfficePayload {
              officeName
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
              comments
            }
            createUnverifiedOfficePayload {
              officeName
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
              comments
              contractorPagePermissions
              contractorModelPermissions
            }
            createOfficeConnectionPayload {
              manager_email
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
        nextToken
      }
      requestsForMe {
        items {
          id
          senderUsername
          senderEmail
          receiverEmail
          type
          payload {
            createOfficePayload {
              officeName
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
              comments
            }
            createUnverifiedOfficePayload {
              officeName
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
              comments
              contractorPagePermissions
              contractorModelPermissions
            }
            createOfficeConnectionPayload {
              manager_email
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
        nextToken
      }
      calendarEvents {
        items {
          id
          username
          payload
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
      role
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
        level
        idToken
        filePath
        filename
        contentType
      }
      preferences
      locale
      files {
        level
        idToken
        filePath
        filename
        contentType
      }
      createdAt
      updatedAt
      officeConnections {
        items {
          id
          officeId
          officeName
          userId
          username
          pagePermissions
          modelPermissions
          employeeType
          preferences
          createdAt
          updatedAt
          office {
            id
            officeName
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
            subscriptionExpirationDate
            office_logo {
              level
              idToken
              filePath
              filename
              contentType
            }
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
            insuranceCompanies {
              name
              code
            }
            insuranceCompaniesAvailable
            availableInsuranceCompanies {
              id
              officeName
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
            officeConnections {
              nextToken
            }
          }
          user {
            id
            username
            email
            telephone
            role
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
              level
              idToken
              filePath
              filename
              contentType
            }
            preferences
            locale
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
            createdAt
            updatedAt
            officeConnections {
              nextToken
            }
            requestsSentByMe {
              nextToken
            }
            requestsForMe {
              nextToken
            }
            calendarEvents {
              nextToken
            }
          }
        }
        nextToken
      }
      requestsSentByMe {
        items {
          id
          senderUsername
          senderEmail
          receiverEmail
          type
          payload {
            createOfficePayload {
              officeName
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
              comments
            }
            createUnverifiedOfficePayload {
              officeName
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
              comments
              contractorPagePermissions
              contractorModelPermissions
            }
            createOfficeConnectionPayload {
              manager_email
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
        nextToken
      }
      requestsForMe {
        items {
          id
          senderUsername
          senderEmail
          receiverEmail
          type
          payload {
            createOfficePayload {
              officeName
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
              comments
            }
            createUnverifiedOfficePayload {
              officeName
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
              comments
              contractorPagePermissions
              contractorModelPermissions
            }
            createOfficeConnectionPayload {
              manager_email
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
        nextToken
      }
      calendarEvents {
        items {
          id
          username
          payload
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
      officeName
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
        level
        idToken
        filePath
        filename
        contentType
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
      officeName
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
        level
        idToken
        filePath
        filename
        contentType
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
      officeName
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
        level
        idToken
        filePath
        filename
        contentType
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
      officeName
      second_officeId
      contractorId
      co_name
      co_TRN
      contractState
      insuranceCompanyName
      insuranceCompanyCode
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
        officeName
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
          level
          idToken
          filePath
          filename
          contentType
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
      officeName
      second_officeId
      contractorId
      co_name
      co_TRN
      contractState
      insuranceCompanyName
      insuranceCompanyCode
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
        officeName
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
          level
          idToken
          filePath
          filename
          contentType
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
      officeName
      second_officeId
      contractorId
      co_name
      co_TRN
      contractState
      insuranceCompanyName
      insuranceCompanyCode
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
        officeName
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
          level
          idToken
          filePath
          filename
          contentType
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
      officeName
      firstName
      lastName
      fathersName
      birthDate
      gender
      email
      mobile
      zip_code
      doy
      address
      familyStatus
      files {
        level
        idToken
        filePath
        filename
        contentType
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
      officeName
      firstName
      lastName
      fathersName
      birthDate
      gender
      email
      mobile
      zip_code
      doy
      address
      familyStatus
      files {
        level
        idToken
        filePath
        filename
        contentType
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
      officeName
      firstName
      lastName
      fathersName
      birthDate
      gender
      email
      mobile
      zip_code
      doy
      address
      familyStatus
      files {
        level
        idToken
        filePath
        filename
        contentType
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
export const createOfficeUserConnection = /* GraphQL */ `
  mutation CreateOfficeUserConnection(
    $input: CreateOfficeUserConnectionInput!
    $condition: ModelOfficeUserConnectionConditionInput
  ) {
    createOfficeUserConnection(input: $input, condition: $condition) {
      id
      officeId
      officeName
      userId
      username
      pagePermissions
      modelPermissions
      employeeType
      preferences
      createdAt
      updatedAt
      office {
        id
        officeName
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
        subscriptionExpirationDate
        office_logo {
          level
          idToken
          filePath
          filename
          contentType
        }
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        insuranceCompanies {
          name
          code
        }
        insuranceCompaniesAvailable
        availableInsuranceCompanies {
          id
          officeName
          insuranceCompanies {
            name
            code
          }
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
            officeName
            second_officeId
            contractorId
            co_name
            co_TRN
            contractState
            insuranceCompanyName
            insuranceCompanyCode
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
              officeName
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
        officeCustomers {
          items {
            id
            tin
            officeName
            firstName
            lastName
            fathersName
            birthDate
            gender
            email
            mobile
            zip_code
            doy
            address
            familyStatus
            files {
              level
              idToken
              filePath
              filename
              contentType
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
        workforce {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        officeConnections {
          items {
            id
            insuranceCompanyName
            insuranceCompanyCode
            fromId
            fromOfficeName
            toId
            toOfficeName
            expirationDate
            message
            createdAt
            updatedAt
            from {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            to {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
          }
          nextToken
        }
      }
      user {
        id
        username
        email
        telephone
        role
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
          level
          idToken
          filePath
          filename
          contentType
        }
        preferences
        locale
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        createdAt
        updatedAt
        officeConnections {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        requestsSentByMe {
          items {
            id
            senderUsername
            senderEmail
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
            receiverEmail
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        calendarEvents {
          items {
            id
            username
            payload
            createdAt
            updatedAt
          }
          nextToken
        }
      }
    }
  }
`;
export const updateOfficeUserConnection = /* GraphQL */ `
  mutation UpdateOfficeUserConnection(
    $input: UpdateOfficeUserConnectionInput!
    $condition: ModelOfficeUserConnectionConditionInput
  ) {
    updateOfficeUserConnection(input: $input, condition: $condition) {
      id
      officeId
      officeName
      userId
      username
      pagePermissions
      modelPermissions
      employeeType
      preferences
      createdAt
      updatedAt
      office {
        id
        officeName
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
        subscriptionExpirationDate
        office_logo {
          level
          idToken
          filePath
          filename
          contentType
        }
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        insuranceCompanies {
          name
          code
        }
        insuranceCompaniesAvailable
        availableInsuranceCompanies {
          id
          officeName
          insuranceCompanies {
            name
            code
          }
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
            officeName
            second_officeId
            contractorId
            co_name
            co_TRN
            contractState
            insuranceCompanyName
            insuranceCompanyCode
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
              officeName
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
        officeCustomers {
          items {
            id
            tin
            officeName
            firstName
            lastName
            fathersName
            birthDate
            gender
            email
            mobile
            zip_code
            doy
            address
            familyStatus
            files {
              level
              idToken
              filePath
              filename
              contentType
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
        workforce {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        officeConnections {
          items {
            id
            insuranceCompanyName
            insuranceCompanyCode
            fromId
            fromOfficeName
            toId
            toOfficeName
            expirationDate
            message
            createdAt
            updatedAt
            from {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            to {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
          }
          nextToken
        }
      }
      user {
        id
        username
        email
        telephone
        role
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
          level
          idToken
          filePath
          filename
          contentType
        }
        preferences
        locale
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        createdAt
        updatedAt
        officeConnections {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        requestsSentByMe {
          items {
            id
            senderUsername
            senderEmail
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
            receiverEmail
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        calendarEvents {
          items {
            id
            username
            payload
            createdAt
            updatedAt
          }
          nextToken
        }
      }
    }
  }
`;
export const deleteOfficeUserConnection = /* GraphQL */ `
  mutation DeleteOfficeUserConnection(
    $input: DeleteOfficeUserConnectionInput!
    $condition: ModelOfficeUserConnectionConditionInput
  ) {
    deleteOfficeUserConnection(input: $input, condition: $condition) {
      id
      officeId
      officeName
      userId
      username
      pagePermissions
      modelPermissions
      employeeType
      preferences
      createdAt
      updatedAt
      office {
        id
        officeName
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
        subscriptionExpirationDate
        office_logo {
          level
          idToken
          filePath
          filename
          contentType
        }
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        insuranceCompanies {
          name
          code
        }
        insuranceCompaniesAvailable
        availableInsuranceCompanies {
          id
          officeName
          insuranceCompanies {
            name
            code
          }
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
            officeName
            second_officeId
            contractorId
            co_name
            co_TRN
            contractState
            insuranceCompanyName
            insuranceCompanyCode
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
              officeName
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
        officeCustomers {
          items {
            id
            tin
            officeName
            firstName
            lastName
            fathersName
            birthDate
            gender
            email
            mobile
            zip_code
            doy
            address
            familyStatus
            files {
              level
              idToken
              filePath
              filename
              contentType
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
        workforce {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        officeConnections {
          items {
            id
            insuranceCompanyName
            insuranceCompanyCode
            fromId
            fromOfficeName
            toId
            toOfficeName
            expirationDate
            message
            createdAt
            updatedAt
            from {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            to {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
          }
          nextToken
        }
      }
      user {
        id
        username
        email
        telephone
        role
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
          level
          idToken
          filePath
          filename
          contentType
        }
        preferences
        locale
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        createdAt
        updatedAt
        officeConnections {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        requestsSentByMe {
          items {
            id
            senderUsername
            senderEmail
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
            receiverEmail
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        calendarEvents {
          items {
            id
            username
            payload
            createdAt
            updatedAt
          }
          nextToken
        }
      }
    }
  }
`;
export const createOfficeContractConnection = /* GraphQL */ `
  mutation CreateOfficeContractConnection(
    $input: CreateOfficeContractConnectionInput!
    $condition: ModelOfficeContractConnectionConditionInput
  ) {
    createOfficeContractConnection(input: $input, condition: $condition) {
      id
      officeId
      officeName
      contractId
      ownsContract
      createdAt
      updatedAt
      office {
        id
        officeName
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
        subscriptionExpirationDate
        office_logo {
          level
          idToken
          filePath
          filename
          contentType
        }
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        insuranceCompanies {
          name
          code
        }
        insuranceCompaniesAvailable
        availableInsuranceCompanies {
          id
          officeName
          insuranceCompanies {
            name
            code
          }
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
            officeName
            second_officeId
            contractorId
            co_name
            co_TRN
            contractState
            insuranceCompanyName
            insuranceCompanyCode
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
              officeName
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
        officeCustomers {
          items {
            id
            tin
            officeName
            firstName
            lastName
            fathersName
            birthDate
            gender
            email
            mobile
            zip_code
            doy
            address
            familyStatus
            files {
              level
              idToken
              filePath
              filename
              contentType
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
        workforce {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        officeConnections {
          items {
            id
            insuranceCompanyName
            insuranceCompanyCode
            fromId
            fromOfficeName
            toId
            toOfficeName
            expirationDate
            message
            createdAt
            updatedAt
            from {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            to {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
          }
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
        officeName
        second_officeId
        contractorId
        co_name
        co_TRN
        contractState
        insuranceCompanyName
        insuranceCompanyCode
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
          officeName
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
            level
            idToken
            filePath
            filename
            contentType
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const updateOfficeContractConnection = /* GraphQL */ `
  mutation UpdateOfficeContractConnection(
    $input: UpdateOfficeContractConnectionInput!
    $condition: ModelOfficeContractConnectionConditionInput
  ) {
    updateOfficeContractConnection(input: $input, condition: $condition) {
      id
      officeId
      officeName
      contractId
      ownsContract
      createdAt
      updatedAt
      office {
        id
        officeName
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
        subscriptionExpirationDate
        office_logo {
          level
          idToken
          filePath
          filename
          contentType
        }
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        insuranceCompanies {
          name
          code
        }
        insuranceCompaniesAvailable
        availableInsuranceCompanies {
          id
          officeName
          insuranceCompanies {
            name
            code
          }
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
            officeName
            second_officeId
            contractorId
            co_name
            co_TRN
            contractState
            insuranceCompanyName
            insuranceCompanyCode
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
              officeName
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
        officeCustomers {
          items {
            id
            tin
            officeName
            firstName
            lastName
            fathersName
            birthDate
            gender
            email
            mobile
            zip_code
            doy
            address
            familyStatus
            files {
              level
              idToken
              filePath
              filename
              contentType
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
        workforce {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        officeConnections {
          items {
            id
            insuranceCompanyName
            insuranceCompanyCode
            fromId
            fromOfficeName
            toId
            toOfficeName
            expirationDate
            message
            createdAt
            updatedAt
            from {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            to {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
          }
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
        officeName
        second_officeId
        contractorId
        co_name
        co_TRN
        contractState
        insuranceCompanyName
        insuranceCompanyCode
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
          officeName
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
            level
            idToken
            filePath
            filename
            contentType
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const deleteOfficeContractConnection = /* GraphQL */ `
  mutation DeleteOfficeContractConnection(
    $input: DeleteOfficeContractConnectionInput!
    $condition: ModelOfficeContractConnectionConditionInput
  ) {
    deleteOfficeContractConnection(input: $input, condition: $condition) {
      id
      officeId
      officeName
      contractId
      ownsContract
      createdAt
      updatedAt
      office {
        id
        officeName
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
        subscriptionExpirationDate
        office_logo {
          level
          idToken
          filePath
          filename
          contentType
        }
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        insuranceCompanies {
          name
          code
        }
        insuranceCompaniesAvailable
        availableInsuranceCompanies {
          id
          officeName
          insuranceCompanies {
            name
            code
          }
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
            officeName
            second_officeId
            contractorId
            co_name
            co_TRN
            contractState
            insuranceCompanyName
            insuranceCompanyCode
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
              officeName
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
        officeCustomers {
          items {
            id
            tin
            officeName
            firstName
            lastName
            fathersName
            birthDate
            gender
            email
            mobile
            zip_code
            doy
            address
            familyStatus
            files {
              level
              idToken
              filePath
              filename
              contentType
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
        workforce {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        officeConnections {
          items {
            id
            insuranceCompanyName
            insuranceCompanyCode
            fromId
            fromOfficeName
            toId
            toOfficeName
            expirationDate
            message
            createdAt
            updatedAt
            from {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            to {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
          }
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
        officeName
        second_officeId
        contractorId
        co_name
        co_TRN
        contractState
        insuranceCompanyName
        insuranceCompanyCode
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
          officeName
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
            level
            idToken
            filePath
            filename
            contentType
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const createOfficeAccessConnection = /* GraphQL */ `
  mutation CreateOfficeAccessConnection(
    $input: CreateOfficeAccessConnectionInput!
    $condition: ModelOfficeAccessConnectionConditionInput
  ) {
    createOfficeAccessConnection(input: $input, condition: $condition) {
      id
      insuranceCompanyName
      insuranceCompanyCode
      fromId
      fromOfficeName
      toId
      toOfficeName
      expirationDate
      message
      createdAt
      updatedAt
      from {
        id
        officeName
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
        subscriptionExpirationDate
        office_logo {
          level
          idToken
          filePath
          filename
          contentType
        }
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        insuranceCompanies {
          name
          code
        }
        insuranceCompaniesAvailable
        availableInsuranceCompanies {
          id
          officeName
          insuranceCompanies {
            name
            code
          }
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
            officeName
            second_officeId
            contractorId
            co_name
            co_TRN
            contractState
            insuranceCompanyName
            insuranceCompanyCode
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
              officeName
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
        officeCustomers {
          items {
            id
            tin
            officeName
            firstName
            lastName
            fathersName
            birthDate
            gender
            email
            mobile
            zip_code
            doy
            address
            familyStatus
            files {
              level
              idToken
              filePath
              filename
              contentType
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
        workforce {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        officeConnections {
          items {
            id
            insuranceCompanyName
            insuranceCompanyCode
            fromId
            fromOfficeName
            toId
            toOfficeName
            expirationDate
            message
            createdAt
            updatedAt
            from {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            to {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
          }
          nextToken
        }
      }
      to {
        id
        officeName
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
        subscriptionExpirationDate
        office_logo {
          level
          idToken
          filePath
          filename
          contentType
        }
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        insuranceCompanies {
          name
          code
        }
        insuranceCompaniesAvailable
        availableInsuranceCompanies {
          id
          officeName
          insuranceCompanies {
            name
            code
          }
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
            officeName
            second_officeId
            contractorId
            co_name
            co_TRN
            contractState
            insuranceCompanyName
            insuranceCompanyCode
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
              officeName
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
        officeCustomers {
          items {
            id
            tin
            officeName
            firstName
            lastName
            fathersName
            birthDate
            gender
            email
            mobile
            zip_code
            doy
            address
            familyStatus
            files {
              level
              idToken
              filePath
              filename
              contentType
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
        workforce {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        officeConnections {
          items {
            id
            insuranceCompanyName
            insuranceCompanyCode
            fromId
            fromOfficeName
            toId
            toOfficeName
            expirationDate
            message
            createdAt
            updatedAt
            from {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            to {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const updateOfficeAccessConnection = /* GraphQL */ `
  mutation UpdateOfficeAccessConnection(
    $input: UpdateOfficeAccessConnectionInput!
    $condition: ModelOfficeAccessConnectionConditionInput
  ) {
    updateOfficeAccessConnection(input: $input, condition: $condition) {
      id
      insuranceCompanyName
      insuranceCompanyCode
      fromId
      fromOfficeName
      toId
      toOfficeName
      expirationDate
      message
      createdAt
      updatedAt
      from {
        id
        officeName
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
        subscriptionExpirationDate
        office_logo {
          level
          idToken
          filePath
          filename
          contentType
        }
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        insuranceCompanies {
          name
          code
        }
        insuranceCompaniesAvailable
        availableInsuranceCompanies {
          id
          officeName
          insuranceCompanies {
            name
            code
          }
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
            officeName
            second_officeId
            contractorId
            co_name
            co_TRN
            contractState
            insuranceCompanyName
            insuranceCompanyCode
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
              officeName
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
        officeCustomers {
          items {
            id
            tin
            officeName
            firstName
            lastName
            fathersName
            birthDate
            gender
            email
            mobile
            zip_code
            doy
            address
            familyStatus
            files {
              level
              idToken
              filePath
              filename
              contentType
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
        workforce {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        officeConnections {
          items {
            id
            insuranceCompanyName
            insuranceCompanyCode
            fromId
            fromOfficeName
            toId
            toOfficeName
            expirationDate
            message
            createdAt
            updatedAt
            from {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            to {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
          }
          nextToken
        }
      }
      to {
        id
        officeName
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
        subscriptionExpirationDate
        office_logo {
          level
          idToken
          filePath
          filename
          contentType
        }
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        insuranceCompanies {
          name
          code
        }
        insuranceCompaniesAvailable
        availableInsuranceCompanies {
          id
          officeName
          insuranceCompanies {
            name
            code
          }
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
            officeName
            second_officeId
            contractorId
            co_name
            co_TRN
            contractState
            insuranceCompanyName
            insuranceCompanyCode
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
              officeName
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
        officeCustomers {
          items {
            id
            tin
            officeName
            firstName
            lastName
            fathersName
            birthDate
            gender
            email
            mobile
            zip_code
            doy
            address
            familyStatus
            files {
              level
              idToken
              filePath
              filename
              contentType
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
        workforce {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        officeConnections {
          items {
            id
            insuranceCompanyName
            insuranceCompanyCode
            fromId
            fromOfficeName
            toId
            toOfficeName
            expirationDate
            message
            createdAt
            updatedAt
            from {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            to {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
          }
          nextToken
        }
      }
    }
  }
`;
export const deleteOfficeAccessConnection = /* GraphQL */ `
  mutation DeleteOfficeAccessConnection(
    $input: DeleteOfficeAccessConnectionInput!
    $condition: ModelOfficeAccessConnectionConditionInput
  ) {
    deleteOfficeAccessConnection(input: $input, condition: $condition) {
      id
      insuranceCompanyName
      insuranceCompanyCode
      fromId
      fromOfficeName
      toId
      toOfficeName
      expirationDate
      message
      createdAt
      updatedAt
      from {
        id
        officeName
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
        subscriptionExpirationDate
        office_logo {
          level
          idToken
          filePath
          filename
          contentType
        }
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        insuranceCompanies {
          name
          code
        }
        insuranceCompaniesAvailable
        availableInsuranceCompanies {
          id
          officeName
          insuranceCompanies {
            name
            code
          }
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
            officeName
            second_officeId
            contractorId
            co_name
            co_TRN
            contractState
            insuranceCompanyName
            insuranceCompanyCode
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
              officeName
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
        officeCustomers {
          items {
            id
            tin
            officeName
            firstName
            lastName
            fathersName
            birthDate
            gender
            email
            mobile
            zip_code
            doy
            address
            familyStatus
            files {
              level
              idToken
              filePath
              filename
              contentType
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
        workforce {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        officeConnections {
          items {
            id
            insuranceCompanyName
            insuranceCompanyCode
            fromId
            fromOfficeName
            toId
            toOfficeName
            expirationDate
            message
            createdAt
            updatedAt
            from {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            to {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
          }
          nextToken
        }
      }
      to {
        id
        officeName
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
        subscriptionExpirationDate
        office_logo {
          level
          idToken
          filePath
          filename
          contentType
        }
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        insuranceCompanies {
          name
          code
        }
        insuranceCompaniesAvailable
        availableInsuranceCompanies {
          id
          officeName
          insuranceCompanies {
            name
            code
          }
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
            officeName
            second_officeId
            contractorId
            co_name
            co_TRN
            contractState
            insuranceCompanyName
            insuranceCompanyCode
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
              officeName
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
        officeCustomers {
          items {
            id
            tin
            officeName
            firstName
            lastName
            fathersName
            birthDate
            gender
            email
            mobile
            zip_code
            doy
            address
            familyStatus
            files {
              level
              idToken
              filePath
              filename
              contentType
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
        workforce {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        officeConnections {
          items {
            id
            insuranceCompanyName
            insuranceCompanyCode
            fromId
            fromOfficeName
            toId
            toOfficeName
            expirationDate
            message
            createdAt
            updatedAt
            from {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            to {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
          }
          nextToken
        }
      }
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
        role
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
          level
          idToken
          filePath
          filename
          contentType
        }
        preferences
        locale
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        createdAt
        updatedAt
        officeConnections {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        requestsSentByMe {
          items {
            id
            senderUsername
            senderEmail
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
            receiverEmail
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        calendarEvents {
          items {
            id
            username
            payload
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      receiver {
        id
        username
        email
        telephone
        role
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
          level
          idToken
          filePath
          filename
          contentType
        }
        preferences
        locale
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        createdAt
        updatedAt
        officeConnections {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        requestsSentByMe {
          items {
            id
            senderUsername
            senderEmail
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
            receiverEmail
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        calendarEvents {
          items {
            id
            username
            payload
            createdAt
            updatedAt
          }
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
        role
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
          level
          idToken
          filePath
          filename
          contentType
        }
        preferences
        locale
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        createdAt
        updatedAt
        officeConnections {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        requestsSentByMe {
          items {
            id
            senderUsername
            senderEmail
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
            receiverEmail
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        calendarEvents {
          items {
            id
            username
            payload
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      receiver {
        id
        username
        email
        telephone
        role
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
          level
          idToken
          filePath
          filename
          contentType
        }
        preferences
        locale
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        createdAt
        updatedAt
        officeConnections {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        requestsSentByMe {
          items {
            id
            senderUsername
            senderEmail
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
            receiverEmail
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        calendarEvents {
          items {
            id
            username
            payload
            createdAt
            updatedAt
          }
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
        role
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
          level
          idToken
          filePath
          filename
          contentType
        }
        preferences
        locale
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        createdAt
        updatedAt
        officeConnections {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        requestsSentByMe {
          items {
            id
            senderUsername
            senderEmail
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
            receiverEmail
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        calendarEvents {
          items {
            id
            username
            payload
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      receiver {
        id
        username
        email
        telephone
        role
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
          level
          idToken
          filePath
          filename
          contentType
        }
        preferences
        locale
        files {
          level
          idToken
          filePath
          filename
          contentType
        }
        createdAt
        updatedAt
        officeConnections {
          items {
            id
            officeId
            officeName
            userId
            username
            pagePermissions
            modelPermissions
            employeeType
            preferences
            createdAt
            updatedAt
            office {
              id
              officeName
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
              subscriptionExpirationDate
              insuranceCompaniesAvailable
              createdAt
              updatedAt
            }
            user {
              id
              username
              email
              telephone
              role
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
              preferences
              locale
              createdAt
              updatedAt
            }
          }
          nextToken
        }
        requestsSentByMe {
          items {
            id
            senderUsername
            senderEmail
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
            receiverEmail
            type
            createdAt
            updatedAt
          }
          nextToken
        }
        calendarEvents {
          items {
            id
            username
            payload
            createdAt
            updatedAt
          }
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
      payload {
        createOfficePayload {
          officeName
          address
          office_email
          zip_code
          mobile
          phone
          tin
          professionStartDate
          chamberRecordNumber
          office_logo {
            level
            idToken
            filePath
            filename
            contentType
          }
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          comments
          files {
            level
            idToken
            filePath
            filename
            contentType
          }
        }
        createUnverifiedOfficePayload {
          officeName
          address
          office_email
          zip_code
          mobile
          phone
          tin
          professionStartDate
          chamberRecordNumber
          office_logo {
            level
            idToken
            filePath
            filename
            contentType
          }
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          comments
          files {
            level
            idToken
            filePath
            filename
            contentType
          }
          contractorPagePermissions
          contractorModelPermissions
        }
        createOfficeConnectionPayload {
          manager_email
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
      receiverEmail
      type
      payload {
        createOfficePayload {
          officeName
          address
          office_email
          zip_code
          mobile
          phone
          tin
          professionStartDate
          chamberRecordNumber
          office_logo {
            level
            idToken
            filePath
            filename
            contentType
          }
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          comments
          files {
            level
            idToken
            filePath
            filename
            contentType
          }
        }
        createUnverifiedOfficePayload {
          officeName
          address
          office_email
          zip_code
          mobile
          phone
          tin
          professionStartDate
          chamberRecordNumber
          office_logo {
            level
            idToken
            filePath
            filename
            contentType
          }
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          comments
          files {
            level
            idToken
            filePath
            filename
            contentType
          }
          contractorPagePermissions
          contractorModelPermissions
        }
        createOfficeConnectionPayload {
          manager_email
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
      receiverEmail
      type
      payload {
        createOfficePayload {
          officeName
          address
          office_email
          zip_code
          mobile
          phone
          tin
          professionStartDate
          chamberRecordNumber
          office_logo {
            level
            idToken
            filePath
            filename
            contentType
          }
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          comments
          files {
            level
            idToken
            filePath
            filename
            contentType
          }
        }
        createUnverifiedOfficePayload {
          officeName
          address
          office_email
          zip_code
          mobile
          phone
          tin
          professionStartDate
          chamberRecordNumber
          office_logo {
            level
            idToken
            filePath
            filename
            contentType
          }
          insuranceLicenseExpirationDate
          civilLiabilityExpirationDate
          comments
          files {
            level
            idToken
            filePath
            filename
            contentType
          }
          contractorPagePermissions
          contractorModelPermissions
        }
        createOfficeConnectionPayload {
          manager_email
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
export const createEvents = /* GraphQL */ `
  mutation CreateEvents(
    $input: CreateEventsInput!
    $condition: ModelEventsConditionInput
  ) {
    createEvents(input: $input, condition: $condition) {
      id
      payload
      createdAt
      updatedAt
    }
  }
`;
export const updateEvents = /* GraphQL */ `
  mutation UpdateEvents(
    $input: UpdateEventsInput!
    $condition: ModelEventsConditionInput
  ) {
    updateEvents(input: $input, condition: $condition) {
      id
      payload
      createdAt
      updatedAt
    }
  }
`;
export const deleteEvents = /* GraphQL */ `
  mutation DeleteEvents(
    $input: DeleteEventsInput!
    $condition: ModelEventsConditionInput
  ) {
    deleteEvents(input: $input, condition: $condition) {
      id
      payload
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
