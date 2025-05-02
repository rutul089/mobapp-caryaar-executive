import types from './types';

export const setBasicDetails = payload => ({
  type: types.SET_BASIC_DETAILS,
  payload,
});

export const setLocationDetails = payload => ({
  type: types.SET_LOCATION_DETAILS,
  payload,
});

export const setDocumentDetails = payload => ({
  type: types.SET_DOCUMENT_DETAILS,
  payload,
});

export const setBankingDetails = payload => ({
  type: types.SET_BANKING_DETAILS,
  payload,
});

export const clearPartnerForm = () => ({
  type: types.CLEAR_PARTNER_FORM,
});

export const setDealershipType = type => ({
  type: types.SET_DEALERSHIP_TYPE,
  payload: type,
});

export const setUserType = userType => ({
  type: types.SET_USER_TYPE,
  payload: userType,
});

export const setSellerType = sellerType => ({
  type: types.SET_SELLER_TYPE,
  payload: sellerType,
});

export const setPartnerRole = role => ({
  type: types.SET_PARTNER_ROLE,
  payload: role,
});

export const resetRegistration = () => ({
  type: types.RESET_REGISTRATION,
});

export const resetPartnerDetail = () => ({
  type: types.RESET_PARTNER,
});
