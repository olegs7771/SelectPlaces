import {
  REGISTER_USER,
  LOGIN_USER,
  LOADING_USER,
  GET_AUTH_TOKEN,
} from '../actions/types';
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  token: null,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case GET_AUTH_TOKEN:
      return {
        ...state,
        token: action.payload,
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
