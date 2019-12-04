import {combineReducers} from 'redux';

import authReducer from './authReducer';
import placesReducer from './placesReducer';

export default combineReducers({
  auth: authReducer,
  place: placesReducer,
});
