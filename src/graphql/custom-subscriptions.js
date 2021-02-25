export const onCreateTestType = `
  subscription OnCreateTestType($owner: String) {
    onCreateTestType(owner: $owner) {
      id
      val
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteTestType = `
  subscription OnDeleteTestType($owner: String) {
    onDeleteTestType(owner: $owner) {
      id
      val
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateTestType = `
  subscription OnUpdateTestType($owner: String) {
    onUpdateTestType(owner: $owner) {
      id
      val
      createdAt
      updatedAt
      owner
    }
  }
`;

// --------- Custom ---------

