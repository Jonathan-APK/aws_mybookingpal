/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const processBooking = /* GraphQL */ `
  mutation ProcessBooking($input: ProcessBookingInput!) {
    processBooking(input: $input)
  }
`;
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
export const createBooking = /* GraphQL */ `
  mutation CreateBooking(
    $input: CreateBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    createBooking(input: $input, condition: $condition) {
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
export const updateBooking = /* GraphQL */ `
  mutation UpdateBooking(
    $input: UpdateBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    updateBooking(input: $input, condition: $condition) {
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
export const deleteBooking = /* GraphQL */ `
  mutation DeleteBooking(
    $input: DeleteBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    deleteBooking(input: $input, condition: $condition) {
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
export const createPayment = /* GraphQL */ `
  mutation CreatePayment(
    $input: CreatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    createPayment(input: $input, condition: $condition) {
      id
      payment_date
      paid_amt
      status
      createdAt
      updatedAt
    }
  }
`;
export const updatePayment = /* GraphQL */ `
  mutation UpdatePayment(
    $input: UpdatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    updatePayment(input: $input, condition: $condition) {
      id
      payment_date
      paid_amt
      status
      createdAt
      updatedAt
    }
  }
`;
export const deletePayment = /* GraphQL */ `
  mutation DeletePayment(
    $input: DeletePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    deletePayment(input: $input, condition: $condition) {
      id
      payment_date
      paid_amt
      status
      createdAt
      updatedAt
    }
  }
`;
export const createSlot = /* GraphQL */ `
  mutation CreateSlot(
    $input: CreateSlotInput!
    $condition: ModelSlotConditionInput
  ) {
    createSlot(input: $input, condition: $condition) {
      id
      start_time
      end_time
      duration
      createdAt
      updatedAt
    }
  }
`;
export const updateSlot = /* GraphQL */ `
  mutation UpdateSlot(
    $input: UpdateSlotInput!
    $condition: ModelSlotConditionInput
  ) {
    updateSlot(input: $input, condition: $condition) {
      id
      start_time
      end_time
      duration
      createdAt
      updatedAt
    }
  }
`;
export const deleteSlot = /* GraphQL */ `
  mutation DeleteSlot(
    $input: DeleteSlotInput!
    $condition: ModelSlotConditionInput
  ) {
    deleteSlot(input: $input, condition: $condition) {
      id
      start_time
      end_time
      duration
      createdAt
      updatedAt
    }
  }
`;
