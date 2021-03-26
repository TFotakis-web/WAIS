const AWS = require('aws-sdk')
const https = require('https')
// const agent = new https.Agent({
//   keepAlive: true,
//   maxSockets: Infinity,
// })
AWS.config.update({
  region: process.env.REGION,
  // httpOptions: {
  //   agent,
  // },
})
const urlParse = require('url').URL
const APPSYNC_URL = process.env.API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
const REGION = process.env.REGION
const ENDPOINT = new urlParse(APPSYNC_URL).hostname.toString()

/**
 * Wrapper for GQL API calls.
 *
 * @param {*} input
 * @param {*} gql
 * @param {String} operation
 */
const gqlHelper = async (item, gql, operation) => {
  const req = new AWS.HttpRequest(APPSYNC_URL, REGION)
  req.method = 'POST'
  req.path = '/graphql'
  req.headers.host = ENDPOINT
  req.headers['Content-Type'] = 'application/json'
  req.body = JSON.stringify({
    query: gql,
    operationName: operation,
    variables: item,
  })

  const signer = new AWS.Signers.V4(req, 'appsync', true)
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate())

  const data = await new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req, host: ENDPOINT }, result => {
      result.on('data', data => {
        const result = JSON.parse(data.toString())
        console.log('GQL result: ' + JSON.stringify(result))
        resolve(result)
      })
    })

    httpRequest.write(req.body)
    httpRequest.end()
  })

  return data
}

//Methods visible to other functions.
module.exports = {
  getUserProfileByUsername: async username => {
    console.log('getUserProfileByUsername input: ' + username)
    const query = /* GraphQL */ `
      query getUserProfileByUsername($username: String!) {
        listUserProfileByUsername(username: $username) {
          items {
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
            createdAt
            updatedAt
            files {
              bucket
              key
              name
              region
            }
          }
        }
      }
    `
    const response = await gqlHelper({ username: username }, query, 'getUserProfileByUsername')
    let result = response.data.listUserProfileByUsername
    if (result.items.length > 0) {
      result = result.items[0]
    } else {
      result = null
    }
    console.log('getUserProfileByUsername output: ' + JSON.stringify(result))
    return result
  },

  /**
   * Retrieve a UserProfie via the GSI 'byEmail'.
   *
   * @param {String} email
   */
  getUserProfileByEmail: async email => {
    console.log('getUserProfileByEmail input: ' + email)
    const query = /* GraphQL */ `
      query getUserProfileByEmail($email: String!) {
        listUserProfileByEmail(email: $email) {
          items {
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
            createdAt
            updatedAt
            files {
              bucket
              key
              name
              region
            }
          }
        }
      }
    `
    const response = await gqlHelper({ email: email }, query, 'getUserProfileByEmail')
    const result = response.data.listUserProfileByEmail
    console.log('getUserProfileByEmail output: ' + JSON.stringify(result))
    return result
  },

  /**
   * Basic details about a user's workplaces and their permissions.
   */
  getOfficeDetailsAndPermissionsByUsername: async (username, filter, limit, nextToken) => {
    console.log('getOfficeDetailsAndPermissionsByUsername input: ' + [username, filter, limit, nextToken])
    if (!username) {
      throw new Error('Invalid username or unauthenticated user.')
    }
    const query = /* GraphQL */ `
      query getOfficeDetailsAndPermissionsByUsername($username: String!, filter: ModelTradeUserConnectionConditionInput, limit: Int, nextToken: String ) {
        listUserProfileByUsername(username: $username) {
            items {
              officeConnections(filter: $filter, limit: $limit, nextToken: $nextToken) {
                items {
                  username
                  userId
                  pagePermissions
                  modelPermissions
                  preferences
                  tradeId
                  tradeName
                  employeeType
                  preferences
                  trade {
                    ownerUsername
                  }
                  user {
                    username
                    email
                  }
                }
                nextToken
              }
            }
        }
    }`
    const response = await gqlHelper(
      { username: username, filter: filter ?? {}, limit: limit ?? 100, nextToken },
      query,
      'getOfficeDetailsAndPermissionsByUsername',
    )
    const result = response.data.listUserProfileByUsername
    console.log('getOfficeDetailsAndPermissionsByUsername output: ' + JSON.stringify(result))
    return result
  },

  getUserModelPermissionsForOffice: async (username, officeId) => {
    console.log('getUserModelPermissionsForOffice input: ' + [username])
    if (!username) {
      throw new Error('Invalid username or unauthenticated user.')
    }
    const query = /* GraphQL */ `
      query getUserModelPermissionsForOffice($username: String!, filter: ModelTradeUserConnectionConditionInput, limit: Int) {
        listUserProfileByUsername(username: $username) {
          items {
            officeConnections(filter: $filter, limit: $limit) {
              items {
                modelPermissions
              }
            }
          }
        }
      }`
    const response = await gqlHelper(
      { username: username, filter: { and: [{ tradeId: { eq: officeId } }, { username: { eq: username } }] }, limit: 100 },
      query,
      'getUserModelPermissionsForOffice',
    )
    const result = response.data.listUserProfileByUsername.items[0].officeConnections.items
    console.log('getUserModelPermissionsForOffice output: ' + JSON.stringify(result))
    return new Set(result)
  },

  getUserPagePermissionsForOffice: async (username, officeId) => {
    console.log('getUserPagePermissionsForOffice input: ' + [username])
    if (!username) {
      throw new Error('Invalid username or unauthenticated user.')
    }
    const query = /* GraphQL */ `
      query getUserPagePermissionsForOffice($username: String!, filter: ModelTradeUserConnectionConditionInput, limit: Int) {
        listUserProfileByUsername(username: $username) {
          items {
            officeConnections(filter: $filter, limit: $limit) {
              items {
                pagePermissions
              }
            }
          }
        }
      }`
    const response = await gqlHelper(
      { username: username, filter: { and: [{ tradeId: { eq: officeId } }, { username: { eq: username } }] }, limit: 100 },
      query,
      'getUserPagePermissionsForOffice',
    )
    const result = response.data.listUserProfileByUsername.items[0].officeConnections.items
    console.log('getUserPagePermissionsForOffice output: ' + JSON.stringify(result))
    return new Set(result)
  },

  getCallendarEventsForUser: async (username, filter, limit, nextToken) => {
    console.log('getCallendarEventsForUser input: ' + [username, filter, limit, nextToken])
    if (!username) {
      throw new Error('Invalid username or unauthenticated user.')
    }
    const query = /* GraphQL */ `
      query getCallendarEventsForUser($username: String!, filter: ModelUserCalendarEventFilterInput, limit: Int, nextToken: String ) {
        listUserCalendarEventsByUsername(limit: $limit, nextToken: $nextToken, filter: $filter, username: $username) {
            items {
                username
                updatedAt
                payload
                id
                createdAt
            }
            nextToken
        }
    }`
    const response = await gqlHelper(
      { username: username, filter: filter ?? {}, limit: limit ?? 50, nextToken },
      query,
      'getCallendarEventsForUser',
    )
    const result = response.data.listUserCalendarEventsByUsername
    console.log('getCallendarEventsForUser output: ' + JSON.stringify(result))
    return result
  },

  getRequestsFromUser: async (username, filter, limit, nextToken) => {
    console.log('getRequestsFromUser input: ' + [username, filter, limit, nextToken])
    if (!username) {
      throw new Error('Invalid username or unauthenticated user.')
    }
    const query = /* GraphQL */ `
      query getRequestsFromUser($username: String!, filter: ModelRequestsFilterInput, limit: Int, nextToken: String ) {
        listRequestsBySenderUsername(limit: $limit, nextToken: $nextToken, filter: $filter, username: $username) {
            items {
                id
                updatedAt
                type
                senderUsername
                senderEmail
                receiverEmail
                payload
                createdAt
            }
            nextToken
        }
    }`
    const response = await gqlHelper(
      { username: username, filter: filter ?? {}, limit: limit ?? 50, nextToken },
      query,
      'getRequestsFromUser',
    )
    const result = response.data.listRequestsBySenderUsername
    console.log('getRequestsFromUser output: ' + JSON.stringify(result))
    return result
  },

  getRequestsForUser: async (username, filter, limit, nextToken) => {
    console.log('getRequestsForUser input: ' + [username, filter, limit, nextToken])
    if (!username) {
      throw new Error('Invalid username or unauthenticated user.')
    }
    const query = /* GraphQL */ `
      query getRequestsForUser($username: String!, filter: ModelRequestsFilterInput, limit: Int, nextToken: String ) {
        listRequestsByReceiverUsername(limit: $limit, nextToken: $nextToken, filter: $filter, username: $username) {
            items {
                id
                updatedAt
                type
                senderUsername
                senderEmail
                receiverEmail
                payload
                createdAt
            }
            nextToken
        }
    }`
    const response = await gqlHelper(
      { username: username, filter: filter ?? {}, limit: limit ?? 50, nextToken },
      query,
      'getRequestsForUser',
    )
    const result = response.data.listRequestsByReceiverUsername
    console.log('getRequestsForUser output: ' + JSON.stringify(result))
    return result
  },

  resolveRequest: async (username, groups, id, decision, payload) => {
    console.log('resolveRequest input: ' + [username, id, decision, payload])
    if (!username) {
      throw new Error('Invalid username or unauthenticated user.')
    }

    //Retrieve the request
    const query = /* GraphQL */ `
      query getRequestById($filter: ModelRequestsFilterInput!) {
        listRequestss(filter: $filter) {
          items {
            id
            senderUsername
            createdAt
            payload
            receiverEmail
            senderEmail
            type
            updatedAt
          }
        }
      }
    `
    const retrieveRequestResponse = await gqlHelper({ filter: { id: { eq: id } } }, query, 'listRequestss')
    const requestObject = retrieveRequestResponse.data.listRequestss.items[0] || null
    if (requestObject == null) {
      throw new Error('Request with provided ID was not found.')
    }

    //Retrieve the caller's UserProfile
    const senderUserProfile = this.getUserProfileByUsername(requestObject.senderUsername)
    if (senderUserProfile == null) {
      throw new Error(`User profile for ${requestObject.senderUsername} was not found.`)
    }

    //Resolve the request
    console.log(`Decision for ${requestObject.type}: ${decision}`)
    switch (requestObject.type) {
      case 'CREATE_TRADE': {
        if (groups.indexOf('admin') === -1) {
          throw new Error('Admin privilleges are required to resolve this request.')
        }
        if (decision === 'ACCEPT') {
          //Create shared fields
          const managerUserId = senderUserProfile.id
          const tradeName = senderPayload.tradeName
          const managerUsername = senderUsername

          //Create the new Office
          //...
          
          //Attempt to create the Office item
          const newOfficeResult = await gql.createOfficeIfNotExists(officeParams)
          if (newOfficeResult) {
            body.office = newOfficeResult
          } else {
            throw new Error('Office creation on request with id=[' + id + '] failed.')
          }

          //TODO make this a DDB Trasaction
          //Create a connection between the new Office and the manager.
          const connParams = {
            id: managerUserId + '_' + tradeId, //Smart way to prevent duplicates and ensure uniqueness, also allows text matching queries
            employeeType: 'MANAGER',
            members: [managerUsername],
            permissions: [],
            preferences: '',
            tradeId: tradeId,
            tradeName: tradeName,
            userId: managerUserId, //User and Trade ID are the same
            username: managerUsername,
          }

          //Attempt to create the connection
          const newConnResult = await gqlAPI.createTradeUserConnection(connParams)
          if (newConnResult) {
            body.connection = newConnResult
          } else {
            throw new Error('TradeUserConnection creation on request with id=[' + id + '] failed.')
          }
        } else {
          console.log('Request with id=[' + id + '] was rejected.')
        }
        break
      }
      case 'CREATE_COMPANY_CONNECTION': {
        if (decision === 'ACCEPT') {
          //Get the sencer and receiver offices
          const senderOffice = await gqlAPI.getOfficeByOwnerUsername(senderUsername)
          if (!senderOffice) {
            throw new Error("Sender's Office not found.")
          }
          const receiverOffice = await gqlAPI.getOfficeByOwnerUsername(receiverUsername)
          if (!receiverOffice) {
            throw new Error("Receiver's Office not found.")
          }
          body.office = { id: [senderOffice.id, receiverOffice.id] }

          //Transaction, add the new connection
          try {
            body.connection = await ddbAPI.addCompanyConnection(senderOffice, receiverOffice)
          } catch (err) {
            throw new Error('Failed to add employee to Office, ensure that the Office is allowed to collaborate with other Offices.')
          }
        } else {
          console.log('Request with id=[' + requestId + '] was rejected.')
        }
        break
      }
      case 'INVITE_EMPLOYEE_TO_OFFICE': {
        if (decision === 'ACCEPT') {
          //Get the sencer`s office
          let senderOffice = await gqlAPI.getOfficeByOwnerUsername(senderUsername)
          if (!senderOffice) {
            throw new Error("Sender's Office not found.")
          }
          body.office = { id: senderOffice.id }

          //Get employee`s profile
          let userId
          try {
            userId = await gqlAPI.getUserIdFromUsername(receiverUsername)
            if (!userId) {
              throw new Error('User ID of receiver not found.')
            }
          } catch (err) {
            throw new Error('User ID of receiver not found with error: ' + err)
          }

          //Ensure that the User has no other connections
          const isUnemployed = await gqlAPI.checkIfUserIsUnemployed(receiverUsername)
          if (!isUnemployed) {
            throw new Error("User is a member of another Office and therefore can't join a new one.")
          }

          //Add the Employee to the new Office and create the connection between User and Office
          const connId = userId + '_' + senderOffice.id
          try {
            await ddbAPI.addEmployeeToOffice(senderOffice, receiverUsername, connId, userId)
          } catch (err) {
            throw new Error('Failed to add employee to Office, ensure that the Office is allowed to invite employees.')
          }
          body.connection = connId
        } else {
          console.log('Request with id=[' + requestId + '] was rejected.')
        }
        break
      }
      case 'INVITE_CONTRACTOR_TO_OFFICE': {
        //Create an unverified office
        if (decision === 'ACCEPT') {
          //let newContractorResult = await ddbAPI.addContractorToOffice('office', receiverUsername, 'empEmail', uuid)
        } else {
          console.log('Request with id=[' + requestId + '] was rejected by ' + receiverUsername)
        }
        break
      }
      default: {
        throw new Error('Invalid request type.')
      }
    }

    const result = ''
    console.log('resolveRequest output: ' + JSON.stringify(result))
    return result
  },

  getEmployeeUserProfilesForManagerUsername: async (managerUsername, filter, limit, nextToken) => {
    console.log('getEmployeeUserProfilesForManagerUsername input: ' + [managerUsername, filter, limit, nextToken])
    if (!managerUsername) {
      throw new Error('Invalid manager username')
    }
    let emp_filter = { and: [filter ?? {}, { employeeType: { eq: 'STANDARD' } }] }
    const query = /* GraphQL */ `
      query getEmployeeUserProfilesForManagerUsername($ownerUsername: String!, filter: ModelTradeUserConnectionFilterInput, limit: Int, nextToken: String ) {
        listTradeByOwnerUsername(ownerUsername: $ownerUsername) {
          items {
            workforce(filter: $filter, limit: $limit, nextToken: $nextToken) {
              items {
                user {
                  username
                  email
                  telephone
                  surname
                  name
                  fathers_name
                  address
                  zip_code
                  city
                  createdAt
                  family_name
                  gender
                  id
                  locale
                  mobile
                  preferences
                  updatedAt
                  tin
                  birthdate
                }
              }
              nextToken
            }
          }
        }
      }`
    const response = await gqlHelper(
      { ownerUsername: managerUsername, filter: emp_filter, limit: limit ?? 50, nextToken },
      query,
      'getEmployeeUserProfilesForManagerUsername',
    )
    let result = response.data.listTradeByOwnerUsername.items
    if (result) {
      result = result[0].workforce
    }
    console.log('getEmployeeUserProfilesForManagerUsername output: ' + JSON.stringify(result))
    return result
  },

  getContractorUserProfilesForManagerUsername: async (managerUsername, filter, limit, nextToken) => {
    console.log('getContractorUserProfilesForManagerUsername input: ' + [managerUsername, filter, limit, nextToken])
    if (!managerUsername) {
      throw new Error('Invalid manager username')
    }
    let emp_filter = { and: [filter ?? {}, { employeeType: { eq: 'CONTRACTOR' } }] }
    const query = /* GraphQL */ `
    query getContractorUserProfilesForManagerUsername($ownerUsername: String!, filter: ModelTradeUserConnectionFilterInput, limit: Int, nextToken: String ) {
      listTradeByOwnerUsername(ownerUsername: $ownerUsername) {
        items {
          workforce(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
              user {
                username
                email
                telephone
                surname
                name
                fathers_name
                address
                zip_code
                city
                createdAt
                family_name
                gender
                id
                locale
                mobile
                preferences
                updatedAt
                tin
                birthdate
              }
            }
            nextToken
          }
        }
      }
    }`
    const response = await gqlHelper(
      { ownerUsername: managerUsername, filter: emp_filter, limit: limit ?? 50, nextToken },
      query,
      'getContractorUserProfilesForManagerUsername',
    )
    let result = response.data.listTradeByOwnerUsername.items
    if (result) {
      result = result[0].workforce
    }
    console.log('getContractorUserProfilesForManagerUsername output: ' + JSON.stringify(result))
    return result
  },

  getCustomersForOfficeId: async (officeId, filter, limit, nextToken) => {
    console.log('getCustomersForOfficeId input: ' + [officeId, filter, limit, nextToken])
    if (!officeId) {
      throw new Error('Invalid office ID')
    }
    const query = /* GraphQL */ `
    query getCustomersForOfficeId($officeId: String!, filter: ModelCustomerFilterInput, limit: Int, nextToken: String ) {
      listOffices(filter: {id: {eq: $officeId}}) {
        items {
          officeCustomers(limit: $limit, filter: $filter, nextToken: $nextToken) {
            items {
              address
              birthDate
              doy
              createdAt
              email
              driversLicense {
                Category {
                  category
                  expiresAt
                  issueDate
                }
                DriversLicenseType
                LicenseID
              }
              familyStatus
              fathersName
              files {
                bucket
                name
                key
                region
              }
              firstName
              gender
              id
              lastName
              mobile
              postcode
              tin
              tradeName
              updatedAt
            }
            nextToken
          }
        }
      }
    }`
    const response = await gqlHelper(
      { officeId: officeId, filter: filter ?? {}, limit: limit ?? 50, nextToken },
      query,
      'getCustomersForOfficeId',
    )
    let result = response.data.listOffices.items
    if (result) {
      result = result[0].officeCustomers
    }
    console.log('getCustomersForOfficeId output: ' + JSON.stringify(result))
    return result
  },

  getContractsForOfficeId: async (officeId, filter, limit, nextToken) => {
    console.log('getContractsForOfficeId input: ' + [officeId, filter, limit, nextToken])
    if (!officeId) {
      throw new Error('Invalid office ID')
    }
    const query = /* GraphQL */ `
    query getContractsForOfficeId($officeId: String!, filter: ModelContractFilterInput, limit: Int, nextToken: String ) {
      listOffices(filter: {id: {eq: $officeId}}) {
        items {
          officeContracts(limit: $limit, filter: $filter, nextToken: $nextToken) {
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
              driversLicense
              createdAt
              updatedAt
              vehicle{
                color
                createdAt
                displacement
                eurotax
                file {
                  bucket
                  key
                  name
                  region
                }
                firstRegistrationDate
                fuelType
                id
                manufacturer
                model
                vin
                vehicle_owner
                value
                usage
                updatedAt
                trim
                tradeName
                taxableHorsepower
                purchaseDate
                passengers
                numberPlate
              }
            }
            nextToken
          }
        }
      }
    }`
    const response = await gqlHelper(
      { officeId: officeId, filter: filter ?? {}, limit: limit ?? 50, nextToken },
      query,
      'getContractsForOfficeId',
    )
    let result = response.data.listOffices
    if (result) {
      result = result[0].officeCustomers
    }
    console.log('getContractsForOfficeId output: ' + JSON.stringify(result))
    return result
  },

  getPartnerOfficeConnections: async (officeId, username, filter, limit, nextToken) => {
    console.log('getPartnerOfficeConnections input: ' + [officeId, username, filter, limit, nextToken])
    if (!username) {
      throw new Error('Invalid username or unauthenticated user.')
    }
    if (!officeId) {
      throw new Error('Invalid office ID')
    }
    const user_filter = { and: [filter ?? {}, { fromId: { eq: officeId } }] }
    const query = /* GraphQL */ `
    query getPartnerOfficeConnections($officeId: String!, filter: ModelCompanyAccessConnectionFilterInput, limit: Int, nextToken: String ) {
      listCompanyAccessConnections(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          createdAt
          expirationDate
          fromId
          fromTradeName
          id
          message
          toId
          toTradeName
          updatedAt
        }
        nextToken
      }
    }`
    const response = await gqlHelper(
      { officeId: officeId, filter: user_filter, limit: limit ?? 50, nextToken },
      query,
      'getPartnerOfficeConnections',
    )
    const result = response.data.listCompanyAccessConnections
    console.log('getPartnerOfficeConnections output: ' + JSON.stringify(result))
    return result
  },

  updateOfficeDetails: async (username, input, condition) => {
    console.log('updateOfficeDetails input: ' + [username, input, condition])
    if (!username) {
      throw new Error('Invalid username or unauthenticated user.')
    }
    //Sanitize input
    const allowed = ['id', 'address', 'office_email', 'zip_code', 'mobile', 'privateData']
    let sanitized_input = Object.keys(input)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = input[key]
        return obj
      }, {})

    const allowed_private = ['bankAccountInfo']
    if ('private_data' in sanitized_input) {
      sanitized_input.private_data = Object.keys(sanitized_input.private_data)
        .filter(key => allowed_private.includes(key))
        .reduce((obj, key) => {
          obj[key] = sanitized_input.private_data[key]
          return obj
        }, {})
    }

    //Expand the condition to require that the caller is also the manager of that office
    const expanded_condition = { and: [condition ?? {}, { ownerUsername: { eq: username } }] }
    const mutation = /* GraphQL */ `
      mutation updateOfficeDetails($input: UpdateOfficeInput!, $condition: ModelOfficeConditionInput) {
        updateOffice(input: $input, condition: $condition) {
          id
        }
      }
    `

    const response = await gqlHelper({ input: sanitized_input, condition: expanded_condition }, mutation, 'updateOfficeDetails')
    const result = response.data.updateOffice
    console.log('updateOfficeDetails output: ' + JSON.stringify(result))
    return result
  },

  updateUserProfileDetails: async (username, input, condition) => {
    console.log('updateUserProfileDetails input: ' + [username, input, condition])
    if (!username) {
      throw new Error('Invalid username or unauthenticated user.')
    }

    //Sanitize input
    const allowed = [
      'id',
      'telephone',
      'name',
      'fathers_name',
      'surname',
      'zip_code',
      'gender',
      'family_name',
      'preferences',
      'locale',
      'files',
      'tin',
      'city',
      'profilePicture',
    ]
    const sanitized_input = Object.keys(input)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = input[key]
        return obj
      }, {})

    //Expand the condition to require that the caller is also the owner of the profile
    const expanded_condition = { and: [condition ?? {}, { username: { eq: username } }] }
    const mutation = /* GraphQL */ `
      mutation updateUserProfileDetails($input: UpdateOfficeInput!, $condition: ModelOfficeConditionInput) {
        updateUserProfile(input: $input, condition: $condition) {
          id
        }
      }
    `

    const response = await gqlHelper({ input: sanitized_input, condition: expanded_condition }, mutation, 'updateUserProfileDetails')
    const result = response.data.updateUserProfile
    console.log('updateUserProfileDetails output: ' + JSON.stringify(result))
    return result
  },

  createVehicleForOffice: async (office_id, username, input, condition) => {
    console.log('createVehicleForOffice input: ' + [office_id, username, input, condition])
    if (!username) {
      throw new Error('Invalid username or unauthenticated user.')
    }
    if (!office_id) {
      throw new Error('Invalid office ID')
    }

    //Get caller's office
    const officeDetailsAndPermissions = await this.getUserModelPermissionsForOffice(username, office_id)
    if (!officeDetailsAndPermissions) {
      throw new Error('Insufficient permissions')
    }

    //Expand the condition to require that the caller is also the owner of the profile
    const expanded_condition = { and: [condition ?? {}, { officeId: { eq: office_id } }] }
    const mutation = /* GraphQL */ `
      mutation createVehicleForOffice($input: CreateVehicleInput!, $condition: ModelVehicleConditionInput) {
        createVehicle(input: $input, condition: $condition) {
          id
        }
      }
    `

    const response = await gqlHelper({ input: input, condition: expanded_condition }, mutation, 'createVehicleForOffice')
    const result = response.data.createVehicle
    console.log('createVehicleForOffice output: ' + JSON.stringify(result))
    return result
  },

  updateVehicleForOffice: async (office_id, username, input, condition) => {
    console.log('updateVehicleForOffice input: ' + [office_id, username, input, condition])
    if (!username) {
      throw new Error('Invalid username or unauthenticated user.')
    }
    if (!office_id) {
      throw new Error('Invalid office ID')
    }

    //Get caller's office
    const officeDetailsAndPermissions = await this.getUserModelPermissionsForOffice(username, office_id)
    if (!officeDetailsAndPermissions) {
      throw new Error('Insufficient permissions')
    }

    //Sanitize input
    const allowed = [
      'id',
      'numberPlate',
      'color',
      'manufacturer',
      'model',
      'vehicle_owner',
      'trim',
      'fuelType',
      'usage',
      'displacement',
      'eurotax',
      'firstRegistrationDate',
      'passengers',
      'purchaseDate',
      'taxableHorsepower',
      'vin',
      'value',
      'file',
    ]

    let sanitized_input = Object.keys(input)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = input[key]
        return obj
      }, {})

    sanitized_input.tradeId = officeDetailsAndPermissions[0].tradeId
    sanitized_input.tradeName = officeDetailsAndPermissions[0].tradeName
    if (!('file' in sanitized_input)) {
      sanitized_input.file = []
    }

    //Expand the condition to require that the caller is also the owner of the profile
    const expanded_condition = { and: [condition ?? {}, { officeId: { eq: office_id } }] }
    const mutation = /* GraphQL */ `
      mutation updateVehicleForOffice($input: UpdateVehicleInput!, $condition: ModelVehicleConditionInput) {
        updateVehicle(input: $input, condition: $condition) {
          id
        }
      }
    `

    const response = await gqlHelper({ input: sanitized_input, condition: expanded_condition }, mutation, 'updateVehicleForOffice')
    const result = response.data.updateVehicle
    console.log('updateVehicleForOffice output: ' + JSON.stringify(result))
    return result
  },

  createRequest: async (username, email, groups, input, condition) => {
    console.log('createRequest input: ' + [username, email, groups, input, condition])
    if (!username) {
      throw new Error('Invalid username or unauthenticated user.')
    }

    // Populate/Overwrite user identity claims
    input.senderUsername = username
    input.senderEmail = email

    // Expand the condition to require that the caller is also the owner of the profile
    const mutation = /* GraphQL */ `
      mutation createRequest($input: CreateRequestsInput!, $condition: ModelRequestsConditionInput) {
        createRequests(input: $input, condition: $condition) {
          id
        }
      }
    `

    const response = await gqlHelper({ input: input, condition: condition }, mutation, 'createRequest')
    const result = response.data.createRequests
    console.log('createRequest output: ' + JSON.stringify(result))
    return result
  },

  updateRequestsSentByMe: async (username, email, groups, input, condition) => {
    console.log('updateRequestsSentByMe input: ' + [username, email, groups, input, condition])
    if (!username) {
      throw new Error('Invalid username or unauthenticated user.')
    }

    const allowed = ['id', 'receiverUsername', 'receiverEmail', 'type', 'payload']
    const sanitized_input = Object.keys(input)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = input[key]
        return obj
      }, {})
    const expanded_condition = { and: [condition ?? {}, { senderUsername: { eq: username } }, { senderEmail: { eq: email } }] }
    const mutation = /* GraphQL */ `
      mutation updateRequestsSentByMe($input: UpdateRequestsInput!, $condition: ModelRequestsConditionInput) {
        updateRequests(input: $input, condition: $condition) {
          id
        }
      }
    `
    const response = await gqlHelper({ input: sanitized_input, condition: expanded_condition }, mutation, 'updateRequestsSentByMe')
    const result = response.data.updateRequests
    console.log('updateRequestsSentByMe output: ' + JSON.stringify(result))
    return result
  },

  deleteRequestsSentByMe: async (username, email, groups, input, condition) => {
    console.log('deleteRequestsSentByMe input: ' + [username, email, groups, input, condition])
    if (!username) {
      throw new Error('Invalid username or unauthenticated user.')
    }

    const expanded_condition = { and: [condition ?? {}, { senderUsername: { eq: username } }, { senderEmail: { eq: email } }] }
    const mutation = /* GraphQL */ `
      mutation deleteRequestsSentByMe($input: DeleteRequestsInput!, $condition: ModelRequestsConditionInput) {
        deleteRequests(input: $input, condition: $condition) {
          id
        }
      }
    `
    const response = await gqlHelper({ input: input, condition: expanded_condition }, mutation, 'deleteRequestsSentByMe')
    const result = response.data.deleteRequests
    console.log('deleteRequestsSentByMe output: ' + JSON.stringify(result))
    return result
  },

  createMyUserCalendarEvent: async (username, input, condition) => {
    console.log('createMyUserCalendarEvent input: ' + [username, input, condition])
    if (!username) {
      throw new Error('Invalid username or unauthenticated user.')
    }

    // Populate/Overwrite user identity claims
    input.username = username

    // Expand the condition to require that the caller is also the owner of the profile
    const mutation = /* GraphQL */ `
      mutation createMyUserCalendarEvent($input: CreateUserCalendarEventInput!, $condition: ModelUserCalendarEventConditionInput) {
        createUserCalendarEvent(input: $input, condition: $condition) {
          id
        }
      }
    `

    const response = await gqlHelper({ input: input, condition: condition }, mutation, 'createMyUserCalendarEvent')
    const result = response.data.createUserCalendarEvent
    console.log('createRequest output: ' + JSON.stringify(result))
    return result
  },

  updateMyUserCalendarEvents: async (username, input, condition) => {
    console.log('updateMyUserCalendarEvents input: ' + [username, input, condition])
    if (!username) {
      throw new Error('Invalid username or unauthenticated user.')
    }

    const allowed = ['id', 'username', 'payload']
    const sanitized_input = Object.keys(input)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = input[key]
        return obj
      }, {})
    const expanded_condition = { and: [condition ?? {}, { username: { eq: username } }] }
    const mutation = /* GraphQL */ `
      mutation updateMyUserCalendarEvents($input: UpdateUserCalendarEventInput!, $condition: ModelUserCalendarEventConditionInput) {
        updateUserCalendarEvent(input: $input, condition: $condition) {
          id
        }
      }
    `
    const response = await gqlHelper({ input: sanitized_input, condition: expanded_condition }, mutation, 'updateMyUserCalendarEvents')
    const result = response.data.updateUserCalendarEvent
    console.log('updateMyUserCalendarEvents output: ' + JSON.stringify(result))
    return result
  },

  deleteMyUserCalendarEvents: async (username, input, condition) => {
    console.log('deleteMyUserCalendarEvents input: ' + [username, input, condition])
    if (!username) {
      throw new Error('Invalid username or unauthenticated user.')
    }

    const expanded_condition = { and: [condition ?? {}, { username: { eq: username } }] }
    const mutation = /* GraphQL */ `
      mutation deleteMyUserCalendarEvents($input: DeleteUserCalendarEventInput!, $condition: ModelUserCalendarEventConditionInput) {
        deleteUserCalendarEvent(input: $input, condition: $condition) {
          id
        }
      }
    `
    const response = await gqlHelper({ input: input, condition: expanded_condition }, mutation, 'deleteMyUserCalendarEvents')
    const result = response.data.deleteUserCalendarEvent
    console.log('deleteMyUserCalendarEvents output: ' + JSON.stringify(result))
    return result
  },

  addEmployeeToOffice: async (office_id, caller_username, empUsername, modelPermissions, pagePermissions) => {
    console.log('addEmployeeToOffice input: ' + [office_id, caller_username, empUsername, modelPermissions, pagePermissions])
    if (!office_id) {
      throw new Error('Invalid office ID')
    }

    if (!caller_username) {
      throw new Error('Invalid office ID')
    }

    //Get caller information
    const tuc_filter = { and: [{ tradeId: { eq: office_id } }, { username: { eq: caller_username } }] }
    const officeDetailsAndPermissions = await this.getOfficeDetailsAndPermissionsByUsername(caller_username, tuc_filter)
    const tucItem = officeDetailsAndPermissions.items[0].officeConnections.items
    const callerModelPermissions = tucItem.modelPermissions
    const callerPagePermissions = tucItem.pagePermissions
    if (!('EMPLOYEE_ADD' in callerModelPermissions)) {
      throw new Error('User doesn`t have permission to create a add a new Employee.')
    }

    //Get candidate employee information
    const empUserProfile = await this.getUserProfileByUsername(empUsername)
    if (empUserProfile == null) {
      throw new Error('Candidate employee does not exist.')
    }

    const input = {
      treadeId: tucItem.tradeId,
      tradeName: tucItem.tradeName,
      userId: empUserProfile.id,
      username: empUserProfile.username,
      pagePermissions: pagePermissions,
      modelPermissions: modelPermissions,
      employeeType: 'STANDARD',
      preferences: '',
    }

    const expanded_condition = { and: [{ ownerUsername: { eq: caller_username } }, { id: { eq: office_id } }] }
    const mutation = /* GraphQL */ `
      mutation addOfficeEmployee($input: CreateTradeUserConnectionInput!, $condition: ModelTradeUserConnectionConditionInput) {
        createTradeUserConnection(input: $input, condition: $condition) {
          id
        }
      }
    `

    const response = await gqlHelper({ input: input, condition: expanded_condition }, mutation, 'addEmployeeToOffice')
    const result = response.data.createTradeUserConnection
    console.log('addEmployeeToOffice output: ' + JSON.stringify(result))

    return result
  },
}
