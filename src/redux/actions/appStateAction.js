import types from './types';

export const startLoading = () => ({
  type: types.START_LOADING,
});

export const stopLoading = () => ({
  type: types.STOP_LOADING,
});

export const setNetworkStatus = status => ({
  type: types.SET_NETWORK_STATUS,
  payload: status,
});

export const setNotificationCount = count => ({
  type: types.SET_NOTIFICATION_COUNT,
  payload: count,
});

export const logoutUser = () => ({
  type: types.LOGOUT_USER,
});

export const resetAppState = () => ({
  type: types.RESET_APP_STATE,
});
