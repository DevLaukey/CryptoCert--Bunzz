import FileUpload from "../components/FileUpload";


export default function Home() {
  return (
    <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
      Intro and instructions of the application // File drop
      <FileUpload />
    </div>
  );
}
