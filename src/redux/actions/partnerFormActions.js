import moment from 'moment';
import {
  fetchPartnersList,
  fetchPartnerById,
  createPartner,
  updatePartnerById,
} from '../../api/userService';
import {showApiErrorToast, showToast} from '../../utils/helper';
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
        payload: user.data,
      });

      if (onSuccess) {
        onSuccess(user);
      }
    } catch (error) {
      dispatch({
        type: types.FETCH_PARTNER_FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
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

export const createPartnerThunk = (param, onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: types.CREATE_PARTNER_REQUEST});

    try {
      const response = await createPartner(param);

      dispatch({
        type: types.CREATE_PARTNER_SUCCESS,
        payload: {
          data: {
            id: response.data?.partnerId,
            createdAt: moment().toISOString(),
            companyName: param.companyName,
          },
          message: response.message,
          success: response.success,
        },
      });

      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      dispatch({
        type: types.CREATE_PARTNER_FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      if (onFailure) {
        onFailure(error.message);
      }
    }
  };
};

export const updatePartnerThunk = (partnerID, param, onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: types.UPDATE_PARTNER_REQUEST});

    try {
      const response = await updatePartnerById(param, partnerID);

      dispatch({
        type: types.UPDATE_PARTNER_SUCCESS,
        payload: {
          data: response.data,
          message: response.message,
          success: response.success,
        },
      });

      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      dispatch({
        type: types.UPDATE_PARTNER_FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      if (onFailure) {
        onFailure(error.message);
      }
    }
  };
};
