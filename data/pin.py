import requests
import json
from pinata_sdk import PinataIpfsApiClient

# initialize the Pinata SDK client
pinata = PinataIpfsApiClient(
    api_key='<YOUR_API_KEY>', api_secret='<YOUR_API_SECRET>')

# upload the image file to Pinata
with open('<PATH_TO_IMAGE_FILE>', 'rb') as f:
    image_file = pinata.pin_file_to_ipfs(f)

# define the metadata for the image
metadata = {
    'name': '<IMAGE_NAME>',
    'description': '<IMAGE_DESCRIPTION>',
    'author': '<AUTHOR_NAME>'
}

# upload the metadata to Pinata
metadata_json = json.dumps(metadata)
metadata_file = pinata.pin_json_to_ipfs(metadata_json)

# combine the image and metadata hashes into a single Pinata pin
pinata_response = pinata.pin_hash_to_ipfs(
    image_file['IpfsHash'], metadata_file['IpfsHash'])

# retrieve the Pinata link from the response
pinata_link = pinata_response['IpfsHash']
print('Pinata link:', f'https://gateway.pinata.cloud/ipfs/{pinata_link}')
