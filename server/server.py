from flask import Flask, make_response, request
import logging
import json
from web3 import Web3

app = Flask(__name__)
logger = logging.getLogger(__name__)

# retrieve random location
@app.route('/coordinates', methods=['POST'])
def randomCoordinates():
    request_data = request.json
    device_longitude = request_data.get("longitude")
    device_latitude = request_data.get("latitude")
    # Echo user's current location for now
    coordinates = {"longitude": device_longitude, "latitude": device_latitude}
    # TODO: hook contract to generate
    response = make_response(coordinates, 200)
    return response


# create NFT token
@app.route('/nft', methods=['POST'])
def createNFT():
    request_data = request.json
    response = make_response({"nft_uri": "https://ipfs.io/ipfs/QmZGQA92ri1jfzSu61JRaNQXYg1bLuM7p8YT83DzFA2KLH?filename=Chainlink_Knight.png"}, 200)
    return response


