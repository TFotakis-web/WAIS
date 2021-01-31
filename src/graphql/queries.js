/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTestType = /* GraphQL */ `
  query GetTestType($id: ID!) {
    getTestType(id: $id) {
      id
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
