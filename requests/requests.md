# WAIS Requests between users

This sectiom describes the payloads for each type of request.

# CREATE_TRADE

All candidate office fields must be placed in this JSON with the exact field names as described in the schema.graphql.
Field and identity validations are performed when the request is sent.
After a successful Office creation a new TradeUserConnection between Manager and New Office is created.

## Sender's payload

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

## Receiver's payload

```json
{ "decision": "[ACCEPT|REJECT]" }
```

## Receiver's response

The ID of the completed request (now deleted) and created Office are returned.

```json
{
  "office": {
    "id": "XXXX-XXXX"
  },
  "request": {
    "id": "XXXX-XXXX"
  },
  "connection": {
    "id": "XXXX-XXXX"
  }
}
```

# INVITE_EMPLOYEE_TO_OFFICE / INVITE_CONTRACTOR_TO_OFFICE

## Sender's payload

```json
{
  "employee_email": "name@email.com" // The email address of the company manager you want to connect with. Address must be present in the WAIS DB
}
```

## Receiver's payload

```json
{ "id": "XXX-XXX", "decision": "[ACCEPT|REJECT]" }
```

## Receiver's response

The ID of the completed request (now deleted) and created Office are returned.

```json
{
  "office": {
    "id": "XXXX-XXXX"
  },
  "request": {
    "id": "XXXX-XXXX"
  },
  "connection": {
    "id": "XXXX-XXXX"
  }
}
```

# CREATE_COMPANY_CONNECTION

### TBD
