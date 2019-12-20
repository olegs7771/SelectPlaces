import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {connect} from 'react-redux';
//Components
import TextForm from '../components/TextForm';
import Button from '../components/Button';

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
  componentDidUpdate(prevProps, prevState) {}

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
            <Button onPress={this._register} title="Submit" />
          </View>
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

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
});
