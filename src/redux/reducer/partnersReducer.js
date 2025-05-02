import {types} from '../actions';

const initialState = {
  loading: false,
  partnersList: [],
  success: false,
  selectedPartner: {},
  searchPartners: [],
  currentPage: 1,
  totalPages: 1,
};

export default function partnerFormReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PARTNER_REQUEST:
    case types.FETCH_PARTNERS_REQUEST:
    case types.CREATE_PARTNER_REQUEST:
    case types.UPDATE_PARTNER_REQUEST:
    case types.SEARCH_PARTNER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_PARTNERS_FAILURE:
    case types.FETCH_PARTNER_FAILURE:
    case types.CREATE_PARTNER_FAILURE:
    case types.UPDATE_PARTNER_FAILURE:
    case types.SEARCH_PARTNER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.FETCH_PARTNERS_SUCCESS:
      return {
        ...state,
        partnersList:
          action.payload.page === 1
            ? action.payload.data
            : [...state.partnersList, ...action.payload.data],
        currentPage: action.payload.page,
        totalPages: action.payload.totalPages,
        loading: false,
      };

    case types.FETCH_PARTNER_SUCCESS:
      return {
        ...state,
        selectedPartner: action.payload,
        loading: false,
      };
    case types.RESET_PARTNER:
      return {
        ...state,
        selectedPartner: {},
        loading: false,
      };
    case types.RESET_PARTNERS:
      return {
        ...state,
        partnersList: [],
        searchPartners: [],
        loading: false,
      };
    case types.CREATE_PARTNER_SUCCESS:
      return {
        ...state,
        // partnersList: [action.payload.data, ...state.partnersList],
        message: action.payload.message,
        success: action.payload.success,
        loading: false,
      };
    case types.UPDATE_PARTNER_SUCCESS:
      return {
        ...state,
        selectedPartner: action.payload.data,
        message: action.payload.message,
        success: action.payload.success,
        loading: false,
      };
    case types.SEARCH_PARTNER_SUCCESS:
      return {
        ...state,
        searchPartners:
          action.payload.page === 1
            ? action.payload.data
            : [...state.searchPartners, ...action.payload.data],
        loading: false,
        message: action.payload.message,
        success: action.payload.success,
        currentPage: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case types.RESET_APP_STATE:
      return initialState;
    default:
      return state;
  }
}
