/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const me = /* GraphQL */ `
  query Me {
    me {
      Username
      UserAttributes {
        Name
        Value
      }
      UserCreateDate
      UserLastModifiedDate
      Enabled
      UserStatus
      MFAOptions {
        DeliveryMedium
        AttributeName
      }
      PreferredMfaSetting
      UserMFASettingList
    }
  }
`;
export const user = /* GraphQL */ `
  query User($username: String) {
    user(username: $username) {
      Username
      UserAttributes {
        Name
        Value
      }
      UserCreateDate
      UserLastModifiedDate
      Enabled
      UserStatus
      MFAOptions {
        DeliveryMedium
        AttributeName
      }
      PreferredMfaSetting
      UserMFASettingList
    }
  }
`;
export const echo = /* GraphQL */ `
  query Echo($msg: String) {
    echo(msg: $msg)
  }
`;
export const getTestType = /* GraphQL */ `
  query GetTestType($id: ID!) {
    getTestType(id: $id) {
      id
      val
      createdAt
      updatedAt
    }
  }
`;
export const listTestTypes = /* GraphQL */ `
  query ListTestTypes(
    $filter: ModelTestTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTestTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        val
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
