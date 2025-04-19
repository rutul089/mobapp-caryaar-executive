import {types} from '../actions';

const initialState = {
  isLoggedIn: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case types.CLEAR_ALL_DATA:
      return {...initialState};
    default:
      return state;
  }
};
