import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/navbar/PartnerNavbar";
import AddFacilityModal from "../partner/AddFacilityModal";
import { useState, useEffect } from "react";
import * as queries from "../../graphql/queries";
import { API } from "@aws-amplify/api";
import * as subscriptions from "../../graphql/subscriptions";

// const facility = [
//   {
//     name: "ABC Warehouse",
//     location: "Jurong West",
//     address: "12 Jurong West, S545055",
//     rate: "$50/hr",
//     operating_hrs: "Mon-Fri: 7am - 6pm",
//     image:
//       "https://images.unsplash.com/photo-1428366890462-dd4baecf492b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
//   },
//   {
//     name: "PK Gym",
//     location: "Jurong West",
//     address: "12 Jurong West, S545055",
//     rate: "$50/hr",
//     operating_hrs: "Mon-Fri: 7am - 6pm",
//     image:
//       "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=968&q=80",
//   },
//   {
//     name: "DBC Warehouses",
//     location: "Jurong West",
//     address: "12 Jurong West, S545055",
//     rate: "$50/hr",
//     operating_hrs: "Mon-Fri: 7am - 6pm",
//     image:
//       "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=968&q=80",
//   },
//   // More people...
// ];

const booking = [
  {
    ref_id: "S1234",
    period: "14 May 2021 - 14 May 2021",
    duration: "1200 - 1300",
    rate: "$54/hrs",
    total_amt: "$54",
    customer: "sam@gmail.com",
  },
];

export default function ManageFacility() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [facilityList, setFacilityList] = useState([]);
  let subscription;

  //Retrieve user's facility list when page onload
  useEffect(() => {
    async function getFacilityList() {
      const getFacility = await API.graphql({
        query: queries.listFacilities,
        variables: {
          filter: { userID: { eq: sessionStorage.getItem("username") } },
        },
      });
      setFacilityList(getFacility.data.listFacilities.items);
      console.log("List of facilities: " + JSON.stringify(getFacility));
    }
    getFacilityList();
    facilitySubscription();

    return () => subscription.unsubscribe();
  }, []);

  // Subscribe to facility creation created by user
  function facilitySubscription() {
    subscription = API.graphql({
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

  return (
    <div>
      <Navbar />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Facility</h1>
        </div>
      </header>
      <div className="bg-gray-50 mt-1">
        <AddFacilityModal isOpen={isModalOpen} setModalOpen={setModalOpen} />
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
                      onClick={() => setModalOpen(true)}
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
                      {facilityList.map((facility) => (
                        <tr key={facility.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={facility.image}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
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
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
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
                          Ref ID
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
                      {booking.map((booking) => (
                        <tr key={booking.ref_id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.ref_id}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {booking.period}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.duration}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="text-sm text-gray-900">
                              {booking.rate}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.total_amt}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              href="#"
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
