import moment from 'moment';
import {
  createPartner,
  fetchPartnerById,
  fetchPartnersList,
  searchPartnersByKeyword,
  updatePartnerById,
} from '../../api/partnerServices';
import {showApiErrorToast} from '../../utils/helper';
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

export const resetPartnersDetail = () => ({
  type: types.RESET_PARTNERS,
});

/**
 * Thunk to fetch the complete list of partners.
 *
 * @param {Function} [onSuccess] - Callback executed when the fetch is successful.
 * @param {Function} [onFailure] - Callback executed when the fetch fails.
 */
export const fetchPartners = (page = 1, limit = 10, onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: types.FETCH_PARTNERS_REQUEST});

    try {
      const response = await fetchPartnersList(page, limit);
      dispatch({
        type: types.FETCH_PARTNERS_SUCCESS,
        payload: {
          data: response.data,
          page: response.pagination.page,
          totalPages: response.pagination.totalPages,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: types.FETCH_PARTNERS_FAILURE,
        payload: error.message,
      });
      onFailure?.(error.message);
      showApiErrorToast(error);
    }
  };
};

/**
 * Thunk to fetch a specific partner's details by ID.
 *
 * @param {string} partnerId - The ID of the partner to fetch.
 * @param {Function} [onSuccess] - Callback executed when the fetch is successful.
 * @param {Function} [onFailure] - Callback executed when the fetch fails.
 */
export const fetchPartnerFromId = (partnerId, onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: types.FETCH_PARTNER_REQUEST});

    try {
      const user = await fetchPartnerById(partnerId);
      dispatch({
        type: types.FETCH_PARTNER_SUCCESS,
        payload: user.data,
      });
      onSuccess?.(user);
    } catch (error) {
      dispatch({
        type: types.FETCH_PARTNER_FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

/**
 * Thunk to create a new partner.
 *
 * @param {Object} param - Data used to create the partner.
 * @param {Function} [onSuccess] - Callback executed after successful creation.
 * @param {Function} [onFailure] - Callback executed if creation fails.
 */
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

      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: types.CREATE_PARTNER_FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

/**
 * Thunk to update an existing partner by ID.
 *
 * @param {string} partnerID - The ID of the partner to update.
 * @param {Object} param - Updated partner data.
 * @param {Function} [onSuccess] - Callback executed after successful update.
 * @param {Function} [onFailure] - Callback executed if update fails.
 */
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

      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: types.UPDATE_PARTNER_FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

/**
 * Redux Thunk action to search partners by keyword.
 *
 * @param {string} search - The search term to query partners.
 * @param {function} [onSuccess] - Callback fired on successful API response.
 * @param {function} [onFailure] - Callback fired on API error.
 */
export const searchPartnersThunk = (
  search,
  page = 1,
  limit = 10,
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: types.SEARCH_PARTNER_REQUEST});

    try {
      const response = await searchPartnersByKeyword(search, page, limit);

      dispatch({
        type: types.SEARCH_PARTNER_SUCCESS,
        payload: {
          data: response.data,
          message: response.message,
          success: response.success,
          page: response.pagination.page,
          totalPages: response.pagination.totalPages,
        },
      });

      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: types.SEARCH_PARTNER_FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);

      onFailure?.(error.message);
    }
  };
};
