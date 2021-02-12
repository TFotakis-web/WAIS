//event

```json
{
  "version": "1",
  "region": "eu-central-1",
  "userPoolId": "eu-central-1_CMJ4OFEm7",
  "userName": "gstamatakis",
  "callerContext": {
    "awsSdkVersion": "aws-sdk-unknown-unknown",
    "clientId": "5uph94mbhj0849nc4d4icqspou"
  },
  "triggerSource": "PreSignUp_SignUp",
  "request": {
    "userAttributes": {
      "phone_number": "+306972399478",
      "email": "giorgoshstam@gmail.com"
    },
    "validationData": null
  },
  "response": {
    "autoConfirmUser": false,
    "autoVerifyEmail": false,
    "autoVerifyPhone": false
  }
}
```

//Context

```json
{
  "callbackWaitsForEmptyEventLoop": true,
  "functionVersion": "$LATEST",
  "functionName": "waisauthPreSignup-staging",
  "memoryLimitInMB": "128",
  "logGroupName": "/aws/lambda/waisauthPreSignup-staging",
  "logStreamName": "2021/02/11/[$LATEST]60bb5de43dcd4b2386caed19a65d0b86",
  "invokedFunctionArn": "arn:aws:lambda:eu-central-1:700078438137:function:waisauthPreSignup-staging",
  "awsRequestId": "0969e73c-2ff3-4eef-a495-19616395ae55"
}
```
