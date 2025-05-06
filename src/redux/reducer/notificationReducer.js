import {types} from '../actions';

const initialState = {
  loading: false,
  notifications: [],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case types.NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: action.payload,
      };

    case types.NOTIFICATIONS_FAILURE:
    case types.NOTIFICATION_MARK_ALL_READ:
      return {
        ...state,
        loading: false,
      };

    case types.CLEAR_LOAN_SEARCH:
    case types.RESET_APP_STATE:
      return {...initialState};

    default:
      return state;
  }
};

export default notificationReducer;
