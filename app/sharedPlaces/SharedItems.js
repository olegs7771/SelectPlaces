import React, {Component} from 'react';
import moment from 'moment';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import MapView from 'react-native-maps';
import SharedPlaceModal from '../modals/SharedPlaceModal';
import {connect} from 'react-redux';
import {selectPlace} from '../../actions/placesAction';

class SharedItems extends Component {
  _selectPlace = () => {
    const data = {
      placeName: this.props.placeName,
      date: this.props.date,
      coordinate: this.props.location,
      imgURI: this.props.imgURI,
      id: this.props.id,
    };

    this.props.selectPlace(data);
    this.props.navigate('SelectedPlace');
  };

  render() {
    const marker = <MapView.Marker coordinate={this.props.location} />;
    const source = {uri: this.props.imgURI};
    const placeName = this.props.placeName;
    const location = this.props.location;
    const id = this.props.id;

    return (
      <TouchableWithoutFeedback onPress={this._selectPlace}>
        <View style={styles.container}>
          <View style={styles.containerPicture}>
            <Image style={{width: '100%', height: '100%'}} source={source} />
          </View>
          <View // Date&Name Group Container
            style={styles.containerGroup}>
            <View style={styles.containerName}>
              <Text style={styles.textName}>{this.props.placeName}</Text>
            </View>

            <View style={styles.containerDate}>
              <Text>Date {moment(this.props.date).format('lll')}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(null, {selectPlace})(SharedItems);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'green',
    width: '90%',
    height: 50,
    marginBottom: 5,
  },
  containerGroup: {
    flex: 1,
    width: '48%',
    alignItems: 'center',
  },
  containerPicture: {
    padding: 1,
    width: '20%',
  },
  containerName: {
    flex: 1,
    paddingVertical: 3,
  },
  containerDate: {
    paddingVertical: 3,
    paddingLeft: 10,
  },
  textName: {
    fontSize: 16,
    fontFamily: 'bold',
    alignSelf: 'center',
  },
});
