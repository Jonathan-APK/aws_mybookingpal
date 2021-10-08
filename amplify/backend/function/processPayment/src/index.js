const { CognitoIdentityServiceProvider } = require("aws-sdk");
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
const USER_POOL_ID = "ap-southeast-1_L5KDM1xQC";
const stripe = require("stripe")("sk_test_51JgOhiKzJLLd3UwRLaHSVzlnsqxTiWr7cGWvJKLjkyNoX6qhqlZaKWEY2q0W0omXsV2nv3GaNaytPSL7YKyaK3Jt00bAiOtf8d");

const getUserEmail = async (event) => {
  const params = {
    UserPoolId: USER_POOL_ID,
    Username: event.identity.claims.username
  };
  const user = await cognitoIdentityServiceProvider.adminGetUser(params).promise();
  const { Value: email } = user.UserAttributes.find((attr) => {
    if (attr.Name === "email") {
      return attr.Value;
    }
  });
  return email;
};

/*
 * Get the total price of the booking
 * Charge the customer
 */
exports.handler = async (event) => {
  try {
    const { id, totalAmt, token, booking_date, facility_id, facility_name, rate, address, area, cust_id, facilityowner_id, start_time, end_time, duration } = event.arguments.input;
    const { username } = event.identity.claims;
    const email = await getUserEmail(event);

    await stripe.charges.create({
      amount: totalAmt * 100,
      currency: "sgd",
      source: token,
      description: `myBookingPal - Order by user:${username}, email:${email}`
    });
    
    return { id, totalAmt, token, booking_date, facility_id, facility_name, rate, address, area, cust_id, facilityowner_id, start_time, end_time, duration };
  } catch (err) {
    throw new Error(err);
  }
};