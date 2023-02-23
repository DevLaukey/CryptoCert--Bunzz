import React from "react";
import Back from "../components/Back";

const instructions = () => {
  return (
    <>
      <Back />
      <h2 className="font-bold text-xl text-center mb-2">
        Instructions on how to use the app
      </h2>
      <div className="flex w-full justify-center ">
        <div className="flex flex-col">
          <p className="text-center mb-2 underline">
            <strong>Step 1:</strong> Upload your certificate
          </p>
          <ul class="w-3/4 mx-auto text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              {" "}
              On the Navigation bar, go to Upload Cert
            </li>
            <li class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
              Add address and the data URI/Hash if already present
            </li>
            <li class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
              If not available, navigate to the upload page using the link
              provided
            </li>

            <li class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
              Fill in the details obtain the data URI/Hash then navigate to the
              upload form using the link
            </li>
            <li class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
              Upload the data to blockchain and head back to the homepage to
              view the data
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <p className="text-center my-2">
            <strong>Step 2:</strong> Search for your certificate
          </p>
          <ul class="w-3/4 mx-auto text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              On the Navigation bar, Search the name of the certificate.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default instructions;
