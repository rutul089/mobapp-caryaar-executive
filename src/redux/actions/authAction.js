import types from './types';

export const setLoginStatus = isLoggedIn => ({
  type: types.SET_LOGIN_STATUS,
  payload: isLoggedIn,
});
