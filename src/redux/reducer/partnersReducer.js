import {types} from '../actions';

const initialState = {
  loading: false,
  partnersList: [],
  partnerDetail: {},
};

export default function partnerFormReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PARTNERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_PARTNERS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.FETCH_PARTNERS_SUCCESS:
      return {
        ...state,
        partnersList: action.payload,
        loading: false,
      };
    case types.FETCH_PARTNER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_PARTNER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.FETCH_PARTNER_SUCCESS:
      return {
        ...state,
        partnerDetail: action.payload,
        loading: false,
      };
    case types.RESET_PARTNER:
      return {
        ...state,
        partnerDetail: {},
        loading: false,
      };
    case types.RESET_PARTNERS:
      return {
        ...state,
        partnersList: [],
        loading: false,
      };
    case types.RESET_APP_STATE:
      return initialState;
    default:
      return state;
  }
}
