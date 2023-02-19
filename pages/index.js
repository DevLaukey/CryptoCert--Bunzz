import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CardGrid from "../components/CardGrid";
import certContext from "../context/cert_context";

export default function Home() {
  const web3 = useContext(certContext).web3;
  const contract = useContext(certContext).contract;
  const address = useContext(certContext).address;
  const [certificates, setCertificates] = useState([]);
  const [uri, setURI] = useState([]);

  useEffect(() => {
    if (web3 && contract) {
      contract.methods
        .totalSupply()
        .call()
        .then((count) => {
         getCertificates(count);
        })
        .catch((err) => console.log(err.message));
    }
    else {
      console.log("web3 or contract not found");
    }
  }, []);

  function getCertificates(count) {
    for (let i = 1; i <= count; i++) {
      contract.methods
        .tokenByIndex(i)
        .call()
        .then((token) => {
          contract.methods
            .tokenURI(token)
            .call().then((data) => {
              console.log(data);
              setURI((prev) => [...prev, data]);
            })
        }).catch((err) => console.log(err.message));

      console.log(uri);
    }
  }




  // console.log(certificates);
  return (
    <div>
      <Navbar />
      <CardGrid />
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
