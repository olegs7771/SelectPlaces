import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class SharedItems extends Component {
  render() {
    return (
      <View>
        <View>
          <Text>Name</Text>
        </View>
        <View>
          <Text>Picture</Text>
        </View>
        <View>
          <Text>Location</Text>
        </View>
      </View>
    );
  }
}
