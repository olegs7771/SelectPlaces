import React, {Component} from 'react';
import {Text, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default class ImagePlace extends Component {
  componentDidMount() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  }

  render() {
    return (
      <View>
        <Text> Image Here </Text>
      </View>
    );
  }
}
