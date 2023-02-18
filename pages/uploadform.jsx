import React from "react";
import Web3 from "web3";
import { useContext, useEffect, useState } from "react";
import certContext from "../context/cert_context";
import { supabase } from "../context/supabaseClient";
import Auth from "../components/Auth";

const UploadForm = () => {
  const [metadataURI, setMetadataURI] = useState("");
  const [targetAddress, setTargetAddress] = useState("");
  // "https://gateway.pinata.cloud/ipfs/QmZKvtY8eJcm1QVAzFQTBGQrRdCZ3jJRrRpKmd87cVY7wC/";

  const web3 = useContext(certContext).web3;
  const contract = useContext(certContext).contract;
  const address = useContext(certContext).address;
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  async function mintCerts(e) {
    e.preventDefault();
    await contract.methods
      .safeMint(targetAddress, metadataURI)
      .send({
        from: address,
      })
      .then((result) => {
        console.log(result);
        setTargetAddress("");
        setMetadataURI("");
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      {session ? (
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
                    placeholder="Target Address"
                    onChange={(e) => {
                      setTargetAddress(e.target.value);
                    }}
                  />
                </div>
                <div class="form-group mb-6">
                  <input
                    type="text"
                    class="form-control block  w-full px-3  py-1.5  text-base font-normal text-gray-700 bg-white bg-clip-padding        border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleInput90"
                    placeholder="Metadata URI"
                    onChange={(e) => {
                      setMetadataURI(e.target.value);
                    }}
                  />
                </div>

                <button
                  type="submit"
                  onClick={mintCerts}
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
                  POST
                </button>
              </form>
            </div>
          </section>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default UploadForm;
