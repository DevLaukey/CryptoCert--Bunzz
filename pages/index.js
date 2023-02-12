import FileUpload from "../components/FileUpload";
import contract from "../smartcontract/Certificate";


export default function Home() {
  return (
    <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
      Intro and instructions of the application // File drop
      <FileUpload />
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