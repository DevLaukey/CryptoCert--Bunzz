import React from "react";

const UploadForm = () => {
  return (
    <div class="relative w-full h-full max-w-md md:h-auto">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
        <form class="h-full w-3/4 align-middle p-6 m-7 justify-center md:items-center">
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                class="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Full Name
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
              />
            </div>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-password"
              >
                Password
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-password"
                type="password"
                placeholder="******************"
              />
            </div>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3"></div>
            <label class="md:w-2/3 block text-gray-500 font-bold">
              <input class="mr-2 leading-tight" type="checkbox" />
              <span class="text-sm">Send me your newsletter!</span>
            </label>
          </div>
          <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
              <button
                class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
