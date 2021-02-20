const gqlAPI = require('../api/gql_queries')
const ddbAPI = require('../api/ddb_queries')
const utilsAPI = require('../api/utils')

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
        //Payload checks and validations should be placed here
        if (payload.name.length < 4) {
          throw new Error('Trade name length should be greater than 3')
        }

        //Designate ADMIN as the receiver of this request
        receiverEmail = 'admin@wais.com' //TODO change to sth simillar
        metadata.forAdmin = 'true'
        break
      }
      case 'CREATE_COMPANY_CONNECTION': {
        // //Get the Office of the person sending this request
        // callerOffice = await ddbAPI.getOfficeByOwnerUsername(senderUsername)
        // if (!callerOffice) {
        //   throw new Error("User isn't an Office managers. Only office managers can send requests.")
        // }
        // if (callerOffice.errors) {
        //   throw new Error("Failed to retrieve the user's office [" + senderUsername + '] with error ' + callerOffice.errors)
        // }
        // if (!utilsAPI.validateEmail(receiverEmail)) {
        //   throw new Error('Invalid receiver email')
        // }
        // const receiverUserProfile = await ddbAPI.getUserProfileByEmail(receiverEmail)
        // if (!receiverUserProfile) {
        //   throw new Error('Receiver office manager does not exist')
        // }
        // if (receiverUserProfile.errors) {
        //   throw new Error("Failed to retrieve the receiver's user profile with error " + receiverUserProfile.errors)
        // }
        break
      }
      case 'INVITE_EMPLOYEE_TO_OFFICE': {
        // //Get the Office of the person sending this request
        // callerOffice = await ddbAPI.getOfficeByOwnerUsername(senderUsername)
        // if (!callerOffice) {
        //   throw new Error("User isn't an Office managers. Only office managers can send requests.")
        // }
        // if (callerOffice.errors) {
        //   throw new Error("Failed to retrieve the user's office [" + senderUsername + '] with error ' + callerOffice.errors)
        // }
        // if (!utilsAPI.validateEmail(receiverEmail)) {
        //   throw new Error('Invalid receiver email')
        // }
        break
      }
      case 'INVITE_CONTRACTOR_TO_OFFICE': {
        // //Get the Office of the person sending this request
        // let callerOffice = await ddbAPI.getOfficeByOwnerUsername(senderUsername)
        // if (!callerOffice) {
        //   throw new Error("User isn't an Office managers. Only office managers can send requests.")
        // }
        // if (callerOffice.errors) {
        //   throw new Error("Failed to retrieve the user's office [" + senderUsername + '] with error ' + callerOffice.errors)
        // }
        // if (!utilsAPI.validateEmail(receiverEmail)) {
        //   throw new Error('Invalid receiver email')
        // }
        break
      }
      default:
        throw new Error('Request of type ' + requestType + ' with request=[' + JSON.stringify(input) + '] failed.')
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
    const senderUsername = input.username
    const groups = input.groups
    const requestId = input.id

    let requestObject
    try {
      requestObject = await ddbAPI.getRequestById(requestId)
      if (requestObject == null) {
        throw new Error('Request object not found.')
      }
    } catch (err) {
      throw new Error('Failed to retrieve request with ID=' + requestId + ', the error is ' + err)
    }

    //Sender payload -> Created when request was made
    //Receiver payload -> Created when request was made
    const receiverPayload = JSON.parse(input.payload)
    const senderPayload = JSON.parse(requestObject.payload)
    const decision = receiverPayload.decision

    //Get receiver UserProfile
    let senderUserProfile
    try {
      senderUserProfile = await ddbAPI.getUserProfileByUsername(senderUsername)
      if (senderUserProfile == null) {
        throw new Error('User profile of caller not found.')
      }
    } catch (err) {
      throw new Error('User profile of caller not found with error: ' + err)
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
    }
    switch (requestObject.type) {
      case 'CREATE_TRADE': {
        console.log('Deciding on CREATE_TRADE: ' + decision)
        if (decision === 'ACCEPT') {
          const item = {
            input: {
              id: senderUserProfile.id,
              tradeName: senderPayload.tradeName || 'undefined',
              ownerUsername: requestObject.senderUsername || 'undefined',
              address: senderPayload.address || null,
              office_email: senderPayload.office_email || 'undefined',
              zip_code: senderPayload.zip_code || null,
              mobile: senderPayload.mobile || null,
              phone: senderPayload.phone || 'undefined',
              partnersNumberLimit: senderPayload.partnersNumberLimit || 0,
              employeesNumberLimit: senderPayload.employeesNumberLimit || 0,
              verified: true,
              members: [],
              privateData: {
                tin: senderPayload.tin || 'undefined',
                professionStartDate: senderPayload.professionStartDate || null,
                chamberRecordNumber: senderPayload.chamberRecordNumber || null,
                insuranceLicenseExpirationDate: senderPayload.insuranceLicenseExpirationDate || null,
                civilLiabilityExpirationDate: senderPayload.civilLiabilityExpirationDate || null,
                bankAccountInfo: senderPayload.bankAccountInfo || null,
                files: [],
              },
            },
          }

          //Attempt to create the Office item
          let newOfficeResult = await gqlAPI.createOfficeIfNotExists(item)
          if (newOfficeResult) {
            body.office = newOfficeResult
          } else {
            throw new Error('Request with id=[' + requestId + '] failed.')
          }
        } else {
          console.log('Request with id=[' + requestId + '] was rejected by Admin')
        }
        break
      }
      case 'CREATE_COMPANY_CONNECTION': {
        if (decision === 'ACCEPT') {
          //
        } else {
          //
        }
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

    //Resolve the request
    const delResponse = await gqlAPI.deleteRequest(requestId)
    if (delResponse == null) {
      throw new Error('Failed to delete request [' + JSON.stringify(requestId) + '].')
    }
    body.request = delResponse
    return JSON.stringify(body)
  },
}
