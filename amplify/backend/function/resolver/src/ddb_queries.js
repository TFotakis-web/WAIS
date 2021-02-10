const AWS = require('aws-sdk')
const REGION = process.env.REGION
AWS.config.update({ region: REGION })
const ddb = new AWS.DynamoDB.DocumentClient()
const ddbSuffix = '-' + process.env.API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT + '-' + process.env.ENV

module.exports = {
  addEmployeeToOffice: (office, empUsername, empEmail, uuid) => {
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
    let transResult = ddb.transactWriteItems({
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

    //Log results
    console.log("Result of 'addEmployeeToOffice': " + JSON.stringify(transResult))
    return transResult
  },
  insertRequest: (request) => {
    console.log('insertRequest request: ' + JSON.stringify(request))
    let resp = { data: '', error: '' }
    ddb.put(
      {
        TableName: 'Requests' + ddbSuffix,
        Item: request,
      },
      function (err, data) {
        if (err) resp.error = err
        else resp.data = data
      },
    )
    console.log('insertRequest result: ' + JSON.stringify(resp))
    return resp
  },
  deleteRequest: (id) => {
    console.log('deleteRequest request: ' + id)
    let resp = { data: '', error: '' }
    ddb.delete(
      {
        TableName: 'Requests' + ddbSuffix,
        Key: {
          id: 'id',
        },
      },
      function (err, data) {
        if (err) resp.error = err
        else resp.data = data
      },
    )
    console.log('deleteRequest result: ' + JSON.stringify(resp))
    return resp
  },
  getRequestById: (id) => {
    console.log('getRequestById id: ' + email)
    let resp = { data: '', error: '' }
    ddb.get(
      {
        TableName: 'Requests' + ddbSuffix,
        KeyConditionExpression: 'id = :provided_id',
        ExpressionAttributeValues: { ':provided_id': id },
      },
      function (err, data) {
        if (err) resp.error = err
        else resp.data = data
      },
    )
    console.log('getRequestById result: ' + JSON.stringify(resp))
    return resp.data[0]
  },
  getUserProfileByEmail: (email) => {
    console.log('getUserProfileByEmail email: ' + email)
    let resp = { data: '', error: '' }
    ddb.get(
      {
        TableName: 'UserProfile' + ddbSuffix,
        IndexName: 'byEmail',
        KeyConditionExpression: 'email = :user_email',
        ExpressionAttributeValues: { ':user_email': email },
      },
      function (err, data) {
        if (err) resp.error = err
        else resp.data = data
      },
    )
    console.log('getUserProfileByEmail result: ' + JSON.stringify(resp))
    return resp
  },
}
