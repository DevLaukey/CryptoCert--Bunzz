import React, { useState } from "react";

const FileUpload = () => {
  const [files, setFile] = useState([]);
  const [message, setMessage] = useState();
  const handleFile = (e) => {
    setMessage("");
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setFile([...files, file[i]]);
      } else {
        setMessage("only images accepted");
      }
    }
  };
  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
  };

  async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

    //the transaction
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce: nonce,
      gas: 500000,
      maxPriorityFeePerGas: 1999999987,
      data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
    };

    //step 4: Sign the transaction
    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    const transactionReceipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);

  }
mintNFT(
  "https://gateway.pinata.cloud/ipfs/Qmeou5f7ttU98n96mYWfYzKHV7pfRe5rcZBhYznHZCUV7M"
);

  console.log(files);
  return (
    <>
      <div class="flex items-center justify-center w-3/4">
        <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">
          {message}
        </span>

        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              class="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            onChange={handleFile}
            type="file"
            class="hidden"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {files.map((file, key) => {
              return (
                <div key={key} className="overflow-hidden relative">
                  <i
                    onClick={() => {
                      removeImage(file.name);
                    }}
                    className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer"
                  ></i>
                  <img
                    className="h-20 w-20 rounded-md"
                    src={URL.createObjectURL(file)}
                  />
                </div>
              );
            })}
          </div>
        </label>
        
          </div>
          
    </>
  );
};

export default FileUpload;
