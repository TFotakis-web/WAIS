# Todo List

## Backend

- Add post sign up lambda trigger to cognito (Requires lambda function + Maybe SNS)
- Create User batch add script.
- Create API for enum data CRUD (currently in /public/enumData.json).
- Move completed contracts to S3 via DynamoDB streams trigger.
- Intra/Inter office communication with SNS/SQS.
- Add @connections to Trade DynamoDB table (400 KB items size limit)
- Create new collaboration API:
  - Invites via username/e-mail.
  - Request sent to target via notification/e-mail.
  - Requests have NO confirmation (e.g user does not exist).
  - Both Accepted and Pending requests can be canceled at any time.
  - Provide friendly tools to Users such as mass deletion of all invites, user whitelist, user blacklist.
- Office management API:
  - Manager signs up / deletes employees with one-time passwords.
  - Each user is assigned a new set of permissions is generated (default is all '0's).

## Frontend

- Add Calendar Pro Plugin
- Create admin panel for enumData editing
- Add Locales functionality
