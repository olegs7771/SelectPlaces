import {SELECT_LOCATION, GET_ALL_PLACES} from '../actions/types';
const initialState = {
  places: [],
  selectedPlace: null,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PLACES:
      return {
        ...state,
        places: action.payload,
      };
    default:
      return state;
  }
}
