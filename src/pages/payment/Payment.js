import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { processBooking } from "../../graphql/mutations";
import { API, graphqlOperation } from "@aws-amplify/api";
import { v4 as uuidv4 } from "uuid";
import UserNavbar from "../../components/layout/navbar/UserNavbar";
import Footer from "../../components/layout/Footer";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "15px",
      color: "#000000",
      fontFamily: "Roboto",
      fontWeight: "500",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#636c72",
      },
    },
    invalid: {
      color: "#ff7474",
    },
  },
  hidePostalCode: true,
};

const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}:00.000`;
};

export default function Payment(props) {
  console.log("Booking/Payment Details:", props.bookingProps.location);

  const [bookingDetails, setBookingDetails] = useState({
    totalAmt: props.bookingProps.location.totalAmt,
    token: null,
    booking_date: props.bookingProps.location.booking_date
      .toISOString()
      .substring(0, 10),
    facility_id: props.bookingProps.location.facility_id,
    facility_name: props.bookingProps.location.facility_name,
    rate: props.bookingProps.location.rate,
    address: props.bookingProps.location.address,
    area: props.bookingProps.location.area,
    cust_id: props.bookingProps.location.cust_id,
    facilityowner_id: props.bookingProps.location.facilityowner_id,
    start_time: convertTime12to24(props.bookingProps.location.start_time),
    end_time: convertTime12to24(props.bookingProps.location.end_time),
    duration: props.bookingProps.location.duration,
  });
  const [isProcessing, setProcessing] = useState(false);
  const [paymentModal, setPaymentModalOpen] = useState(false);
  const [cardValidationError, setCardValidationError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  //Handle payment to stripe after getting token from stripe
  const checkout = async (bookingDetails) => {
    const payload = {
      id: uuidv4(),
      ...bookingDetails,
    };
    try {
      await API.graphql(graphqlOperation(processBooking, { input: payload }));
      console.log("Order is successful");
      setPaymentModalOpen(true);
    } catch (err) {
      console.log("Error processing payment: ", err.errors[0].message);
      setCardValidationError(
        "Error processing payment. Please contact administrator."
      );
    }
    setProcessing(false);
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
      setCardValidationError(event.error.message);
    } else {
      setCardValidationError(null);
    }
  };

  // Handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log("Error getting stripe token:", result.error);
      // Inform the user if there was an error.
      setCardValidationError(result.error.message);
      setProcessing(false);
    } else {
      console.log("Get Stripe Token Success:", result);
      setCardValidationError(null);
      // Send the token to your server.
      const token = result.token;
      setBookingDetails({ ...bookingDetails, token: token.id });
    }
  };

  return (
    <div>
      <UserNavbar />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Booking Summary</h1>
        </div>
      </header>

      <div className="bg-gray-50 mt-1">
        <div className="pb-56">

          {/* Cancel Button */}
          <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 items-center space-x-2 text-gray-400 text-sm">
            <Link to="/userdashboard">
              <div className="hover:underline hover:text-gray-600">&lt; Cancel</div>
            </Link>
          </div>
          {/* Payment Section */}
          <div className="max-w-2xl mx-auto pt-5 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-5 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Pay with Card
              </h1>
            </div>

            {/* Booking Summary */}
            <div className="mt-4 lg:mt-0 lg:row-span-3">
              <span className="font-bold text-gray-800 text-2xl md:text-2xl">
                Total:{" "}
              </span>
              <span className="text-indigo-400 mr-1">$</span>
              <span className="font-bold text-blue-600 text-3xl">
                {props.bookingProps.location.totalAmt}
              </span>

              <div className="mt-5">
                <p className="text-gray-900 font-medium text-base">
                  Facility Name:{" "}
                </p>
                <p className="text-base text-gray-900">
                  {props.bookingProps.location.facility_name}
                </p>
              </div>
              <div className="mt-5">
                <p className="text-base text-gray-900 font-medium">
                  Booking Date:
                </p>
                <p className="text-base text-gray-900">
                  {props.bookingProps.location.booking_date
                    .toISOString()
                    .substring(0, 10)}
                </p>
              </div>
              <div className="mt-5">
                <p className="text-base text-gray-900 font-medium">Timeslot:</p>
                <p className="text-base text-gray-900">
                  {props.bookingProps.location.start_time} -{" "}
                  {props.bookingProps.location.end_time}
                </p>
              </div>
            </div>

            {/* Card Section */}
            <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <img
                alt=""
                src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                className="h-5 mb-4"
              />
              <form onSubmit={handleSubmit}>
                <div className="checkout-form">
                  <div className="stripe-section">
                    <CardElement
                      id="stripe-element"
                      options={CARD_ELEMENT_OPTIONS}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="card-errors text-red-500 mt-3" role="alert">
                    {cardValidationError}
                  </div>
                </div>

                <button
                  disabled={isProcessing}
                  type="submit"
                  className="disabled:opacity-50 mt-20 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isProcessing ? "Processing..." : "Submit Payment"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Modal for showing payment status */}
      <Transition.Root show={paymentModal} as={Fragment}>
        <Dialog
          as="div"
          auto-reopen="true"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={() => setPaymentModalOpen(true)}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <CheckCircleIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Payment Status
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Payment Successfully!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm"
                    type="button"
                    onClick={() => {
                      setPaymentModalOpen(false);
                      history.push("/managebooking");
                    }}
                  >
                    OK
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
