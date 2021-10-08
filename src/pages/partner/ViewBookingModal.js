import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import "rc-time-picker/assets/index.css";
import React from "react";

function ViewBookingModal(props) {
  const [id, setBookingID] = useState("");
  const [name, setFacilityName] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [rate, setRate] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    console.log("props" + props.booking);
    setBookingID(props.booking.id);
    setFacilityName(props.booking.facility_name);
    setAddress(props.booking.address);
    setArea(props.booking.area);
    setBookingDate(props.booking.booking_date);
    setStartTime(props.booking.slot.start_time);
    setEndTime(props.booking.slot.end_time);
    setRate(props.booking.rate);
    setCustEmail(props.booking.customer.email);
    setStatus(props.booking.status);
  }, [props]);

  return (
    <div>
      <Transition.Root show={props.isOpen} as={Fragment}>
        <Dialog
          as="div"
          auto-reopen="true"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={() => props.setModalOpen(true)}
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
                <div className="flex flex-row justify-between p-4 bg-gray-100 border-b  rounded-tl-lg rounded-tr-lg">
                  <p className="font-semibold text-gray-800">View Booking</p>
                  <svg
                    onClick={() => props.setModalOpen(false)}
                    className="w-6 h-6 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>

                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="booking-id"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Booking ID
                          </label>
                          <input
                            type="text"
                            required
                            disabled={true}
                            value={id.substring(0, 13)}
                            name="booking-id"
                            id="booking-id"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="facility-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Facility Name
                          </label>
                          <input
                            type="text"
                            required
                            disabled={true}
                            value={name}
                            name="facility-name"
                            id="facility-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100"
                          />
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            required
                            disabled={true}
                            value={address}
                            name="street-address"
                            id="street-address"
                            autoComplete="street-address"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="area-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Area
                          </label>
                          <input
                            type="text"
                            required
                            disabled={true}
                            value={area}
                            name="area-name"
                            id="area-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="booking-date"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Booking Date
                          </label>
                          <input
                            type="date"
                            required
                            disabled={true}
                            value={bookingDate.substring(0, 10)}
                            name="booking-date"
                            id="booking-date"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="start-time"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Start Time
                          </label>
                          <input
                            type="text"
                            required
                            disabled={true}
                            value={startTime.substring(0, 5)}
                            name="start-time"
                            id="start-time"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="end-time"
                            className="block text-sm font-medium text-gray-700"
                          >
                            End Time
                          </label>
                          <input
                            type="text"
                            required
                            disabled={true}
                            value={endTime.substring(0, 5)}
                            name="end-time"
                            id="end-time"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="rate-hr"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Rate/Hr
                          </label>
                          <input
                            type="number"
                            required
                            disabled={true}
                            value={rate}
                            name="rate-hr"
                            id="rate-hr"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="customer-email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Customer Email
                          </label>
                          <input
                            type="text"
                            required
                            disabled={true}
                            value={custEmail}
                            name="customer-email"
                            id="customer-email"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="status"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Status
                          </label>
                          <input
                            type="text"
                            required
                            disabled={true}
                            value={status}
                            name="status"
                            id="status"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        onClick={() => {
                          props.setModalOpen(false);
                        }}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default ViewBookingModal;
