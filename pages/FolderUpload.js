import { useState } from "react"
import axios from "axios"

const FolderUpload = () => {

    const [selectedFile, setSelectedFile] = useState();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files);
    };

    const handleSubmission = async () => {

        const formData = new FormData();

        Array.from(selectedFile).forEach((file) => {
            formData.append("file", file)
        })

        const metadata = JSON.stringify({
            name: 'Folder name',
        });
        formData.append('pinataMetadata', metadata);

        const options = JSON.stringify({
            cidVersion: 0,
        })
        formData.append('pinataOptions', options);

        try {
            const res = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                    'pinata_api_key': `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
                    'pinata_secret_api_key': `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`,
                    "Content-Type": "multipart/form-data"
                },
            })
            console.log(res.data);
            const ImgHash = `ipfs://${res.data.IpfsHash}`;
            console.log(ImgHash);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <label class="form-label">choose Folder</label>
            <input directory="" webkitdirectory="" type="file" onChange={changeHandler} />
            <button onClick={handleSubmission}>Submit</button>
        </>
    )
}

export default FolderUpload