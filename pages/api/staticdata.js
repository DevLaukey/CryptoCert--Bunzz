const fs = require('fs');
const csv = require('csv-parser');

export default async function handler(req, res) {
    const filename = req
    const images = req.body.images;
    let combined_data;

    // cleanData(filename)
    //     .then((students) => {
    //         const student_json = JSON.stringify(students);


    //         function mapper(images, student_json) {
    //             let sj = JSON.parse(student_json);
    //             for (let i = 0; i < sj.length; i++) {
    //                 sj[i].imageUrl = images[i].url
    //             }

    //             return sj;
    //         }


    //        combined_data =(mapper(images, student_json));
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
    res.json({
        status: 200,
        success: true,
        message: "success",
        results: filename,
    });

}

function cleanData(filename) {
    let students = [];
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


