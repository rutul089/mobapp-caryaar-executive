import {
  fetchLoanApplicationById,
  fetchLoanApplications,
  searchLoanApplicationByKeyword,
} from '../../services';
import {showApiErrorToast} from '../../utils/helper';
import types from './types';

/**
 * Thunk to fetch a paginated list of loan applications.
 *
 * @param {number} page - The current page number (default is 1).
 * @param {number} limit - The number of items per page (default is 10).
 * @param {Function} [onSuccess] - Optional callback to execute on success. Receives full response.
 * @param {Function} [onFailure] - Optional callback to execute on failure. Receives error message.
 * @returns {Function} Redux thunk function.
 */
export const fetchLoanApplicationsThunk = (
  page = 1,
  limit = 10,
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: types.FETCH_LOAN_APPLICATIONS_REQUEST});

    try {
      const response = await fetchLoanApplications(page, limit);
      dispatch({
        type: types.FETCH_LOAN_APPLICATIONS_SUCCESS,
        payload: {
          data: response.data,
          page: response.pagination.page,
          totalPages: response.pagination.totalPages,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: types.FETCH_LOAN_APPLICATIONS_FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

/**
 * Thunk to fetch a specific loan application by its ID.
 *
 * @param {string} id - The unique identifier of the loan application.
 * @param {Function} [onSuccess] - Optional callback to execute on success. Receives full response.
 * @param {Function} [onFailure] - Optional callback to execute on failure. Receives error message.
 * @returns {Function} Redux thunk function.
 */
export const fetchLoanApplicationFromIdThunk = (id, onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: types.FETCH_LOAN_APPLICATIONS_REQUEST});

    try {
      const response = await fetchLoanApplicationById(id);
      dispatch({
        type: types.FETCH_LOAN_APPLICATIONS_BY_ID_SUCCESS,
        payload: response.data,
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: types.FETCH_LOAN_APPLICATIONS_FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

export const searchLoanApplicationThunk = (
  search,
  page = 1,
  limit = 10,
  onSuccess,
  onFailure,
  status = null,
) => {
  return async dispatch => {
    dispatch({type: types.SEARCH_LOAN_APPLICATIONS_REQUEST});
    try {
      const response = await searchLoanApplicationByKeyword(
        search,
        page,
        limit,
        status,
      );

      dispatch({
        type: types.SEARCH_LOAN_APPLICATIONS_SUCCESS,
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
        type: types.SEARCH_LOAN_APPLICATIONS_FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

export const clearLoanSearch = () => ({
  type: types.CLEAR_LOAN_SEARCH,
});
