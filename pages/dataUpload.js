import axios from 'axios';
import csvParser from 'csv-parser';
import FormData from 'form-data';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Back from '../components/Back';
import * as XLSX from 'xlsx';

const dataUpload = () => {
    const [imgsSrc, setImgsSrc] = useState([]);
    const [loading, setLoading] = useState(false); // for image upload
    const [fileImages, setFileImages] = useState(null); // for image upload
    const [file, setFile] = useState(null);
    const [imageName, setImageName] = useState([]);
    const onImgChange = (e) => {
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
        };
    }


    function mapper(images, student_json) {
        // student_json.sort()
        images.sort()
        
        for (let i = 0; i < student_json.length-1; i++) {
            student_json[i].imageUrl = images[i]
            
        }
        console.log(student_json);
    }




    // function cleanData(filename) {
    //     let students = [];

    //     let cleaned_data = [];

    //     return new Promise((resolve, reject) => {
    //         fs.createReadStream(filename)
    //             .pipe(csvParser())
    //             .on('data', (data) => {
    //                 students.push(data);
    //             })
    //             .on('end', () => {
    //                 for (let i = 0; i < students.length; i++) {
    //                     delete students[i][''];
    //                     if (Object.values(students[i]).every(val => val !== '')) {
    //                         cleaned_data.push(students[i]);
    //                     }
    //                 }
    //                 resolve(cleaned_data);
    //             })
    //             .on('error', (error) => {
    //                 reject(error);
    //             });
    //     });
    // }

    const onCertUpload = async (e) => {
        let file = e.target.files[0];

        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryString = event.target.result;
            const workbook = XLSX.read(binaryString, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            setFile(XLSX.utils.sheet_to_json(worksheet));
        };
        reader.readAsBinaryString(file);


    }
    // if (!file) {
    //     console.log("no file")
    // }
    // const formData = new FormData();
    // formData.append("file", file)


    // axios('/api/staticdata', {
    //     method: 'POST',
    //     body: formData,
    //     // 👇 Set headers manually for single file upload

    // }).then((res) => {
    //     console.log(res)
    // }).catch((err) => { console.log(err) })

    // cleanData(e.target.files[0])
    //     .then((students) => {
    //         const student_json = JSON.stringify(students);

    //         const images = fileImages
    //         function mapper(images, student_json) {
    //             let sj = JSON.parse(student_json);
    //             for (let i = 0; i < sj.length; i++) {
    //                 sj[i].imageUrl = images[i].url
    //             }

    //             return sj;
    //         }


    //         console.log(mapper(images, student_json));
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });

    const sendFileToIPFS = async (e) => {
        e.preventDefault();

        for (const fileImg of fileImages) {
            if (fileImg) {
                try {
                    setLoading(true);
                    const formData = new FormData();

                    formData.append("file", fileImg)

                    const metadata = JSON.stringify({
                        name: 'Laukey Mwaura ',
                        school: 'Dedan Kimathi University of Technology',
                        year: '2021',
                        description: 'This is a certificate of completion for the course on Blockchain Technology',

                    });
                    formData.append('pinataMetadata', metadata);

                    const options = JSON.stringify({
                        cidVersion: 0,
                    })
                    formData.append('pinataOptions', options);

                    const resFile = await axios({
                        method: "post",
                        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                        data: formData,
                        headers: {
                            'pinata_api_key': `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
                            'pinata_secret_api_key': `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`,
                            "Content-Type": "multipart/form-data"
                        },
                    }).then((res) => {

                        console.log(res.data.IpfsHash)
                        setLoading(false);
                        toast.success(`File Uploaded Successfully to ipfs://${res.data.IpfsHash}`, {
                            position: toast.POSITION.TOP_CENTER,
                        });

                    });

                    const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                    console.log(ImgHash);
                    //Take a look at your Pinata Pinned section, you will see a new file added to you list.   



                } catch (error) {
                    console.log("Error sending File to IPFS: ")
                    toast.error(`Error sending File to IPFS: ${error}`, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
            }
        }




    }

    const clearFrom = () => {
        setFileImages(null);
    }
    return (
        <>
            <ToastContainer />
            {loading ?
                toast.loading(`Uploading to IPFS`, {
                    position: toast.POSITION.TOP_CENTER,
                })

                : null}
            <Back />
            <div className='flex flex-col flex-wrap justify-center items-center' >
                <section class="container mx-auto max-w-screen-lg h-full ">
                    <article aria-label="File Upload Modal" class="relative h-full flex  bg-white shadow-xl rounded-md" >

                        <section class="h-full overflow-auto p-8 w-full">
                            <div class="w-full flex flex-wrap md:flex-nowrap lg:flex-nowrap justify-between">

                                <div class="border-dashed border-2 w-full border-gray-400 py-12 flex flex-col justify-center items-center">
                                    <p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                                        <span>Choose Cert</span>&nbsp;<span>Images</span>
                                    </p>
                                    <input onChange={(e) => {
                                        onImgChange(e);
                                    }} type="file" name="file" multiple />
                                </div>
                                <div class="border-dashed border-2 w-full border-gray-400 py-12 flex flex-col justify-center items-center">
                                    <p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                                        <span>Choose Cert</span>&nbsp;<span>Excel Sheet as CSV file</span>
                                    </p>
                                    <input onChange={(e) => {
                                        onCertUpload(e);

                                    }} type="file" name="file" />
                                </div>
                            </div>
                            <h1 class="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                                To Upload
                            </h1>
                            <ul id="gallery" class="flex flex-1 flex-wrap -m-1">
                                {imgsSrc.length !== 0 ?
                                    imgsSrc.map((link, key) => (
                                        <img class="mx-auto w-36" src={link} key={key} />
                                    ))
                                    : (
                                        <li id="empty" class="h-full w-full text-center flex flex-col items-center justify-center ">
                                            <img class="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
                                            <span class="text-small text-gray-500">No files selected</span>
                                        </li>)}
                            </ul>
                        </section>
                    </article>
                </section>
                {/* <form onSubmit={sendFileToIPFS}>
                <input type="file" onChange={(e) => setFileImg(e.target.files[0])} required />
                <button type='submit' >Mint NFT</button>
            </form> */}
                <section class="container mx-auto max-w-screen-lg h-full">
                    <article aria-label="File Upload Modal" class="relative h-full flex flex-col bg-white shadow-xl rounded-md" >
                        <footer class="flex justify-end px-8 pb-8 pt-4">
                            <button id="submit" class="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none" onClick={()=>mapper(imageName, file)}>
                                Upload now
                            </button>
                            <button onClick={clearFrom} id="cancel" class="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                                Cancel
                            </button>
                        </footer>
                    </article>
                </section>
            </div>
        </>
    )

}

export default dataUpload

