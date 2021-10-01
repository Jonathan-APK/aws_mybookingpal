import { useState } from "react";

export default function FacilityDetailsItem(props) {
  const [bookingTime, setBookingTime] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="flex flex-col md:flex-row -mx-4">
        <div className="md:flex-1 px-4">
          <div x-data="{ image: 1 }" x-cloak>
            <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
              <div
                x-show="image === 1"
                className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center"
              >
                <span className="text-5xl">1</span>
              </div>
              <div
                x-show="image === 2"
                className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center"
              >
                <span className="text-5xl">2</span>
              </div>
              <div
                x-show="image === 3"
                className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center"
              >
                <span className="text-5xl">3</span>
              </div>
              <div
                x-show="image === 4"
                className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center"
              >
                <span className="text-5xl">4</span>
              </div>
            </div>
            <div className="flex -mx-2 mb-4">
              <template x-for="i in 4" />
            </div>
          </div>
        </div>
        <div className="md:flex-1 px-4">
          <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
            {props.venue}
          </h2>
          <p className="text-gray-500 text-sm">{props.address}</p>
          <div className="flex items-center space-x-4 my-4">
            <div>
              <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                <span className="text-indigo-400 mr-1 mt-1">$</span>
                <span className="font-bold text-blue-600 text-3xl">
                  {props.price}/hr
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-500">{props.description}</p>
          <div className="flex py-4 space-x-4">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="operating-from"
                className="block text-sm font-medium text-gray-700"
              >
                Select Booking Time
              </label>
              <input
                type="time"
                required
                onChange={(e) => setBookingTime(e.target.value)}
                name="booking-time"
                id="booking-time"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <button
              type="button"
              className="h-14 px-6 py-2 font-semibold rounded-xl bg-blue-600 hover:bg-blue-800 text-white"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
