import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';

class TextForm extends Component {
  render() {
    return (
      <View>
        <View style={[styles.container, this.props.style]}>
          <TextInput {...this.props} />
        </View>
        <View>
          {this.props.error && (
            <Text style={{color: 'red'}}>{this.props.error}</Text>
          )}
        </View>
      </View>
    );
  }
}
export default TextForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d5e8ed',
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 20,
  },
});
