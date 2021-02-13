/* Amplify Params - DO NOT EDIT
	API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
	API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT
	AUTH_WAISAUTH_USERPOOLID
	ENV
	REGION
	STORAGE_WAISSTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */
const { CognitoIdentityServiceProvider } = require('aws-sdk')
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider()
const urlParse = require('url').URL
const ddbQueries = require('./ddb_queries.js')
const utils = require('./utils.js')
const APPSYNC_URL = process.env.API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
const REGION = process.env.REGION
const ENDPOINT = new urlParse(APPSYNC_URL).hostname.toString()

/**
 * Get user pool information from environment variables.
 */
const COGNITO_USERPOOL_ID = process.env.AUTH_WAISAUTH_USERPOOLID
if (!COGNITO_USERPOOL_ID) {
  throw new Error(`Function requires a valid pool ID`)
}

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 */
const resolvers = {
  Office: {
    customers: async (event) => {
      console.log('Resolving Office.customers')

      //Username and permissions
      let username = 'IAM'
      let permissions = ''

      if (event.identity.claims) {
        console.log('Credentials found..')
        username = event.identity.claims['cognito:username']
        permissions = utils.getUserPermissions(username, event.source.tradeName)
      }

      //List customers request input item
      let item = utils.getDefaultFunctionArgs(event)

      //Attempt the request
      console.log('Resolving user ' + username + ' with permissions: ' + permissions)

      //Response structure:
      //{ data: { listCustomers: { items: [], nextToken: null } }, errors: [{ path: '', location: '', message: '' }] }
      const customersResponse = utils.getResponseFromApi(
        ENDPOINT,
        utils.createSignedRequest(ENDPOINT, { input: item }, queries.listCustomers, 'listCustomers', REGION, APPSYNC_URL),
      )

      // Filter out customer fields based on permissions
      if (permissions) {
        //TODO
      }

      //Result
      const resolverResponse = customersResponse.data.listCustomers

      //Log the result
      console.log('Response of ' + item + ' was ' + resolverResponse)
      return resolverResponse
    },
    contracts: async (event) => {
      console.log('Resolving Office.contracts')

      //Username and permissions
      let username = 'IAM'
      let permissions = ''

      if (event.identity.claims) {
        console.log('Credentials found..')
        username = event.identity.claims['cognito:username']
        permissions = utils.getUserPermissions(username, event.source.tradeName)
      }

      let item = utils.getDefaultFunctionArgs(event)

      //Attempt the request
      console.log('Resolving user ' + username + ' with permissions: ' + permissions)

      //Attempt the request
      const contractsResponse = utils.getResponseFromApi(
        ENDPOINT,
        utils.createSignedRequest(ENDPOINT, { input: item }, queries.listContracts, 'listContracts', REGION, APPSYNC_URL),
      )

      // Filter out customer fields based on permissions
      if (permissions) {
        //TODO
      }

      //Result
      const resolverResponse = contractsResponse.data.listContracts

      //Filter out things..
      console.log('Response of ' + item + ' was ' + resolverResponse)
      return resolverResponse
    },
    employees: async (event) => {
      console.log('Resolving Office.employees')

      //Username and permissions
      let username = 'IAM'
      let permissions = ''

      if (event.identity.claims) {
        console.log('Credentials found..')
        username = event.identity.claims['cognito:username']
        permissions = utils.getUserPermissions(username, event.source.tradeName)
      }

      //List employees request input item
      let item = utils.getUserProfileFunctionArgs(event, 'STANDARD')
      item.tradeName = tradeName

      //Attempt the request
      console.log('Resolving user ' + username + ' with permissions: ' + permissions)

      //Response structure:
      const employeesResponse = utils.getResponseFromApi(
        ENDPOINT,
        utils.createSignedRequest(
          ENDPOINT,
          { input: item },
          queries.listEmployeesByEmployeeType,
          'listEmployeesByEmployeeType',
          REGION,
          APPSYNC_URL,
        ),
      )

      // Filter out customer fields based on permissions
      if (permissions) {
        //TODO
      }

      //Result
      const resolverResponse = employeesResponse.data.listEmployeesByEmployeeType

      //Log the result
      console.log('Response of ' + item + ' was ' + resolverResponse)
      return resolverResponse
    },
    contractors: async (event) => {
      console.log('Resolving Office.contractors')

      //Username and permissions
      let username = 'IAM'
      let permissions = ''

      if (event.identity.claims) {
        console.log('Credentials found..')
        username = event.identity.claims['cognito:username']
        permissions = utils.getUserPermissions(username, event.source.tradeName)
      }

      //List contractors request input item
      let item = utils.getUserProfileFunctionArgs(event, 'CONTRACTOR')
      item.tradeName = tradeName

      //Attempt the request
      console.log('Resolving user ' + username + ' with permissions: ' + permissions)

      //Response structure:
      const contractorsResponse = utils.getResponseFromApi(
        ENDPOINT,
        utils.createSignedRequest(
          ENDPOINT,
          { input: item },
          queries.listEmployeesByEmployeeType,
          'listEmployeesByEmployeeType',
          REGION,
          APPSYNC_URL,
        ),
      )

      // Filter out customer fields based on permissions
      if (permissions) {
        //TODO
      }

      //Result
      const resolverResponse = contractorsResponse.data.listEmployeesByEmployeeType

      //Log the result
      console.log('Response of ' + item + ' was ' + resolverResponse)
      return resolverResponse
    },
  },
  Query: {
    echo: async (event) => {
      console.log('Resolving echo')
      try {
        return event.arguments.msg
      } catch (error) {
        throw new Error(e)
      }
    },
    me: async (event) => {
      console.log('Resolving me')
      try {
        if (!event.identity.claims) {
          throw new Error('This Query should only be called by authorized Users.')
        }
        return await cognitoIdentityServiceProvider
          .adminGetUser({
            UserPoolId: COGNITO_USERPOOL_ID,
            Username: event.identity.claims['cognito:username'],
          })
          .promise()
      } catch (e) {
        throw new Error(e)
      }
    },
    user: async (event) => {
      console.log('Resolving user')
      try {
        return await cognitoIdentityServiceProvider
          .adminGetUser({
            UserPoolId: COGNITO_USERPOOL_ID,
            Username: event.arguments.username,
          })
          .promise()
      } catch (e) {
        throw new Error(e)
      }
    },
    sendRequest: async (event) => {
      console.log('Resolving sendRequest')

      // Retrieve username and permissions
      if (!event.identity.claims) {
        throw new Error('Credential not found.')
      }

      //Unpack arguments
      let senderUsername = event.identity.claims['cognito:username']
      let senderEmail = event.identity.claims.email
      let payload = JSON.parse(event.arguments.payload)
      let receiverEmail = payload.email
      let message = payload.message
      let tradeName = payload.tradeName
      let requestType = event.arguments.requestType
      let callerOffice //Will be populated if necessary later on
      let metadata = {
        forAdmin: 'false',
      }

      //Message size should be at most 1024 chars
      if (message.length > 1024) {
        throw new Error('Message size larger than 1024 characters.')
      }

      //Retrieve the UserProfiles
      let senderUserProfile = await ddbQueries.getUserProfileByEmail(senderEmail)
      if (!senderUserProfile) {
        throw new Error('Failed to retrieve the user profile of ' + senderUsername)
      }
      if (senderUserProfile.error) {
        throw new Error('Failed to retrieve the user profile of ' + senderUsername + ' with error ' + senderUserProfile.error)
      }

      //Expire this after 1 week
      let curTS = Date.now()
      let id = curTS + '_' + senderEmail
      let expiresAt = new Date(curTS + 1000 * 60 * 60 * 24 * 7)

      //Get the receiver of this request based on the request payload and type
      switch (requestType) {
        case 'CREATE_COMPANY_CONNECTION':
          //Get the Office of the person sending this request
          callerOffice = await ddbQueries.getOfficeByOwnerUsername(senderUsername)
          if (!callerOffice) {
            throw new Error("User isn't an Office managers. Only office managers can send requests.")
          }
          if (callerOffice.error) {
            throw new Error("Failed to retrieve the user's office [" + senderUsername + '] with error ' + callerOffice.error)
          }
          if (!utils.validateEmail(receiverEmail)) {
            throw new Error('Invalid receiver email')
          }
          receiverUserProfile = await ddbQueries.getUserProfileByEmail(receiverEmail)
          if (!receiverUserProfile) {
            throw new Error('Receiver office manager does not exist')
          }
          if (receiverUserProfile.error) {
            throw new Error("Failed to retrieve the receiver's user profile with error " + receiverUserProfile.error)
          }
          break
        case 'CREATE_TRADE':
          if (tradeName.length < 4) {
            throw new Error('Trade name length should be greater than 3')
          }
          receiverEmail = 'admin@wais.com' //TODO change to sth simillar
          metadata.forAdmin = 'true'
          break
        case 'INVITE_EMPLOYEE_TO_OFFICE':
          //Get the Office of the person sending this request
          callerOffice = await ddbQueries.getOfficeByOwnerUsername(senderUsername)
          if (!callerOffice) {
            throw new Error("User isn't an Office managers. Only office managers can send requests.")
          }
          if (callerOffice.error) {
            throw new Error("Failed to retrieve the user's office [" + senderUsername + '] with error ' + callerOffice.error)
          }
          if (!utils.validateEmail(receiverEmail)) {
            throw new Error('Invalid receiver email')
          }
          break
        case 'INVITE_CONTRACTOR_TO_OFFICE':
          //Get the Office of the person sending this request
          let callerOffice = await ddbQueries.getOfficeByOwnerUsername(senderUsername)
          if (!callerOffice) {
            throw new Error("User isn't an Office managers. Only office managers can send requests.")
          }
          if (callerOffice.error) {
            throw new Error("Failed to retrieve the user's office [" + senderUsername + '] with error ' + callerOffice.error)
          }
          if (!utils.validateEmail(receiverEmail)) {
            throw new Error('Invalid receiver email')
          }
          break
        default:
          throw new Error('Request of type ' + requestType + ' with request id=[' + id + '] failed.')
      }

      //New request
      const item = {
        id: id,
        expiresAt: expiresAt,
        payload: payload,
        type: requestType,
        senderUsername: senderUsername,
        senderEmail: senderEmail,
        receiverEmail: receiverEmail,
        metadata: metadata,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      //Attempt the request
      let insertionRes = await ddbQueries.insertRequest(item)
      if (insertionRes.error) {
        throw new Error('Failed to insert request [' + JSON.stringify(item) + '] with error: ' + insertionRes.error)
      }
      return { requestId: id }
    },

    resolveRequest: async (event) => {
      console.log('Resolving request')

      //Username check, this shouldn't be called via IAM
      if (!event.identity.claims) {
        throw new Error('Invalid credentials')
      }

      //Lambda response
      let resolverResponse = {
        status: '',
        errors: '',
      }

      //Input Args
      const uuid = event.uuid
      const requestId = event.arguments.id
      const callerEmail = event.identity.claims.email
      const requestObject = await ddbQueries.getRequestById(requestId)
      const receiverPayload = event.arguments.payload
      const decision = receiverPayload.decision

      //Receiver and caller usernames must match
      if (callerEmail !== requestObject.receiverEmail) {
        throw new Error('Caller and receiver e-mails DONT match.')
      }

      //Receiver must have a decision field
      if (decision !== 'ACCEPT' || decision !== 'REJECT') {
        throw new Error("Receiver must make a decision that is either 'ACCEPT' or 'REJECT'.")
      }

      //Decide based on the request type and update the relevant entries
      switch (requestObject.type) {
        case 'CREATE_TRADE':
          if (decision === 'ACCEPT') {
            let newOfficeItem = {
              id: uuid,
              tradeName: receiverPayload.tradeName,
              ownerUsername: requestObject.senderUsername,
              ownerId: requestObject.senderEmail,
              tin: null,
              logo: null,
              info: null,
              postcode: null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
            let newOfficeResult = await ddbQueries.insertOfficeIfNotExists(newOfficeItem)
            if (newOfficeResult.data) {
              resolverResponse.status = JSON.stringify(newOfficeResult)
            } else {
              console.log('Request with id=[' + requestId + '] was rejected by Admin')
            }
          } else {
            console.log('Request with id=[' + requestId + '] was rejected by Admin')
          }
          break
        case 'CREATE_COMPANY_CONNECTION':
          break
        case 'INVITE_EMPLOYEE_TO_OFFICE':
          if (decision === 'ACCEPT') {
            let newEmpResult = await ddbQueries.addEmployeeToOffice('office', receiverUsername, 'empEmail', uuid)
          } else {
            console.log('Request with id=[' + requestId + '] was rejected by ' + receiverUsername)
          }
          break
        case 'INVITE_CONTRACTOR_TO_OFFICE':
          if (decision === 'ACCEPT') {
            let newContractorResult = await ddbQueries.addContractorToOffice('office', receiverUsername, 'empEmail', uuid)
          } else {
            console.log('Request with id=[' + requestId + '] was rejected by ' + receiverUsername)
          }
          break
        default:
          throw new Error('Invalid request type.')
      }

      //Delete request as it has been resolved
      let delResponse = await ddbQueries.deleteRequest(uuid)
      if (delResponse.error) {
        resolverResponse.errors = delResponse
      }

      //Log and return
      console.log('Response of resolveRequest was ' + JSON.stringify(delResponse))
      return resolverResponse
    },
  },

  Mutation: {
    manageEmployees: async (event) => {
      console.log('Resolving manageOfficeEmployee')

      //Username check, this shouldn't be called via IAM
      if (!event.identity.claims) {
        throw new Error('Invalid credentials')
      }

      //Get args
      let managerUsername = event.identity.claims['cognito:username']
      let payload = event.arguments.payload
      let action = event.arguments.action
      let uuid = event.uuid

      //Get caller Office
      let office = utils.getOfficeByOwnerUsername(managerUsername)
      if (!office) {
        throw new Error('User is either not valid or not the owner of the provided trade name.')
      } else {
        console.log('Retrieved office: ' + JSON.stringify(office))
      }

      //Actions
      let resolverResponse = ''
      switch (action) {
        case 'UPDATE_PERMISSIONS':
          break
        case 'REMOVE':
          break
        default:
          throw new Error('Invalid action.')
      }

      return resolverResponse
    },
    manageCustomers: async (event) => {
      return '{}'
    },
    manageContracts: async (event) => {
      return '{}'
    },
  },
}

// event
// {
//   "typeName": "...", /* Filled dynamically based on @function usage location */
//   "fieldName": "function name", /* Filled dynamically based on @function usage location */
//   "arguments": { /* GraphQL field arguments via $ctx.arguments */ },
//   "identity": { /* AppSync identity object via $ctx.identity */ },
//   "source": { /* The object returned by the parent resolver. E.G. if resolving field 'Post.comments', the source is the Post object. */ },
//   "request": { /* AppSync request object. Contains things like headers. */ },
//   "prev": { /* If using the built-in pipeline resolver support, this contains the object returned by the previous function. */ },
// }
exports.handler = async (event) => {
  console.log('Resolving event: ' + JSON.stringify(event))
  const typeHandler = resolvers[event.typeName]
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName]
    if (resolver) {
      try {
        const res = await resolver(event)
        console.log('Resolver result is ' + JSON.stringify(res))
        return res
      } catch (err) {
        console.log('Resolver error is ' + JSON.stringify(err))
        return err
      }
    }
  }
  throw new Error('Resolver not found.')
}
