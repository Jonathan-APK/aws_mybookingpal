import Footer from "../../components/layout/Footer";
import UserNavbar from "../../components/layout/navbar/UserNavbar";
import Pagination from "../../components/layout/Pagination";
import { useState, useEffect } from "react";
import * as queries from "../../graphql/queries";
import { API } from "@aws-amplify/api";
import UserViewBookingModal from "../user/UserViewBookingModal";

// const bookings = [
//   {
//     image:
//       "https://safra-resources.azureedge.net/media-library/images/default-source/default-album/e1-logoce03035769364db7ac44e7aca458b33f.png?sfvrsn=40354edf_0",
//     facility_name: "EnergyOne (Punggol)",
//     area:"Punggol",
//     address: "9 Sentul Cres, Level 4, Singapore 828654",
//     dateTime: "20 September 2021 7:30PM",
//     status: "Booked",
//   },
//   {
//     image:
//       "https://safra-resources.azureedge.net/media-library/images/default-source/default-album/e1-logoce03035769364db7ac44e7aca458b33f.png?sfvrsn=40354edf_0",
//     facility_name: "Anytime Fitness (Buangkok)",
//     area:"Buangkok",
//     address: "Hougang Green Shopping Mall, 21 Hougang Street 51 #02-13A Singapore, Central Singapore",
//     dateTime: "22 September 2021 7:30PM",
//     status: "Booked",
//   },
//   // More booking...
// ];

export default function ManageBooking() {
  const [bookingList, setBookingList] = useState([]);
  const [isViewBookingModalOpen, setViewBookingModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState([]);
  // Show number of records per page
  const [bookingsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function getBookingList() {
      const getBooking = await API.graphql({
        query: queries.listBookings,
        variables: {
          filter: {
            cust_id: {
              eq: sessionStorage.getItem("username"),
            },
          },
        },
      });
      setBookingList(getBooking.data.listBookings.items);
    }
    getBookingList();
    setCurrentPage(1);
  }, []);

  // Pagination
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookingList = bookingList.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <UserNavbar />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Booking</h1>
        </div>
      </header>
      <div className="bg-gray-50 py-6">
      {selectedBooking.id && (
          <UserViewBookingModal
            isOpen={isViewBookingModalOpen}
            setModalOpen={setViewBookingModalOpen}
            booking={selectedBooking}
          />)}
        {/* Mini Cards */}
        <div className="container mx-auto px-6 sm:px-12 py-6">
          {/* table */}
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Location
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date/Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">View</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentBookingList.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {booking.facility_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {booking.area}
                            </div>
                            <div className="text-sm text-gray-500 truncate">
                              {booking.address}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {booking.booking_date.substring(0, 10)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.slot.start_time.substring(0, 5)} -{" "}
                              {booking.slot.end_time.substring(0, 5)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              onClick={() => {
                                setViewBookingModalOpen(true);
                                setSelectedBooking(booking);
                              }}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Pagination
            recordsPerPage={bookingsPerPage}
            totalRecords={bookingList.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
