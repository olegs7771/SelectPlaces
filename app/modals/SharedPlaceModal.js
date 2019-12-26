import React, {Component} from 'react';
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

class SharedPlaceModal extends Component {
  state = {
    showModalState: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.props.showModal) {
        this.setState(prevState => {
          return {
            ...prevState,
            showModalState: true,
          };
        });
      }
    }
  }
  _closeModal = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        showModalState: false,
      };
    });
  };

  render() {
    console.log('this.props model', this.props);

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModalState}>
          <View style={styles.conatainerModal}>
            <View>
              <Text>{this.props.placeName}</Text>
            </View>
            <View style={{height: 300, width: '80%'}}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={this.props.source}
              />
            </View>
            <Button title="close" onPress={this._closeModal} />
          </View>
        </Modal>
      </View>
    );
  }
}

export default SharedPlaceModal;

const styles = StyleSheet.create({
  container: {
    borderWidth: 5,
    borderColor: 'red',
  },
  conatainerModal: {
    borderWidth: 1,
    borderColor: 'green',
  },
});
