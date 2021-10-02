import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/navbar/PartnerNavbar";
import BookingLineChart from "../../components/graph/LineChart";
import { useState, useEffect } from "react";
import * as queries from "../../graphql/queries";
import { API } from "@aws-amplify/api";
import moment from 'moment';

export default function PartnerDashboard() {
  const [facilityList, setFacilityList] = useState([]);
  const [bookingList, setBookingList] = useState([]);

  //Retrieve user's facility and booking list when page onload
  useEffect(() => {
    async function getFacilityList() {
      const getFacility = await API.graphql({
        query: queries.listFacilities,
        variables: {
          filter: {
            userID: {
              eq: sessionStorage.getItem("username"),
            },
          },
        },
      });
      setFacilityList(getFacility.data.listFacilities.items);
      console.log("List of facilities: ", getFacility);
    }
    async function getBookingList() {
      //get start and end date of the week in AWSDateTime format
      const startOfWeek = moment().startOf('isoweek').toDate().toISOString();;
      const endOfWeek = moment().endOf('isoweek').toDate().toISOString();;

      //get list of booking based on owner ID and booking date must be made this week
      const getBooking = await API.graphql({
        query: queries.listBookings,
        variables: {
          filter: {
            facilityowner_id: {
              eq: sessionStorage.getItem("username"),
            },
            booking_date: {
              //between: ["2021-09-27T00:00:00.000Z", "2021-10-01T00:00:00.000Z"],
              between: [startOfWeek, endOfWeek],
            },
          },
        },
      });
      setBookingList(getBooking.data.listBookings.items);
      console.log("List of bookings owned by facility owner: ", getBooking);
    }
    getFacilityList();
    getBookingList();
  }, []);

  return (
    <div>
      <Navbar />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <div className="bg-gray-50 mt-1">
        {/* Mini Cards */}
        <div className="container mx-auto px-6 sm:px-12 py-6">
          <div className="flex flex-wrap -mx-6">
            <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
              <div className="flex items-center px-5 py-6 shadow-md border rounded-md bg-white">
                <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {facilityList.length}
                  </h4>
                  <div className="text-gray-500">No. of Facilities</div>
                </div>
              </div>
            </div>

            <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
              <div className="flex items-center px-5 py-6 shadow-md border rounded-md bg-white">
                <div className="p-3 rounded-full bg-green-600 bg-opacity-75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {bookingList.length}
                  </h4>
                  <div className="text-gray-500">Weekly Bookings</div>
                </div>
              </div>
            </div>

            <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
              <div className="flex items-center px-5 py-6 shadow-md border rounded-md bg-white">
                <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {(bookingList.length ===0) ? 0 : (bookingList.map(data => data.payment.paid_amt).reduce((a, b) => a + b))} 
                  </h4>
                  <div className="text-gray-500">Weekly Earnings</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8"></div>

          {/* Booking Statistics */}

          <div className="flex flex-col">
            <div className="font-bold mb-2 text-lg text-black">
              Booking Statistics
            </div>
            <div className="items-center px-5 py-6 shadow-md border rounded-md bg-white">
              <BookingLineChart />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
