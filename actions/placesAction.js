import {
  SELECT_LOCATION,
  ADD_PLACE,
  GET_ALL_PLACES,
  API_MESSAGE,
  LOADING,
  DELETE_PLACE,
  SELECT_PLACE,
} from './types';
import axios from 'axios';
export const addPlace = data => {
  return {
    type: ADD_PLACE,
    payload: data,
  };
};
export const selectLocation = data => {
  console.log('data', data);

  return {
    type: SELECT_LOCATION,
    payload: {
      latitude: data.latitude,
      longitude: data.longitude,
      latitudeDelta: data.latitudeDelta,
      longitudeDelta: data.longitudeDelta,
    },
  };
};

export const createPlace = FD => dispatch => {
  console.log('FD', FD);

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
      console.log('err::', err);
    });
};

export const getPlace = () => dispatch => {
  console.log('getting places');
  dispatch(loading());

  axios.get('http://10.0.2.2:3000/api/getPlace').then(res => {
    if (res.data.message) {
      dispatch({
        type: API_MESSAGE,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_ALL_PLACES,
        payload: res.data,
      });
    }
  });
};

//Select Place
export const selectPlace = data => dispatch => {
  console.log('data selected plce', data);
  dispatch({
    type: SELECT_PLACE,
    payload: data,
  });
};

//Delete Place
export const deletePlace = data => dispatch => {
  console.log('data.id', data.id);
  axios.post('http://10.0.2.2:3000/api/delete', data).then(res => {
    dispatch({
      type: API_MESSAGE,
      payload: res.data,
    });
    dispatch({
      type: DELETE_PLACE,
      payload: data.id,
    });
  });
};

export const loading = () => {
  return {
    type: LOADING,
  };
};
