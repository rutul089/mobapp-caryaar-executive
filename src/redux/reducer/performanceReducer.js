import {types} from '../actions';

const initialState = {
  loading: false,
  partnerPerformances: [],
  partnerStats: {},
};

const performanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PARTNER_PERFORMANCE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case types.PARTNER_PERFORMANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        partnerPerformances: action.payload.data,
      };

    case types.PARTNER_PERFORMANCE_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        partnerStats: action.payload.data,
      };

    case types.PARTNER_PERFORMANCE_FAILURE:
    case types.PARTNER_PERFORMANCE_STATS_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case types.RESET_PARTNER_PERFORMANCE:
      return {
        ...state,
        partnerPerformances: [],
      };

    case types.RESET_PARTNER_PERFORMANCE:
      return {
        ...state,
        partnerStats: {},
      };

    case types.RESET_APP_STATE:
      return {...initialState};

    default:
      return state;
  }
};

export default performanceReducer;
