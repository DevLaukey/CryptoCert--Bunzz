import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function Xlsx() {
    const [file, setFile] = useState();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFile(file);
    };

    const handleFileRead = () => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryString = event.target.result;
            const workbook = XLSX.read(binaryString, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            console.log(XLSX.utils.sheet_to_json(worksheet));
        };
        reader.readAsBinaryString(file);
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
            <button onClick={handleFileRead}>Read File</button>
        </div>
    );
}

export default Xlsx;
