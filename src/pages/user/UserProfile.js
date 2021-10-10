import React from "react";
import Footer from "../../components/layout/Footer";
import UserNavbar from "../../components/layout/navbar/UserNavbar";
import { Container, Row, Col } from "react-bootstrap";
import { API } from "@aws-amplify/api";
import * as queries from "../../graphql/queries";
import EditProfileModal from "../../components/user/EditProfileModal";
import { useState, useEffect } from "react";
import * as subscriptions from "../../graphql/subscriptions";

export default function UserProfile() {
  const profilePic = "/team-male.jpg";
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    let editSubscription;

    // Subscribe to user profile update by user
    function editUserSubscription() {
      editSubscription = API.graphql({
        query: subscriptions.onUpdateUserByUserId,
        variables: { username: sessionStorage.getItem("username") },
      }).subscribe({
        //update modified user profile details from existing user details
        next: (response) => {
          setUserDetails(response.value.data.onUpdateUserByUserId);
        },
        error: (error) => console.warn(error),
      });
    }

    async function getUser() {
      const getUser = await API.graphql({
        query: queries.listUsers,
        variables: {
          filter: {
            id: {
              eq: sessionStorage.getItem("username"),
            },
          },
        },
      });
      setUserDetails(getUser.data.listUsers.items[0]);
    }
    getUser();
    editUserSubscription();

    return () => {
      editSubscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <UserNavbar />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Profile</h1>
        </div>
      </header>
      <div>
        <EditProfileModal
          isOpen={isEditModalOpen}
          setModalOpen={setEditModalOpen}
          user={userDetails}
        />
        <section className="text-blueGray-700 ">
          <div className="container flex flex-col items-center px-5 py-16 mx-auto md:flex-row lg:px-28">
            <div className="items-start mb-16 text-left lg:flex-grow md:w-1/4 lg:pr-24 md:pr-16 md:mb-0">
              <div>
                <img
                  className="h-30 w-30 rounded-full "
                  alt="profile pic"
                  src={profilePic}
                />
              </div>
              <div className="py-5 margin: text-center">
                <input type="file" />
                <button className="ui button teal">Save</button>
              </div>
            </div>

            <div className="items-start mb-16 text-left lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:mb-0">
              <Container>
                <Row>
                  <Col>
                    <div className="col-span-6 sm:col-span-3 mb-4">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        readOnly
                        name="first-name"
                        id="first-name"
                        value={userDetails.firstname}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3 mb-4">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        readOnly
                        name="last-name"
                        value={userDetails.lastname}
                        id="last-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 mb-4">
                      <label
                        htmlFor="contact"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Contact Number
                      </label>
                      <input
                        type="text"
                        readOnly
                        name="contact"
                        value={userDetails.contact}
                        id="contact"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 mb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        readOnly
                        name="email"
                        value={userDetails.email}
                        id="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 mb-4">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <input
                        readOnly
                        type="text"
                        name="address"
                        value={userDetails.address}
                        id="address"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex"
                        onClick={() => setEditModalOpen(true)}
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
                        <span className="ml-1">Edit Profile</span>
                      </button>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
