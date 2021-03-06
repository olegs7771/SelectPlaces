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
  // let formBody = [];
  // for (let key in data) {
  //   const encodedKey = encodeURIComponent(key);
  //   const encodedValue = encodeURIComponent(data[key]);
  //   formBody.push(encodedKey + '=' + encodedValue);
  // }
  // formBody = formBody.join('&');
  // console.log('formBody', formBody);

  dispatch(isLoading());
  axios
    .post('http://192.168.1.11:3000/api/login', data)
    .then(res => {
      console.log('res.data', res.data);
    })
    .catch(err => {
      console.log('err', err.response.data);
    });
};
//Request token in every reload with update exp
export const auth_with_token = data => dispatch => {
  const token = JSON.parse(data.token);

  axios
    .post(' http://10.0.2.2:3000/api/auth_with_token', {token})
    .then(res => {
      // console.log('res.data', res.data);

      AsyncStorage.removeItem('user_token', () => {
        AsyncStorage.setItem(
          'user_token',
          JSON.stringify(res.data.token),
          () => {
            dispatch({
              type: LOGIN_USER,
              payload: res.data,
            });

            AsyncStorage.getItem('user_token').then(token => {
              // console.log('token updated', token);
            });
          },
        );
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      if (Object.keys(err.response.data.session).length !== 0) {
        const removeToken = async () => {
          await AsyncStorage.getItem('user_token').then(value => {
            console.log('value', value);
            if (value !== null) {
              AsyncStorage.removeItem('user_token').then(() => {
                console.log('Token delete seccessfully');
              });
            }
          });
        };
        removeToken();
      }
    });
};

//Logout User
export const logoutUser = data => dispatch => {
  console.log('data logout', data);
  dispatch(isLoading());
  setTimeout(() => {
    dispatch({
      type: LOGOUT_USER,
    });
  }, 5000);

  AsyncStorage.getAllKeys((err, keys) => {
    console.log('keys', keys);
    if (keys) {
      AsyncStorage.removeItem('user_token', err => {
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
