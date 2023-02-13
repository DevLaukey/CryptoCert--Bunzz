This is how I used Bunzz  

# Prepare the metadata for your tokens and upload them to a centralized solution like s3.
# When deploying the contract, you need to prepare 3 arguments, the first argument is a string and represents the name of the token, the second argument is a string and represent the symbol of the token, the third argument represents the base URI of the collection metadata.
# After you upload your metadata on s3 in return you will receive a link
# The link represent the your metadata identifier and needs to be used during minting
# Call the “safeMint” function (it can only be called by the owner), with the first argument representing the address that will receive the nft, and the second argument is the web link that represent the metadata identifier inside the contract.
# The metadata of a token can be retrieved by calling the “tokenURI” function, which the only argument being the id of the token.
# A user can call the “transfer” function to transfer his nft’s to another user
# A user can call “transferFrom” function to transfer nft’s from one user to another if he was approved by the owner of the nft




      The data must first be prepared: ie the Certificate images created and stored on IPFS and metadata of the data stord in tabular form 

      the data will be link to the Certificate image and some data describing the name, course, grade etc.

      This prepare data will then be uploaded to the blockchain using CryptoCert. This will be a link of the prepared data that was uploaded to the IPFS and some data concerning those certs. ie the Year, school etc.

      This will be pushed to the blockchain and later accessible. 

      For a student, to access their Certificate... They will pass thier contract ID + their unique school Identification number. This will be used to access the data on the blockchain. 

      The data will be retrieved and the data will be used to access the IPFS and retrieve the Certificate image. On the website ie: https://cryptocert.vercel.app/ the data will be displayed and the Certificate image will be displayed.


      For this to work, 
      1. The data must be prepared and uploaded to IPFS
      2. The data must be uploaded to the blockchain using CryptoCert
      3. The data must be retrieved from the blockchain using CryptoCert
      4. The data must be used to access the IPFS and retrieve the Certificate image
      5. The data must be displayed on the website and the Certificate image must be displayed on the website

      We will need a secure route where only the insitution can access the data. This will be used to upload the data to the blockchain. this will later added as a premium feature.

   On landing to the cryptocert landing, the user will be able to see the list of all the certificates that have been uploaded to the blockchain. A search bar will be available to search for a particular certificate.

    The user will be able to click on the certificate and view the certificate image and the data that was uploaded to the blockchain.
