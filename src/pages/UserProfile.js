import React from "react";
import { connect } from "react-redux";
import Footer from "../components/layout/Footer";
import UserNavbar from "../components/layout/navbar/UserNavbar";
import DefaultUserPic from "../uploads/team-male.jpg";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { API } from "@aws-amplify/api";
import * as queries from "../graphql/queries";
import UploadPicModal from "../components/user/UploadPicModal";
import EditProfile from "../components/user/EditProfile";
import { useState, useEffect } from "react";
import axios from 'axios';

const profiles = [
  {
    image:
      "http://i0.wp.com/rakenrol.net/japan/wp-content/uploads/2013/12/MariaOzawa01.jpg?fit=300%2C300",
    firstName: "Maria",
    lastName: "Ozawa",
    email: "maria_ozawa@gmail.com",
    contact: "96712341",
    dob: "09-08-1965",
    address: "NCS Building"
  },
  // More booking...
];



  export default function UserProfile() {

    const profilePic = DefaultUserPic;

    const [userData, setUserData] = useState([]);
  
  useEffect(() => {
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
      // setUserData(getUserData.data.listUsers);
    }
    getUser();
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
          <section className="text-blueGray-700 ">
            <div className="container flex flex-col items-center px-5 py-16 mx-auto md:flex-row lg:px-28">
              <div className="flex flex-col items-start mb-16 text-left lg:flex-grow md:w-1/4 lg:pr-24 md:pr-16 md:mb-0">
                <div>
                  <div>
                    <a href="#">
                      <img
                        className="h-30 w-30 rounded-full "
                        alt="profile pic"
                        src={profilePic}
                      />
                    </a>
                  </div>
                  <div className="py-5 margin: text-center">
                    <input type="file" onChange="" />
                    <button className="ui button teal" onClick="">Save</button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start mb-16 text-left lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:mb-0">
                {userData.map((user) => (
                  <Container>
                    <Row>
                      <Col>
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="formPlaintextFirstName"
                          >
                            <Form.Label column sm="2">
                              First Name
                            </Form.Label>
                            <Col sm="10">
                              <Form.Control
                                plaintext
                                readOnly
                                defaultValue={user.firstname}
                              />
                            </Col>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formPlaintextLastName"
                          >
                            <Form.Label column sm="2">
                              Last Name
                            </Form.Label>
                            <Col sm="10">
                              <Form.Control
                                plaintext
                                readOnly
                                defaultValue={user.lastName}
                              />
                            </Col>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formPlaintextEmail"
                          >
                            <Form.Label column sm="2">
                              Email
                            </Form.Label>
                            <Col sm="10">
                              <Form.Control
                                plaintext
                                readOnly
                                defaultValue={user.email}
                              />
                            </Col>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formPlaintextEmail"
                          >
                            <Form.Label column sm="2">
                              Contact Number
                            </Form.Label>
                            <Col sm="10">
                              <Form.Control
                                plaintext
                                readOnly
                                defaultValue={user.contact}
                              />
                            </Col>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formPlaintextEmail"
                          >
                            <Form.Label column sm="2">
                              Date Of Birth
                            </Form.Label>
                            <Col sm="10">
                              <Form.Control
                                plaintext
                                readOnly
                                defaultValue={user.dob}
                              />
                            </Col>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formPlaintextEmail"
                          >
                            <Form.Label column sm="2">
                              Address
                            </Form.Label>
                            <Col sm="10">
                              <Form.Control
                                plaintext
                                readOnly
                                defaultValue={user.address}
                              />
                            </Col>
                          </Form.Group>
                        </Form>
                      </Col>
                    </Row>
                  </Container>
                ))}
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }



