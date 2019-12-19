import React from 'react';
import {View, Text} from 'react-native';

const RegisterValid = data => {
  let errors = {};

  if (data.name.length === 0) {
    errors.name = 'Name can not be empty';
  }
  if (data.email.length === 0) {
    errors.email = 'Email can not be empty';
  }
  if (data.password.length === 0) {
    errors.password = 'Password can not be empty';
  }

  const isEmpty = errors => {
    return Object.keys(errors).length === 0;
  };

  return {errors, isValid: isEmpty(errors)};
};
export default RegisterValid;
