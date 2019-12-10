import {SELECT_LOCATION, ADD_PLACE} from './types';
import axios from 'axios';
export const addPlace = data => {
  return {
    type: ADD_PLACE,
    payload: data,
  };
};
export const selectLocation = data => {
  return {
    type: SELECT_LOCATION,
    payload: data,
  };
};

export const createPlace = FD => dispatch => {
  console.log('FD', FD);
  // fetch('http://10.0.2.2:3000/api/upload', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'multipart/form-data',
  //   },
  //   body: {
  //     data: FD,
  //   },
  // }).then(res => {
  //   console.log('res', res);
  // });

  axios({
    url: 'http://10.0.2.2:3000/api/upload',
    method: 'POST',
    data: FD,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(res => {
      console.log('res.data', res.data);
    })
    .catch(err => {
      console.log('err :', err);
    });
};

export const getPlace = () => dispatch => {
  axios.get('http://10.0.2.2:3000/api/getPlace').then(res => {
    console.log('res.data', res.data);
  });
};
