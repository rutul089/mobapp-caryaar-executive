import types from './types';

export const setUserDetails = details => ({
  type: types.SET_USER_DETAILS,
  payload: details,
});

export const setUserProfile = profile => ({
  type: types.SET_USER_PROFILE,
  payload: profile,
});

export const clearUserDetails = () => ({
  type: types.CLEAR_USER_DETAILS,
});

export const updateUserDetailField = (key, value) => ({
  type: types.UPDATE_USER_DETAIL_FIELD,
  payload: {key, value},
});
