import React from 'react';
import {View, Text} from 'react-native';

const RegisterValid = data => {
  let errors = {};
  //check for consistance
  if (data.name.trim().length < 4) {
    errors.name = 'Name at least 4 chars';
  }

  //check for empty fields
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
