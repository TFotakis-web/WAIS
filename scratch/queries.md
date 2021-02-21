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
