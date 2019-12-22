import {REGISTER_USER, LOGIN_USER, LOADING_USER} from '../actions/types';
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    default:
      return state;
  }
}
