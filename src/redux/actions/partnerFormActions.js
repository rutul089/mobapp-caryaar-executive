import {fetchPartnersList, fetchPartnerById} from '../../api/userService';
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

export const setCarType = carType => ({
  type: types.SET_CAR_TYPE,
  payload: carType,
});

export const setPartnerRole = role => ({
  type: types.SET_PARTNER_ROLE,
  payload: role,
});

export const resetRegistration = () => ({
  type: types.RESET_REGISTRATION,
});

export const fetchPartners = (onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: types.FETCH_PARTNERS_REQUEST});

    try {
      const user = await fetchPartnersList();
      dispatch({
        type: types.FETCH_PARTNERS_SUCCESS,
        payload: user,
      });
      if (onSuccess) {
        onSuccess(user);
      }
    } catch (error) {
      dispatch({
        type: types.FETCH_PARTNERS_FAILURE,
        payload: error.message,
      });
      if (onFailure) {
        onFailure(error.message);
      }
    }
  };
};

export const fetchPartnerFromId = (partnerId, onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: types.FETCH_PARTNER_REQUEST});

    try {
      const user = await fetchPartnerById(partnerId);
      dispatch({
        type: types.FETCH_PARTNER_SUCCESS,
        payload: user,
      });
      if (onSuccess) {
        onSuccess(user);
      }
    } catch (error) {
      dispatch({
        type: types.FETCH_PARTNER_FAILURE,
        payload: error.message,
      });
      if (onFailure) {
        onFailure(error.message);
      }
    }
  };
};

export const resetPartnerDetail = () => ({
  type: types.RESET_PARTNER,
});

export const resetPartnersDetail = () => ({
  type: types.RESET_PARTNERS,
});
