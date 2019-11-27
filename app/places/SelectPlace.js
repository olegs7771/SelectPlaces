import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import TextForm from '../components/TextForm';

import {connect} from 'react-redux';

export class SelectPlace extends Component {
  state = {
    placeName: '',
  };
  _sharePlace = e => {
    const newPlace = {
      name: this.state.placeName,
    };
    console.log('newPlace :', newPlace);
  };

  render() {
    console.log('this.state', this.state);

    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}> Here Select Places </Text>
        <View style={styles.containerForm}>
          <TextForm
            type="text"
            onChangeText={text => this.setState({placeName: text})}
            placeName={this.state.placeName}
            value={this.state.placeName}
            placeholder="Pick the Name"
          />
        </View>
        <View>
          <Text>Choose Picture Here</Text>
        </View>
        <View>
          <Text>Choose Location Here</Text>
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
    width: '60%',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SelectPlace);
