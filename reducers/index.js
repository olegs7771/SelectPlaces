import {combineReducers} from 'redux';

import authReducer from './authReducer';
import placesReducer from './placesReducer';
import locationReducer from './locationReducer';

export default combineReducers({
  auth: authReducer,
  place: placesReducer,
  location: locationReducer,
});
