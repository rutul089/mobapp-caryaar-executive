import {types} from '../actions';

const initialState = {
  salesExecutives: [],
  loading: false,
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  success: false,
  message: '',
};

const salesExecutiveReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SALES_EXECUTIVE_REQUEST:
    case types.REMOVE_SALES_EXECUTIVE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_SALES_EXECUTIVE_FAILURE:
    case types.REMOVE_SALES_EXECUTIVE_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        success: action.payload.success,
      };
    case types.FETCH_SALES_EXECUTIVE_SUCCESS:
      return {
        ...state,
        salesExecutives:
          action.payload.page === 1
            ? action.payload.data
            : [...state.salesExecutives, ...action.payload.data],
        loading: false,
        page: action.payload.page,
        limit: action.payload.limit,
        total: action.payload.total,
        totalPages: action.payload.totalPages,
      };
    case types.ADD_SALES_EXECUTIVE:
      return {
        ...state,
        salesExecutives: [action.payload, ...state.salesExecutives],
        message: action.payload.message,
        success: action.payload.success,
        loading: false,
      };

    case types.REMOVE_SALES_EXECUTIVE:
      return {
        ...state,
        loading: false,
        salesExecutives: state.salesExecutives.filter(
          executive => executive.userId !== action.payload,
        ),
      };
    case types.RESET_APP_STATE:
    case types.RESET_SALES_EXECUTIVE:
      return initialState;
    default:
      return state;
  }
};

export default salesExecutiveReducer;
