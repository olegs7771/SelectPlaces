import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';

import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
class MapLocation extends Component {
  state = {
    focusedRegion: {
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };
  componentDidMount() {
    if (Platform.OS === 'android') {
      this.requestLocationPermission();
    } else {
      this._getCurrentLocation();
    }
  }
  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'MyMapApp needs access to your location',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this._getCurrentLocation();
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  _getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        this.setState(prevState => {
          return {
            focusedRegion: {
              ...prevState.focusedRegion,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          };
        });
      },
      error => {
        this.setState({error: error.message});
      },
      {enableHighAccuracy: true, timeout: 200000, maximumAge: 1000},
    );
  };

  render() {
    console.log('this.state', this.state);
    if (this.state.focusedRegion.latitude) {
      return (
        <View style={styles.container}>
          <MapView
            initialRegion={this.state.focusedRegion}
            style={styles.map}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>Loading..</Text>
        </View>
      );
    }
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
