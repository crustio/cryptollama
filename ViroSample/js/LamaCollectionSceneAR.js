'use strict';

import React, { Component } from 'react';

import { StyleSheet,Alert, Linking } from 'react-native';

import { mercatorLatLonToMetersCoord } from "./services"

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  ViroAmbientLight,
  ViroSpotLight,
  ViroNode,
  ViroAnimations,
} from 'react-viro';

// Current position for testing purpose, change this to your location
const LAT = 43.64908;
const LONG = -79.39208;

// const backend_url = "http://127.0.0.1:5000";
const backend_url = "http://yuchen-allocate-local.ngrok.io";

export default class LamaCollectionSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing ...",

      // My current location
      mLat: null,
      mLong: null,

      // Backend generated location to place lama
      lat: null,
      long: null,

      lamaCollected: false,
      lamaNFTUrl: null,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  getNFTLocation = () => {
    const { mLat, mLong } = this.state;

    fetch(`${backend_url}/coordinates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // TODO Replace this LONG and LAT with real data got from the device (mLat, mLong)
      body: JSON.stringify({longitude: LONG, latitude: LAT}),
    }).then(response => response.json())
    .then(data => {
      this.setState({
        lat: data.latitude,
        long: data.longitude,
      })
    }).catch((error) => {
      Alert.alert(`Failed to got location with error: ${JSON.stringify(error)}`);
    });
  }

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          mLat: position.coords.latitude,
          mLong: position.coords.longitude,
        }, this.getNFTLocation);
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  componentWillMount() {
    // Geo location will only work when tested in compiled native android app
    this.findCoordinates();

    // This is temp for testing
    this.getNFTLocation();
  }

  onLamaClick = () => {
    this.setState({
      lamaCollected: true
    });

    // TODO Send request to create NFT, get a url back in response linking to the created NFT
    fetch(`${backend_url}/nft`, {
      method: 'GET',
    }).then(response => response.json())
    .then(data => {
      Alert.alert(
        "Llama collected!",
        "Congrats! You've just found a Llama NFT!",
        [{
          text: "View it now!",
          onPress: () => this.handleViewNFTClick(data.nft_uri),
        }]
      )
      this.setState({ lamaNFTUrl: data.nft_uri });
    }).catch((error) => {
      Alert.alert(`Failed request NFT with error: ${JSON.stringify(error)}`);
    });
  }

  handleViewNFTClick = (nftUrl) => {
    Linking.canOpenURL(nftUrl).then(supported => {
      if (supported) {
        Linking.openURL(nftUrl);
      } else {
        Alert.alert("OOPS sorry, we fail to open URI: " + this.props.url);
      }
    });
  };

  render() {
    const { lamaCollected, lamaNFTUrl, lat, long } = this.state;

    let x = 0;
    let y = 0;
    let z = -1; // Place object 1 meter in front of viewer, as user faces neg z-axis

    // translate image card to xy, this function take in lat/long degree and outputs point in pixels
    const objPos = mercatorLatLonToMetersCoord({lat: lat, lng: long});

    // translate current device position to a lat/lng
    const currentDevicePos = mercatorLatLonToMetersCoord({lat:LAT, lng:LONG});

    x = objPos.x - currentDevicePos.x;
    z = - (objPos.y - currentDevicePos.y); // User faces negative z-axis

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0,-1,-.2]}
          position={[0, 3, 1]}
          color="#ffffff"
          castsShadow={true}
        />

        {lat && long && (
            <ViroText // title text
              text={this.state.text}
              scale={[.5, .5, .5]}
              position={[x, y, z]}
              style={styles.helloWorldTextStyle}
            />
        )}

        {lat && long && !lamaCollected && (
          <ViroNode
            position={[x, y - 0.5, z]} // put object below title text
            dragType="FixedToWorld"
            onDrag={() => {
            }}
            onClick={this.onLamaClick}
          >
            <ViroBox
              position={[0, 0, 0]}
              scale={[.3, .3, .1]}
              materials={["grid"]}
              animation={{name: "rotate", run: true, loop: true}}
            />
          </ViroNode>
        )}

        {lamaCollected && lamaNFTUrl && (
          <NFTModal
             nftUrl={lamaNFTUrl}
          />
        )}
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "You just found a llama!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
  container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	}
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/cryptollama.png'),
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250, //.25 seconds
  },
});

module.exports = LamaCollectionSceneAR;
