//Init the DDB client and update regional settings
const AWS = require('aws-sdk')
AWS.config.update({
  region: process.env.REGION,
})

//DDB client
const ddb = new AWS.DynamoDB.DocumentClient({
  region: process.env.REGION,
})

//Amplify DDB table suffix
const ddbSuffix = '-' + process.env.API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT + '-' + process.env.ENV

module.exports = {
  /**
   * ==DDB TRANSACTION==
   * Update members and put user into members iff remaining > 0 AND memebers dont contain empUsername
   * Put new tradecon
   * Atomically decrement the members counter by one
   *
   * @param {*} office
   * @param {*} empUsername
   * @param {*} userId
   * @param {*} uuid
   */
  addEmployeeToOffice: async (office, empUsername, connId, userId) => {
    console.log('Attempting to create new employee to office with arguments:' + [JSON.stringify(office), empUsername, connId, userId])
    //Have an updated member list prepared
    let newMembers = office.members
    if (!newMembers.includes(empUsername)) {
      newMembers.push(empUsername)
    }
    const now = new Date().toISOString()
    const resp = await ddb
      .transactWrite({
        TransactItems: [
          {
            // Add the User to the members array in Office
            Update: {
              TableName: 'Office' + ddbSuffix,
              Key: {
                id: office.id,
              },
              ConditionExpression: '(not contains(#members, :new_emp_username)) and (#employeesNumberLimit > :zero)',
              UpdateExpression:
                'SET #members = list_append(#members, :new_emp_username), #updatedAt = :now, #employeesNumberLimit = #employeesNumberLimit - :dec',
              ExpressionAttributeNames: {
                '#members': 'members',
                '#updatedAt': 'updatedAt',
                '#employeesNumberLimit': 'employeesNumberLimit',
              },
              ExpressionAttributeValues: {
                ':new_emp_username': [empUsername],
                ':now': now,
                ':dec': 1,
                ':zero': 0,
              },
              ReturnValues: 'UPDATED_NEW',
            },
          },
          {
            //Add the user's connection with the Office
            Put: {
              TableName: 'TradeUserConnection' + ddbSuffix,
              Item: {
                __typename: 'TradeUserConnection',
                id: connId,
                tradeId: office.id,
                tradeName: office.tradeName,
                userId: userId,
                username: empUsername,
                permissions: [],
                members: [empUsername, office.ownerUsername],
                employeeType: 'STANDARD',
                preferences: '',
                createdAt: now,
                updatedAt: now,
              },
            },
          },
        ],
      })
      .promise()
    console.log("Result of 'addEmployeeToOffice': " + JSON.stringify(resp))
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
    try {
      const resp = await ddb
        .transactWriteItems({
          TransactItems: [
            {
              Delete: {
                TableName: 'TradeUserConnection' + ddbSuffix,
                Key: { id: tradeUserConId },
              },
            },
            {
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
        .promise()
      console.log("Result of 'removeEmployeeFromOffice': " + JSON.stringify(resp))
      return resp
    } catch (err) {
      return err
    }
  },

  getRequestById: async id => {
    console.log('getRequestById id: ' + id)
    try {
      const resp = await ddb
        .get({
          TableName: 'Requests' + ddbSuffix,
          Key: { id: id },
        })
        .promise()
      console.log('getRequestById result: ' + JSON.stringify(resp))
      if (!resp.Item) {
        return null
      }
      return resp.Item
    } catch (err) {
      return err
    }
  },

  getUserProfileByEmail: async email => {
    console.log('getUserProfileByEmail email: ' + email)
    try {
      const resp = await ddb
        .query({
          TableName: 'UserProfile' + ddbSuffix,
          IndexName: 'byEmail',
          ExpressionAttributeNames: { '#emailField': 'email' },
          ExpressionAttributeValues: { ':emailValue': email },
          KeyConditionExpression: '#emailField = :emailValue',
        })
        .promise()
      console.log('getUserProfileByEmail result: ' + JSON.stringify(resp))
      if (!resp.Items) {
        return null
      }
      return resp.Items[0]
    } catch (err) {
      return err
    }
  },

  getUserProfileByUsername: async username => {
    console.log('getUserProfileByUsername username: ' + username)
    try {
      const resp = await ddb
        .query({
          TableName: 'UserProfile' + ddbSuffix,
          IndexName: 'byUsername',
          ExpressionAttributeNames: { '#usernameField': 'username' },
          ExpressionAttributeValues: { ':usernameValue': username },
          KeyConditionExpression: '#usernameField = :usernameValue',
        })
        .promise()
      console.log('getUserProfileByUsername result: ' + JSON.stringify(resp))
      if (!resp.Items) {
        return null
      }
      return resp.Items[0]
    } catch (err) {
      return err
    }
  },

  getUserProfileByEmailConsistently: async email => {
    console.log('getUserProfileByEmailConsistently email: ' + email)
    try {
      const resp = await ddb
        .query({
          TableName: 'UserProfile' + ddbSuffix,
          IndexName: 'byEmail',
          ConsistentRead: true,
          ExpressionAttributeNames: { '#emailField': 'email' },
          ExpressionAttributeValues: { ':emailValue': email },
          KeyConditionExpression: '#emailField = :emailValue',
        })
        .promise()
      console.log('getUserProfileByEmailConsistently result: ' + JSON.stringify(resp))
      if (!resp.Items) {
        return null
      }
      return resp.Items[0]
    } catch (err) {
      return err
    }
  },

  getOfficeByOwnerUsername: async username => {
    console.log('getOfficeByOwnerUsername username: ' + username)
    try {
      const resp = await ddb
        .query({
          TableName: 'Office' + ddbSuffix,
          IndexName: 'byOwnerUsername',
          ExpressionAttributeNames: { '#ownerUsernameFieldName': 'ownerUsername' },
          KeyConditionExpression: '#ownerUsernameFieldName = :inputUsername',
          ExpressionAttributeValues: { ':inputUsername': username },
        })
        .promise()
      console.log('getOfficeByOwnerUsername result: ' + JSON.stringify(resp))
      if (!resp.Items) {
        return null
      }
      return resp.Items[0]
    } catch (err) {
      return err
    }
  },
  createOfficeIfNotExists: async item => {
    console.log('Attempting to add a new Office: ' + JSON.stringify(item))
    try {
      const resp = await ddb
        .Put({
          TableName: 'Office' + ddbSuffix,
          Item: item,
        })
        .promise()
      console.log("Result of 'createOfficeIfNotExists': " + JSON.stringify(resp))
      return resp
    } catch (err) {
      return err
    }
  },

  deleteRequestById: async id => {
    console.log('Deleting request with ID: ' + id)
    try {
      const resp = await ddb
        .Delete({
          TableName: 'Office' + ddbSuffix,
          Key: { id: id },
        })
        .promise()
      console.log("Result of 'deleteRequestById': " + JSON.stringify(resp))
      return resp
    } catch (err) {
      return err
    }
  },
}
