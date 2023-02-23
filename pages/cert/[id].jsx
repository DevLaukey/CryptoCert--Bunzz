import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Back from "../../components/Back";
import moment from "moment";

const ID = () => {
  const router = useRouter();
  const id = router.query.id;
  const [name, SetName] = useState("");
  const [certLink, setCertLink] = useState("");
  const [pinnedDate, setPinnedDate] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    // const ipfsHash = dataCID.replace('ipfs://', '');
    const axiosConfig = {
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_API_JWT}`,
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

        console.log("metadata", response);
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

  // console.log("certLink", `${certLink}?metadata[name]=Laukey Mwaura`);
  return (
    <>
      <Back />
      <div class="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl grid h-full md:h-80 lg:h-80 place-items-center">
        <div class="md:flex my-3">
          <div class="md:shrink-0 items-center justify-center flex ">
            <img
              class="h-48 w-3/4  object-cover md:h-full md:w-48"
              src={certLink}
            />
          </div>
          <div class="p-8">
            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {name}
            </div>
            <p class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
              Pinned on:
              {
                moment(pinnedDate).format("LL") // February 22, 2023
              }
            </p>
            <p class="mt-2 text-slate-500">
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
