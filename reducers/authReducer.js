import {
  LOGIN_USER,
  LOADING,
  GET_AUTH_TOKEN,
  LOGOUT_USER,
} from '../actions/types';
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  token: null,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_AUTH_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload.user,
        loading: false,
      };
    case LOGIN_USER:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
