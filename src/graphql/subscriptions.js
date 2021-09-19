/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFacilityByUserId = /* GraphQL */ `
  subscription OnCreateFacilityByUserId($userID: String!) {
    onCreateFacilityByUserId(userID: $userID) {
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
export const onCreateFacility = /* GraphQL */ `
  subscription OnCreateFacility {
    onCreateFacility {
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
export const onUpdateFacility = /* GraphQL */ `
  subscription OnUpdateFacility {
    onUpdateFacility {
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
export const onDeleteFacility = /* GraphQL */ `
  subscription OnDeleteFacility {
    onDeleteFacility {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
