import React from "react";
import Web3 from "web3";
import { useContext, useEffect, useState } from "react";

const UploadForm = () => {
  const metadataURI =
    "https://gateway.pinata.cloud/ipfs/QmZKvtY8eJcm1QVAzFQTBGQrRdCZ3jJRrRpKmd87cVY7wC/";

  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);
   let abi = [
     {
       anonymous: null,
       name: null,
       inputs: [
         { internalType: "string", name: "name", type: "string" },
         { internalType: "string", name: "symbol", type: "string" },
         { internalType: "string", name: "baseTokenURI", type: "string" },
       ],
       outputs: [],
       type: "constructor",
       stateMutability: "nonpayable",
     },
     {
       anonymous: null,
       name: "Approval",
       inputs: [
         { internalType: "address", name: "owner", type: "address" },
         { internalType: "address", name: "approved", type: "address" },
         { internalType: "uint256", name: "tokenId", type: "uint256" },
       ],
       outputs: [],
       type: "event",
       stateMutability: null,
     },
     {
       anonymous: null,
       name: "ApprovalForAll",
       inputs: [
         { internalType: "address", name: "owner", type: "address" },
         { internalType: "address", name: "operator", type: "address" },
         { internalType: "bool", name: "approved", type: "bool" },
       ],
       outputs: [],
       type: "event",
       stateMutability: null,
     },
     {
       anonymous: null,
       name: "OwnershipTransferred",
       inputs: [
         { internalType: "address", name: "previousOwner", type: "address" },
         { internalType: "address", name: "newOwner", type: "address" },
       ],
       outputs: [],
       type: "event",
       stateMutability: null,
     },
     {
       anonymous: null,
       name: "Transfer",
       inputs: [
         { internalType: "address", name: "from", type: "address" },
         { internalType: "address", name: "to", type: "address" },
         { internalType: "uint256", name: "tokenId", type: "uint256" },
       ],
       outputs: [],
       type: "event",
       stateMutability: null,
     },
     {
       anonymous: null,
       name: "approve",
       inputs: [
         { internalType: "address", name: "to", type: "address" },
         { internalType: "uint256", name: "tokenId", type: "uint256" },
       ],
       outputs: [],
       type: "function",
       stateMutability: "nonpayable",
     },
     {
       anonymous: null,
       name: "balanceOf",
       inputs: [{ internalType: "address", name: "owner", type: "address" }],
       outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
       type: "function",
       stateMutability: "view",
     },
     {
       anonymous: null,
       name: "burn",
       inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
       outputs: [],
       type: "function",
       stateMutability: "nonpayable",
     },
     {
       anonymous: null,
       name: "getApproved",
       inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
       outputs: [{ internalType: "address", name: "", type: "address" }],
       type: "function",
       stateMutability: "view",
     },
     {
       anonymous: null,
       name: "isApprovedForAll",
       inputs: [
         { internalType: "address", name: "owner", type: "address" },
         { internalType: "address", name: "operator", type: "address" },
       ],
       outputs: [{ internalType: "bool", name: "", type: "bool" }],
       type: "function",
       stateMutability: "view",
     },
     {
       anonymous: null,
       name: "name",
       inputs: [],
       outputs: [{ internalType: "string", name: "", type: "string" }],
       type: "function",
       stateMutability: "view",
     },
     {
       anonymous: null,
       name: "owner",
       inputs: [],
       outputs: [{ internalType: "address", name: "", type: "address" }],
       type: "function",
       stateMutability: "view",
     },
     {
       anonymous: null,
       name: "ownerOf",
       inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
       outputs: [{ internalType: "address", name: "", type: "address" }],
       type: "function",
       stateMutability: "view",
     },
     {
       anonymous: null,
       name: "renounceOwnership",
       inputs: [],
       outputs: [],
       type: "function",
       stateMutability: "nonpayable",
     },
     {
       anonymous: null,
       name: "safeMint",
       inputs: [
         { internalType: "address", name: "to", type: "address" },
         { internalType: "string", name: "metadataURI", type: "string" },
       ],
       outputs: [],
       type: "function",
       stateMutability: "nonpayable",
     },
     {
       anonymous: null,
       name: "safeTransferFrom",
       inputs: [
         { internalType: "address", name: "from", type: "address" },
         { internalType: "address", name: "to", type: "address" },
         { internalType: "uint256", name: "tokenId", type: "uint256" },
       ],
       outputs: [],
       type: "function",
       stateMutability: "nonpayable",
     },
     {
       anonymous: null,
       name: "safeTransferFrom",
       inputs: [
         { internalType: "address", name: "from", type: "address" },
         { internalType: "address", name: "to", type: "address" },
         { internalType: "uint256", name: "tokenId", type: "uint256" },
         { internalType: "bytes", name: "_data", type: "bytes" },
       ],
       outputs: [],
       type: "function",
       stateMutability: "nonpayable",
     },
     {
       anonymous: null,
       name: "setApprovalForAll",
       inputs: [
         { internalType: "address", name: "operator", type: "address" },
         { internalType: "bool", name: "approved", type: "bool" },
       ],
       outputs: [],
       type: "function",
       stateMutability: "nonpayable",
     },
     {
       anonymous: null,
       name: "supportsInterface",
       inputs: [
         { internalType: "bytes4", name: "interfaceId", type: "bytes4" },
       ],
       outputs: [{ internalType: "bool", name: "", type: "bool" }],
       type: "function",
       stateMutability: "view",
     },
     {
       anonymous: null,
       name: "symbol",
       inputs: [],
       outputs: [{ internalType: "string", name: "", type: "string" }],
       type: "function",
       stateMutability: "view",
     },
     {
       anonymous: null,
       name: "tokenByIndex",
       inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
       outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
       type: "function",
       stateMutability: "view",
     },
     {
       anonymous: null,
       name: "tokenOfOwnerByIndex",
       inputs: [
         { internalType: "address", name: "owner", type: "address" },
         { internalType: "uint256", name: "index", type: "uint256" },
       ],
       outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
       type: "function",
       stateMutability: "view",
     },
     {
       anonymous: null,
       name: "tokenURI",
       inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
       outputs: [{ internalType: "string", name: "", type: "string" }],
       type: "function",
       stateMutability: "view",
     },
     {
       anonymous: null,
       name: "totalSupply",
       inputs: [],
       outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
       type: "function",
       stateMutability: "view",
     },
     {
       anonymous: null,
       name: "transferFrom",
       inputs: [
         { internalType: "address", name: "from", type: "address" },
         { internalType: "address", name: "to", type: "address" },
         { internalType: "uint256", name: "tokenId", type: "uint256" },
       ],
       outputs: [],
       type: "function",
       stateMutability: "nonpayable",
     },
     {
       anonymous: null,
       name: "transferOwnership",
       inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
       outputs: [],
       type: "function",
       stateMutability: "nonpayable",
     },
   ];
   let contractAddress = "0x8f9c63b1abF719b644367492131D3e06bCA2D756";           


  useEffect(() => {
    window.ethereum
      ? ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            setAddress(accounts[0]);
            let w3 = new Web3(ethereum);
            setWeb3(w3);
            let c = new w3.eth.Contract(abi, contractAddress);
            setContract(c);
          })
          .catch((err) => console.log(err))
      : console.log("Please install MetaMask");
  }, []);

  async function mintCerts(e) {
    e.preventDefault();
    await contract.methods
      .safeMint("0x4c371D2626ab14f99e9591747568c9277ceb86Ba", metadataURI)
      .send({
        from: address
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }
  return (
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
                placeholder="Name"
              />
            </div>
            <div class="form-group mb-6">
              <input
                type="text"
                class="form-control block  w-full px-3  py-1.5  text-base font-normal text-gray-700 bg-white bg-clip-padding        border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInput90"
                placeholder="Name"
              />
            </div>
            <div class="form-group mb-6">
              <input
                type="text"
                class="form-control block  w-full px-3  py-1.5  text-base font-normal text-gray-700 bg-white bg-clip-padding        border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInput90"
                placeholder="Name"
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
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UploadForm;
