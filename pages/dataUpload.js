import React, { useState } from 'react'

const dataUpload = () => {
    const [imgsSrc, setImgsSrc] = useState([]);
    const [fileSrc, setFileSrc] = useState([]);     // for certificate upload
    const onImgChange = (e) => {
        for (const file of e.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImgsSrc((imgs) => [...imgs, reader.result]);
            };
            reader.onerror = () => {
                console.log(reader.error);
            };
        }
    };

    const onCertUpload = (e) => {
        for (const file of e.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFileSrc((imgs) => [...imgs, reader.result]);
            };
            reader.onerror = () => {
                console.log(reader.error);
            };
        }
    }
    console.log(imgsSrc, imgsSrc.length, fileSrc);
    return (
        <div>
            <section class="container mx-auto max-w-screen-lg h-full">
                <article aria-label="File Upload Modal" class="relative h-full flex flex-col bg-white shadow-xl rounded-md" >

                    <section class="h-full overflow-auto p-8 w-full flex flex-col">
                        <div class="w-full flex justify-between">

                        <div class="border-dashed border-2 w-full border-gray-400 py-12 flex flex-col justify-center items-center">
                            <p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                                <span>Choose Cert</span>&nbsp;<span>Images</span>
                            </p>
                            <input onChange={onImgChange} type="file" name="file" multiple />
                        </div>

                      
                            <div class="border-dashed border-2 w-full border-gray-400 py-12 flex flex-col justify-center items-center">
                                <p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                                    <span>Choose Cert</span>&nbsp;<span>Excel Sheet as CSV file</span>
                                </p>
                                <input onChange={onCertUpload} type="file" name="file" multiple />
                            </div>
                        </div>

                            <h1 class="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                                To Upload
                            </h1>



                     

                        <ul id="gallery" class="flex flex-1 flex-wrap -m-1">
                            {imgsSrc.length !== 0 ?

                                imgsSrc.map((link) => (
                                    <img class="mx-auto w-36" src={link} />
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
            <section class="container mx-auto max-w-screen-lg h-full">
                <article aria-label="File Upload Modal" class="relative h-full flex flex-col bg-white shadow-xl rounded-md" >


                    <footer class="flex justify-end px-8 pb-8 pt-4">
                        <button id="submit" class="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none">
                            Upload now
                        </button>
                        <button id="cancel" class="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                            Cancel
                        </button>
                    </footer>
                </article>
            </section>
        </div>)
    {/* <input onChange={onChange} type="file" name="file" multiple />
{imgsSrc.map((link) => (
    <img src={link} />
))} */}
}

export default dataUpload