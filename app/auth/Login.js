import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {connect} from 'react-redux';

export class Login extends Component {
  render() {
    return (
      <View>
        <Text> Login here </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
