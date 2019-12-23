import React, {Component} from 'react';
import {Text, StyleSheet, View, Button, ActivityIndicator} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authAction';

class WelcomePage extends Component {
  state = {
    loading: false,
  };

  _logout = async () => {
    await this.props.logoutUser(this.props.auth.user._id);
    setTimeout(() => {
      this.props.navigation.navigate('SignIn');
    }, 5000);
  };

  componentDidUpdate(prevProps, prevState) {
    //Navigate to App if isAuthenticated === true
    if (prevProps.auth !== this.props.auth) {
      this.setState(prevState => {
        return {
          ...prevState,
          loading: this.props.auth.loading,
        };
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}> Welcome Page </Text>
        </View>
        <View style={styles.containerButton}>
          <Button
            title="Select Places"
            color="#acb6bf"
            onPress={() => this.props.navigation.navigate('Places')}
          />
        </View>
        <View style={styles.containerLogoutBtn}>
          <Button title="Logout" onPress={this._logout} />
        </View>
        {this.state.loading && (
          <View style={styles.containerProgress}>
            <ActivityIndicator size="large" color="#94e5f7" />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logoutUser})(WelcomePage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  containerTitle: {},
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',

    marginBottom: 10,
  },
  containerButton: {
    width: '50%',
    alignSelf: 'center',
  },
  containerLogoutBtn: {
    alignContent: 'center',
    borderWidth: 1,
    marginTop: 20,
    width: '40%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  containerProgress: {
    marginTop: 10,
  },
});
