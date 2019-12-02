import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';
import TextForm from '../components/TextForm';
import MapLocation from './MapLocation';

import {connect} from 'react-redux';

export class SelectPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeName: '',
      isLandScape: false,
    };
    Dimensions.addEventListener('change', dims => {
      console.log('dims.window.width', dims.window.width);
      console.log('dims.window.height', dims.window.height);
      if (dims.window.width > dims.window.height) {
        this.setState({
          isLandScape: true,
        });
      }
    });
  }
  _sharePlace = e => {
    const newPlace = {
      name: this.state.placeName,
    };
    console.log('newPlace :', newPlace);
  };

  render() {
    console.log('isLandScape', this.state.isLandScape);

    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}> Here Select Places </Text>
        <View style={styles.container_Name_Picture}>
          <View style={styles.containerForm}>
            <TextForm
              type="text"
              onChangeText={text => this.setState({placeName: text})}
              placeName={this.state.placeName}
              value={this.state.placeName}
              placeholder="Pick the Name"
            />
          </View>
          <View style={styles.containerPicture}>
            <Text>Choose Picture Here</Text>
          </View>
        </View>
        <View style={styles.containerMap}>
          <View style={styles.containerText}>
            <Text style={styles.text}>Choose Location Here</Text>
          </View>
          <MapLocation />
        </View>

        <View>
          <Button
            title="Share Place"
            color="#5f8f9c"
            onPress={this._sharePlace}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 30,
    alignItems: 'center',
  },
  containerFormLandScape: {
    borderWidth: 1,
    width: '40%',
  },
  containerFormPortrait: {
    borderWidth: 1,
    width: '80%',
  },
  containerPictureLandScape: {
    width: '40%',
    borderWidth: 1,
  },
  containerPicturePortrait: {
    width: '80%',
    borderWidth: 1,
  },
  containerMap: {
    width: '80%',
    borderWidth: 1,
    marginTop: 10,
  },
  containerText: {
    alignItems: 'center',

    paddingVertical: 5,
  },
  container_Name_Picture_LandScape: {
    width: '100%',
    flexDirection: 'row',
  },
  container_Name_Picture_Portrait: {
    width: '100%',
    flexDirection: 'column',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SelectPlace);
