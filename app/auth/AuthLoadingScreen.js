import React, {Component, useEffect} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {auth_with_token} from '../../actions/authAction';
//AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._retrieveData();
    this._getAuthUserAsync();
    this._hideSplash();
    console.log('SplashScreen', SplashScreen);
  }

  _hideSplash = () => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  };

  _getAuthUserAsync = async () => {
    // const {isAuthenticated} = this.props.auth;
    // console.log('this.props.auth', this.props.auth);
    const value = await AsyncStorage.getItem('user_token');
    console.log('value', value);

    if (value !== null) {
      this.props.navigation.navigate('appStack');
    } else {
      this.props.navigation.navigate('authStack');
    }
  };

  //Retrieve token from AsyncStore
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_token');
      console.log('value token in storage', value);

      if (value !== null) {
        // console.log('value', value);
        // from authAction
        this.props.auth_with_token({token: value});
      }
    } catch (error) {
      console.log('no more token', error);
    }
  };

  render() {
    return (
      <View>
        <Text> Loader...</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {auth_with_token})(AuthLoadingScreen);
