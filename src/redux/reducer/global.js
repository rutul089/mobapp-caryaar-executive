import {types} from '../actions';

const initialState = {
  loading: false,
  isInternetConnected: true,
  notificationCount: 0,
};

const global = (state = initialState, action) => {
  switch (action.type) {
    case types.API_LOADING_START:
      return {...state, loading: true};
    case types.API_LOADING_STOP:
      return {...state, loading: false};
    case types.IS_INTERNET_CONNECTED:
      if (action.payload === false) {
        return {
          ...state,
          isInternetConnected: action.payload,
          loading: false,
        };
      } else {
        return {
          ...state,
          isInternetConnected: action.payload,
        };
      }
    case types.USER_LOGOUT:
    case types.CLEAR_ALL_DATA:
      return {...initialState};
    default:
      return state;
  }
};

export default global;
