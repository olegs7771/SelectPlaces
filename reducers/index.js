import {combineReducers} from 'redux';

import authReducer from './authReducer';
import placesReducer from './placesReducer';
import locationReducer from './locationReducer';
import messageReducer from './messageReducer';

export default combineReducers({
  auth: authReducer,
  place: placesReducer,
  location: locationReducer,
  message: messageReducer,
});
