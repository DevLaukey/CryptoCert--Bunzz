import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const IndividualCert = ({ dataCID }) => {
  const [certLink, setCertLink] = useState("");
  const [fileName, setFileName] = useState("");

  let path = ".png";
  useEffect(() => {
    ipfsToPinata(dataCID, path);
    const ipfsHash = dataCID.replace('ipfs://', '');
    // const axiosConfig = {
    //     headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
    //     'Access-Control-Allow-Methods': "GET, POST, PUT, DELETE,OPTIONS",
    //     "Content-Type": "application/json",
    //         'pinata_api_key': `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
    //         'pinata_secret_api_key': `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`
    //     }
    // };
// https://api.pinata.cloud/data/pinList?status=pinned&pinSizeMin=100
    axios.get(`https://api.pinata.cloud/data/pinList?status=pinned&pinSizeMin=100`, {
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'application/json',
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_PINATA_API_JWT}`,

        // 'pinata_api_key': `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
        // 'pinata_secret_api_key': `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`,
        "Accept": "*/*",
        "mode": 'no-cors',
      }
    })
        .then(response => {
            // Extract the file name from the metadata
            const metadata = response.data;
            const name = metadata.name || '';

            console.log('metadata', response);
            // Update state with the file name
            setFileName(name);
        })
        .catch(error => {
            console.error(error.message);
        });

  }, [dataCID, path]);

  function ipfsToPinata(url, path) {
    // Extract the IPFS hash from the URL
    const ipfsHash = url.replace("ipfs://", "");

    // Build the Pinata gateway URL with the IPFS hash and specified path

    const pinataUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    setCertLink(pinataUrl);
  }
  console.log("certLink", `${certLink}?metadata[name]=Laukey Mwaura`);
  return (
    <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3  ">
        <article
          article
          class="overflow-hidden rounded-lg shadow-lg dark:bg-gray-600 "
        >
          <a href="#">
            <img src={certLink} />
          </a>

          <header class="flex items-center justify-between leading-tight p-2 md:p-4">
            <h1 class="text-lg">
              <a
                class="no-underline hover:underline text-black dark:text-white"
                href="#"
              >
                Article Title
              </a>
            </h1>
            <p class="text-grey-darker text-sm dark:text-white">11/1/19</p>
          </header>

          <footer class="flex items-center justify-between leading-none p-2 md:p-4">
            <a
              class="flex items-center no-underline hover:underline text-black"
              href="#"
            >
              <img
                alt="Placeholder"
                class="block rounded-full"
                src="https://picsum.photos/32/32/?random"
              />
              <p class="ml-2 text-sm dark:text-white">Author Name</p>
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
