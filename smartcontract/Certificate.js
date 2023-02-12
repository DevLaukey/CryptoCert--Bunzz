import abi from "./contract_abi.json";

const { ethers } = require("ethers");

// Connect to blockchain
const provider = new ethers.providers.Web3Provider(window.ethereum);

// Contract ABI (Copy from the Bunzz Interface)
const contractABI = abi;

// Contract address (Copy from the Bunzz Interface)
const contractAddress = "0x8f9c63b1abF719b644367492131D3e06bCA2D756";

// Create contract instance
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Call a read function
const value = await contract.getValue();

// Call a write function
const signer = await provider.getSigner();
await contract.connect(signer).setValue(5);
