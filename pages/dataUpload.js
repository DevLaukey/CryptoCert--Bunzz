import axios from "axios";
import FormData from "form-data";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Back from "../components/Back";
import * as XLSX from "xlsx";
import Link from "next/link";
import Image from "next/image";

const DataUpload = () => {
  const [imgsSrc, setImgsSrc] = useState([]);
  const [loading, setLoading] = useState(false); // for image upload
  const [fileImages, setFileImages] = useState(null); // for image upload
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState([]);

  const [name, setName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [description, setDescription] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");

  const onImgChange = (e) => {
    for (let i = 0; i < e.target.files; i++) {
      const fileType = file[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (!validImageTypes.includes(fileType)) {
        toast.error("only images accepted", {
          position: toast.POSITION.TOP_CENTER,
        });
        setMessage("only images accepted");
      }
    }
    setFileImages(e.target.files);
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgsSrc((imgs) => [...imgs, reader.result]);
      };
      reader.onerror = () => {
        console.log(reader.error);
      };

      setImageName((imgs) => [...imgs, file.name]);
    }
  };

 
  

  const sendFileToIPFS = async (e) => {
    e.preventDefault();


    for (const fileImg of fileImages) {
      if (fileImg) {
        try {
          setLoading(true);
          const formData = new FormData();

          formData.append("file", fileImg);

          const metadata = JSON.stringify({
            name: name,
            school: schoolName,
            description: description,
          });
          console.log(metadata);
          formData.append("pinataMetadata", metadata);

          const options = JSON.stringify({
            cidVersion: 0,
          });
          formData.append("pinataOptions", options);

          const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              pinata_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
              pinata_secret_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`,
              "Content-Type": "multipart/form-data",
            },
          }).then((res) => {
            console.log(res.data.IpfsHash);
            setLoading(false);
            setIpfsHash(res.data.IpfsHash);
            toast.success(
              `File Uploaded Successfully to ipfs://${res.data.IpfsHash}`,
              {
                position: toast.POSITION.TOP_CENTER,
                autoClose: false,
              }
            );
          });

          const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
          console.log(ImgHash);
          //Take a look at your Pinata Pinned section, you will see a new file added to you list.
        } catch (error) {
          console.log("Error sending File to IPFS: ");
          toast.error(`Error sending File to IPFS: ${error.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    if (loading === true) {
      toast.loading(`Uploading to IPFS`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [file, fileImages, loading]);
  const clearFrom = () => {
    setFileImages(null);
  };
  return (
    <>
      <ToastContainer />

      <Back />
      <div className="flex flex-col flex-wrap justify-center items-center">
        <section className="container mx-auto max-w-screen-lg h-full ">
          <h1 className="text-center font-bold">
            Upload Certificate Image and Description
          </h1>
          <p>{ipfsHash && `IPFS: ${ipfsHash}`}</p>
          <h5 className="text-base mb-2 font-semibold text-gray-900 text-center">
            Copy the hash link that will be generated and upload to the
            <Link className="text-blue-400 underline ml-1" href="/uploadform">
              form here
            </Link>
          </h5>
          <article
            aria-label="File Upload Modal"
            className="relative h-full flex  bg-white shadow-xl rounded-md"
          >
            <section className="h-full overflow-auto p-8 w-full">
              <form>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="floating_first_name"
                      id="floating_first_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <label
                      for="floating_first_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Student Name
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="floating_last_name"
                      id="floating_last_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      onChange={(e) => setSchoolName(e.target.value)}
                    />
                    <label
                      for="floating_last_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      School Name
                    </label>
                  </div>
                </div>
                <div className="grid  md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <textarea
                      type="text"
                      name="floating_company"
                      id="floating_company"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <label
                      for="floating_company"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Description
                    </label>
                  </div>
                </div>
              </form>

              <div className="w-full flex flex-wrap md:flex-nowrap lg:flex-nowrap justify-between">
                <div className="border-dashed border-2 w-full border-gray-400 py-12 flex flex-col justify-center items-center">
                  <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                    <span>Choose Cert</span>&nbsp;<span>Images</span>
                  </p>
                  <input
                    onChange={(e) => {
                      onImgChange(e);
                    }}
                    type="file"
                    name="file"
                    multiple
                  />
                </div>

              </div>
              <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                To Upload
              </h1>
              <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
                {imgsSrc.length !== 0 ? (
                  imgsSrc.map((link, key) => (
                    <Image className="mx-auto w-36" src={link} key={key} alt="preview" />
                  ))
                ) : (
                  <li
                    id="empty"
                    className="h-full w-full text-center flex flex-col items-center justify-center "
                  >
                    <Image
                      className="mx-auto w-32"
                      src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                        alt="no data"
                        height={300}
                        width={300}
                    />
                    <span className="text-small text-gray-500">
                      No files selected
                    </span>
                  </li>
                )}
              </ul>
            </section>
          </article>
        </section>

        <section className="container mx-auto max-w-screen-lg h-full">
          <article
            aria-label="File Upload Modal"
            className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
          >
            <footer className="flex justify-end px-8 pb-8 pt-4">
              <button
                id="submit"
                className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
                onClick={sendFileToIPFS}
              >
                Upload now
              </button>
              <button
                onClick={clearFrom}
                id="cancel"
                className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
              >
                Cancel
              </button>
            </footer>
          </article>
        </section>
      </div>
    </>
  );
};

export default DataUpload;
