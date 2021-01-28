module.exports = {
  mutation: `mutation createTestType($input: CreateTestTypeInput!) {
    createTestType(input: $input) {
      id
      val
    }
  }
  `,
}
