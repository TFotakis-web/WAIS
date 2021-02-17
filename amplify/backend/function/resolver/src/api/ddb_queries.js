//Init the DDB client and update regional settings
const AWS = require('aws-sdk')
const http = require('http')
const agent = new http.Agent({
  keepAlive: true,
  maxSockets: Infinity,
})
AWS.config.update({
  region: process.env.REGION,
  httpOptions: {
    agent,
  },
})

//DDB client
const ddb = new AWS.DynamoDB.DocumentClient()

//Amplify DDB table suffix
const ddbSuffix = '-' + process.env.API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT + '-' + process.env.ENV

module.exports = {
  addEmployeeToOffice: async (office, empUsername, empEmail, uuid) => {
    console.log('Attempting to create new employee to office ' + JSON.stringify(office))

    //Have an updated member list prepared
    let newMembers = office.members
    if (!newMembers.includes(empUsername)) {
      newMembers.push(empUsername)
    }

    // ==DDB TRANSACTION==
    // Update members and put user into members iff remaining > 0 AND memebers dont contain empUsername
    // Put new tradecon
    // Atomically decrement the members counter by one
    let now = new Date().toISOString()
    let resp = { data: '', errors: '' }

    try {
      resp.data = await ddb.transactWriteItems({
        TransactItems: [
          {
            Update: {
              TableName: 'Office' + ddbSuffix,
              Key: {
                id: office.id,
              },
              ConditionExpression: 'not_contains(members,:new_emp_username) and remainingMembersAllowed > 0',
              UpdateExpression: 'SET members = list_append(members, :new_emp_username), updatedAt = :now',
              ExpressionAttributeValues: {
                ':new_emp_username': empUsername,
                ':now': now,
              },
              ReturnValues: 'UPDATED_NEW',
            },
          },
          {
            Put: {
              TableName: 'TradeUserConnection' + ddbSuffix,
              Item: {
                id: uuid,
                tradeId: office.tradeId,
                tradeName: office.tradeName,
                userId: '',
                username: empUsername,
                permissions: [],
                employeeType: 'STANDARD',
                preferences: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            },
          },
        ],
      })
    } catch (err) {
      resp.errors = err
    }
    console.log("Result of 'addEmployeeToOffice': " + JSON.stringify(resp))
    return resp
  },

  /**
   * Initializes the data structures of a new user.
   * Called by Cognito PostConfirmationTrigger.
   *
   * @param {Dict<String>} input
   */
  addNewUserToDB: async input => {
    console.log('Attempting to add a new user to DB: ' + JSON.stringify(input))
    let resp = { data: '', errors: '' }
    try {
      resp.data = await ddb.transactWriteItems({
        TransactItems: [
          {
            Put: {
              TableName: 'UserProfile' + ddbSuffix,
              Item: {
                id: input.id || null,
                username: input.username || null,
                email: input.email || null,
                telephone: input.phone_number || null,
                tin: input.tin || null,
                doy: input.doy || null,
                familyStatus: input.familyStatus || null,
                chamberRecordNumber: input.chamberRecordNumber || null,
                insuranceLicenseExpirationDate: input.insuranceLicenseExpirationDate || null,
                partnersNumberLimit: input.partnersNumberLimit || 0,
                professionStartDate: input.professionStartDate || null,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                file: [],
              },
              Put: {
                TableName: 'UserWallet' + ddbSuffix,
                Item: {
                  id: input.id,
                  username: input.username,
                  balance: 0,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  file: [],
                },
              },
            },
          },
        ],
      })
    } catch (err) {
      resp.errors = err
    }
    console.log("Result of 'addNewUserToDB': " + JSON.stringify(resp))
    return resp
  },
  /**
   * Remove a user from the given office.
   * The index of the user's username in the office members index is necessary.
   *
   * @param {String} tradeUserConId
   * @param {String} officeId
   * @param {Number} memberIndex
   */
  removeEmployeeFromOffice: async (tradeUserConId, officeId, memberIndex) => {
    console.log('Attempting to remove a user from an office: ' + [tradeUserConId, officeId, memberIndex])
    let resp = { data: '', errors: '' }
    try {
      resp.data = await ddb.transactWriteItems({
        TransactItems: [
          {
            Delete: {
              TableName: 'TradeUserConnection' + ddbSuffix,
              Key: { id: tradeUserConId },
            },
            Update: {
              TableName: 'Office' + ddbSuffix,
              Key: { id: officeId },
              UpdateExpression: 'REMOVE members[:idx]',
              ExpressionAttributeValues: {
                ':idx': memberIndex,
              },
            },
          },
        ],
      })
    } catch (err) {
      resp.errors = err
    }
    console.log("Result of 'removeEmployeeFromOffice': " + JSON.stringify(resp))
    return resp
  },
}
