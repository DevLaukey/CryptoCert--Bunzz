import React, { useContext } from "react";
import certContext from "../context/cert_context";
import axios from "axios";

const Navbar = ({ setURI }) => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const address = useContext(certContext).address;

  React.useEffect(() => {
    if (address !== null) {
      setLoggedIn(true);
    }
  }, [address]);

  async function searchCert(e) {
    e.preventDefault();
    let baseUrl = "https://api.pinata.cloud/data/pinList?includeCount=false";

    let searchUrl = baseUrl + "&status=pinned&metadata[name]=" + search;

    // ?metadata[name]=exampleName&metadata[keyvalues]={"exampleKey":{"value":"exampleValue","op":"exampleOp"},"exampleKey2":{"value":"exampleValue2","op":"exampleOp2"}}

    await axios
      .get(searchUrl, {
        headers: {
          pinata_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`,
        },
      })
      .then((res) => {
        setURI(null);
        setURI(res.data.rows);
      });
  }
  return (
    <nav className=" top-0  w-full  bg-gray-200 shadow-xlbg-white z-100  sticky border-gray-400 px-2 sm:px-4 py-0.5 rounded dark:bg-gray-900 ">
      <div className="container flex flex-col  items-center justify-around mx-auto flex-wrap md:flex-nowrap">
        <div className="flex w-full items-center m-2 justify-around">
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

          <ul className="flex p-4 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  ">
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Instructions
              </a>
            </li>
            <li>
              <a
                href="/uploadform"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Upload Cert
              </a>
            </li>
          </ul>
        </div>
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
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Search for a certificate"
              required
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={searchCert}
            >
              Search
            </button>
          </div>
        </form>
        {loggedIn ? (
          <h2 className=" mt-2 text-blue-500 dark:text-gray-200 ">
            Wallet Address: <span className="text-sm">{address} </span>
          </h2>
        ) : (
          <h2 h2 className=" mt-2 text-red-800 dark:text-gray-200">
            Kindly Link your Wallet
          </h2>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
