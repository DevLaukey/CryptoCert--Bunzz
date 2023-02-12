This is how I used Bunzz  

# Prepare the metadata for your tokens and upload them to a centralized solution like s3.
# When deploying the contract, you need to prepare 3 arguments, the first argument is a string and represents the name of the token, the second argument is a string and represent the symbol of the token, the third argument represents the base URI of the collection metadata.
# After you upload your metadata on s3 in return you will receive a link
# The link represent the your metadata identifier and needs to be used during minting
# Call the “safeMint” function (it can only be called by the owner), with the first argument representing the address that will receive the nft, and the second argument is the web link that represent the metadata identifier inside the contract.
# The metadata of a token can be retrieved by calling the “tokenURI” function, which the only argument being the id of the token.
# A user can call the “transfer” function to transfer his nft’s to another user
# A user can call “transferFrom” function to transfer nft’s from one user to another if he was approved by the owner of the nft