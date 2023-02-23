import React, { useEffect, useState } from "react";
import moment from "moment";
const IndividualCert = ({ data }) => {
  console.log("data", data);
  const name = data?.metadata.name;
  const ipfsHash = data?.ipfs_pin_hash;
  const pinnedDate = data?.pinned_date;
  const id = data?.id;

  const cleanHash = ipfsHash?.replace("ipfs://", "");
  const pinataUrl = `https://gateway.pinata.cloud/ipfs/${cleanHash}`;

  return (
    <div className="my-1 px-1 w-1/2 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 ">
      <article className="overflow-hidden rounded-lg shadow-lg dark:bg-gray-600 ">
        <a href={`/cert/${id}`}>
          <img src={pinataUrl} className="object-contain h-auto w-full " />
        </a>

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
          <a
            className="flex items-center no-underline hover:underline text-black"
            href="#"
          >
            Certificate for: <span className="text-sm pl-2">{name}</span>
          </a>
          <a
            className="no-underline text-grey-darker hover:text-red-dark dark:text-white"
            href="#"
          >
            <span className="hidden">Like</span>
            <i className="fa fa-heart"></i>
          </a>
        </footer>
      </article>
    </div>
  );
};

export default IndividualCert;
