import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import certContext from "../context/cert_context";
import axios from "axios";
import IndividualCert from "../components/IndividualCert";

export default function Home() {

  const web3 = useContext(certContext).web3;
  const contract = useContext(certContext).contract;
  const address = useContext(certContext).address;
  const [uri, setURI] = useState([]);

  useEffect(() => { 
    if (web3 && contract) {
      contract.methods
        .totalSupply()
        .call()
        .then((count) => {
          console.log(count)
          for (let i = 1; i < count; i++) {
            contract.methods
              .tokenByIndex(i)
              .call()
              .then((token) => {
                contract.methods
                  .tokenURI(token)
                  .call().then((data) => {
                    const cleanHash = data.replace('ipfs://', '');
                    getCertDetails(cleanHash);

                  })
              }).catch((err) => console.log(err.message));

            console.log(uri);
          }        })
        .catch((err) => console.log(err.message));
    }
    else {
      console.log("web3 or contract not found");
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3, contract, address]);


  async function getCertDetails(hashid) {
    console.log(hashid)
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
    const response = await axios.get(
   `https://api.pinata.cloud/data/pinList?status=pinned&pinSizeMin=100&hashContains=${hashid}`,
      axiosConfig
    );

    setURI((prev) => [...prev, response.data.rows[0]]);
  
    
  }

  return (
    <div>
      <Navbar setURI={setURI} />
      <div class="container my-12 mx-auto px-4 md:px-12">
        <div class="flex flex-wrap -mx-1 lg:-mx-4">
          {uri.length !== 0 ? (
            uri.map((data, key) => (

              <IndividualCert data={data} key={key} />
            ))
          ) : (
            <h2>Loading placeholder</h2>
          )}
        </div>
      </div>
    </div>
  );
}

