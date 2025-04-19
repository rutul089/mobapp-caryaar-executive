import {types} from '../actions';

const initialState = {
  basicDetails: {},
  locationDetails: {},
  documentDetails: {},
  bankingDetails: {},
  dealershipType: null,
  userType: null,
  carType: null,
  partnerRole: null,
};

export default function partnerFormReducer(state = initialState, action) {
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
        dealershipType: action.payload,
      };
    case types.SET_USER_TYPE:
      return {
        ...state,
        userType: action.payload,
      };
    case types.SET_CAR_TYPE:
      return {
        ...state,
        carType: action.payload,
      };
    case types.SET_PARTNER_ROLE:
      return {
        ...state,
        partnerRole: action.payload,
      };
    case types.RESET_REGISTRATION:
    case types.CLEAR_PARTNER_FORM:
    case types.CLEAR_ALL_DATA:
      return initialState;
    default:
      return state;
  }
}
