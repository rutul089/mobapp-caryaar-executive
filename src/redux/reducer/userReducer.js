import {types} from '../actions';

const initialState = {
  userDetails: null,
  userProfile: null,
};

const userReducer = (state = initialState, action) => {
  console.log('action', JSON.stringify(action));
  switch (action.type) {
    case types.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case types.SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    case types.UPDATE_USER_DETAIL_FIELD:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          [action.payload.key]: action.payload.value,
        },
      };
    case types.CLEAR_USER_DETAILS:
    case types.CLEAR_ALL_DATA:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
