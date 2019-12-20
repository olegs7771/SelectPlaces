import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import MapView from 'react-native-maps';

export default class SharedItems extends Component {
  render() {
    const marker = <MapView.Marker coordinate={this.props.location} />;
    const source = {uri: this.props.imgURI};
    console.log('source', source);

    return (
      <View style={styles.container}>
        <View style={styles.containerName}>
          <Text style={styles.textName}>{this.props.placeName}</Text>
        </View>
        <View //Picture & Map container
          style={{flexDirection: 'row'}}>
          <View style={styles.containerPicture}>
            <Image style={{width: '100%', height: '100%'}} source={source} />
          </View>
          <View style={styles.containerMap}>
            <MapView
              initialRegion={this.props.location}
              style={{width: '100%', height: 200}}>
              {marker}
            </MapView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'green',
    width: '90%',
    height: '70%',
    alignSelf: 'center',
    marginBottom: 5,
  },
  containerName: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  containerPicture: {
    flex: 1,
    padding: 5,
    paddingBottom: 50,
    width: '45%',
  },
  containerMap: {
    flex: 1,
    padding: 5,
    paddingBottom: 15,
    width: '45%',
  },
  textName: {
    fontSize: 20,
    fontFamily: 'bold',
    alignSelf: 'center',
  },
});
