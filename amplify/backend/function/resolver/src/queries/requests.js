const gqlAPI = require('../api/gql_queries')
const ddbAPI = require('../api/ddb_queries')
const utilsAPI = require('../api/utils')

//Request towards admin are sent here
const ADMIN_EMAIL = 'wais@admin.com'

module.exports = {
  sendRequest: async input => {
    console.log('Resolving sendRequest')

    //Unpack arguments
    const senderUsername = input.username
    const requestType = input.requestType
    const payload = JSON.parse(input.payload)
    let metadata = {
      forAdmin: 'false',
    }

    if (!requestType) {
      throw new Error('Invalid request type.')
    }
    console.log('Resolving request with input: ' + [senderUsername, requestType, JSON.stringify(payload)])

    // Retrieve username and permissions
    if (!input.username) {
      throw new Error('Credential not found.')
    }

    //Retrieve the UserProfiles
    let senderUserProfile
    try {
      senderUserProfile = await gqlAPI.getUserProfileByUsername(senderUsername)
      if (!senderUserProfile) {
        throw new Error('Sender has no UserProfile [' + senderUsername + '].')
      }
    } catch (err) {
      throw new Error('Failed to retrieve the user profile of ' + senderUsername)
    }

    //Decide the request info along the way
    let receiverEmail = ''

    //Get the receiver of this request based on the request payload and type
    switch (requestType) {
      case 'CREATE_TRADE': {
        //Field validation
        if (!('tradeName' in payload)) {
          throw new Error("Payload field 'tradeName' missing!")
        }
        if (!('tin' in payload)) {
          throw new Error("Payload field 'tin' missing!")
        }
        if (!('phone' in payload)) {
          throw new Error("Payload field 'phone' missing!")
        }
        if (!('office_email' in payload)) {
          throw new Error("Payload field 'office_email' missing!")
        }

        //Payload checks and validations should be placed here
        if (payload.tradeName.length < 4) {
          throw new Error('Trade name length should be greater than 3')
        }

        //Designate ADMIN as the receiver of this request and send a notification e-mail
        receiverEmail = ADMIN_EMAIL
        try {
          let emailSentRes = await utilsAPI.sendEmail('New request for Office creation', JSON.stringify(payload), receiverEmail)
          console.log('Email sent to ADMIN with result: ' + JSON.stringify(emailSentRes))
        } catch (err) {
          console.log('Error while sending email: ' + JSON.stringify(err))
        }
        metadata.forAdmin = 'true'
        break
      }
      case 'INVITE_EMPLOYEE_TO_OFFICE': {
        // Managers can't invite themselves,  also covered as is since their is already a connection between Office and Manager
        // if (senderUserProfile.email === payload.employee_email) {
        //   throw new Error('Sender and receiver emails are the same.')
        // }

        //Get the Office of the person sending this request
        const callerOffice = await gqlAPI.getOfficeByOwnerUsername(senderUsername)
        if (!callerOffice) {
          throw new Error("User isn't an Office manager. Only Office managers can send requests.")
        }
        if (!('employee_email' in payload)) {
          throw new Error("Payload field 'employee_email' missing!")
        }
        let employee_email = payload.employee_email
        if (!utilsAPI.validateEmail(employee_email)) {
          throw new Error('Invalid employee email (syntax check)')
        }
        receiverEmail = employee_email
        break
      }
      case 'CREATE_COMPANY_CONNECTION': {
        break
      }
      case 'INVITE_CONTRACTOR_TO_OFFICE': {
        break
      }
      default:
        throw new Error('Request of type ' + requestType + ' with request=[' + JSON.stringify(input) + '] failed.')
    }

    //Post field-population validation
    if (!receiverEmail) {
      throw new Error('Receiver e-mail not set.')
    }

    //New request
    const params = {
      payload: JSON.stringify(payload),
      type: requestType,
      senderUsername: senderUsername,
      senderEmail: senderUserProfile.email,
      receiverEmail: receiverEmail,
      metadata: JSON.stringify(metadata),
    }

    //Save the request and return the ID. Output example: {"id":"XXXX-XXXX-XXXX"}
    const requestIDEntry = await gqlAPI.createRequest(params)
    if (requestIDEntry == null) {
      throw new Error('Failed to insert request [' + JSON.stringify(params) + '].')
    }
    return JSON.stringify(requestIDEntry)
  },
  resolveRequest: async input => {
    console.log('Resolving request')

    //Input Args
    const receiverUsername = input.username
    const groups = input.groups
    const requestId = input.id

    let requestObject
    try {
      requestObject = await gqlAPI.getRequestById(requestId)
      if (!requestObject) {
        throw new Error('Request object not found.')
      }
    } catch (err) {
      throw new Error('Failed to retrieve request with ID=' + requestId + ', the error is ' + err)
    }

    //Sender payload -> Created when request was made
    //Receiver payload -> Created when request was made
    const senderUsername = requestObject.senderUsername
    const receiverPayload = JSON.parse(input.payload)
    const senderPayload = JSON.parse(requestObject.payload)
    const decision = receiverPayload.decision

    //Get receiver UserProfile
    let senderUserProfile
    try {
      senderUserProfile = await gqlAPI.getUserProfileByUsername(senderUsername)
      if (!senderUserProfile) {
        throw new Error('User profile of sender not found.')
      }
    } catch (err) {
      throw new Error('User profile of sender not found with error: ' + err)
    }

    //Receiver and caller emails must match
    // if (input.email !== requestObject.receiverEmail) {
    //   throw new Error("Caller and receiver e-mails DON'T match: " + [input.email, requestObject.receiverEmail])
    // }

    //Receiver must have a decision field
    if (decision !== 'ACCEPT' && decision !== 'REJECT') {
      throw new Error("Receiver must make a decision that is either 'ACCEPT' or 'REJECT', received: " + decision)
    }

    //Decide based on the request type and update the relevant entries
    let body = {
      office: '',
      request: '',
      connection: '',
    }
    console.log(`Decision for ${requestObject.type}: ${decision}`)
    switch (requestObject.type) {
      case 'CREATE_TRADE': {
        if (decision === 'ACCEPT') {
          //Create shared fields
          const tradeId = senderUserProfile.id //Also userID
          const managerUserId = senderUserProfile.id
          const tradeName = senderPayload.tradeName
          const managerUsername = senderUsername

          //Create the new Office
          const officeParams = {
            id: tradeId,
            tradeName: tradeName,
            ownerUsername: managerUsername,
            address: senderPayload.address || null,
            office_email: senderPayload.office_email,
            zip_code: senderPayload.zip_code || null,
            mobile: senderPayload.mobile || null,
            phone: senderPayload.phone,
            partnersNumberLimit: senderPayload.partnersNumberLimit || 0,
            employeesNumberLimit: senderPayload.employeesNumberLimit || 0,
            verified: true,
            members: [],
            privateData: {
              tin: senderPayload.tin,
              professionStartDate: senderPayload.professionStartDate || null,
              chamberRecordNumber: senderPayload.chamberRecordNumber || null,
              insuranceLicenseExpirationDate: senderPayload.insuranceLicenseExpirationDate || null,
              civilLiabilityExpirationDate: senderPayload.civilLiabilityExpirationDate || null,
              bankAccountInfo: senderPayload.bankAccountInfo || null,
              files: [],
            },
          }

          //Attempt to create the Office item
          let newOfficeResult = await gqlAPI.createOfficeIfNotExists(officeParams)
          if (newOfficeResult) {
            body.office = newOfficeResult
          } else {
            throw new Error('Office creation on request with id=[' + requestId + '] failed.')
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
          let newConnResult = await gqlAPI.createTradeUserConnection(connParams)
          if (newConnResult) {
            body.connection = newConnResult
          } else {
            throw new Error('TradeUserConnection creation on request with id=[' + requestId + '] failed.')
          }
        } else {
          console.log('Request with id=[' + requestId + '] was rejected.')
        }
        break
      }
      case 'CREATE_COMPANY_CONNECTION': {
        if (decision === 'ACCEPT') {
          //
        } else {
          console.log('Request with id=[' + requestId + '] was rejected.')
        }
        break
      }
      case 'INVITE_EMPLOYEE_TO_OFFICE': {
        if (decision === 'ACCEPT') {
          //Get the sencer`s office
          let callerOffice = await gqlAPI.getOfficeByOwnerUsername(senderUsername)
          if (!callerOffice) {
            throw new Error("Sender's Office not found.")
          }
          body.office = { id: callerOffice.id }

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
          let isUnemployed = await gqlAPI.checkIfUserIsUnemployed(receiverUsername)
          if (!isUnemployed) {
            throw new Error("User is a member of another Office and therefore can't join a new one.")
          }

          //Add the Employee to the new Office and create the connection between User and Office
          let connId = userId + '_' + callerOffice.id
          await ddbAPI.addEmployeeToOffice(callerOffice, receiverUsername, connId, userId)
          body.connection = connId
        } else {
          console.log('Request with id=[' + requestId + '] was rejected.')
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

    //The request is now resolved, therefore it can be deleted
    const delResponse = await gqlAPI.deleteRequest(requestId)
    if (delResponse == null) {
      throw new Error('Failed to delete request [' + JSON.stringify(requestId) + '].')
    }
    body.request = delResponse
    return JSON.stringify(body)
  },
}
