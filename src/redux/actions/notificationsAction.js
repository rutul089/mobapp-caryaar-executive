import {fetchNotifications, markAllNotificationsRead} from '../../services';
import {showApiErrorToast} from '../../utils/helper';
import types from './types';

/**
 * Thunk to fetch notifications.
 *
 * @function fetchNotificationsThunk
 * @param {Function} [onSuccess] - Callback invoked with response on success.
 * @param {Function} [onFailure] - Callback invoked with error message on failure.
 * @returns {Function} Thunk function to dispatch Redux actions.
 */
export const fetchNotificationsThunk = (onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: types.NOTIFICATIONS_REQUEST});

    try {
      const response = await fetchNotifications();
      dispatch({
        type: types.NOTIFICATIONS_SUCCESS,
        payload: response,
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: types.NOTIFICATIONS_FAILURE,
        payload: error,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

/**
 * Action to clear all notifications from Redux store.
 *
 * @function clearNotifications
 * @returns {Object} Redux action with type `CLEAR_NOTIFICATIONS`
 */
export const clearNotifications = () => ({
  type: types.CLEAR_NOTIFICATIONS,
});

/**
 * Thunk to mark all notifications as read.
 *
 * @function markAllNotificationsReadThunk
 * @param {Function} [onSuccess] - Callback invoked after successful operation.
 * @param {Function} [onFailure] - Callback invoked with error message on failure.
 * @returns {Function} Thunk function to dispatch Redux actions.
 */
export const markAllNotificationsReadThunk = (onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: types.NOTIFICATIONS_REQUEST});

    try {
      const response = await markAllNotificationsRead();
      dispatch({
        type: types.NOTIFICATION_MARK_ALL_READ,
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: types.NOTIFICATIONS_FAILURE,
        payload: error,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};
