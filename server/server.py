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
@app.route('/nft', methods=['GET'])
def createNFT():
    color = request.args.get("color")
    nft_uri = ""
    if color == "pink":
        nft_uri = "https://testnets.opensea.io/assets/0x8ec2877a04570f6f7af4dc02b18197e8c74e5d20/1"
    else:
        nft_uri = "https://testnets.opensea.io/assets/0x8ec2877a04570f6f7af4dc02b18197e8c74e5d20/0"
    response = make_response({"nft_uri": nft_uri}, 200)
    return response


