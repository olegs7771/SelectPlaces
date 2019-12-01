import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';

class TextForm extends Component {
  render() {
    return (
      <View style={[styles.container]}>
        <TextInput {...this.props} />
      </View>
    );
  }
}
export default TextForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d5e8ed',
  },
});