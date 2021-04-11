from flask import Flask, make_response, request
import logging
import random

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

# A welcome message to test our server
@app.route('/')
def index():
    return "<h1>Crypto Llama server!!</h1>"


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)

