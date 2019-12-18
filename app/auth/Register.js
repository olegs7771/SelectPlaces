import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {connect} from 'react-redux';
import TextForm from '../components/TextForm';

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      respStyles: {
        isLandScape: false,
      },
    };

    //Dimensions Listener
    Dimensions.addEventListener('change', dims => {
      this.setState(prevState => {
        return {
          respStyles: {
            ...prevState.respStyles,
            isLandScape: dims.window.height > 500 ? false : true,
          },
        };
      });
    });
  }

  render() {
    console.log(
      'this.state.respStyles.isLandScape',
      this.state.respStyles.isLandScape,
    );
    const {isLandScape} = this.state.respStyles;
    return (
      <View
        style={
          isLandScape ? styles.containerLandScape : styles.containerPortrait
        }>
        <View style={{borderWidth: 1, alignItems: 'center', width: '50%'}}>
          <Text style={{fontSize: 20}}> Register here </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  containerPortrait: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  containerLandScape: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
    alignItems: 'center',
    paddingTop: 20,
  },
});
