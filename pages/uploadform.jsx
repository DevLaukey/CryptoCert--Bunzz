import React from "react";

const UploadForm = () => {
  return (
    <div class="container my-24 px-6 mx-auto">
      <section class="mb-32 text-gray-800 text-center">
        <h2 class="text-5xl my-12 font-bold tracking-tight">
          Welcome to CRYTPOCERT <br />
          <span class="text-blue-600">Add Certificates?</span>
        </h2>
        <div class="flex  justify-center items-center w-full bg-white max-w-md mx-auto">
          <form class="w-full">
            <div class="form-group mb-6">
              <input
                type="text"
                class="form-control block  w-full px-3  py-1.5  text-base font-normal text-gray-700 bg-white bg-clip-padding        border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInput90"
                placeholder="Name"
              />
            </div>
            <div class="form-group mb-6">
              <input
                type="text"
                class="form-control block  w-full px-3  py-1.5  text-base font-normal text-gray-700 bg-white bg-clip-padding        border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInput90"
                placeholder="Name"
              />
            </div>
            <div class="form-group mb-6">
              <input
                type="text"
                class="form-control block  w-full px-3  py-1.5  text-base font-normal text-gray-700 bg-white bg-clip-padding        border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInput90"
                placeholder="Name"
              />
            </div>
            <button
              type="submit"
              class="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UploadForm;
