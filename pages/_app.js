import '../styles/globals.css'
import Web3 from "web3";
import abi from "../smartcontract/contract_abi.json"
import certContext from '../context/cert_context'
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [address, setAddress] = useState("")
  const [contract, setContract] = useState("")
  const [web3, setWeb3] = useState("")


  useEffect(() => {
    const contractAddress = "0xFd34c62A91BdE0de7eBcf9b56f36FDee69874340"
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
  console.log(address, contract, web3)
  return (<certContext.Provider value={{ address, contract, web3 }}>
    <Component {...pageProps} />
  </certContext.Provider>)
}

export default MyApp
