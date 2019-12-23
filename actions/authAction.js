import {
  LOGIN_USER,
  GET_ERRORS,
  API_MESSAGE,
  LOADING,
  GET_AUTH_TOKEN,
  LOGOUT_USER,
} from './types';
import axios from 'axios';
//AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';

export const getAuthUser = data => dispatch => {
  console.log('data', data);
};

//Register a new user
export const registerUser = data => dispatch => {
  console.log('data in action', data);

  axios
    .post(' http://10.0.2.2:3000/api/register', data)
    .then(res => {
      dispatch({
        type: API_MESSAGE,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log('err', err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Login  User
export const loginUser = data => dispatch => {
  console.log('data in action', data);
  dispatch(isLoading());
  axios
    .post(' http://10.0.2.2:3000/api/login', data)
    .then(res => {
      console.log('res.data', res.data);

      dispatch({
        type: LOGIN_USER,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log('err.response.data :', err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
//Login  User
export const auth_with_token = data => dispatch => {
  console.log('token data in action', data);
  const token = JSON.parse(data.token);

  console.log('token', token);
  axios
    .post(' http://10.0.2.2:3000/api/auth_with_token', {token})
    .then(res => {
      console.log('res.data', res.data);
      //Get JWT Token from API
      dispatch({
        type: GET_AUTH_TOKEN,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log('err.response.data :', err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Logout User
export const logoutUser = data => dispatch => {
  console.log('data logout', data);
  dispatch(isLoading());
  dispatch({
    type: LOGOUT_USER,
  });

  AsyncStorage.getAllKeys((err, keys) => {
    console.log('keys', keys);
    if (keys) {
      AsyncStorage.removeItem('token', err => {
        if (err) {
          console.log('err', err);
        }
      }).then(result => {
        console.log('result', result);
      });
    }
  });
};

//Loader
export const isLoading = () => {
  return {
    type: LOADING,
  };
};
