const fs = require('fs');
const csv = require('csv-parser');

const filename = 'data.csv';

let students = [];
const Moralis = require("moralis").default;

async function uploadToIpfs() {

    await Moralis.start({
        apiKey: "d6T5dpnyTp3esuqPDHOwtUopWTnyUuWjrJqalQVU8iUBxUpc1LlknselhwB99FSu",
    });
}

function cleanData(filename) {
    let cleaned_data = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filename)
            .pipe(csv())
            .on('data', (data) => {
                students.push(data);
            })
            .on('end', () => {
                for (let i = 0; i < students.length; i++) {
                    delete students[i][''];
                    if (Object.values(students[i]).every(val => val !== '')) {
                        cleaned_data.push(students[i]);
                    }
                }
                resolve(cleaned_data);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

cleanData(filename)
    .then((students) => {
        const student_json = JSON.stringify(students);

        const images = [
            { "url": "https://gateway.pinata.cloud/ipfs/QmZKvtY8eJcm1QVAzFQTBGQrRdCZ3jJRrRpKmd87cVY7wC/" },
            { "url": "https://gateway.pinata.cloud/ipfs/QmZKvtY8eJcm1QVAzFQTBGQrRdCZ3jJRrRpKmd87cVY7wC/" },
            { "url": "https://gateway.pinata.cloud/ipfs/QmZKvtY8eJcm1QVAzFQTBGQrRdCZ3jJRrRpKmd87cVY7wC/" }
        ];

        function mapper(images, student_json) {
            let sj = JSON.parse(student_json);
            for (let i = 0; i < sj.length; i++) {
                sj[i]['image-url'] = images[i].url;
            }

            return sj;
        }

        console.log(mapper(images, student_json));
    })
    .catch((error) => {
        console.error(error);
    });

    //   <div class="border-dashed border-2 w-full border-gray-400 py-12 flex flex-col justify-center items-center">
                            //     <p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                            //         <span>Choose Cert</span>&nbsp;<span>Excel Sheet as CSV file</span>
                            //     </p>
                            //     <input onChange={onCertUpload} type="file" name="file" multiple />
                            // </div >