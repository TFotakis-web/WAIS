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
    const result = response.data.listUserProfileByUsername
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
      throw new Error('Invalid username')
    }
    const query = /* GraphQL */ `
      query getOfficeDetailsAndPermissionsByUsername($username: String!, filter: ModelOfficeFilterInput, limit: Int, nextToken: String ) {
        listUserProfileByUsername(username: $username) {
            items {
              officeConnections(filter: $filter, limit: $limit, nextToken: $nextToken) {
                items {
                  pagePermissions
                  modelPermissions
                  preferences
                  tradeId
                  trade {
                    tradeName
                  }
                }
                nextToken
              }
            }
        }
    }`
    const response = await gqlHelper(
      { username: username, filter: filter ?? {}, limit: limit ?? 50, nextToken },
      query,
      'getOfficeDetailsAndPermissionsByUsername',
    )
    const result = response.data.listUserProfileByUsername
    console.log('getOfficeDetailsAndPermissionsByUsername output: ' + JSON.stringify(result))
    return result
  },

  getUserModelPermissions: async (username, officeId) => {
    return new Set(this.getOfficeDetailsAndPermissionsByUsername(username, { tradeId: { eq: officeId } }, 1, null))
  },

  getCallendarEventsForUser: async (username, filter, limit, nextToken) => {
    console.log('getCallendarEventsForUser input: ' + [username, filter, limit, nextToken])
    if (!username) {
      throw new Error('Invalid username')
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
      throw new Error('Invalid username')
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
      throw new Error('Invalid username')
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
      throw new Error('Invalid username')
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
          from {
            members
          }
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
    const temp_result = response.data.listCompanyAccessConnections
    const _nextToken = temp_result.nextToken
    let _items = temp_result.items
    _items = _items.filter(entry => entry.from.members.contains(username))
    const result = { items: _items, nextToken: _nextToken }
    console.log('getPartnerOfficeConnections output: ' + JSON.stringify(result))
    return result
  },

  updateOfficeDetails: async (username, input, condition) => {
    console.log('updateOfficeDetails input: ' + [username, input, condition])
    if (!username) {
      throw new Error('Invalid username')
    }

    //Sanitize input
    const allowed = ['address', 'office_email', 'zip_code', 'mobile', 'privateData']
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
      throw new Error('Invalid username')
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
      throw new Error('Invalid username')
    }
    if (!office_id) {
      throw new Error('Invalid office ID')
    }

    //Get caller's office
    const officeDetailsAndPermissions = this.getUserModelPermissions(username, office_id)
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
      throw new Error('Invalid username')
    }
    if (!office_id) {
      throw new Error('Invalid office ID')
    }

    //Get caller's office
    const officeDetailsAndPermissions = this.getUserModelPermissions(username, office_id)
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
    const result = response.data.updateVehicleForOffice
    console.log('updateVehicleForOffice output: ' + JSON.stringify(result))
    return result
  },
}
