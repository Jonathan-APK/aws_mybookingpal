/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFacility = /* GraphQL */ `
  query GetFacility($id: ID!) {
    getFacility(id: $id) {
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
export const listFacilities = /* GraphQL */ `
  query ListFacilities(
    $filter: ModelFacilityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFacilities(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        }
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getBooking = /* GraphQL */ `
  query GetBooking($id: ID!) {
    getBooking(id: $id) {
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
export const listBookings = /* GraphQL */ `
  query ListBookings(
    $filter: ModelBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookings(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`;
export const getPayment = /* GraphQL */ `
  query GetPayment($id: ID!) {
    getPayment(id: $id) {
      id
      payment_date
      paid_amt
      status
      createdAt
      updatedAt
    }
  }
`;
export const listPayments = /* GraphQL */ `
  query ListPayments(
    $filter: ModelPaymentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPayments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        payment_date
        paid_amt
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSlot = /* GraphQL */ `
  query GetSlot($id: ID!) {
    getSlot(id: $id) {
      id
      start_time
      end_time
      duration
      createdAt
      updatedAt
    }
  }
`;
export const listSlots = /* GraphQL */ `
  query ListSlots(
    $filter: ModelSlotFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSlots(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        start_time
        end_time
        duration
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
