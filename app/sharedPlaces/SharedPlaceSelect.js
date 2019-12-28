import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import MapView from 'react-native-maps';

import {connect} from 'react-redux';

export class SharedPlaceSelect extends Component {
  render() {
    const source = {uri: this.props.place.selectedPlace.imgURI};
    console.log(
      'this.props.place.selectedPlace.imgURI',
      this.props.place.selectedPlace.imgURI,
    );

    const marker = (
      <MapView.Marker coordinate={this.props.place.selectedPlace.coordinate} />
    );
    return (
      <View style={styles.container}>
        <View //TextTitle Container
          style={styles.containerTitle}>
          <Text style={styles.textTitle}>
            {this.props.place.selectedPlace.placeName}
          </Text>
        </View>

        <View //Image&&Map Group Container
          style={styles.containerGroup}>
          <View style={styles.containerPicture}>
            <Image style={{width: '100%', height: '100%'}} source={source} />
          </View>
          <View //Map Container
            style={styles.containerMap}>
            <MapView
              initialRegion={this.props.place.selectedPlace.coordinate}
              style={{width: '100%', height: '100%'}}></MapView>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  place: state.place,
});

export default connect(mapStateToProps, {})(SharedPlaceSelect);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  containerTitle: {
    borderWidth: 1,
    width: '50%',
  },
  containerPicture: {
    width: '50%',
    height: 200,
  },
  containerMap: {
    width: '50%',
    height: 250,
    borderWidth: 1,
  },
  textTitle: {
    fontSize: 20,
  },
});
