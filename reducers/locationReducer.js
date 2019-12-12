import {SELECT_LOCATION} from '../actions/types';
const initialState = {
  location: {
    latitude: null,
    longitude: null,
    latitudeDelta: null,
    longitudeDelta: null,
  },
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_LOCATION:
      return {
        ...state.location,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        latitudeDelta: action.payload.latitudeDelta,
        longitudeDelta: action.payload.longitudeDelta,
      };
    default:
      return state;
  }
}
