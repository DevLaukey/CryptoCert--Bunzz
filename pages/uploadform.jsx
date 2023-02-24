import React from "react";
import { useContext, useEffect, useState } from "react";
import certContext from "../context/cert_context";
import { supabase } from "../context/supabaseClient";
import Auth from "../components/Auth";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Back from "../components/Back";
import { useRouter } from "next/router";
import Link from "next/link";

const UploadForm = () => {
  const router = useRouter()
  const [metadataURI, setMetadataURI] = useState("");
  const [targetAddress, setTargetAddress] = useState("");


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
    toast.loading("Minting Certificate... Kindly be patient", {
      position: toast.POSITION.TOP_CENTER,
    });
    e.preventDefault();
    await contract.methods
      .safeMint(targetAddress, metadataURI)
      .send({
        from: address,
      })
      .then((result) => {
        router.push('/');
        toast.success("Certificate Minted Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        clearInput();
      })
      .catch((err) => {
        toast.done("Go to HomePage" , {
          position: toast.POSITION.TOP_CENTER,
        })}
      );
  }
  function clearInput() {
    setTargetAddress("");
    setMetadataURI("");
  }
  return (
    <>
      <Back />
      <ToastContainer draggable pauseOnHover autoClose={5000} />

      {session ? (
        <div className="container my-24 px-6 mx-auto">
          <section className="mb-32 text-gray-800 text-center">
            <h2 className="text-5xl my-12 font-bold tracking-tight">
              Welcome to CRYTPOCERT <br />
              <span className="text-blue-600">Add Certificates?</span>
            </h2>

            <div className="flex  justify-center items-center w-full bg-white max-w-md mx-auto">
              <form className="w-full">
                <div className="form-group mb-6 relative">
                  <label>
                    Target Address is the wallet address of the school uploading
                  </label>

                  <input
                    type="text"
                    className="form-control block  w-full px-3  py-1.5  text-base font-normal text-gray-700 bg-white bg-clip-padding        border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleInput90"
                    placeholder={address}
                    onChange={(e) => {
                      setTargetAddress(e.target.value);
                    }}
                    value={targetAddress}
                  />
                </div>
                <div className="form-group mb-6">
                  <label classNameName="text-left">
                    The Metadata Hash is obtained from
                    <Link
                      href="/dataUpload"
                      className="text-decoration underline ml-2  text-blue-400"
                    >
                      here
                    </Link>
                  </label>
                  <input
                    type="text"
                    className="form-control block  w-full px-3  py-1.5  text-base font-normal text-gray-700 bg-white bg-clip-padding        border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleInput90"
                    placeholder="Metadata Hash/URI/CID"
                    onChange={(e) => {
                      setMetadataURI(e.target.value);
                    }}
                    value={metadataURI}
                  />
                </div>

                <button
                  type="submit"
                  onClick={mintCerts}
                  className="w-full px-6 py-2.5 bg-blue-600
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
