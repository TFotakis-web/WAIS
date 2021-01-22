/* Amplify Params - DO NOT EDIT
	API_WAISDYNAMODB_ADMINREQUESTSTABLE_ARN
	API_WAISDYNAMODB_ADMINREQUESTSTABLE_NAME
	API_WAISDYNAMODB_COMPANYACCESSCONNECTIONREQUESTTABLE_ARN
	API_WAISDYNAMODB_COMPANYACCESSCONNECTIONREQUESTTABLE_NAME
	API_WAISDYNAMODB_COMPANYACCESSCONNECTIONTABLE_ARN
	API_WAISDYNAMODB_COMPANYACCESSCONNECTIONTABLE_NAME
	API_WAISDYNAMODB_CONTRACTTABLE_ARN
	API_WAISDYNAMODB_CONTRACTTABLE_NAME
	API_WAISDYNAMODB_CUSTOMERTABLE_ARN
	API_WAISDYNAMODB_CUSTOMERTABLE_NAME
	API_WAISDYNAMODB_GRAPHQLAPIENDPOINTOUTPUT
	API_WAISDYNAMODB_GRAPHQLAPIIDOUTPUT
	API_WAISDYNAMODB_TESTTYPETABLE_ARN
	API_WAISDYNAMODB_TESTTYPETABLE_NAME
	API_WAISDYNAMODB_TRADECONTRACTCONNECTIONTABLE_ARN
	API_WAISDYNAMODB_TRADECONTRACTCONNECTIONTABLE_NAME
	API_WAISDYNAMODB_TRADETABLE_ARN
	API_WAISDYNAMODB_TRADETABLE_NAME
	API_WAISDYNAMODB_TRADEUSERCONNECTIONTABLE_ARN
	API_WAISDYNAMODB_TRADEUSERCONNECTIONTABLE_NAME
	API_WAISDYNAMODB_TRANSACTIONHISTORYTABLE_ARN
	API_WAISDYNAMODB_TRANSACTIONHISTORYTABLE_NAME
	API_WAISDYNAMODB_USERCALENDAREVENTTABLE_ARN
	API_WAISDYNAMODB_USERCALENDAREVENTTABLE_NAME
	API_WAISDYNAMODB_USERPROFILETABLE_ARN
	API_WAISDYNAMODB_USERPROFILETABLE_NAME
	API_WAISDYNAMODB_USERWALLETTABLE_ARN
	API_WAISDYNAMODB_USERWALLETTABLE_NAME
	API_WAISDYNAMODB_VEHICLETABLE_ARN
	API_WAISDYNAMODB_VEHICLETABLE_NAME
	AUTH_WAIS38036AA9_USERPOOLID
	ENV
	FUNCTION_ADMINQUERIES3E8C423F_NAME
	REGION
	STORAGE_WAISSTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

exports.handler = function(event, context) {
  console.log(JSON.stringify(event, null, 2))
  if (!event.request.userAttributes.sub) {
    console.log('Error: Nothing was written to DynamoDB')
    context.done(null, event)
  } else {
    event.Records.forEach(record => {
      console.log(record.eventID)
      console.log(record.eventName)
      console.log('DynamoDB Record: %j', record.dynamodb)
    })
  }
  return Promise.resolve('Successfully processed DynamoDB record')
}
