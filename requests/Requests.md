# WAIS Requests between users

## CREATE_TRADE

```json
{
  "tradeName": "...",
  "message": "..."
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
