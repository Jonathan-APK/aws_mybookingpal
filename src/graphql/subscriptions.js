/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFacilityByUserId = /* GraphQL */ `
  subscription OnCreateFacilityByUserId($userID: ID!) {
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
      img_src
      createdAt
      updatedAt
      user {
        id
        email
        username
        firstname
        lastname
        contact
        address
        role
        createdAt
        updatedAt
        Facilities {
          nextToken
        }
        booking {
          nextToken
        }
      }
    }
  }
`;
export const onDeleteFacilityByUserId = /* GraphQL */ `
  subscription OnDeleteFacilityByUserId($userID: ID!) {
    onDeleteFacilityByUserId(userID: $userID) {
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
      img_src
      createdAt
      updatedAt
      user {
        id
        email
        username
        firstname
        lastname
        contact
        address
        role
        createdAt
        updatedAt
        Facilities {
          nextToken
        }
        booking {
          nextToken
        }
      }
    }
  }
`;
export const onUpdateFacilityByUserId = /* GraphQL */ `
  subscription OnUpdateFacilityByUserId($userID: ID!) {
    onUpdateFacilityByUserId(userID: $userID) {
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
      img_src
      createdAt
      updatedAt
      user {
        id
        email
        username
        firstname
        lastname
        contact
        address
        role
        createdAt
        updatedAt
        Facilities {
          nextToken
        }
        booking {
          nextToken
        }
      }
    }
  }
`;
export const onUpdateUserByUserId = /* GraphQL */ `
  subscription OnUpdateUserByUserId($username: ID!) {
    onUpdateUserByUserId(username: $username) {
      id
      email
      username
      firstname
      lastname
      contact
      address
      role
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
          img_src
          createdAt
          updatedAt
        }
        nextToken
      }
      booking {
        items {
          id
          booking_date
          facility_id
          facility_name
          rate
          address
          area
          status
          cust_id
          facilityowner_id
          slot_id
          payment_id
          createdAt
          updatedAt
        }
        nextToken
      }
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
      img_src
      createdAt
      updatedAt
      user {
        id
        email
        username
        firstname
        lastname
        contact
        address
        role
        createdAt
        updatedAt
        Facilities {
          nextToken
        }
        booking {
          nextToken
        }
      }
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
      img_src
      createdAt
      updatedAt
      user {
        id
        email
        username
        firstname
        lastname
        contact
        address
        role
        createdAt
        updatedAt
        Facilities {
          nextToken
        }
        booking {
          nextToken
        }
      }
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
      img_src
      createdAt
      updatedAt
      user {
        id
        email
        username
        firstname
        lastname
        contact
        address
        role
        createdAt
        updatedAt
        Facilities {
          nextToken
        }
        booking {
          nextToken
        }
      }
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
          img_src
          createdAt
          updatedAt
        }
        nextToken
      }
      booking {
        items {
          id
          booking_date
          facility_id
          facility_name
          rate
          address
          area
          status
          cust_id
          facilityowner_id
          slot_id
          payment_id
          createdAt
          updatedAt
        }
        nextToken
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
          img_src
          createdAt
          updatedAt
        }
        nextToken
      }
      booking {
        items {
          id
          booking_date
          facility_id
          facility_name
          rate
          address
          area
          status
          cust_id
          facilityowner_id
          slot_id
          payment_id
          createdAt
          updatedAt
        }
        nextToken
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
          img_src
          createdAt
          updatedAt
        }
        nextToken
      }
      booking {
        items {
          id
          booking_date
          facility_id
          facility_name
          rate
          address
          area
          status
          cust_id
          facilityowner_id
          slot_id
          payment_id
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onCreateBooking = /* GraphQL */ `
  subscription OnCreateBooking {
    onCreateBooking {
      id
      booking_date
      facility_id
      facility_name
      rate
      address
      area
      status
      cust_id
      facilityowner_id
      slot_id
      payment_id
      createdAt
      updatedAt
      owner {
        id
        email
        username
        firstname
        lastname
        contact
        address
        role
        createdAt
        updatedAt
        Facilities {
          nextToken
        }
        booking {
          nextToken
        }
      }
      customer {
        id
        email
        username
        firstname
        lastname
        contact
        address
        role
        createdAt
        updatedAt
        Facilities {
          nextToken
        }
        booking {
          nextToken
        }
      }
      payment {
        id
        payment_date
        paid_amt
        status
        createdAt
        updatedAt
      }
      slot {
        id
        start_time
        end_time
        duration
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateBooking = /* GraphQL */ `
  subscription OnUpdateBooking {
    onUpdateBooking {
      id
      booking_date
      facility_id
      facility_name
      rate
      address
      area
      status
      cust_id
      facilityowner_id
      slot_id
      payment_id
      createdAt
      updatedAt
      owner {
        id
        email
        username
        firstname
        lastname
        contact
        address
        role
        createdAt
        updatedAt
        Facilities {
          nextToken
        }
        booking {
          nextToken
        }
      }
      customer {
        id
        email
        username
        firstname
        lastname
        contact
        address
        role
        createdAt
        updatedAt
        Facilities {
          nextToken
        }
        booking {
          nextToken
        }
      }
      payment {
        id
        payment_date
        paid_amt
        status
        createdAt
        updatedAt
      }
      slot {
        id
        start_time
        end_time
        duration
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteBooking = /* GraphQL */ `
  subscription OnDeleteBooking {
    onDeleteBooking {
      id
      booking_date
      facility_id
      facility_name
      rate
      address
      area
      status
      cust_id
      facilityowner_id
      slot_id
      payment_id
      createdAt
      updatedAt
      owner {
        id
        email
        username
        firstname
        lastname
        contact
        address
        role
        createdAt
        updatedAt
        Facilities {
          nextToken
        }
        booking {
          nextToken
        }
      }
      customer {
        id
        email
        username
        firstname
        lastname
        contact
        address
        role
        createdAt
        updatedAt
        Facilities {
          nextToken
        }
        booking {
          nextToken
        }
      }
      payment {
        id
        payment_date
        paid_amt
        status
        createdAt
        updatedAt
      }
      slot {
        id
        start_time
        end_time
        duration
        createdAt
        updatedAt
      }
    }
  }
`;
export const onCreatePayment = /* GraphQL */ `
  subscription OnCreatePayment {
    onCreatePayment {
      id
      payment_date
      paid_amt
      status
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePayment = /* GraphQL */ `
  subscription OnUpdatePayment {
    onUpdatePayment {
      id
      payment_date
      paid_amt
      status
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePayment = /* GraphQL */ `
  subscription OnDeletePayment {
    onDeletePayment {
      id
      payment_date
      paid_amt
      status
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSlot = /* GraphQL */ `
  subscription OnCreateSlot {
    onCreateSlot {
      id
      start_time
      end_time
      duration
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSlot = /* GraphQL */ `
  subscription OnUpdateSlot {
    onUpdateSlot {
      id
      start_time
      end_time
      duration
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSlot = /* GraphQL */ `
  subscription OnDeleteSlot {
    onDeleteSlot {
      id
      start_time
      end_time
      duration
      createdAt
      updatedAt
    }
  }
`;
