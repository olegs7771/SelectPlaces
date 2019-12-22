import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
// import * as Progress from 'react-native-progress';
//Redux
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authAction';
//AsyncStorage
import {AsyncStorage} from 'react-native';

//Components
import TextForm from '../components/TextForm';
import Button from '../components/Button';
//Validation
import LoginValid from '../../validation/LoginValid';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: '',
        password: '',
      },
      respStyles: {
        isLandScape: false,
      },
      errors: {},
      messages: {},
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
  _login = async () => {
    //Validation
    const {errors, isValid} = LoginValid(this.state.form);
    console.log('errors', errors);
    console.log('isValid', isValid);
    if (!isValid) {
      return this.setState(prevState => {
        return {
          ...prevState,
          errors: errors,
        };
      });
    }

    const data = {
      email: this.state.form.email,
      password: this.state.form.password,
    };

    await this.props.loginUser(data);
  };
  componentDidUpdate(prevProps, prevState) {
    //Navigate to App if isAuthenticated === true
    if (prevProps.auth !== this.props.auth) {
      //if this.props.auth.token===true
      //Persist Data

      if (this.props.auth.isAuthenticated) {
        this.props.navigation.navigate('Home');
      }
    }
    //If Error come from API move it to state
    if (prevProps.errors !== this.props.errors) {
      console.log('this.props.errors', this.props.errors);
      this.setState(prevState => {
        return {
          ...prevState,
          errors: this.props.errors,
        };
      });
    }
  }

  render() {
    const {isLandScape} = this.state.respStyles;

    return (
      <View
        style={
          isLandScape ? styles.containerLandScape : styles.containerPortrait
        }>
        <View
          style={
            isLandScape
              ? styles.containerFormLandScape
              : styles.containerFormPortrait
          }>
          <TextForm
            placeholder="email"
            placeholderTextColor="#fff"
            onChangeText={text =>
              this.setState(prevState => {
                return {
                  form: {
                    ...prevState.form,
                    email: text,
                  },
                  errors: {},
                };
              })
            }
            value={this.state.form.email}
            style={
              this.state.errors.email
                ? {backgroundColor: '#f7d5da', borderRadius: 5}
                : {backgroundColor: '#769ede'}
            }
            style1={
              this.state.errors.email
                ? {
                    color: 'red',
                  }
                : null
            }
            error={this.state.errors.email}
          />
          <TextForm
            placeholder="password"
            placeholderTextColor="#fff"
            onChangeText={text =>
              this.setState(prevState => {
                return {
                  form: {
                    ...prevState.form,
                    password: text,
                  },
                  errors: {},
                };
              })
            }
            value={this.state.form.password}
            style={
              this.state.errors.password
                ? {backgroundColor: '#f7d5da', borderRadius: 5}
                : {backgroundColor: '#769ede'}
            }
            style1={
              this.state.errors.password
                ? {
                    color: 'red',
                  }
                : null
            }
            error={this.state.errors.password}
          />

          <View>
            <Button onPress={this._login} title="Login" />
          </View>
        </View>
        <View style={styles.containerProgress}>
          <ActivityIndicator size="large" color="#94e5f7" />
        </View>
        <View style={styles.containerLink}>
          <Text style={{color: '#53bced', paddingTop: 20}}>
            Not Registered?{' '}
          </Text>
          <Button
            style={{width: '40%', backgroundColor: '#94e5f7'}}
            title="SignUp"
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors.errors,
});

const mapDispatchToProps = {loginUser};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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

  //TextForm
  containerFormLandScape: {
    width: '80%',
    marginTop: 20,
  },
  containerFormPortrait: {
    width: '80%',
    marginTop: 20,
  },
  containerLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    width: '60%',
    marginTop: 30,
  },
  containerProgress: {
    marginTop: 10,
  },
});
