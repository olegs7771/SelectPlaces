import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import SharedPlaceModal from '../modals/SharedPlaceModal';

export class SharedPlaceSelect extends Component {
  state = {
    isShowedModal: false,
  };

  _showModal = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isShowedModal: true,
      };
    });
  };

  render() {
    const {
      placeName,
      coordinate,
      id,
      date,
      imgURI,
    } = this.props.place.selectedPlace;
    const source = {uri: imgURI};

    const marker = <MapView.Marker coordinate={coordinate} />;
    return (
      <TouchableWithoutFeedback onPress={this._showModal}>
        <View style={styles.container}>
          <SharedPlaceModal
            showModal={this.state.isShowedModal}
            source={source}
            placeName={placeName}
            initialRegion={coordinate}
            marker={marker}
            id={id}
            navigation={this.props.navigation}
          />
          <View //TextTitle Container
            style={styles.containerTitle}>
            <Text style={styles.textTitle}>{placeName}</Text>
          </View>

          <View //Image&&Map Group Container
            style={styles.containerGroup}>
            <View style={styles.containerPicture}>
              <Image source={source} style={{width: '100%', height: '100%'}} />
            </View>
            <View //Map Container
              style={styles.containerMap}>
              <MapView
                initialRegion={coordinate}
                style={{width: '100%', height: '100%'}}>
                {marker}
              </MapView>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    borderWidth: 1,
  },
  containerTitle: {
    borderWidth: 1,
    width: '50%',
    paddingVertical: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  containerPicture: {
    width: '50%',
    height: 250,
  },
  containerMap: {
    width: '50%',
    height: 250,
    borderWidth: 1,
  },
  containerGroup: {
    width: '90%',
    flexDirection: 'row',
    marginTop: 10,
  },
  textTitle: {
    fontSize: 20,
  },
});
