import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';
import TextForm from '../components/TextForm';
import MapLocation from './MapLocation';

import {connect} from 'react-redux';
import {addPlace} from '../../actions/placesAction';

export class SelectPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeName: '',
      respStyles: {
        npContainerFlexDirection: 'column',
        alignContent: 'flex-start',

        formWidth: '100%',
        pictureWidth: '100%',
      },
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
        },
      });
    });
  }
  _sharePlace = e => {
    const newPlace = {
      name: this.state.placeName,
      location: this.props.location,
    };
    this.props.addPlace(newPlace);
  };

  render() {
    console.log('this.state.respStyles', this.state.respStyles);

    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}> Here Select Places </Text>
        <View
          style={{
            width: '80%',
            flexDirection: this.state.respStyles.npContainerFlexDirection,
            borderWidth: 1,
            justifyContent: this.state.respStyles.alignContent,
          }}>
          <View
            style={{borderWidth: 1, width: this.state.respStyles.formWidth}}>
            <TextForm
              type="text"
              onChangeText={text => this.setState({placeName: text})}
              placeName={this.state.placeName}
              value={this.state.placeName}
              placeholder="Pick the Name"
            />
          </View>
          <View
            style={{borderWidth: 1, width: this.state.respStyles.pictureWidth}}>
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
  containerForm: {
    borderWidth: 1,
    width: '40%',
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

  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
});

const mapStateToProps = state => ({
  location: state.place.selectedPlace.location,
});

const mapDispatchToProps = {addPlace};

export default connect(mapStateToProps, mapDispatchToProps)(SelectPlace);
