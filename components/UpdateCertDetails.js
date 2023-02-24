import axios from "axios";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateCertDetails = ({ ipfsHash, setShow }) => {
  const [newName, setNewName] = React.useState("");
  const [newSchoolName, setNewSchoolName] = React.useState("");
  const [newDescription, setNewDescription] = React.useState("");

    
  async function updateCertDetails(CID ) {
    var data = JSON.stringify({
      ipfsHash: CID,
      name: newName,
      keyvalues: {
        newSchoolName: newSchoolName,
        newDescription: newDescription,
      },
    });

    var config = {
      method: "put",
      url: "https://api.pinata.cloud/pinning/hashMetadata",
      headers: {
        pinata_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
        pinata_secret_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    await axios(config)
      .then((response) => {
        toast.success(`${ipfsHash} updated successfully`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }
  return (
    <>
      <ToastContainer />

      <div className="bg-black bg-opacity-50 backdrop-blur-sm z-50 fixed inset-0 flex items-center justify-center rounded-lg">
        <div className="bg-white w-1/2 rounded-lg">
          <div className="bg-blue-500 text-white py-4 px-2 rounded-t flex items-center justify-center">
            <h1 className="font-semibold text-center pl-2 text-xl ">
              User Details
            </h1>
            <button
              type="button"
              className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
              onClick={() => setShow(false)}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-6">
            <div className="grid md:grid-cols-2 md:gap-6 ">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
                <label
                  for="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Student Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="floating_last_name"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) => setNewSchoolName(e.target.value)}
                />
                <label
                  for="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  School Name
                </label>
              </div>
            </div>
            <div className="grid  md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <textarea
                  type="text"
                  name="floating_company"
                  id="floating_company"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={(e) => setNewDescription(e.target.value)}
                />
                <label
                  for="floating_company"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Description
                </label>
              </div>
            </div>
            <button
              data-modal-hide="defaultModal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => updateCertDetails(ipfsHash)}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateCertDetails;
