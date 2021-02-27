# Create a request for Office creation

```gql
mutation reqTrade {
  sendRequest(
    payload: "{ \"tradeName\": \"gstamatakis\", \"tin\": \"12345678\", \"phone\": \"697\", \"office_email\": \"gstamatakisoffice@wais.com\" }"
    requestType: CREATE_TRADE
  )
}
```

# Resolve a request for Office creation (needs to be ADMIN)

```gql
mutation resolveTrade {
  resolveRequest(id: "f26e8fd4-4e67-42c2-a749-e62032976ef5", payload: "{\"decision\":\"ACCEPT\"}")
}
```

# Invite a User to office

```gql
mutation invToOffice {
  sendRequest(payload: "{\"employee_email\": \"gstamatakis95@gmail.com\" }", requestType: INVITE_EMPLOYEE_TO_OFFICE)
}
```

# Accept the invitation to become employee

```gql
mutation acceptInv {
  resolveRequest(id: "50adce5f-63f9-48f2-90cf-a1be111843f0", payload: "{\"decision\":\"ACCEPT\"}")
}
```

# Invite a Manager to collaborate

```gql
mutation invToOffice {
  sendRequest(payload: "{\"office_email\": \"gstamatakis2office@wais.com\" }", requestType: CREATE_COMPANY_CONNECTION)
}
```

# Accept collaboration

```gql
mutation acceptInv {
  resolveRequest(id: "7f1ba7dd-7586-4bfa-af5d-a74c62336bf5", payload: "{\"decision\":\"ACCEPT\"}")
}
```

# Create an Admin UserProfile (needs to be IAM)

```gql
mutation createAdmin {
  createUserProfile(
    input: {
      address: "address1"
      birthdate: "1995-08-15"
      city: "city1"
      email: "admin1@wais.com"
      family_name: "family_name_1"
      fathers_name: "fathers_name_1"
      gender: "male"
      locale: "en-US"
      mobile: "+306969696969"
      name: "admin1"
      preferences: "{}"
      surname: "surname2"
      telephone: "6969"
      tin: "111111111"
      username: "admin1"
      zip_code: "71414"
    }
  ) {
    id
  }
}
```

# Customers CRUD

Manage a customer entry via manageCustomers(action: CustomerResourceAction.CREATE, tradeName: "...", payload: "{}") with the following _STRING_ payload.
Although the JSON version is present here you will need to Stringify this.

```json
{
  "tin": "",
  "firstName": "",
  "lastName": "",
  "fathersName": "",
  "birthDate": "",
  "gender": "",
  "email": "",
  "mobile": "",
  "postcode": "",
  "doy": "",
  "address": "",
  "familyStatus": "",
  "files": [
    {
      "bucket": "",
      "region": "",
      "key": "",
      "name": ""
    }
  ],
  "driversLicense": {
    "LicenseID": 0,
    "DriversLicenseType": "",
    "Category": [
      {
        "category": "",
        "issueDate": "",
        "expiresAt": ""
      }
    ]
  }
}
```

The response is the following:

```json
{
  "id": "XXX-XXX"
}
```

In order to retrieve customers call the customers(filter: String, limit: Int, nextToken: String) method in the Office model.
The response is the follwoing stringified JSON (here the JSON version is present but you will need to parse it).
You can pass a filter to the customers method to avoid over-fetching.

```json
[
  {
    "id": "XXX-XXX",
    "...": "..."
  }
]
```

In order to update an existing customer simply provide the following payload with an action of CustomerResourceAction.UPDATE.
Only the ID field is mandatory and is used to pinpoint the Customer's entry.
The other fields will update (overwrite) the existing ones.
Reminder that GQL does NOT support array index-specific updates which is why the entire array needs to be retransmitted. Will probably do a different API for File updates.
When updating the Sort Key (firstName or lastName) both fields need to be provided, even if they haven't changed.

```json
{
  "id": "",
  "tin": "",
  "tradeName": "",
  "firstName": "",
  "lastName": "",
  "fathersName": "",
  "birthDate": "",
  "gender": "",
  "email": "",
  "mobile": "",
  "postcode": "",
  "doy": "",
  "address": "",
  "familyStatus": "",
  "files": [
    {
      "bucket": "",
      "region": "",
      "key": "",
      "name": ""
    }
  ],
  "driversLicense": {
    "LicenseID": 0,
    "DriversLicenseType": "",
    "Category": [
      {
        "category": "",
        "issueDate": "",
        "expiresAt": ""
      }
    ]
  }
}
```

The response is the following:

```json
{
  "id": "XXX-XXX"
}
```

In order to delete a Customer simply provide its id and set the action to CustomerResourceAction.DELETE.

```json
{
  "id": "XXX-XXX"
}
```

The response is:

```json
{
  "id": "XXX-XXX"
}
```

# Contractor/Employees CRUD

Manage an Employee or a Contractor via manageEmployees/manageContractors(action: EmployeeResourceAction/ContractorResourceAction!, tradeName: String!, payload: String!) with the following _STRING_ payload.
Although the JSON version is present here you will need to Stringify this.

To update permissions send the user's _ENTIRE_ permission array as a payload with the an action of UPDATE_PERMISSIONS.

```json
{
  "username": "target_username",
  "permissions": [
    {
      "department": "",
      "write": "",
      "read": ""
    }
  ]
}
```

To remove an employee from the office send the following payload with an action of EmployeeResourceAction.REMOVE.

```json
{
  "username": "target_username"
}
```

# Contact CRUD
# TODO - simillar to Customers

