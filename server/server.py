from flask import Flask, make_response, request
import logging
import random
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

    # Randomly return new location of 1 meter to the user's front, right, back, or left (0.00001 degree ~= 1.1m)
    # TODO replace this with smart contract random number
    new_long = device_longitude + random.choice([-0.00001, 0.00001])
    new_lat = device_latitude + random.choice([-0.00001, 0.00001])

    # Printing lama location for debugging
    location = ""
    if new_lat == device_latitude + 0.00001 and new_long == device_longitude + 0.00001:
        location = "To your front + 1m, right + 1m"
    elif new_lat == device_latitude - 0.00001 and new_long == device_longitude + 0.00001:
        location = "To your back + 1m, right + 1m"
    elif new_lat == device_latitude + 0.00001 and new_long == device_longitude - 0.00001:
        location = "To your front + 1m, left + 1m"
    elif new_lat == device_latitude - 0.00001 and new_long == device_longitude - 0.00001:
        location = "To your back + 1m, left + 1m"

    print(location)
    coordinates = {"longitude": new_long, "latitude": new_lat}

    response = make_response(coordinates, 200)
    return response


# create NFT token
@app.route('/nft', methods=['POST'])
def createNFT():
    request_data = request.json
    response = make_response({"nft_uri": "https://ipfs.io/ipfs/QmZGQA92ri1jfzSu61JRaNQXYg1bLuM7p8YT83DzFA2KLH?filename=Chainlink_Knight.png"}, 200)
    return response


