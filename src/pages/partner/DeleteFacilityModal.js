import API from "@aws-amplify/api";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import * as mutations from "../../graphql/mutations";
import { useState } from "react";
import { CheckIcon, XIcon, TrashIcon } from "@heroicons/react/outline";
import React from "react";

function DeleteFacilityModal(props) {
  const [delCfmModal, setDelCfmModalOpen] = useState(false);
  const [isDeleted, setDeletedResult] = useState(false);

  //Handle delete action for add button
  const handleDelete = async (e) => {
    try {
      //Call api to delete facility
      const response = await API.graphql({
        query: mutations.deleteFacility,
        variables: {
          input: {
            id: props.deleteID,
          },
        },
      });
      console.log("Delete facility response ",response);

      props.setModalOpen(false); //close current modal
      setDeletedResult(true);
      setTimeout(() => {
        //set timer to open new modal (modal for deletion results).
        setDelCfmModalOpen(true);
      }, 1000);
    } catch (e) {
      console.log("Delete facility encounterd error", e);
      props.setModalOpen(false); //close current modal
      setDeletedResult(false);
      setTimeout(() => {
        //set timer to open new modal (modal for deletion results).
        setDelCfmModalOpen(true);
      }, 1000);
    }
  };

  return (
    <div>
      {/* Modal for deletion confirmation*/}
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
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <TrashIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Delete Facility
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you wish to delete the facility? Do note that existing booking will still be valid after deletion of facility.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm"
                    type="button"
                    onClick={() => props.setModalOpen(false)}
                  >
                    No
                  </button>
                  <button
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm"
                    type="button"
                    onClick={handleDelete}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Modal for deletion result*/}
      <Transition.Root show={delCfmModal} as={Fragment}>
        <Dialog
          as="div"
          auto-reopen="true"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={() => setDelCfmModalOpen(true)}
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
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {isDeleted ? (
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <CheckIcon
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                    ) : (
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <XIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        {isDeleted
                          ? "Deleted Successfully!"
                          : "Unable to Delete!"}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {isDeleted
                            ? "Facility has been deleted successfully!"
                            : "Failed to delete facility. Please contact helpdesk."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm"
                    type="button"
                    onClick={() => setDelCfmModalOpen(false)}
                  >
                    OK
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default DeleteFacilityModal;
