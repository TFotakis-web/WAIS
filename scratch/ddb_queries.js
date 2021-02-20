const AWS = require('aws-sdk')
const REGION = process.env.REGION
AWS.config.update({ region: REGION })
const ddb = new AWS.DynamoDB.DocumentClient()
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
    let resp = { data: '', error: '' }

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
              UpdateExpression: 'SET members = list_append(members, :new_emp_username)',
              ExpressionAttributeValues: {
                ':new_emp_username': empUsername,
              },
              ReturnValues: 'UPDATED_NEW',
            },
          },
          {
            Put: {
              TableName: 'TradeUserConnection' + ddbSuffix,
              Item: {
                id: { S: uuid },
                tradeId: { S: office.tradeId },
                tradeName: { S: office.tradeName },
                userId: { S: '' },
                username: { S: empUsername },
                permissions: { L: [] },
                employeeType: { S: 'STANDARD' },
                preferences: { S: '' },
              },
            },
          },
        ],
      })
    } catch (err) {
      resp.error = err
    }

    //Log results
    console.log("Result of 'addEmployeeToOffice': " + JSON.stringify(resp))
    return resp
  },
}
