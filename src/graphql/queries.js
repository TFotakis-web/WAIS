/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const me = /* GraphQL */ `
  query Me {
    me {
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
export const echo = /* GraphQL */ `
  query Echo($msg: String!) {
    echo(msg: $msg)
  }
`;
export const getOfficesIWorkIn = /* GraphQL */ `
  query GetOfficesIWorkIn(
    $filter: ModelOfficeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getOfficesIWorkIn(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getMyUserCalendarEvents = /* GraphQL */ `
  query GetMyUserCalendarEvents(
    $filter: ModelUserCalendarEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getMyUserCalendarEvents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
`;
export const getMySentRequests = /* GraphQL */ `
  query GetMySentRequests(
    $filter: ModelRequestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getMySentRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
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
  }
`;
export const getRequestsForMe = /* GraphQL */ `
  query GetRequestsForMe(
    $filter: ModelRequestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getRequestsForMe(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
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
  }
`;
export const getEmployeeUserProfiles = /* GraphQL */ `
  query GetEmployeeUserProfiles(
    $filter: ModelOfficeUserConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getEmployeeUserProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getContractorUserProfiles = /* GraphQL */ `
  query GetContractorUserProfiles(
    $filter: ModelOfficeUserConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getContractorUserProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getCustomersForOfficeId = /* GraphQL */ `
  query GetCustomersForOfficeId(
    $officeId: ID!
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getCustomersForOfficeId(
      officeId: $officeId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        postcode
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
  }
`;
export const getContractsForOfficeId = /* GraphQL */ `
  query GetContractsForOfficeId(
    $officeId: ID!
    $filter: ModelContractFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getContractsForOfficeId(
      officeId: $officeId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        postcode
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
  }
`;
export const getPartnerOfficeConnectionsForOfficeId = /* GraphQL */ `
  query GetPartnerOfficeConnectionsForOfficeId(
    $officeId: ID!
    $filter: ModelOfficeAccessConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPartnerOfficeConnectionsForOfficeId(
      officeId: $officeId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
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
export const getUserModelPermissionsForOffice = /* GraphQL */ `
  query GetUserModelPermissionsForOffice($officeId: ID!) {
    getUserModelPermissionsForOffice(officeId: $officeId)
  }
`;
export const getUserPagePermissionsForOffice = /* GraphQL */ `
  query GetUserPagePermissionsForOffice($officeId: ID!) {
    getUserPagePermissionsForOffice(officeId: $officeId)
  }
`;
export const getUserRole = /* GraphQL */ `
  query GetUserRole {
    getUserRole
  }
`;
export const getAvailableInsuranceCompanies = /* GraphQL */ `
  query GetAvailableInsuranceCompanies {
    getAvailableInsuranceCompanies {
      id
      officeName
      insuranceCompanies {
        name
        code
      }
    }
  }
`;
export const getS3Object = /* GraphQL */ `
  query GetS3Object($obj: S3ObjectInput) {
    getS3Object(obj: $obj) {
      content
      path
      size
      contentType
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
            postcode
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
              createdAt
              updatedAt
            }
          }
          nextToken
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
          postcode
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
export const listOfficeByName = /* GraphQL */ `
  query ListOfficeByName(
    $officeName: String
    $ownerUsername: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOfficeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOfficeByName(
      officeName: $officeName
      ownerUsername: $ownerUsername
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
            postcode
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
              createdAt
              updatedAt
            }
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listOfficeByOfficeEmail = /* GraphQL */ `
  query ListOfficeByOfficeEmail(
    $office_email: String
    $sortDirection: ModelSortDirection
    $filter: ModelOfficeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOfficeByOfficeEmail(
      office_email: $office_email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
            postcode
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
              createdAt
              updatedAt
            }
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listOfficeByOwnerUsername = /* GraphQL */ `
  query ListOfficeByOwnerUsername(
    $ownerUsername: String
    $officeName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOfficeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOfficeByOwnerUsername(
      ownerUsername: $ownerUsername
      officeName: $officeName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
            postcode
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
              createdAt
              updatedAt
            }
          }
          nextToken
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
      nextToken
    }
  }
`;
export const getVehicle = /* GraphQL */ `
  query GetVehicle($id: ID!) {
    getVehicle(id: $id) {
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
export const listVehiclesByOfficeName = /* GraphQL */ `
  query ListVehiclesByOfficeName(
    $officeName: String
    $numberPlate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVehiclesByOfficeName(
      officeName: $officeName
      numberPlate: $numberPlate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listVehiclesByOwner = /* GraphQL */ `
  query ListVehiclesByOwner(
    $vehicle_owner: String
    $officeName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVehiclesByOwner(
      vehicle_owner: $vehicle_owner
      officeName: $officeName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
export const listContractsByOfficeName = /* GraphQL */ `
  query ListContractsByOfficeName(
    $officeName: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContractFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContractsByOfficeName(
      officeName: $officeName
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
  }
`;
export const listContractsByVehicleNumberPlates = /* GraphQL */ `
  query ListContractsByVehicleNumberPlates(
    $vehicleNumberPlate: String
    $officeName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContractFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContractsByVehicleNumberPlates(
      vehicleNumberPlate: $vehicleNumberPlate
      officeName: $officeName
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
  }
`;
export const listContractsByCustomerId = /* GraphQL */ `
  query ListContractsByCustomerId(
    $customerId: String
    $officeName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelContractFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContractsByCustomerId(
      customerId: $customerId
      officeName: $officeName
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
  }
`;
export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
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
      postcode
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
        officeName
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
  }
`;
export const listCustomersByOfficeName = /* GraphQL */ `
  query ListCustomersByOfficeName(
    $officeName: String
    $firstNameLastName: ModelCustomerByOfficeNameCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomersByOfficeName(
      officeName: $officeName
      firstNameLastName: $firstNameLastName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        postcode
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
  }
`;
export const getOfficeUserConnection = /* GraphQL */ `
  query GetOfficeUserConnection($id: ID!) {
    getOfficeUserConnection(id: $id) {
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
            postcode
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
export const listOfficeUserConnections = /* GraphQL */ `
  query ListOfficeUserConnections(
    $filter: ModelOfficeUserConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOfficeUserConnections(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
              createdAt
              updatedAt
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
      nextToken
    }
  }
`;
export const listOfficeUserConnectionsByOfficeName = /* GraphQL */ `
  query ListOfficeUserConnectionsByOfficeName(
    $officeName: String
    $userId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOfficeUserConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOfficeUserConnectionsByOfficeName(
      officeName: $officeName
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
              createdAt
              updatedAt
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
      nextToken
    }
  }
`;
export const listOfficeUserConnectionsByEmployeeType = /* GraphQL */ `
  query ListOfficeUserConnectionsByEmployeeType(
    $employeeType: EmployeeType
    $usernameOfficeName: ModelOfficeUserConnectionByEmployeeTypeCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOfficeUserConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOfficeUserConnectionsByEmployeeType(
      employeeType: $employeeType
      usernameOfficeName: $usernameOfficeName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
              createdAt
              updatedAt
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
      nextToken
    }
  }
`;
export const listOfficeUserConnectionsByUserId = /* GraphQL */ `
  query ListOfficeUserConnectionsByUserId(
    $userId: ID
    $officeName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOfficeUserConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOfficeUserConnectionsByUserId(
      userId: $userId
      officeName: $officeName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
              createdAt
              updatedAt
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
      nextToken
    }
  }
`;
export const listOfficeUserConnectionsByOfficeAndUser = /* GraphQL */ `
  query ListOfficeUserConnectionsByOfficeAndUser(
    $officeName: String
    $username: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOfficeUserConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOfficeUserConnectionsByOfficeAndUser(
      officeName: $officeName
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
              createdAt
              updatedAt
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
      nextToken
    }
  }
`;
export const listOfficeUserConnectionsByUsername = /* GraphQL */ `
  query ListOfficeUserConnectionsByUsername(
    $username: String
    $officeName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOfficeUserConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOfficeUserConnectionsByUsername(
      username: $username
      officeName: $officeName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
              createdAt
              updatedAt
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
      nextToken
    }
  }
`;
export const getOfficeContractConnection = /* GraphQL */ `
  query GetOfficeContractConnection($id: ID!) {
    getOfficeContractConnection(id: $id) {
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
            postcode
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
export const listOfficeContractConnections = /* GraphQL */ `
  query ListOfficeContractConnections(
    $filter: ModelOfficeContractConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOfficeContractConnections(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
              createdAt
              updatedAt
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
      nextToken
    }
  }
`;
export const listOfficeContractConnectionByOfficeId = /* GraphQL */ `
  query ListOfficeContractConnectionByOfficeId(
    $officeId: ID
    $officeName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOfficeContractConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOfficeContractConnectionByOfficeId(
      officeId: $officeId
      officeName: $officeName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
              createdAt
              updatedAt
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
      nextToken
    }
  }
`;
export const listOfficeContractConnectionByOfficeName = /* GraphQL */ `
  query ListOfficeContractConnectionByOfficeName(
    $officeName: String
    $officeId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOfficeContractConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOfficeContractConnectionByOfficeName(
      officeName: $officeName
      officeId: $officeId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
              createdAt
              updatedAt
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
      nextToken
    }
  }
`;
export const listOfficeContractConnectionByContractId = /* GraphQL */ `
  query ListOfficeContractConnectionByContractId(
    $contractId: ID
    $officeId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOfficeContractConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOfficeContractConnectionByContractId(
      contractId: $contractId
      officeId: $officeId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
              createdAt
              updatedAt
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
      nextToken
    }
  }
`;
export const getOfficeAccessConnection = /* GraphQL */ `
  query GetOfficeAccessConnection($id: ID!) {
    getOfficeAccessConnection(id: $id) {
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
            postcode
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
            postcode
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
export const listOfficeAccessConnections = /* GraphQL */ `
  query ListOfficeAccessConnections(
    $filter: ModelOfficeAccessConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOfficeAccessConnections(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
              createdAt
              updatedAt
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
              createdAt
              updatedAt
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
            }
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;
export const listOfficeAccessConnectionByFromId = /* GraphQL */ `
  query ListOfficeAccessConnectionByFromId(
    $fromId: ID
    $toId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOfficeAccessConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOfficeAccessConnectionByFromId(
      fromId: $fromId
      toId: $toId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
              createdAt
              updatedAt
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
              createdAt
              updatedAt
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
            }
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;
export const listOfficeAccessConnectionByToId = /* GraphQL */ `
  query ListOfficeAccessConnectionByToId(
    $toId: ID
    $fromId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOfficeAccessConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOfficeAccessConnectionByToId(
      toId: $toId
      fromId: $fromId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
              createdAt
              updatedAt
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
              createdAt
              updatedAt
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
            }
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;
export const listOfficeAccessConnectionByFromOfficeName = /* GraphQL */ `
  query ListOfficeAccessConnectionByFromOfficeName(
    $fromOfficeName: String
    $toOfficeName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOfficeAccessConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOfficeAccessConnectionByFromOfficeName(
      fromOfficeName: $fromOfficeName
      toOfficeName: $toOfficeName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
              createdAt
              updatedAt
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
              createdAt
              updatedAt
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
            }
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;
export const listOfficeAccessConnectionByToOfficeName = /* GraphQL */ `
  query ListOfficeAccessConnectionByToOfficeName(
    $toOfficeName: String
    $fromOfficeName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOfficeAccessConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOfficeAccessConnectionByToOfficeName(
      toOfficeName: $toOfficeName
      fromOfficeName: $fromOfficeName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
              createdAt
              updatedAt
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
              createdAt
              updatedAt
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
            }
            nextToken
          }
        }
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
          files {
            level
            idToken
            filePath
            filename
            contentType
          }
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
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
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
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
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
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
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
  }
`;
export const listRequestsBySenderUsername = /* GraphQL */ `
  query ListRequestsBySenderUsername(
    $senderUsername: String
    $sortDirection: ModelSortDirection
    $filter: ModelRequestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequestsBySenderUsername(
      senderUsername: $senderUsername
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
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
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
  }
`;
export const listRequestsByType = /* GraphQL */ `
  query ListRequestsByType(
    $type: RequestType
    $sortDirection: ModelSortDirection
    $filter: ModelRequestsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequestsByType(
      type: $type
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
            files {
              level
              idToken
              filePath
              filename
              contentType
            }
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
  }
`;
export const getUserCalendarEvent = /* GraphQL */ `
  query GetUserCalendarEvent($id: ID!) {
    getUserCalendarEvent(id: $id) {
      id
      username
      payload
      createdAt
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
        payload
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listUserCalendarEventsByUsername = /* GraphQL */ `
  query ListUserCalendarEventsByUsername(
    $username: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserCalendarEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserCalendarEventsByUsername(
      username: $username
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
`;
