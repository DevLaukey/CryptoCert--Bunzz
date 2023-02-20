import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CardGrid from "../components/CardGrid";
import certContext from "../context/cert_context";

export default function Home() {

  // const [certificates, setCertificates] = useState([]);
  const web3 = useContext(certContext).web3;
  const contract = useContext(certContext).contract;
  const address = useContext(certContext).address;
  console.log(address);
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
      <CardGrid uri={uri} />
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

// export async function getStaticProps() {
//   // const web3 = useContext(certContext).web3;
//   // const contract = useContext(certContext).contract;
//   // const address = useContext(certContext).address;

//   if (web3 && contract) {
//     contract.methods
//       .totalSupply()
//       .call()
//       .then((count) => {
//         getCertificates(count);
//       })
//       .catch((err) => console.log(err.message));
//   }
//   else {
//     console.log("web3 or contract not found");
//   }

//   // Call an external API endpoint to get posts
//   const res = axios.get()
//   const certificates = await res.json()


//   return {
//     props: {
//       certificates,
//     },
//   }

  
// }