import {fetchPartnerPerformances, fetchPartnerStats} from '../../services';
import {showApiErrorToast} from '../../utils/helper';
import types from './types';

/**
 * Thunk action to fetch partner performance data from the backend.
 *
 * Dispatches request, success, and failure actions.
 * Optionally calls provided onSuccess or onFailure callbacks.
 *
 * @function fetchPartnerPerformancesThunk
 * @param {function} [onSuccess] - Callback to execute if the API call succeeds.
 * @param {function} [onFailure] - Callback to execute if the API call fails.
 * @returns {Function} Thunk function for Redux dispatch.
 */
export const fetchPartnerPerformancesThunk = (onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: types.PARTNER_PERFORMANCE_REQUEST});

    try {
      const response = await fetchPartnerPerformances();
      dispatch({
        type: types.PARTNER_PERFORMANCE_SUCCESS,
        payload: {
          data: response.data,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: types.PARTNER_PERFORMANCE_FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

/**
 * Thunk action to fetch partner performance statistics.
 *
 * Dispatches request, success, and failure actions.
 * Optionally calls provided onSuccess or onFailure callbacks.
 *
 * @function fetchPartnerStatsThunk
 * @param {function} [onSuccess] - Callback for success response.
 * @param {function} [onFailure] - Callback for error response.
 * @returns {Function} Thunk function for Redux dispatch.
 */
export const fetchPartnerStatsThunk = (onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: types.PARTNER_PERFORMANCE_STATS_REQUEST});

    try {
      const response = await fetchPartnerStats();
      dispatch({
        type: types.PARTNER_PERFORMANCE_STATS_SUCCESS,
        payload: {
          data: response.data,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: types.PARTNER_PERFORMANCE_FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

/**
 * Action creator to reset the partner performance data in the Redux store.
 *
 * @function clearPartnerPerformances
 * @returns {{type: string}} Redux action to reset partner performance.
 */
export const clearPartnerPerformances = () => ({
  type: types.RESET_PARTNER_PERFORMANCE,
});

/**
 * Action creator to reset the partner performance statistics in the Redux store.
 *
 * @function clearPartnerPerformanceStat
 * @returns {{type: string}} Redux action to reset partner performance stats.
 */
export const clearPartnerPerformanceStat = () => ({
  type: types.RESET_PARTNER_PERFORMANCE_STATS,
});
