const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const PAYMENT_TABLE = "Payment-26uhxl77fnd6dlvvcqsepkk7vq-dev";
const PAYMENT_TYPE = "Payment";
const BOOKING_TABLE = "Booking-26uhxl77fnd6dlvvcqsepkk7vq-dev";
const BOOKING_TYPE = "Booking";
const SLOT_TABLE = "Slot-26uhxl77fnd6dlvvcqsepkk7vq-dev";
const SLOT_TYPE = "Slot";

const createPayment = async (payload) => {
  const { payment_id, totalAmt } = payload;
  var params = {
    TableName: PAYMENT_TABLE,
    Item: {
      id: payment_id,
      __typename: PAYMENT_TYPE,
      payment_date: new Date().toISOString(),
      paid_amt: totalAmt,
      status: "Paid",
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  };
  console.log(params);
  await documentClient.put(params).promise();
};

const createSlot = async (payload) => {
  const { slot_id, start_time, end_time, duration } = payload;
  var params = {
    TableName: SLOT_TABLE,
    Item: {
      id: slot_id,
      __typename: SLOT_TYPE,
      start_time: start_time,
      end_time: end_time,
      duration: duration,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  };
  console.log(params);
  await documentClient.put(params).promise();
};

const createBooking = async (payload) => {
  const { payment_id, slot_id, facility_id, facility_name, rate, address, area, cust_id, facilityowner_id } = payload;
  var params = {
    TableName: BOOKING_TABLE,
    Item: {
      id: uuidv4(),
      __typename: BOOKING_TYPE,
      payment_id: payment_id,
      slot_id: slot_id,
      booking_date: new Date().toISOString().substring(0,10),
      facility_id: facility_id,
      facility_name: facility_name,
      rate: rate,
      address: address,
      area: area,
      status: 'Confirmed',
      cust_id: cust_id,
      facilityowner_id: facilityowner_id,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  };
  console.log(params);
  await documentClient.put(params).promise();
};

/*
 * Get booking details from processPayment lambda
 * Create Payment, Slot and finally Booking.
 * Add payment_id and slot_id into booking table.
 */
exports.handler = async (event) => {
  try {
    let payload = event.prev.result;
    payload.payment_id = uuidv4();
    payload.slot_id = uuidv4();
    
    // create a new payment record
    await createPayment(payload);

    // create a new slot record
    await createSlot(payload);

    // create a new booking record
    await createBooking(payload);

    return "SUCCESS";
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
};
