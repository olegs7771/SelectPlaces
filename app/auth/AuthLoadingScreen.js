import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._getAuthUserAsync();
  }

  _getAuthUserAsync = async () => {
    const {isAuthenticated} = this.props.auth;
    console.log('this.props.auth', this.props.auth);

    await this.props.navigation.navigate(
      isAuthenticated ? 'appStack' : 'authStack',
    );
  };

  render() {
    return (
      <View>
        <Text> Auth Loader </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AuthLoadingScreen);
