import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";

export default function StripeContainer() {
  const stripePromise = loadStripe(
    "pk_test_51JgOhiKzJLLd3UwR3IusH8EwfrHwxtRFbFa7aN5J8EG9YTHWLMyNSa9RZKqzYoQEyJ5Sv5D12RRd2SSFtad4PjKO00f5TWQE1M"
  );

  return (
    <div>
      <Elements stripe={stripePromise}>
        <Payment />
      </Elements>
    </div>
  );
}
