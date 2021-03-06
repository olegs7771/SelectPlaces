import {API_MESSAGE} from '../actions/types';

const initialState = {
  messages: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case API_MESSAGE:
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
};
