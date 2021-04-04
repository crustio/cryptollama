import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function TabOneScreen(props: { location: string; }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestPermissionsAsync();
            if (status != 'granted') {
                setErrorMsg('Access location permission denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            // @ts-ignore
            setLocation(location);
        })();
    }, []);

    let msg = 'Waiting...';
    if (errorMsg) {
        msg = errorMsg;
    } else if (location) {
        msg = JSON.stringify(location);
    }


  return (
      <View style={styles.container}>
        <Text style={styles.title}>Tab One</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <EditScreenInfo location={msg}/>
      </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
