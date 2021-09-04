import { PencilAltIcon } from "@heroicons/react/solid";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmEmailModal from "./ConfirmEmailModal";
import modaltext from "../../constants/ConfirmModal.json";

function PartnerRegister() {
  const [firstname, setFname] = useState("");
  const [lastname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpw, setConfirmpw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  // Handle on click action for sign up button
  const handleOnSubmit = async () => {
    if (password !== confirmpw) {
      setErrorMsg("Password and confirm password does not match");
    } else if(firstname === "" || lastname ===""){
      setErrorMsg("Please enter first and last name.");
    }
    else{
      try {
        const response = await Auth.signUp({
          username,
          password,
          attributes: {
            email: email,
            "custom:role": "facility_owner",
            "custom:firstname": firstname,
            "custom:lastname": lastname,
          },
        });
        console.log("sign up response", response);
        setModalOpen(true);
        setErrorMsg("");
      } catch (error) {
        console.log("sign up error", error);
        setErrorMsg(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {setModalOpen && (
        <ConfirmEmailModal
          isOpen={isModalOpen}
          setModalOpen={setModalOpen}
          title={modaltext.verifypassword.title}
          content={modaltext.verifypassword.content}
          button={modaltext.verifypassword.button}
          link={modaltext.verifypassword.link}
        />
      )}

      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
                    px-6 py-10 sm:px-10 sm:py-6 
                    bg-white rounded-lg shadow-md lg:shadow-lg"
        >
          <div>
            <Link to="/">
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              List your facility. Join us.
            </h2>
          </div>
          <div className="mt-8 space-y-6 mx-10">
            {/* error message */}
            {errorMsg && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 text-xs text-center px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{errorMsg}</span>
              </div>
            )}

            <div className="mb-6">
              <label
                htmlFor="firstname"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                required
                value={firstname}
                onChange={(e) => setFname(e.target.value)}
                placeholder="Your First Name"
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="lastname"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                required
                value={lastname}
                onChange={(e) => setLname(e.target.value)}
                placeholder="Your Last Name"
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your Username"
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </div>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your Password"
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmpassword"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                required
                value={confirmpw}
                onChange={(e) => setConfirmpw(e.target.value)}
                placeholder="Confirm Password"
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </div>
            <div>
              <button
                onClick={handleOnSubmit}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <PencilAltIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnerRegister;
