import React, { useContext } from "react";
import certContext from "../context/cert_context";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const address = useContext(certContext).address;

  React.useEffect(() => { 
    if (address !== "") {
      setLoggedIn(true);
    }
  },[address]);
  return (
    <nav className="bg-white  sticky border-gray-400 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 mt-7">
      <div className="container flex flex-col  items-center justify-around mx-auto flex-wrap md:flex-nowrap">
        <a href="https://flowbite.com/" className="flex items-center m-2">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-6 mr-3 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            CRYTPOCERT{" "}
          </span>
        </a>

        <form className="w-3/4">
          <label
            for="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Search for a certificate"
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
          {
            loggedIn ? (
            <h2 className=" mt-2 text-blue-500 dark:text-gray-200 ">
              Wallet Address:{address}
            </h2>
            
          ) : (
              <h2 h2 className=" mt-2 text-red-800 dark:text-gray-200">
                Kindly Link your Wallet
             </h2>
            )
          }
      
      </div>
    </nav>
  );
};

export default Navbar;
