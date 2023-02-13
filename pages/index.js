import FileUpload from "../components/FileUpload";
import UploadForm from "../components/UploadForm";
import contract from "../smartcontract/Certificate";
import Web3  from "web3";
import { useEffect, useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());


export default function Home() {
  const [web3, setWeb3] = useState(null)
  const [address, setAddress] = useState(null)
  const [contract, setContract] = useState(null)

  let abi = [
    {
      "anonymous": null,
      "name": null,
      "inputs": [
        { "internalType": "string", "name": "name", "type": "string" },
        { "internalType": "string", "name": "symbol", "type": "string" },
        { "internalType": "string", "name": "baseTokenURI", "type": "string" }
      ],
      "outputs": [],
      "type": "constructor",
      "stateMutability": "nonpayable"
    },
    {
      "anonymous": null,
      "name": "Approval",
      "inputs": [
        { "internalType": "address", "name": "owner", "type": "address" },
        { "internalType": "address", "name": "approved", "type": "address" },
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "outputs": [],
      "type": "event",
      "stateMutability": null
    },
    {
      "anonymous": null,
      "name": "ApprovalForAll",
      "inputs": [
        { "internalType": "address", "name": "owner", "type": "address" },
        { "internalType": "address", "name": "operator", "type": "address" },
        { "internalType": "bool", "name": "approved", "type": "bool" }
      ],
      "outputs": [],
      "type": "event",
      "stateMutability": null
    },
    {
      "anonymous": null,
      "name": "OwnershipTransferred",
      "inputs": [
        { "internalType": "address", "name": "previousOwner", "type": "address" },
        { "internalType": "address", "name": "newOwner", "type": "address" }
      ],
      "outputs": [],
      "type": "event",
      "stateMutability": null
    },
    {
      "anonymous": null,
      "name": "Transfer",
      "inputs": [
        { "internalType": "address", "name": "from", "type": "address" },
        { "internalType": "address", "name": "to", "type": "address" },
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "outputs": [],
      "type": "event",
      "stateMutability": null
    },
    {
      "anonymous": null,
      "name": "approve",
      "inputs": [
        { "internalType": "address", "name": "to", "type": "address" },
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "outputs": [],
      "type": "function",
      "stateMutability": "nonpayable"
    },
    {
      "anonymous": null,
      "name": "balanceOf",
      "inputs": [
        { "internalType": "address", "name": "owner", "type": "address" }
      ],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "type": "function",
      "stateMutability": "view"
    },
    {
      "anonymous": null,
      "name": "burn",
      "inputs": [
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "outputs": [],
      "type": "function",
      "stateMutability": "nonpayable"
    },
    {
      "anonymous": null,
      "name": "getApproved",
      "inputs": [
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "type": "function",
      "stateMutability": "view"
    },
    {
      "anonymous": null,
      "name": "isApprovedForAll",
      "inputs": [
        { "internalType": "address", "name": "owner", "type": "address" },
        { "internalType": "address", "name": "operator", "type": "address" }
      ],
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "type": "function",
      "stateMutability": "view"
    },
    {
      "anonymous": null,
      "name": "name",
      "inputs": [],
      "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
      "type": "function",
      "stateMutability": "view"
    },
    {
      "anonymous": null,
      "name": "owner",
      "inputs": [],
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "type": "function",
      "stateMutability": "view"
    },
    {
      "anonymous": null,
      "name": "ownerOf",
      "inputs": [
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
      "type": "function",
      "stateMutability": "view"
    },
    {
      "anonymous": null,
      "name": "renounceOwnership",
      "inputs": [],
      "outputs": [],
      "type": "function",
      "stateMutability": "nonpayable"
    },
    {
      "anonymous": null,
      "name": "safeMint",
      "inputs": [
        { "internalType": "address", "name": "to", "type": "address" },
        { "internalType": "string", "name": "metadataURI", "type": "string" }
      ],
      "outputs": [],
      "type": "function",
      "stateMutability": "nonpayable"
    },
    {
      "anonymous": null,
      "name": "safeTransferFrom",
      "inputs": [
        { "internalType": "address", "name": "from", "type": "address" },
        { "internalType": "address", "name": "to", "type": "address" },
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "outputs": [],
      "type": "function",
      "stateMutability": "nonpayable"
    },
    {
      "anonymous": null,
      "name": "safeTransferFrom",
      "inputs": [
        { "internalType": "address", "name": "from", "type": "address" },
        { "internalType": "address", "name": "to", "type": "address" },
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
        { "internalType": "bytes", "name": "_data", "type": "bytes" }
      ],
      "outputs": [],
      "type": "function",
      "stateMutability": "nonpayable"
    },
    {
      "anonymous": null,
      "name": "setApprovalForAll",
      "inputs": [
        { "internalType": "address", "name": "operator", "type": "address" },
        { "internalType": "bool", "name": "approved", "type": "bool" }
      ],
      "outputs": [],
      "type": "function",
      "stateMutability": "nonpayable"
    },
    {
      "anonymous": null,
      "name": "supportsInterface",
      "inputs": [
        { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }
      ],
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "type": "function",
      "stateMutability": "view"
    },
    {
      "anonymous": null,
      "name": "symbol",
      "inputs": [],
      "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
      "type": "function",
      "stateMutability": "view"
    },
    {
      "anonymous": null,
      "name": "tokenByIndex",
      "inputs": [
        { "internalType": "uint256", "name": "index", "type": "uint256" }
      ],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "type": "function",
      "stateMutability": "view"
    },
    {
      "anonymous": null,
      "name": "tokenOfOwnerByIndex",
      "inputs": [
        { "internalType": "address", "name": "owner", "type": "address" },
        { "internalType": "uint256", "name": "index", "type": "uint256" }
      ],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "type": "function",
      "stateMutability": "view"
    },
    {
      "anonymous": null,
      "name": "tokenURI",
      "inputs": [
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
      "type": "function",
      "stateMutability": "view"
    },
    {
      "anonymous": null,
      "name": "totalSupply",
      "inputs": [],
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "type": "function",
      "stateMutability": "view"
    },
    {
      "anonymous": null,
      "name": "transferFrom",
      "inputs": [
        { "internalType": "address", "name": "from", "type": "address" },
        { "internalType": "address", "name": "to", "type": "address" },
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "outputs": [],
      "type": "function",
      "stateMutability": "nonpayable"
    },
    {
      "anonymous": null,
      "name": "transferOwnership",
      "inputs": [
        { "internalType": "address", "name": "newOwner", "type": "address" }
      ],
      "outputs": [],
      "type": "function",
      "stateMutability": "nonpayable"
    }
  ]
;
  let contractAddress = "0x8f9c63b1abF719b644367492131D3e06bCA2D756"           


  useEffect(() => {
    window.ethereum ?
      ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
        setAddress(accounts[0])
        let w3 = new Web3(ethereum)
        setWeb3(w3)
        let c = new w3.eth.Contract(abi, contractAddress)
        setContract(c)
      }).catch((err) => console.log(err))
      : console.log("Please install MetaMask")
  }, [])

  console.log(contract), console.log(web3), console.log(address);
  return (
    <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
      {/* Intro and instructions of the application // File drop */}
      {/* <FileUpload /> */}
      <UploadForm />
{/* 
      The data must first be prepared: ie the Certificate images created and stored on IPFS and metadata of the data stord in tabular form

      the data will be link to the Certificate image and some data describing the name, course, grade etc.

      This prepare data will then be uploaded to the blockchain using CryptoCert. This will be a link of the prepared data that was uploaded to the IPFS and some data concerning those certs. ie the Year, school etc.

      This will be pushed to the blockchain and later accessible.

      For a student, to access their Certificate... They will pass thier contract ID + their unique school Identification number. This will be used to access the data on the blockchain.

      The data will be retrieved and the data will be used to access the IPFS and retrieve the Certificate image. On the website ie: https://cryptocert.vercel.app/ the data will be displayed and the Certificate image will be displayed.


      For this to work,
      1. The data must be prepared and uploaded to IPFS
      2. The data must be uploaded to the blockchain using CryptoCert
      3. The data must be retrieved from the blockchain using CryptoCert
      4. The data must be used to access the IPFS and retrieve the Certificate image
      5. The data must be displayed on the website and the Certificate image must be displayed on the website

      We will need a secure route where only the insitution can access the data. This will be used to upload the data to the blockchain. this will later added as a premium feature.

      On landing to the cryptocert landing, the user will be able to see the list of all the certificates that have been uploaded to the blockchain. A search bar will be available to search for a particular certificate.

      The user will be able to click on the certificate and view the certificate image and the data that was uploaded to the blockchain. */}


    </div>
  );
}


// export async function getServerSideProps() {
//   const certificates = await contract.methods.getApproved().call();

//   console.log("casd" + ( await contract.methods.getApproved().call()));

//   return {
//     props: { certificates },
//   };
// }
