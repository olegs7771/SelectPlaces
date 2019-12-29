import React, {Component} from 'react';
//Redux
import {connect} from 'react-redux';
import {deletePlace} from '../../actions/placesAction';

import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  StyleSheet,
  Button,
  Image,
} from 'react-native';
import MapView from 'react-native-maps';

class SharedPlaceModal extends Component {
  state = {
    showModalState: false,
    messages: {},
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showModal !== this.props.showModal) {
      if (this.props.showModal) {
        this.setState(prevState => {
          return {
            ...prevState,
            showModalState: true,
          };
        });
      }
    }
    if (prevProps.messages !== this.props.messages) {
      console.log('this.props.messages', this.props.messages);
      this.setState(prevState => {
        return {
          ...prevState,
          messages: this.props.messages,
        };
      });
      setTimeout(() => {
        this.setState(prevState => {
          return {
            ...prevState,
            showModalState: false,
          };
        });
        this.props.navigation.push('SharedPlaces');
      }, 3000);
    }
  }
  _closeModal = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        showModalState: false,
      };
    });
    this.props.navigation.push('SharedPlaces');
  };
  _deletePlace = () => {
    console.log('delete id', this.props.id);
    const id = this.props.id;
    this.props.deletePlace({id});
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.showModalState}>
        <View //Modal Container
          style={styles.conatainerModal}>
          <View //Title Container
            style={styles.containerTitle}>
            <Text style={styles.textTitle}>{this.props.placeName}</Text>
          </View>
          <View // Group Image&Map Container
            style={styles.containerGroup}>
            <View //Image Container
              style={styles.containerImage}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={this.props.source}
              />
            </View>
            <View //Map Container
              style={styles.containerMap}>
              <MapView
                initialRegion={this.props.initialRegion}
                style={{width: '100%', height: '100%'}}>
                {this.props.marker}
              </MapView>
            </View>
          </View>
          {this.state.messages.deleted && (
            <View //Message Container
              style={{borderWidth: 1, marginTop: 10}}>
              <Text>{this.state.messages.deleted}</Text>
            </View>
          )}
          <View // Buttons Group Container
            style={styles.containerButtonGroup}>
            <Button
              title="Delete"
              color="#8a4f32"
              onPress={this._deletePlace}
            />
            <Button title="Close" onPress={this._closeModal} />
          </View>
        </View>
      </Modal>
    );
  }
}
const mapStateToProps = state => ({
  messages: state.messages.messages,
});

export default connect(mapStateToProps, {deletePlace})(SharedPlaceModal);

const styles = StyleSheet.create({
  conatainerModal: {
    borderWidth: 1,
    borderColor: '#496b91',
    alignItems: 'center',
    paddingBottom: 20,
    margin: 3,
    backgroundColor: '#c1e0e0',
    borderRadius: 5,
  },
  containerGroup: {
    flexDirection: 'row',
  },
  containerTitle: {
    paddingVertical: 5,
  },
  containerImage: {
    width: '45%',
    height: 250,
  },
  containerMap: {
    height: 250,
    width: '45%',
    borderWidth: 1,
  },
  textTitle: {
    fontSize: 20,
  },
  containerButtonGroup: {
    flexDirection: 'row',
    marginTop: 20,
    width: '60%',
    justifyContent: 'space-between',
  },
});
