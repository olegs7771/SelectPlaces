import {SELECT_LOCATION, ADD_PLACE} from '../actions/types';
const initialState = {
  selectedPlace: {
    location: null,
    picture: null,
    name: null,
  },
  places: [],
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_LOCATION:
      return {
        selectedPlace: {
          ...state.selectedPlace,
          location: action.payload,
        },
      };
    case ADD_PLACE:
      return {
        ...state,
        places: state.place.places.concat(action.payload),
      };
    default:
      return state;
  }
}
