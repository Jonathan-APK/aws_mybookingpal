import { LockClosedIcon } from "@heroicons/react/solid";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();

  // Handle on click action for reset password button
  const handleOnSubmit = async () => {
    try {
      if (email === "") {
        setErrorMsg("Email cannot be empty");
      } else {
        const response = await Auth.forgotPassword(email);
        console.log("reset password auth response", response);
        history.push({
          pathname: '/resetpassword',
          state: email,
        });
      }
    } catch (error) {
      console.log("reset password error", error);
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
     
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg"
        >
          <div>
            <Link to="/">
              <img
                className="mx-auto h-8 w-auto"
                src="/logo_darkblue.svg"
                alt="Workflow"
              />
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Forgot your password?
            </h2>
            <div className="mt-4 mx-10">
              <p className="text-sm text-gray-500">
                Tell us your username / email address and we'll get you back on
                track in no time.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-6 mx-10">
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
                htmlFor="email"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              >
                Username / Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={email}
                placeholder="Your Username or Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </div>

            <div>
              <button
                onClick={handleOnSubmit}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
