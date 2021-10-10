import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/navbar/PartnerNavbar";
import AddFacilityModal from "../partner/AddFacilityModal";
import DeleteFacilityModal from "../partner/DeleteFacilityModal";
import EditFacilityModal from "../partner/EditFacilityModal";
import ViewBookingModal from "../partner/ViewBookingModal";
import { useState, useEffect } from "react";
import * as queries from "../../graphql/queries";
import { API } from "@aws-amplify/api";
import * as subscriptions from "../../graphql/subscriptions";
import Pagination from "../../components/layout/Pagination";

export default function ManageFacility() {
  const [isAddFacilityModalOpen, setAddFacilityModalOpen] = useState(false);
  const [isEditFacilityModalOpen, setEditFacilityModalOpen] = useState(false);
  const [isDeleteFacilityModalOpen, setDeleteFacilityModalOpen] =
    useState(false);
  const [isViewBookingModalOpen, setViewBookingModalOpen] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("");
  const [facilityList, setFacilityList] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState([]);
  let addSubscription, delSubscription, editSubscription;
  // Show number of records per page
  const [recordsPerPage] = useState(10);
  const [currentFacilityPage, setCurrentFacilityPage] = useState(1);
  const [currentBookingPage, setCurrentBookingPage] = useState(1);

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
      const getBooking = await API.graphql({
        query: queries.listBookings,
        variables: {
          filter: {
            facilityowner_id: {
              eq: sessionStorage.getItem("username"),
            },
          },
        },
      });
      setBookingList(getBooking.data.listBookings.items);
      console.log("List of bookings owned by facility owner: ", getBooking);
    }
    getFacilityList();
    getBookingList();
    addFacilitySubscription();
    delFacilitySubscription();
    editFacilitySubscription();

    return () => {
      addSubscription.unsubscribe();
      delSubscription.unsubscribe();
      editSubscription.unsubscribe();
    };
  }, []);

  // Subscribe to facility creation created by user
  function addFacilitySubscription() {
    addSubscription = API.graphql({
      query: subscriptions.onCreateFacilityByUserId,
      variables: { userID: sessionStorage.getItem("username") },
    }).subscribe({
      //Add newly added facility to existing facility list array for display
      next: (response) =>
        setFacilityList((oldArray) => [
          ...oldArray,
          response.value.data.onCreateFacilityByUserId,
        ]),
      error: (error) => console.warn(error),
    });
  }

  // Subscribe to facility deletion by user
  function delFacilitySubscription() {
    delSubscription = API.graphql({
      query: subscriptions.onDeleteFacilityByUserId,
      variables: { userID: sessionStorage.getItem("username") },
    }).subscribe({
      //Remove deleted facility from existing facility list
      next: (response) => {
        setFacilityList((array) =>
          array.filter(
            (item) =>
              item.id !== response.value.data.onDeleteFacilityByUserId.id
          )
        );
      },
      error: (error) => console.warn(error),
    });
  }

  // Subscribe to facility edited by user
  function editFacilitySubscription() {
    editSubscription = API.graphql({
      query: subscriptions.onUpdateFacilityByUserId,
      variables: { userID: sessionStorage.getItem("username") },
    }).subscribe({
      //update modified facility from existing facility list
      next: (response) =>
        setFacilityList((oldArray) => {
          const index = oldArray.findIndex(
            (item) =>
              item.id === response.value.data.onUpdateFacilityByUserId.id
          );
          oldArray[index] = response.value.data.onUpdateFacilityByUserId;
          return [...oldArray];
        }),
      error: (error) => console.warn(error),
    });
  }

  // Facility Table Pagination
  const indexOfLastFacility = currentFacilityPage * recordsPerPage;
  const indexOfFirstFacility = indexOfLastFacility - recordsPerPage;
  const currentFacilityList = facilityList.slice(
    indexOfFirstFacility,
    indexOfLastFacility
  );
  const paginateFacility = (pageNumber) => setCurrentFacilityPage(pageNumber);

  // Booking Table Pagination
  const indexOfLastBooking = currentBookingPage * recordsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - recordsPerPage;
  const currentBookingList = bookingList.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const paginateBooking = (pageNumber) => setCurrentBookingPage(pageNumber);

  return (
    <div>
      <Navbar />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Facility</h1>
        </div>
      </header>
      <div className="bg-gray-50 mt-1">
        <AddFacilityModal
          isOpen={isAddFacilityModalOpen}
          setModalOpen={setAddFacilityModalOpen}
        />
        <DeleteFacilityModal
          isOpen={isDeleteFacilityModalOpen}
          setModalOpen={setDeleteFacilityModalOpen}
          deleteID={deleteID}
        />

        {selectedFacility.id && (
          <EditFacilityModal
            isOpen={isEditFacilityModalOpen}
            setModalOpen={setEditFacilityModalOpen}
            facility={selectedFacility}
          />
        )}
        {selectedBooking.id && (
          <ViewBookingModal
            isOpen={isViewBookingModalOpen}
            setModalOpen={setViewBookingModalOpen}
            booking={selectedBooking}
          />
        )}

        {/* Body Content */}
        <div className="container mx-auto px-6 sm:px-12 py-6">
          {/* Facility Table */}
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mb-5">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="flow-root mb-2">
                  <div className="font-bold text-lg text-black float-left mt-2">
                    List of Facilities
                  </div>
                  <div className="float-right block">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex"
                      onClick={() => setAddFacilityModalOpen(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <span className="ml-1">Add Facility</span>
                    </button>
                  </div>
                </div>

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
                          Operating Hours
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Rate
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentFacilityList.map((facility) => (
                        <tr key={facility.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {/* <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={facility.image}
                                  alt=""
                                />
                              </div> */}
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {facility.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {facility.area}
                            </div>
                            <div className="text-sm text-gray-500">
                              {facility.address}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-900">
                              {facility.operating_days.join(", ")}
                            </div>
                            <div className="text-sm text-gray-500">
                              {facility.opening_hrs} - {facility.closing_hrs}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${facility.rate}/Hr
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              onClick={() => {
                                setEditFacilityModalOpen(true);
                                setSelectedFacility(facility);
                              }}
                              className="text-indigo-600 hover:text-indigo-900 mr-7 cursor-pointer"
                            >
                              Edit
                            </a>

                            <a
                              onClick={() => {
                                setDeleteFacilityModalOpen(true);
                                setDeleteID(facility.id);
                              }}
                              className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                            >
                              Delete
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
            recordsPerPage={recordsPerPage}
            totalRecords={facilityList.length}
            paginate={paginateFacility}
            currentPage={currentFacilityPage}
          />

          {/* Booking Table */}
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mb-5">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="font-bold mb-2 text-lg text-black">
                  List of Bookings
                </div>
                <div className="shadow overflow-hidden border-b border border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Booking ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Period/Duration
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Rate/Earnings
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Customer
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentBookingList.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.id.substring(0, 13)}
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-900">
                              ${booking.rate}/Hr
                            </div>
                            <div className="text-sm text-gray-500">
                              ${booking.payment.paid_amt}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.customer.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              onClick={() => {
                                setViewBookingModalOpen(true);
                                setSelectedBooking(booking);
                              }}
                              className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
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
            recordsPerPage={recordsPerPage}
            totalRecords={bookingList.length}
            paginate={paginateBooking}
            currentPage={currentBookingPage}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
