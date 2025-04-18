import {types} from '../actions';

const initialState = {
  loading: false,
  userDetail: {},
  isInternetConnected: true,
  errorMessage: '',
  isError: false,
  notificationCount: 0,
  userProfile: {},
  selectedLoanType: null,
};

const global = (state = initialState, action) => {
  switch (action.type) {
    case types.API_LOADING_START:
      return {...state, loading: true};
    case types.API_LOADING_STOP:
      return {...state, loading: false};
    case types.ON_ERROR_RECEIVED:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.message,
        isError: action.payload.type,
      };
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
    case types.USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload,
      };
    case types.USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    case types.USER_LOGOUT:
      return {...initialState};
    case types.API_LOADING_START_CON:
      return {...state, isConvLoading: true};
    case types.API_LOADING_STOP_CON:
      return {...state, isConvLoading: false};
    case types.SELECTED_LOAN_TYPE:
      return {...state, selectedLoanType: action.payload};

    default:
      return state;
  }
};

export default global;
