import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Button = props => {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Text style={styles.text}>Button</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#9bc2cc',
    marginTop: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});
