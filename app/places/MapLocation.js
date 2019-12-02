import React, {Component} from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import MapView from 'react-native-maps';

class MapLocation extends Component {
  state = {
    focusedRegion: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        />
      </View>
    );
  }
}

export default MapLocation;
const styles = StyleSheet.create({
  container: {},
  map: {
    width: '100%',
    height: 200,
  },
});
