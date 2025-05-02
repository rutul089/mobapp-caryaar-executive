import types from './types';
import {showApiErrorToast} from '../../utils/helper';
import {
  createPartner,
  fetchPartnerById,
  fetchPartnersByStatus,
  searchPartnersByKeyword,
  updatePartnerById,
} from '../../api/partnerServices';
import moment from 'moment';

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
      const response = await fetchPartnerById(partnerId);
      dispatch({
        type: types.FETCH_PARTNER_SUCCESS,
        payload: response.data,
      });
      onSuccess?.(response);
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
  status = null,
) => {
  return async dispatch => {
    dispatch({type: types.SEARCH_PARTNER_REQUEST});

    try {
      const response = await searchPartnersByKeyword(
        search,
        page,
        limit,
        status,
      );

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

/**
 * Thunk to fetch partners with 'APPROVED' status (active partners).
 *
 * @function fetchActivePartners
 * @param {number} [page=1] - Page number for pagination.
 * @param {number} [limit=10] - Number of records per page.
 * @param {Function} [onSuccess] - Callback to execute on successful fetch.
 * @param {Function} [onFailure] - Callback to execute on failure.
 * @returns {Function} Redux thunk function.
 */
export const fetchActivePartners = (
  page = 1,
  limit = 10,
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: types.FETCH_ACTIVE_PARTNERS_REQUEST});

    try {
      const response = await fetchPartnersByStatus('APPROVED', page, limit);
      dispatch({
        type: types.FETCH_ACTIVE_PARTNERS_SUCCESS,
        payload: {
          data: response.data,
          page: response.pagination.page,
          totalPages: response.pagination.totalPages,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({type: types.FETCH_ACTIVE_PARTNERS_FAILURE});
      onFailure?.(error);
    }
  };
};

/**
 * Thunk to fetch partners with 'PENDING' status.
 *
 * @function fetchPendingPartners
 * @param {number} [page=1] - Page number for pagination.
 * @param {number} [limit=10] - Number of records per page.
 * @param {Function} [onSuccess] - Callback to execute on successful fetch.
 * @param {Function} [onFailure] - Callback to execute on failure.
 * @returns {Function} Redux thunk function.
 */
export const fetchPendingPartners = (
  page = 1,
  limit = 10,
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: types.FETCH_PENDING_PARTNERS_REQUEST});

    try {
      const response = await fetchPartnersByStatus('PENDING', page, limit);
      dispatch({
        type: types.FETCH_PENDING_PARTNERS_SUCCESS,
        payload: {
          data: response.data,
          page: response.pagination.page,
          totalPages: response.pagination.totalPages,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({type: types.FETCH_PENDING_PARTNERS_FAILURE});
      onFailure?.(error);
    }
  };
};

/**
 * Action creator to clear the search results.
 *
 * This action is dispatched to reset the state of search results in the Redux store.
 * It will set the search results to an empty state, effectively clearing any data
 * that was previously stored in the search results state.
 *
 * @returns {Object} The action object to be dispatched.
 * @property {string} type - The action type, which will be `CLEAR_SEARCH_PARTNERS`.
 */
export const clearSearchResults = () => ({
  type: types.CLEAR_SEARCH_PARTNERS,
});
