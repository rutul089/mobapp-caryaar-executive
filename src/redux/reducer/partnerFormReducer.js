import {types} from '../actions';

const initialState = {
  basicDetails: {},
  locationDetails: {},
  documentDetails: [],
  bankingDetails: {},
  partnerType: null,
  partnerRole: null,
  isMultiUser: true,
  sellerType: null,
};

const partnerFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_BASIC_DETAILS:
      return {...state, basicDetails: action.payload};
    case types.SET_LOCATION_DETAILS:
      return {...state, locationDetails: action.payload};
    case types.SET_DOCUMENT_DETAILS:
      return {...state, documentDetails: action.payload};
    case types.SET_BANKING_DETAILS:
      return {...state, bankingDetails: action.payload};
    case types.SET_DEALERSHIP_TYPE:
      return {
        ...state,
        partnerType: action.payload,
      };
    case types.SET_USER_TYPE:
      return {
        ...state,
        isMultiUser: action.payload,
        partnerRole: action.payload ? state.partnerRole : null,
      };
    case types.SET_SELLER_TYPE:
      return {
        ...state,
        sellerType: action.payload,
      };
    case types.SET_PARTNER_ROLE:
      return {
        ...state,
        partnerRole: action.payload,
      };
    case types.RESET_REGISTRATION:
    case types.CLEAR_PARTNER_FORM:
    case types.RESET_APP_STATE:
      return initialState;
    default:
      return state;
  }
};

export default partnerFormReducer;
