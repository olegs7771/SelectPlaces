import {
  SELECT_LOCATION,
  SELECT_PLACE,
  GET_ALL_PLACES,
  LOADING,
} from '../actions/types';
const initialState = {
  places: null,
  selectedPlace: null,
  loading: false,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_PLACES:
      return {
        ...state,
        loading: false,
        places: action.payload,
      };
    case SELECT_PLACE:
      return {
        ...state,
        selectedPlace: action.payload,
      };

    default:
      return state;
  }
}
