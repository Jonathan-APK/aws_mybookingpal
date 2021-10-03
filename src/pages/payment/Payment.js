import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { processBooking } from "../../graphql/mutations";
import { API, graphqlOperation } from "@aws-amplify/api";
import { v4 as uuidv4 } from "uuid";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export default function Payment() {
  const [bookingDetails, setBookingDetails] = useState({
    totalAmt: 21,
    token: null,
    facility_id: '4e9ddd82-9553-4fbc-b6b4-f121df5ef2ca',
    facility_name: 'Capcom',
    rate: '111',
    address: '12 Rivervale Link, ParkGreen, #07-21',
    area: 'jurong',
    cust_id: 'braveducky',
    facilityowner_id: 'darksky21',
    start_time: '11:00:00.000',
    end_time: '12:00:00.000',
    duration: 1,
  });
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  
  //Handle payment to stripe after getting token from stripe
  const checkout = async (bookingDetails) => {
    const payload = {
      id: uuidv4(),
      ...bookingDetails
    };
    try {
      await API.graphql(graphqlOperation(processBooking, { input: payload }));
      console.log("Order is successful");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (bookingDetails.token) {
      checkout(bookingDetails);
      //clearCart();
      //history.push("/");
    }
  }, [bookingDetails]);
  
  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  // Handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log("error getting stripe token:",result.error);
      // Inform the user if there was an error.
      setError(result.error.message);
    } else {
      console.log("Get Stripe Token Success:",result);
      setError(null);
      // Send the token to your server.
      const token = result.token;
      setBookingDetails({ ...bookingDetails, token: token.id });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="checkout-form">
          <div className="stripe-section">
            <label htmlFor="stripe-element"> Credit or debit card </label>
            <CardElement
              id="stripe-element"
              options={CARD_ELEMENT_OPTIONS}
              onChange={handleChange}
            />
          </div>
          <div className="card-errors" role="alert">
            {error}
          </div>
        </div>
        <button type="submit" className="btn">
          Submit Payment
        </button>
      </form>
    </div>
  );
}
