import {
  GET_AUTH_USER,
  REGISTER_USER,
  LOGIN_USER,
  GET_ERRORS,
  API_MESSAGE,
  LOADING_USER,
} from './types';
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
      dispatch({
        type: API_MESSAGE,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log('err::', err.response.data);
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

      // dispatch({
      //   type: LOGIN_USER,
      //   payload: res.data,
      // });
    })
    .catch(err => {
      console.log('err.response.data :', err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Loader
export const isLoading = () => {
  return {
    type: LOADING_USER,
  };
};
