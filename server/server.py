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
    coordinates = {"longitude": 37.785834, "latitude": -122.406417}
    # TODO: hook contract to generate
    response = make_response(coordinates, 200)
    return response


# create NFT token
@app.route('/nft', methods=['POST'])
def createNFT():
    request_data = request.json
    response = make_response("OK", 200)
    return response


