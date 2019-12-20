import {GET_AUTH_USER, REGISTER_USER, LOGIN_USER} from './types';
import axios from 'axios';

export const getAuthUser = data => dispatch => {
  console.log('data', data);
};

//Register a new user
export const registerUser = data => dispatch => {
  console.log('data in action', data);

  axios
    .post(' http://10.0.2.2:3000/api/register', data)
    .then(res => {
      console.log('res.data', res.data);
    })
    .catch(err => {
      console.log('err::', err);
    });
};

//Login Registered User
export const loginUser = data => dispatch => {
  console.log('data in action', data);

  axios
    .post(' http://10.0.2.2:3000/api/login', data)
    .then(res => {
      console.log('res.data', res.data);
    })
    .catch(err => {
      console.log('err::', err);
    });
};
