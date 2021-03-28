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

    if (!requestType) {
      throw new Error('Invalid request type.')
    }
    console.log('Resolving request with input: ' + [senderUsername, requestType, JSON.stringify(payload)])

    // Retrieve username and permissions
    if (!input.username) {
      throw new Error('Credential not found.')
    }

    //Retrieve the UserProfiles
    const senderUserProfile = await gqlAPI.getUserProfileByUsername(senderUsername)
    if (!senderUserProfile) {
      throw new Error('Sender has no UserProfile [' + senderUsername + '].')
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

        receiverEmail = ADMIN_EMAIL
        break
      }
      case 'INVITE_EMPLOYEE_TO_OFFICE': {
        //Get the Office of the person sending this request
        const callerOffice = await gqlAPI.getOfficeByOwnerUsername(senderUsername)
        if (!callerOffice) {
          throw new Error("User isn't an Office manager. Only Office managers can send requests.")
        }
        if (!('employee_email' in payload)) {
          throw new Error("Payload field 'employee_email' missing!")
        }
        const employee_email = payload.employee_email

        //Quick validation check
        if (!utilsAPI.validateEmail(employee_email)) {
          throw new Error('Invalid employee email (syntax check)')
        }

        // Managers can't invite themselves,  also covered as is since their is already a connection between Office and Manager
        if (senderUserProfile.email === employee_email) {
          throw new Error('Sender and receiver emails are the same.')
        }

        receiverEmail = employee_email
        break
      }
      case 'CREATE_COMPANY_CONNECTION': {
        //Quick validation checks
        if (!('office_email' in payload)) {
          throw new Error("Payload field 'office_email' missing!")
        }
        const office_email = payload.office_email
        if (!utilsAPI.validateEmail(office_email)) {
          throw new Error('Invalid office email (syntax check)')
        }

        //Get the Offices of the people involved this request
        const senderOffice = await gqlAPI.getOfficeByOwnerUsername(senderUsername)
        if (!senderOffice) {
          throw new Error("Sender isn't an Office manager. Only Office managers can send requests.")
        }
        const receiverOffice = await gqlAPI.getOfficeByOfficeEmail(office_email)
        if (!receiverOffice) {
          throw new Error('Receiver Office email not found.')
        }

        //Check that the sender has enough slots
        if (senderOffice.partnersNumberLimit <= 0) {
          throw new Error("Sender Office doesn't have enough 'partent-slots' available.")
        }
        if (receiverOffice.partnersNumberLimit <= 0) {
          throw new Error("Receiver Office doesn't have enough 'partent-slots' available.")
        }

        //Get the receiver's UP
        let receiverUP = await gqlAPI.getUserProfileByUsername(receiverOffice.ownerUsername)
        if (!receiverUP) {
          throw new Error('Receiver has no UserProfile [' + receiverOffice.ownerUsername + '].')
        }

        // Managers can't invite themselves
        if (senderUserProfile.email === receiverUP.email) {
          throw new Error('Sender and receiver users have the same emails.')
        }

        receiverEmail = receiverUP.email
        break
      }
      case 'INVITE_CONTRACTOR_TO_OFFICE': {
        //Get the Office of the person sending this request
        const callerOffice = await gqlAPI.getOfficeByOwnerUsername(senderUsername)
        if (!callerOffice) {
          throw new Error("User isn't an Office manager. Only Office managers can send requests.")
        }
        if (!('contractor_email' in payload)) {
          throw new Error("Payload field 'contractor_email' missing!")
        }
        const contractor_email = payload.contractor_email

        //Quick validation check
        if (!utilsAPI.validateEmail(contractor_email)) {
          throw new Error('Invalid contractor email (syntax check)')
        }

        // Managers can't invite themselves,  also covered as is since their is already a connection between Office and Manager
        if (senderUserProfile.email === contractor_email) {
          throw new Error('Sender and receiver emails are the same.')
        }

        receiverEmail = contractor_email
        break
      }
      default:
        throw new Error('Request of type ' + requestType + ' with request=[' + JSON.stringify(input) + '] failed.')
    }

    //Post field-population validation
    if (!receiverEmail) {
      throw new Error('Receiver e-mail missing.')
    }

    //New request
    const params = {
      payload: JSON.stringify(payload),
      type: requestType,
      senderUsername: senderUsername,
      senderEmail: senderUserProfile.email,
      receiverEmail: receiverEmail,
    }

    //Save the request and return the ID. Output example: {"id":"XXXX-XXXX-XXXX"}
    const requestIDEntry = await gqlAPI.createRequest(params)
    if (requestIDEntry == null) {
      throw new Error('Failed to insert request [' + JSON.stringify(params) + '].')
    }

    //Designate ADMIN as the receiver of this request and send a notification e-mail
    try {
      const emailSentRes = await utilsAPI.sendEmail('New request from ' + senderUsername, JSON.stringify(payload), receiverEmail)
      console.log('Email sent result: ' + JSON.stringify(emailSentRes))
    } catch (err) {
      console.log('Failed to send emai wtih result: ' + JSON.stringify(err))
    }

    //Return the ID of the request
    return JSON.stringify(requestIDEntry)
  },
  resolveRequest: async input => {
    console.log('Resolving request')

    //Input Args
    const receiverUsername = input.username
    const groups = input.groups || []
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
        if (groups.indexOf('admin') === -1) {
          throw new Error('Admin privilleges are required to resolve this request.')
        }
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
          const newOfficeResult = await gqlAPI.createOfficeIfNotExists(officeParams)
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
          const newConnResult = await gqlAPI.createTradeUserConnection(connParams)
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

    //The request is now resolved, therefore it can be deleted
    const delResponse = await gqlAPI.deleteRequest(requestId)
    if (delResponse == null) {
      throw new Error('Failed to delete request [' + JSON.stringify(requestId) + '].')
    }
    body.request = delResponse
    return JSON.stringify(body)
  },
}
