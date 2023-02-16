import '../styles/globals.css'
import Web3 from "web3";
import abi from "../smartcontract/contract_abi.json"
import certContext from '../context/cert_context'
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [address, setAddress] = useState(null)
  const [contract, setContract] = useState(null)
  const [web3, setWeb3] = useState(null)


  useEffect(() => {
    const contractAddress = "0x8f9c63b1abF719b644367492131D3e06bCA2D756"
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
  return (<certContext.Provider value={{ address, contract, web3 }}>
    <Component {...pageProps} />
  </certContext.Provider>)
}

export default MyApp
