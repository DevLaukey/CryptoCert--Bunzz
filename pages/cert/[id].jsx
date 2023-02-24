import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Back from "../../components/Back";
import moment from "moment";
import Image from "next/image";
import UpdateCertDetails from "../../components/UpdateCertDetails";

const ID = () => {
  const router = useRouter();
  const id = router.query.id;
  const [name, SetName] = useState("");
  const [certLink, setCertLink] = useState("");
  const [pinnedDate, setPinnedDate] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const [ipfsHash, setIpfsHash] = useState("");
  useEffect(() => {
    const axiosConfig = {
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "application/json",
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PINATA_API_JWT}`,
        mode: "no-cors",
      },
    };
    axios
      .get(
        `https://api.pinata.cloud/data/pinList?status=pinned&pinSizeMin=100&hashContains=${id}`,
        axiosConfig
      )
      .then((response) => {
        // Extract the file name from the metadata
        SetName(response.data.rows[0].metadata.name);
        let ipfsHash = response.data.rows[0].ipfs_pin_hash;
        setIpfsHash(ipfsHash);
        const cleanHash = ipfsHash?.replace("ipfs://", "");
        const pinataUrl = `https://gateway.pinata.cloud/ipfs/${cleanHash}`;
        setCertLink(pinataUrl);
        setPinnedDate(response.data.rows[0].pinned_date);
        setDescription(response.data.rows[0].metadata.description);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [id]);

  
 
  return (
    <>
      <div className="flex justify-between items-center">
        {show && <UpdateCertDetails show={show} setShow={setShow} ipfsHash={ipfsHash}/>}
        <Back />
      <button
        data-modal-hide="defaultModal"
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
        onClick={() => setShow(true)}
        >
        Edit
      </button>
        </div>
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl grid h-full md:h-80 lg:h-80 place-items-center">
        <div className="md:flex my-3">
          <div className="md:shrink-0 items-center justify-center flex ">
            <Image
              width={300}
              height={300}
              className="h-48 w-3/4  object-cover md:h-full md:w-48"
              src={certLink}
              alt={name}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {name}
            </div>
            <p className="block mt-1 text-lg leading-tight font-medium text-black ">
              Pinned on:
              {
                moment(pinnedDate).format("LL") // February 22, 2023
              }
            </p>
            <p className="mt-2 text-slate-500">
              {description
                ? {
                    description,
                  }
                : "No Description"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ID;

//
