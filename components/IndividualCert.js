
import React, { useEffect, useState } from "react";
import moment from "moment";
const IndividualCert = ({ data }) => {
  const [certLink, setCertLink] = useState("");
  console.log("data", data);
  const name = data?.metadata.name;
  const ipfsHash = data?.ipfs_pin_hash;
  const pinnedDate = data?.pinned_date
  const id = data?.id;

  const cleanHash = ipfsHash?.replace("ipfs://", "");
      const pinataUrl = `https://gateway.pinata.cloud/ipfs/${cleanHash}`;


  
  //   useEffect(() => {
  //     ipfsToPinata(dataCID, path);
  //     // const ipfsHash = dataCID.replace('ipfs://', '');
  //     const axiosConfig = {
  //         headers: {
  //         'Access-Control-Allow-Credentials': true,
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Methods': 'GET',
  //         'Access-Control-Allow-Headers': 'application/json',
  //         "Authorization": `Bearer ${process.env.NEXT_PUBLIC_PINATA_API_JWT}`,
  //         "mode": 'no-cors',
  //         }
  //     };
  // // https://api.pinata.cloud/data/pinList?status=pinned&pinSizeMin=100
  //     axios.get(`https://api.pinata.cloud/data/pinList?status=pinned&pinSizeMin=100`, axiosConfig)
  //         .then(response => {
  //             // Extract the file name from the metadata
  //             const metadata = response.data;
  //             const name = metadata.name || '';

  //             console.log('metadata', response);
  //             // Update state with the file name
  //             setFileName(name);
  //         })
  //         .catch(error => {
  //             console.error(error.message);
  //         });

  //   }, [dataCID, path]);

  // console.log("certLink", `${certLink}?metadata[name]=Laukey Mwaura`);
  return (
    <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 ">
      <article
        article
        class="overflow-hidden rounded-lg shadow-lg dark:bg-gray-600 "
      >
        <a href="#">
          <img src={pinataUrl} className="object-contain h-auto w-full" />
        </a>

        <header class="flex items-left flex-col justify-between leading-tight p-2 md:p-4">
          <h5 class="font-bold">Certificate ID:</h5>
          <p class="text-sm text-ellipsis md:text-clip overflow-hidden">{id}</p>
        </header>
        <p class="flex items-left flex-col justify-between leading-tight p-2 md:p-4">
          Pinned on:{" "}
          {
            moment(pinnedDate).format("LL") // February 22, 2023
          }
        </p>

        <footer class="flex items-center justify-between leading-none p-2 md:p-4">
          <a
            class="flex items-center no-underline hover:underline text-black"
            href="#"
          >
            Certificate for: <span class="text-sm pl-2">{name}</span>
          </a>
          <a
            class="no-underline text-grey-darker hover:text-red-dark dark:text-white"
            href="#"
          >
            <span class="hidden">Like</span>
            <i class="fa fa-heart"></i>
          </a>
        </footer>
      </article>
    </div>
  );
};

export default IndividualCert;
