import {SELECT_LOCATION, ADD_PLACE} from '../actions/types';
const initialState = {
  places: [],
  selectedPlace: null,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat(action.payload),
      };
    default:
      return state;
  }
}