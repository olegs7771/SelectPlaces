import {API_MESSAGE} from '../actions/types';

const initialState = {
  message: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case API_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
