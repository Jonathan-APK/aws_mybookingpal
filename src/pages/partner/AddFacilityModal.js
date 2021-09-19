import API from "@aws-amplify/api";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useState } from "react";
import * as mutations from "../../graphql/mutations";

function AddFacilityModal(props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Meeting Room");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [size, setSize] = useState("");
  const [operatingFrom, setOperatingFrom] = useState("");
  const [operatingTo, setOperatingTo] = useState("");
  const [operatingDays, setOperatingDays] = useState([]);
  const [rate, setRate] = useState("");
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  //Change event for operating days checkboxes
  const onChangeCheckbox = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setOperatingDays([...operatingDays, event.target.value]);
    } else {
      const index = operatingDays.indexOf(event.target.value);
      operatingDays.splice(index, 1);
      setOperatingDays(operatingDays);
    }
  };

  //Input validation for operating hours and days
  const inputValidation = () => {
    if (!operatingDays.length) {
      setErrorMsg("Operation Days cannot be empty!");
      return false;
    } else if (
      document.getElementById("operating-from").value >=
      document.getElementById("operating-to").value
    ) {
      setErrorMsg("Operation Hrs (From) should be before Operation Hrs (To)");
      return false;
    }
    return true;
  };

  //Handle submit action for add button
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setErrorMsg("");

      //If pass input validation
      if (inputValidation()) {
        //Object to insert into DB
        const facilityDetails = {
          name: name,
          type: type,
          address: address,
          area: area,
          size: size,
          rate: rate,
          description: description,
          opening_hrs: operatingFrom,
          closing_hrs: operatingTo,
          operating_days: operatingDays,
          userID: sessionStorage.getItem("username"),
        };

        console.log(
          "Facility details " + JSON.stringify(facilityDetails)
        );

        //Call api to add facility
        const response = await API.graphql({
          query: mutations.createFacility,
          variables: { input: facilityDetails },
        });
        console.log("Add facility response " + JSON.stringify(response));
      }
    } catch (error) {
      setErrorMsg("Error encounterd. Please contact administrator.");
    }
  };

  return (
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
                <p className="font-semibold text-gray-800">Add Facility</p>
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

              <div className="col-span-6">
                {/* error message */}
                {errorMsg && (
                  <div
                    className="bg-red-100 borderborder-red-400 text-red-700 text-xs text-center px-4 py-3  mx-4 my-2 rounded relative"
                    role="alert"
                  >
                    <span className="block sm:inline">{errorMsg}</span>
                  </div>
                )}
              </div>

              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit}>
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                          <label className="block text-sm font-medium text-gray-700">
                            Facility photo
                          </label>
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                          </div>
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
                            onChange={(e) => setName(e.target.value)}
                            name="facility-name"
                            id="facility-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="facility-type"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Facility Type
                          </label>
                          <select
                            id="facility-type"
                            onChange={(e) => setType(e.target.value)}
                            name="facility-type"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option>Meeting Room</option>
                            <option>Sport Venues</option>
                            <option>Desk Booking</option>
                            <option>Professional Studios</option>
                            <option>Coworking spaces</option>
                            <option>Community Facilities</option>
                          </select>
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
                            onChange={(e) => setAddress(e.target.value)}
                            name="street-address"
                            id="street-address"
                            autoComplete="street-address"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                            onChange={(e) => setArea(e.target.value)}
                            name="area-name"
                            id="area-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="rate-hr"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Estimated Room Size (Pax)
                          </label>
                          <input
                            type="number"
                            required
                            onChange={(e) => setSize(e.target.value)}
                            name="rate-hr"
                            id="rate-hr"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="operating-from"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Operating Hours (From)
                          </label>
                          <input
                            type="time"
                            required
                            onChange={(e) => setOperatingFrom(e.target.value)}
                            name="operating-from"
                            id="operating-from"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="operating-to"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Operating Hours (To)
                          </label>
                          <input
                            type="time"
                            required
                            onChange={(e) => setOperatingTo(e.target.value)}
                            name="operating-to"
                            id="operating-to"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6">
                          <label className="block text-sm font-medium text-gray-700">
                            Operating Days
                          </label>

                          <div className="flex mt-2 justify-evenly">
                            <label
                              htmlFor="mon"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Mon
                            </label>
                            <input
                              type="checkbox"
                              name="mon"
                              value="Mon"
                              onChange={onChangeCheckbox}
                              id="mon"
                              className="rounded-md block shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            />

                            <label
                              htmlFor="tue"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Tue
                            </label>
                            <input
                              type="checkbox"
                              value="Tue"
                              onChange={onChangeCheckbox}
                              name="tue"
                              id="tue"
                              className="rounded-md block shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            />

                            <label
                              htmlFor="wed"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Wed
                            </label>
                            <input
                              type="checkbox"
                              value="Wed"
                              onChange={onChangeCheckbox}
                              name="wed"
                              id="wed"
                              className="rounded-md block shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            />

                            <label
                              htmlFor="thur"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Thur
                            </label>
                            <input
                              type="checkbox"
                              value="Thur"
                              onChange={onChangeCheckbox}
                              name="thur"
                              id="thur"
                              className="rounded-md block shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            />

                            <label
                              htmlFor="fri"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Fri
                            </label>
                            <input
                              type="checkbox"
                              value="Fri"
                              onChange={onChangeCheckbox}
                              name="fri"
                              id="fri"
                              className="rounded-md block shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            />

                            <label
                              htmlFor="sat"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Sat
                            </label>
                            <input
                              type="checkbox"
                              value="Sat"
                              onChange={onChangeCheckbox}
                              name="sat"
                              id="sat"
                              className="rounded-md block shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            />

                            <label
                              htmlFor="sun"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Sun
                            </label>
                            <input
                              type="checkbox"
                              value="Mon"
                              onChange={onChangeCheckbox}
                              name="sun"
                              id="sun"
                              className="rounded-md block shadow-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
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
                            onChange={(e) => setRate(e.target.value)}
                            name="rate-hr"
                            id="rate-hr"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="about"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="about"
                              required
                              name="about"
                              onChange={(e) => setDescription(e.target.value)}
                              rows={3}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                              placeholder="Brief description about the facility."
                              defaultValue={""}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default AddFacilityModal;
