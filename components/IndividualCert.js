import React from "react";
import moment from "moment";
import Link from "next/link";
const IndividualCert = ({ data }) => {

  console.log("data", data);
  const name = data?.metadata.name;
  const ipfsHash = data?.ipfs_pin_hash;
  const pinnedDate = data?.pinned_date;
  const id = data?.id;

  const cleanHash = ipfsHash?.replace("ipfs://", "");
  const pinataUrl = `https://gateway.pinata.cloud/ipfs/${cleanHash}`;

  return (
    <>
    
      <div className="my-1 px-1 w-1/2 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 ">
        <article className="overflow-hidden rounded-lg shadow-lg dark:bg-gray-600 ">
          <Link href={`/cert/${ipfsHash}`}>
            <img src={pinataUrl} className="object-contain h-auto w-full " />
          </Link>
      
          <header className="flex items-left flex-col justify-between leading-tight p-2 md:p-4">
            <h5 className="font-bold">Certificate ID:</h5>
            <p className="text-sm text-ellipsis md:text-clip overflow-hidden">
              {id}
            </p>
          </header>
          <p className="flex items-left flex-col justify-between leading-tight p-2 md:p-4">
            Pinned on:{" "}
            {
              moment(pinnedDate).format("LL") // February 22, 2023
            }
          </p>

          <footer className="flex items-center justify-between leading-none p-2 md:p-4">
            <Link
              className="flex items-center no-underline hover:underline text-black"
              href={`/cert/${ipfsHash}`}            >
              Certificate for: <span className="text-sm pl-2">{name}</span>
            </Link>
         
          </footer>
        </article>
      </div>
    </>

  );
};

export default IndividualCert;
