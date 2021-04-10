'use strict';

import React, { Component } from 'react';

import { StyleSheet,Alert } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  ViroAmbientLight,
  ViroSpotLight,

  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
} from 'react-viro';

const LAT = 43.64908009505727;
const LONG = -79.39208006695965;
const backend_url = "http://127.0.0.1:5000";

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing ...",

      // My current location
      location: null,

      // Backend generated location to place lama
      lat: null,
      long: null,

      lamaCollected: false,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        Alert.alert(`Got location ${position}`)
        this.setState({ location });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  componentWillMount() {
    // Geo location will only work when tested in compiled native android app
    this.findCoordinates();

    // TODO Replace LONG and LAT with real data got from the device
    fetch(`${backend_url}/coordinates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({longitude: LONG, latitude: LAT}),
    }).then(response => response.json())
    .then(data => {
      Alert.alert(`Got location ${JSON.stringify(data)}`)

      this.setState({
        lat: data.latitude,
        long: data.longitude,
      })
    }).catch((error) => {
      Alert.alert(`Failed to got location with error: ${JSON.stringify(error)}`);
    });
  }

  onLamaClick = () => {
    this.setState({
      lamaCollected: true
    });

    // TODO Send request to create NFT, get a url back in response linking to the created NFT
    fetch(`${backend_url}/nft`, {
      method: 'POST',
    }).then(response => response.json())
    .then(data => {
      Alert.alert(`Got response ${JSON.stringify(data)}`)
    }).catch((error) => {
      Alert.alert(`Failed request NFT with error: ${JSON.stringify(error)}`);
    });
  }

  render() {
    const { lamaCollected, lat, long } = this.state;

    // TODO Convert lat/long to world coordinate

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />

        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

        {!lamaCollected && (
          <ViroNode position={[0,-.5,-1]} dragType="FixedToWorld" onDrag={()=>{}} onClick={this.onLamaClick}>
            <ViroBox
                position={[0, -.5, -1]}
                scale={[.3, .3, .1]}
                materials={["grid"]}
                animation={{name: "rotate", run: true, loop: true}}
            />
          </ViroNode>
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

module.exports = HelloWorldSceneAR;
