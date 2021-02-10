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
const queries = require('./gql_queries.js')
const ddbQueries = require('./ddb_queries.js')
const utils = require('./utils')
const APPSYNC_URL = process.env.API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
const REGION = process.env.REGION
const ENDPOINT = new urlParse(APPSYNC_URL).hostname.toString()

/**
 * Get user pool information from environment variables.
 */
const COGNITO_USERPOOL_ID = process.env.AUTH_WAIS38036AA9_USERPOOLID
if (!COGNITO_USERPOOL_ID) {
  throw new Error(`Function requires a valid pool ID`)
}

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 */
const resolvers = {
  Office: {
    customers: (event) => {
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
    employees: (event) => {
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
    contractors: (event) => {
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
    echo: (event) => {
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
    sendRequest: (event) => {
      console.log('Resolving sendRequest')

      // Retrieve username and permissions
      if (!event.identity.claims) {
        throw new Error('Credential not found.')
      }

      //Unpack arguments
      let senderUsername = event.identity.claims['cognito:username']
      let senderEmail = event.identity.claims.email
      let payload = event.arguments.payload
      let receiverEmail = payload.email
      let requestType = event.arguments.requestType
      let id = event.uuid
      let metadata = {}

      if (!utils.validateEmail(receiverEmail)) {
        throw new Error('Invalid receiver email')
      }

      //Retrieve the UserProfiles
      let senderUserProfile = utils.getUserProfile(username)
      if (!senderUserProfile) {
        throw new Error('Failed to retrieve the user profile of ' + username)
      }

      //Get the Office of the person sending this request
      let callerOffice = getOfficeByOwnerUsername(senderUsername)
      if (!callerOffice) {
        throw new Error('Only office managers can send requests.')
      }

      //Get permissions
      let callerPermissions = (callerPermissions = utils.getUserPermissions(senderUsername, callerOffice.tradeName))

      //Expire this after 1 week
      let expiresAt = Date.now()
      expiresAt += 1000 * 60 * 60 * 24 * 7
      expiresAt = new Date(expiresAt)

      //Get the receiver of this request based on the request payload and type
      switch (requestType) {
        case 'CREATE_COMPANY_CONNECTION':
          // if (callerPermissions == null) {
          //   throw new Error('User has insufficent permissions.')
          // }
          break
        case 'CREATE_TRADE':
          receiverEmail = 'admin@wais.com'
          break
        case 'INVITE_EMPLOYEE_TO_OFFICE':
          break
        default:
          console.log('Receiver of request with id=[' + id + '] could not be determined.')
      }

      //New request
      const item = {
        id: id,
        expiresAt: expiresAt,
        payload: payload,
        type: requestType,
        senderEmail: senderEmail,
        receiverEmail: receiverEmail,
        metadata: metadata,
      }

      //Attempt the request
      let insertionRes = ddbQueries.insertRequest(item)
      console.log('Inserting request ' + JSON.stringify(item) + ' resulted in ' + JSON.stringify(insertionRes))
      return insertionRes
    },

    resolveRequest: (event) => {
      console.log('Resolving request')

      //Username check, this shouldn't be called via IAM
      if (!event.identity.claims) {
        throw new Error('Invalid credentials')
      }

      //Input Args
      let uuid = event.uuid
      let requestId = event.arguments.id
      let callerUsername = event.identity.claims['cognito:username']
      let requestObject = ddbQueries.getRequestById(requestId)
      let requestType = requestObject.type
      let receiverUsername = requestObject.receiverUsername
      let receiverPayload = event.arguments.payload
      let senderUsername = requestObject.senderUsername
      let senderPayload = requestObject.payload
      let decision = receiverPayload.decision

      //Receiver and caller usernames must match
      if (callerUsername !== receiverUsername) {
        throw new Error('Caller and receiver usernames DONT match.')
      }

      //Receiver must have a decision field
      if (decision !== 'ACCEPT' || decision !== 'REJECT') {
        throw new Error("Receiver must make a decision that is either 'ACCEPT' or 'REJECT'.")
      }

      //Decide based on the request type and update the relevant entries
      switch (requestType) {
        case 'INVITE_EMPLOYEE_TO_OFFICE':
          if (decision === 'ACCEPT') {
            ddbQueries.addEmployeeToOffice('office', receiverUsername, 'empEmail', uuid)
          } else {
            console.log('Request with id=[' + requestId + '] was rejected by ' + receiverUsername)
          }
          break
        default:
          throw new Error('Invalid request type.')
      }

      //Delete request as it has been resolved
      let delResponse = ddbQueries.deleteRequest(uuid)

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
    manageCustomers: (event) => {
      return '{}'
    },
    manageContracts: (event) => {
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
      const res = await resolver(event)
      console.log('Resolver result is ' + JSON.stringify(res))
      return res
    }
  }
  throw new Error('Resolver not found.')
}
