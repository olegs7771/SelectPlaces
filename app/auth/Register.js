import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {connect} from 'react-redux';
import TextForm from '../components/TextForm';
import Button from '../components/Button';
import RegisterValid from '../../validation/RegisterValid';
export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        name: '',
        email: '',
        password: '',
      },
      respStyles: {
        isLandScape: false,
      },
      errors: {},
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

  _register = async () => {
    //Validation
    const {errors, isValid} = RegisterValid(this.state.form);
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

    const newUser = {
      name: this.state.form.name,
      email: this.state.form.email,
      password: this.state.form.password,
    };
    console.log('newUser', newUser);
  };

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
            placeholder="name"
            onChangeText={text =>
              this.setState(prevState => {
                return {
                  form: {
                    ...prevState.form,
                    name: text,
                  },
                  errors: {},
                };
              })
            }
            value={this.state.form.name}
            style={
              this.state.errors.name
                ? {backgroundColor: '#f7d5da', borderRadius: 5}
                : null
            }
            error={this.state.errors.name}
          />
          <TextForm
            placeholder="email"
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
                : null
            }
            error={this.state.errors.email}
          />
          <TextForm
            placeholder="password"
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
                : null
            }
            error={this.state.errors.password}
          />
          <View>
            <Button onPress={this._register} />
          </View>
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

  //TextForm
  containerFormLandScape: {
    width: '80%',
    marginTop: 20,
  },
  containerFormPortrait: {
    width: '80%',
    marginTop: 20,
  },
});
