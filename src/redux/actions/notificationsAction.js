import {fetchNotifications, markAllNotificationsRead} from '../../services';
import {showApiErrorToast} from '../../utils/helper';
import types from './types';

export const fetchNotificationsThunk = (onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: types.NOTIFICATIONS_REQUEST});

    try {
      const response = await fetchNotifications();
      console.log('fetchNotifications', JSON.stringify(response));
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

export const clearNotifications = () => ({
  type: types.CLEAR_NOTIFICATIONS,
});

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
