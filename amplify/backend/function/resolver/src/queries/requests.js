const gqlAPI = require('../api/gql_queries')
const ddbAPI = require('../api/ddb_queries')
const utilsAPI = require('../api/utils')

module.exports = {
  sendRequest: async event => {
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
    let senderUserProfile = await ddbAPI.getUserProfileByEmail(senderEmail)
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
      case 'CREATE_COMPANY_CONNECTION': {
        //Get the Office of the person sending this request
        callerOffice = await ddbAPI.getOfficeByOwnerUsername(senderUsername)
        if (!callerOffice) {
          throw new Error("User isn't an Office managers. Only office managers can send requests.")
        }
        if (callerOffice.error) {
          throw new Error("Failed to retrieve the user's office [" + senderUsername + '] with error ' + callerOffice.error)
        }
        if (!utilsAPI.validateEmail(receiverEmail)) {
          throw new Error('Invalid receiver email')
        }
        const receiverUserProfile = await ddbAPI.getUserProfileByEmail(receiverEmail)
        if (!receiverUserProfile) {
          throw new Error('Receiver office manager does not exist')
        }
        if (receiverUserProfile.error) {
          throw new Error("Failed to retrieve the receiver's user profile with error " + receiverUserProfile.error)
        }
        break
      }
      case 'CREATE_TRADE': {
        if (tradeName.length < 4) {
          throw new Error('Trade name length should be greater than 3')
        }
        receiverEmail = 'admin@wais.com' //TODO change to sth simillar
        metadata.forAdmin = 'true'
        break
      }
      case 'INVITE_EMPLOYEE_TO_OFFICE': {
        //Get the Office of the person sending this request
        callerOffice = await ddbAPI.getOfficeByOwnerUsername(senderUsername)
        if (!callerOffice) {
          throw new Error("User isn't an Office managers. Only office managers can send requests.")
        }
        if (callerOffice.error) {
          throw new Error("Failed to retrieve the user's office [" + senderUsername + '] with error ' + callerOffice.error)
        }
        if (!utilsAPI.validateEmail(receiverEmail)) {
          throw new Error('Invalid receiver email')
        }
        break
      }
      case 'INVITE_CONTRACTOR_TO_OFFICE': {
        //Get the Office of the person sending this request
        let callerOffice = await ddbAPI.getOfficeByOwnerUsername(senderUsername)
        if (!callerOffice) {
          throw new Error("User isn't an Office managers. Only office managers can send requests.")
        }
        if (callerOffice.error) {
          throw new Error("Failed to retrieve the user's office [" + senderUsername + '] with error ' + callerOffice.error)
        }
        if (!utilsAPI.validateEmail(receiverEmail)) {
          throw new Error('Invalid receiver email')
        }
        break
      }
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
    let insertionRes = await ddbAPI.insertRequest(item)
    if (insertionRes.error) {
      throw new Error('Failed to insert request [' + JSON.stringify(item) + '] with error: ' + insertionRes.error)
    }
    return { requestId: id }
  },
  resolveRequest: async event => {
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
    const requestObject = await ddbAPI.getRequestById(requestId)
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
      case 'CREATE_TRADE': {
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
          let newOfficeResult = await ddbAPI.insertOfficeIfNotExists(newOfficeItem)
          if (newOfficeResult.data) {
            resolverResponse.status = JSON.stringify(newOfficeResult)
          } else {
            console.log('Request with id=[' + requestId + '] was rejected by Admin')
          }
        } else {
          console.log('Request with id=[' + requestId + '] was rejected by Admin')
        }
        break
      }
      case 'CREATE_COMPANY_CONNECTION': {
        break
      }
      case 'INVITE_EMPLOYEE_TO_OFFICE': {
        if (decision === 'ACCEPT') {
          //let newEmpResult = await ddbAPI.addEmployeeToOffice('office', receiverUsername, 'empEmail', uuid)
        } else {
          //console.log('Request with id=[' + requestId + '] was rejected by ' + receiverUsername)
        }
        break
      }
      case 'INVITE_CONTRACTOR_TO_OFFICE': {
        if (decision === 'ACCEPT') {
          //let newContractorResult = await ddbAPI.addContractorToOffice('office', receiverUsername, 'empEmail', uuid)
        } else {
          //console.log('Request with id=[' + requestId + '] was rejected by ' + receiverUsername)
        }
        break
      }
      default: {
        throw new Error('Invalid request type.')
      }
    }

    //Delete request as it has been resolved
    let delResponse = await ddbAPI.deleteRequest(uuid)
    if (delResponse.error) {
      resolverResponse.errors = delResponse
    }

    //Log and return
    console.log('Response of resolveRequest was ' + JSON.stringify(delResponse))
    return resolverResponse
  },
}
