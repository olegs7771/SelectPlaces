import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectLocation} from '../../actions/placesAction';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  PermissionsAndroid,
  Button,
} from 'react-native';

import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
class MapLocation extends Component {
  state = {
    focusedRegion: {
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    locationChoosen: false,
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
  //Pick Location on the Map
  _pickLocation = e => {
    const {coordinate} = e.nativeEvent;
    console.log('coordinate', coordinate);
    this.map.animateToRegion({
      ...this.state.focusedRegion,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });

    this.setState(prevState => {
      return {
        focusedRegion: {
          ...prevState.focusedRegion,
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        },
        locationChoosen: true,
      };
    });
    const data = {
      latitude: this.state.focusedRegion.latitude,
      longitude: this.state.focusedRegion.longitude,
      latitudeDelta: this.state.focusedRegion.latitudeDelta,
      longitudeDelta: this.state.focusedRegion.longitudeDelta,
    };
    this.props.selectLocation(data);
  };

  render() {
    let marker;

    if (this.state.locationChoosen) {
      marker = <MapView.Marker coordinate={this.state.focusedRegion} />;
    } else {
      marker = null;
    }
    console.log('this.state', this.state);
    if (this.state.focusedRegion.latitude) {
      return (
        <View style={styles.container}>
          <MapView
            initialRegion={this.state.focusedRegion}
            style={styles.map}
            onPress={this._pickLocation}
            ref={ref => (this.map = ref)}>
            {marker}
          </MapView>
          {this.state.locationChoosen ? null : (
            <Button title="Pick Location On Map" color="#92abd4" />
          )}
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

export default connect(null, {selectLocation})(MapLocation);
const styles = StyleSheet.create({
  container: {},
  map: {
    width: '100%',
    height: 200,
  },
});
