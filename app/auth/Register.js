import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
//Redux
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authAction';
//Components
import TextForm from '../components/TextForm';
import Button from '../components/Button';
//Validation
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

    const data = {
      name: this.state.form.name,
      email: this.state.form.email,
      password: this.state.form.password,
    };

    await this.props.registerUser(data);
  };

  componentDidUpdate(prevProps, prevState) {
    //Create message in State
    if (prevProps.messages !== this.props.messages) {
      this.setState(prevState => {
        return {
          ...prevState,
          messages: this.props.messages,
        };
      });
    }
    //Get Errors from props to state
    if (prevProps.errors !== this.props.errors) {
      this.setState(prevState => {
        return {
          ...prevState,
          errors: this.props.errors,
        };
      });
    }
  }

  render() {
    console.log('this.props.messages', this.props.messages);
    const {isLandScape} = this.state.respStyles;

    return (
      <View
        style={
          isLandScape ? styles.containerLandScape : styles.containerPortrait
        }>
        {/* {Message} */}
        <View>
          {this.state.messages && <Text>{this.state.messages.message}</Text>}
        </View>

        <View
          style={
            isLandScape
              ? styles.containerFormLandScape
              : styles.containerFormPortrait
          }>
          <TextForm
            placeholder="name"
            placeholderTextColor="#fff"
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
                : {backgroundColor: '#769ede'}
            }
            //style object for errors
            style1={
              this.state.errors.name
                ? {
                    color: 'red',
                  }
                : null
            }
            error={this.state.errors.name}
          />
          <TextForm
            placeholder="email"
            placeholderTextColor="#fff"
            value={this.state.form.email}
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
            style={
              this.state.errors.email
                ? {backgroundColor: '#f7d5da', borderRadius: 5}
                : {backgroundColor: '#769ede'}
            }
            //style object for errors
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
            //style object for errors
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
            <Button onPress={this._register} title="Submit" />
          </View>
        </View>
        <View style={styles.containerLink}>
          <Text style={{color: '#53bced', paddingTop: 20}}>
            Already Registered?{' '}
          </Text>
          <Button
            style={{width: '40%', backgroundColor: '#94e5f7'}}
            title="SignIn"
            onPress={() => this.props.navigation.navigate('SignIn')}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages.messages,
  errors: state.errors.errors,
});

const mapDispatchToProps = {registerUser};

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
  containerLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    width: '60%',
    marginTop: 30,
  },
});
