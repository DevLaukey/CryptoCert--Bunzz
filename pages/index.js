import FileUpload from "../components/FileUpload";
import contract from "../smartcontract/Certificate";


export default function Home() {
  return (
    <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
      {/* Intro and instructions of the application // File drop */}
      {/* <FileUpload /> */}

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

    The user will be able to click on the certificate and view the certificate image and the data that was uploaded to the blockchain.

    
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
