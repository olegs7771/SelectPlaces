import {REGISTER_USER, LOGIN_USER} from '../actions/types';
const initialState = {
  isAuthenticated: false,
  user: null,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    default:
      return state;
  }
}
