import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import TextForm from '../components/TextForm';
import MapLocation from './MapLocation';

import {connect} from 'react-redux';
import {addPlace} from '../../actions/placesAction';
const uuid = require('uuid/v1');

export class SelectPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        placeName: '',
      },
      respStyles: {
        npContainerFlexDirection: 'column',
        alignContent: 'flex-start',
        formWidth: '100%',
        pictureWidth: '100%',
        landScape: false,
      },
      pickedImage: null,
    };
    Dimensions.addEventListener('change', dims => {
      console.log('dims.window.width', dims.window.width);
      console.log('dims.window.height', dims.window.height);

      this.setState({
        respStyles: {
          npContainerFlexDirection: dims.window.height > 500 ? 'column' : 'row',
          formWidth: dims.window.height > 500 ? '100%' : '45%',
          pictureWidth: dims.window.height > 500 ? '100%' : '45%',
          alignContent:
            dims.window.height > 500 ? 'flex-start' : 'space-between',
          landScape: dims.window.height > 500 ? false : true,
        },
      });
    });
  }

  //Clean Image from Preview
  componentDidMount() {
    this.setState(prevState => {
      return {
        ...prevState,
        pickedImage: null,
      };
    });
  }

  _pickImageStorage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      console.log('image.data', image.data);
      this.setState(prevState => {
        return {
          ...prevState,
          pickedImage: image.path,
        };
      });
    });
  };
  _pickImageCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log('image', image);

        this.setState(prevState => {
          return {
            ...prevState,
            pickedImage: image.path,
          };
        });
      })
      .catch(err => {
        console.log('error :', err);
      });
  };

  _sharePlace = e => {
    if (this.state.form.placeName.trim().length === 0) {
      return;
    }
    const newPlace = {
      id: uuid(),
      key: JSON.stringify(Math.random()),
      name: this.state.form.placeName,
      image: {
        uri: this.state.pickedImage,
      },
      location: this.props.location.location,
    };

    this.props.addPlace(newPlace);
    this.props.navigation.navigate('SharedPlaces');

    console.log('newPlace', newPlace);
  };

  render() {
    console.log('this.state.respStyles', this.state.respStyles.landScape);

    return (
      <ScrollView>
        <View
          style={
            this.state.respStyles.landScape
              ? styles.containerLandScape
              : styles.containerPortrait
          }>
          {!this.state.respStyles.landScape ? (
            <Text style={styles.textTitle}> Here Select Places </Text>
          ) : null}
          <View
            style={{
              width: '80%',
              flexDirection: this.state.respStyles.npContainerFlexDirection,

              justifyContent: this.state.respStyles.alignContent,
            }}>
            <View style={{width: this.state.respStyles.formWidth}}>
              <TextForm
                type="text"
                onChangeText={text =>
                  this.setState({
                    form: {
                      placeName: text,
                    },
                  })
                }
                placeName={this.state.placeName}
                value={this.state.placeName}
                placeholder="Pick the Name"
              />
            </View>
            <View //Picture Container
              style={{
                width: this.state.respStyles.pictureWidth,
              }}>
              {this.state.pickedImage ? (
                <Image
                  source={{uri: this.state.pickedImage}}
                  style={{width: '100%', height: 200}}
                />
              ) : null}
              <View ///Buttons Container
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '80%',
                  alignSelf: 'center',
                  marginVertical: 2,
                  paddingVertical: 5,
                }}>
                <Button
                  title="Choose Picture"
                  onPress={this._pickImageStorage}
                />
                <Button title="Camera" onPress={this._pickImageCamera} />
              </View>
            </View>
          </View>
          <View style={styles.containerMap}>
            <View style={styles.containerText}>
              <Text style={styles.text}>Choose Location Here</Text>
            </View>
            <MapLocation />
          </View>

          <View style={styles.containerButton}>
            <Button
              title="Share Place"
              color="#4287f5"
              onPress={this._sharePlace}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerPortrait: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 30,
    alignItems: 'center',
  },
  containerLandScape: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  containerForm: {
    borderWidth: 1,
    width: '40%',
  },

  containerMap: {
    width: '80%',

    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
  },
  containerText: {
    alignItems: 'center',

    paddingVertical: 5,
  },
  containerButton: {
    marginTop: 20,
  },

  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
});

const mapStateToProps = state => ({
  location: state.location,
});

const mapDispatchToProps = {addPlace};

export default connect(mapStateToProps, mapDispatchToProps)(SelectPlace);
