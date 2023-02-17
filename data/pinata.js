const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('<YOUR_API_KEY>', '<YOUR_API_SECRET>');

// upload the image file to Pinata
const fs = require('fs');
const readableStreamForFile = fs.createReadStream('<PATH_TO_IMAGE_FILE>');
const options = {
    pinataMetadata: {
        name: '<IMAGE_NAME>',
        keyvalues: {
            description: '<IMAGE_DESCRIPTION>',
            author: '<AUTHOR_NAME>'
        }
    }
};
pinata.pinFileToIPFS(readableStreamForFile, options)
    .then((result) => {
        const imageHash = result.IpfsHash;
        console.log('Image hash:', imageHash);

        // upload the metadata to Pinata
        const metadata = {
            name: '<IMAGE_NAME>',
            description: '<IMAGE_DESCRIPTION>',
            author: '<AUTHOR_NAME>'
        };
        const metadataString = JSON.stringify(metadata);
        const options = {
            pinataMetadata: {
                name: 'metadata.json'
            }
        };
        pinata.pinJSONToIPFS(metadataString, options)
            .then((result) => {
                const metadataHash = result.IpfsHash;
                console.log('Metadata hash:', metadataHash);

                // combine the image and metadata hashes into a single Pinata pin
                const pinataOptions = {
                    cidVersion: 0,
                    customPinPolicy: {
                        regions: [
                            {
                                id: 'FRA1',
                                desiredReplicationCount: 2
                            },
                            {
                                id: 'NYC1',
                                desiredReplicationCount: 1
                            }
                        ]
                    }
                };
                pinata.pinHashToIPFS(imageHash, pinataOptions)
                    .then((result) => {
                        console.log('Pinata link:', 'https://gateway.pinata.cloud/ipfs/' + result.IpfsHash);
                    })
                    .catch((error) => {
                        console.error('Error combining image and metadata hashes:', error);
                    });
            })
            .catch((error) => {
                console.error('Error uploading metadata to Pinata:', error);
            });
    })
    .catch((error) => {
        console.error('Error uploading image to Pinata:', error);
    });
