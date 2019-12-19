import React from 'react';
import {View, Text} from 'react-native';

const RegisterValid = data => {
  console.log('data', data);
  console.log('data.name.length', data.name.length);

  let errors = {};

  if (data.password.length === 0) {
    errors.name = 'Password can not be empty';
  }
  if (data.email.length === 0) {
    errors.name = 'Email can not be empty';
  }
  if (data.name.length === 0) {
    errors.name = 'Name can not be empty';
  }

  const isEmpty = errors => {
    return Object.keys(errors).length === 0;
  };

  return {errors, isValid: isEmpty(errors)};
};
export default RegisterValid;
