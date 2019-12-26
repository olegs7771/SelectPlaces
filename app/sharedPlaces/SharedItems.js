import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import MapView from 'react-native-maps';
import SharedPlaceModal from '../modals/SharedPlaceModal';

export default class SharedItems extends Component {
  state = {
    isShowedModal: false,
  };

  _shoModal = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isShowedModal: true,
      };
    });
  };
  render() {
    const marker = <MapView.Marker coordinate={this.props.location} />;
    const source = {uri: this.props.imgURI};
    const placeName = this.props.placeName;

    return (
      <TouchableWithoutFeedback onPress={this._shoModal}>
        <View style={styles.container}>
          <SharedPlaceModal
            showModal={this.state.isShowedModal}
            source={source}
            placeName={placeName}
          />
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
      </TouchableWithoutFeedback>
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
