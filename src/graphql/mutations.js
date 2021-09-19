/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFacility = /* GraphQL */ `
  mutation CreateFacility(
    $input: CreateFacilityInput!
    $condition: ModelFacilityConditionInput
  ) {
    createFacility(input: $input, condition: $condition) {
      id
      name
      type
      address
      area
      size
      rate
      description
      opening_hrs
      closing_hrs
      operating_days
      userID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateFacility = /* GraphQL */ `
  mutation UpdateFacility(
    $input: UpdateFacilityInput!
    $condition: ModelFacilityConditionInput
  ) {
    updateFacility(input: $input, condition: $condition) {
      id
      name
      type
      address
      area
      size
      rate
      description
      opening_hrs
      closing_hrs
      operating_days
      userID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteFacility = /* GraphQL */ `
  mutation DeleteFacility(
    $input: DeleteFacilityInput!
    $condition: ModelFacilityConditionInput
  ) {
    deleteFacility(input: $input, condition: $condition) {
      id
      name
      type
      address
      area
      size
      rate
      description
      opening_hrs
      closing_hrs
      operating_days
      userID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      email
      username
      firstname
      lastname
      contact
      address
      role
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Facilities {
        items {
          id
          name
          type
          address
          area
          size
          rate
          description
          opening_hrs
          closing_hrs
          operating_days
          userID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      email
      username
      firstname
      lastname
      contact
      address
      role
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Facilities {
        items {
          id
          name
          type
          address
          area
          size
          rate
          description
          opening_hrs
          closing_hrs
          operating_days
          userID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      email
      username
      firstname
      lastname
      contact
      address
      role
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Facilities {
        items {
          id
          name
          type
          address
          area
          size
          rate
          description
          opening_hrs
          closing_hrs
          operating_days
          userID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
