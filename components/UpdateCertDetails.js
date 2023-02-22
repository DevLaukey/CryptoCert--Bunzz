import React from 'react'

const UpdateCertDetails = ({CID}) => {

    const [newName, setNewName] = React.useState('');
    const [newKey, setNewKey] = React.useState('');

    async function updateCertDetails() {
        var data = JSON.stringify({
            "ipfsPinHash": CID,
            "name": newName,
            "keyvalues": {
                "anewkeyk": "anewvalue"
            }
        });

        var config = {
            method: 'put',
            url: 'https://api.pinata.cloud/pinning/hashMetadata',
            headers: {
                'Authorization': 'Bearer PINATA JWT',
                'Content-Type': 'application/json'
            },
            data: data
        };

        const res = await axios(config);

        console.log(res.data);
    }
    return (
        <div>UpdateCertDetails</div>
    )
}

export default UpdateCertDetails