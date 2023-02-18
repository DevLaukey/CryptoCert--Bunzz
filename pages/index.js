import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CardGrid from "../components/CardGrid";
import certContext from "../context/cert_context";

export default function Home() {
  const web3 = useContext(certContext).web3;
  const contract = useContext(certContext).contract;
  const address = useContext(certContext).address;
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    if (web3 && contract) {
      let certCount = 0;
      contract.methods
        .totalSupply()
        .call()
        .then((count) => {
          for (let i = 0; i < count; i++) {
            contract.methods
              .tokenByIndex(certCount)
              .call()
              .then((token) => {
                contract.methods
                  .tokenURI(token)
                  .call().then((tokenURI) => {
                    console.log(tokenURI);
                  })
              });
            
            certCount +=1;
            console.log(certCount);
          }
        })
        .catch((err) => console.log(err.message));
    }
  }, []);

  console.log(certificates);
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
