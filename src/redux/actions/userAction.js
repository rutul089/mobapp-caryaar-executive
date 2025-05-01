import {
  changeUserPassword,
  loginWithType,
  updateUserProfile,
} from '../../api/userApi';
import {showApiErrorToast} from '../../utils/helper';
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
      // const user = await getUser(userId);
      dispatch({
        type: types.FETCH_USER_SUCCESS,
        payload: {
          id: 'u123456',
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          phone: '+1-555-123-4567',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          address: 'Ahmedabad,Gujarat',
          designation: 'Senior Product Manager',
        },
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

export const userLoginThunk = (type, param, onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: types.USER_LOADING});
    try {
      const response = await loginWithType(type, param);
      console.log('response', JSON.stringify(response));
      dispatch({
        type: types.USER_SUCCESS,
        payload: {
          message: response.message,
          success: response.success,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

export const updateProfileThunk = (param, onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: types.USER_LOADING});
    try {
      const response = await updateUserProfile(param);
      dispatch({
        type: types.UPDATE_USER_SUCCESS,
        payload: {
          message: response.message,
          success: response.success,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: types.UPDATE_USER_FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};

export const changePasswordThunk = (param, onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: types.CHANGE_PASSWORD_REQUEST});
    try {
      const response = await changeUserPassword(param);
      dispatch({
        type: types.CHANGE_PASSWORD_SUCCESS,
        payload: {
          message: response.message,
          success: response.success,
        },
      });
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: types.CHANGE_PASSWORD_FAILURE,
        payload: error.message,
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
};
