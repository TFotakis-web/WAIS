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
  "files": []
}
```

## Receiver's payload

```json
{
  "decision": "[ACCEPT|REJECT]",
  "manager_permission": [{ "name": "name1", "read": true, "write": false }]
}
```

## Receiver's response

The IDs of the completed request (now deleted),created Office and TradeUserConnection are returned.

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

# INVITE_EMPLOYEE_TO_OFFICE

## Sender's payload

The email address of the employee you want to connect with. Address can be absent from the WAIS DB.
For employee:

```json
{
  "employee_email": "name@email.com"
}
```

## Receiver's payload

```json
{ "id": "XXX-XXX", "decision": "[ACCEPT|REJECT]" }
```

## Receiver's response

The IDs of the completed request (now deleted), involved Office and TradeUserConnection are returned.

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

# INVITE_CONTRACTOR_TO_OFFICE

## Sender's payload

The email address of the company manager you want to connect with. Address can be absent from the WAIS DB
For contractor:

```json
{
  "contractor_email": "name@email.com"
}
```

## Receiver's payload

```json
{ "id": "XXX-XXX", "decision": "[ACCEPT|REJECT]" }
```

## Receiver's response

The IDs of the completed request (now deleted),the Office that sent the invite and TradeUserConnection are returned.
The Office ID is either the created contractor Office or the Office ID that invited the employee.

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

## Sender's payload

The email address of the Office you want to connect with.
The office with this email must be present in this.

```json
{
  "office_email": "gstamatakis95@.com"
}
```

## Receiver's payload

```json
{ "id": "XXX-XXX", "decision": "[ACCEPT|REJECT]" }
```

## Receiver's response

The IDs of the completed request (now deleted), involved Offices and CompanyAccessConnection are returned.

```json
{
  "office": {
    "id": ["SENDER_OFFICE_ID", "RECEIVER_OFFICE_ID"]
  },
  "request": {
    "id": "XXXX-XXXX"
  },
  "connection": {
    "id": "XXXX-XXXX"
  }
}
```
