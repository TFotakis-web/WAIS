# WAIS Requests between users

This sectiom describes the payloads for each type of request.

## CREATE_TRADE

All candidate office fields must be placed in this JSON with the exact field names as described in the schema.graphql.
Field and identity validations are performed when the request is sent.

## Request

Standard request input, mandatory fields have content in this example.
Missing attributes are declared null (the numbers are an exception).

```json
{
  "tradeName": "name",
  "address": "",
  "office_email": "a@b.com",
  "zip_code": "",
  "mobile": "",
  "phone": "6969696969",
  "partnersNumberLimit": 0,
  "employeesNumberLimit": 0,
  "tin": "tin1",
  "professionStartDate": "",
  "chamberRecordNumber": "",
  "insuranceLicenseExpirationDate": "",
  "civilLiabilityExpirationDate": "",
  "bankAccountInfo": "",
  "files": [{}]
}
```

# Response

The ID of the completed request and created Office are returned.

```json
{
  "office": {
    "id": "XXXX-XXXX"
  },
  "request": {
    "id": "XXXX-XXXX"
  }
}
```

## CREATE_COMPANY_CONNECTION

```json
{
  "email": "name@email.com", // The email address of the company manager you want to connect with. Address must be present in the WAIS DB
  "message": "..."
}
```

## INVITE_EMPLOYEE_TO_OFFICE / INVITE_CONTRACTOR_TO_OFFICE

```json
{
  "email": "...", //The email address of the employee/contractor you want to connect with. The email may or may not exist at the time the request is submitted.
  "message": "..."
}
```

# Responses

```json
{
  "id": "...",
  "decision": "[ACCEPT|REJECT]"
}
```
