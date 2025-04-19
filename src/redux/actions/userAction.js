import {getUser} from '../../api/userService';
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

export const fetchUser = (userId, onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: types.FETCH_USER_REQUEST});

    try {
      const user = await getUser(userId);
      dispatch({
        type: types.FETCH_USER_SUCCESS,
        payload: user,
      });
      if (onSuccess) {
        onSuccess(user);
      }
    } catch (error) {
      dispatch({
        type: types.FETCH_USER_FAILURE,
        payload: error.message,
      });
      if (onFailure) {
        onFailure(error.message);
      }
    }
  };
};
