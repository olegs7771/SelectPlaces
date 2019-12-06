import {SELECT_LOCATION, ADD_PLACE} from './types';
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
