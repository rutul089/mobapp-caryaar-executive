// Action Types
import types from './types';
import {
  deleteSalesExecutiveById,
  fetchSalesExecutives,
  createSalesExecutive,
} from '../../api/salesExecutiveService';
import {
  getErrorMessage,
  showApiErrorToast,
  showToast,
} from '../../utils/helper';
// Action Creators
export const addSalesExecutive = executive => ({
  type: types.ADD_SALES_EXECUTIVE,
  payload: executive,
});

export const updateSalesExecutive = (id, updatedExecutive) => ({
  type: types.UPDATE_SALES_EXECUTIVE,
  payload: {id, updatedExecutive},
});

export const removeSalesExecutive = id => ({
  type: types.REMOVE_SALES_EXECUTIVE,
  payload: id,
});

export const resetSalesExecutive = () => ({
  type: types.RESET_SALES_EXECUTIVE,
});

export const fetchSalesExecutivesThunk = (
  page,
  limit,
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: types.FETCH_SALES_EXECUTIVE_REQUEST});

    try {
      const response = await fetchSalesExecutives(
        `page=${page}&limit=${limit}`,
      );
      dispatch({
        type: types.FETCH_SALES_EXECUTIVE_SUCCESS,
        payload: {
          data: response.data,
          page: response.pagination.page,
          limit: response.pagination.limit,
          total: response.pagination.total,
          totalPages: response.pagination.totalPages,
        },
      });
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      showApiErrorToast(error);
      dispatch({
        type: types.FETCH_SALES_EXECUTIVE_FAILURE,
        payload: {
          message: getErrorMessage(error),
          success: false,
        },
      });
      if (onFailure) {
        onFailure(error.message);
      }
    }
  };
};

export const deleteSalesExecutiveByIdThunk = (
  partnerId,
  onSuccess,
  onFailure,
) => {
  return async dispatch => {
    dispatch({type: types.REMOVE_SALES_EXECUTIVE_REQUEST});
    try {
      const response = await deleteSalesExecutiveById(partnerId);
      dispatch({
        type: types.REMOVE_SALES_EXECUTIVE_SUCCESS,
        payload: response,
      });
      dispatch({
        type: types.REMOVE_SALES_EXECUTIVE,
        payload: partnerId,
      });
      removeSalesExecutive(partnerId);
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      showApiErrorToast(error);
      dispatch({
        type: types.REMOVE_SALES_EXECUTIVE_FAILURE,
        payload: error.message,
      });
      if (onFailure) {
        onFailure(error.message);
      }
    }
  };
};

export const createSalesExecutiveThunk = (param, onSuccess, onFailure) => {
  return async dispatch => {
    dispatch({type: types.FETCH_SALES_EXECUTIVE_REQUEST});

    try {
      const response = await createSalesExecutive(param);

      dispatch({
        type: types.ADD_SALES_EXECUTIVE,
        payload: {
          id: response.data?.id,
          userId: response.data?.userId,
          position: param.position,
          user: {
            id: response.data?.userId,
            email: param.email,
            mobileNumber: param.mobileNumber,
            password: null,
            name: param.name,
            role: 'SALES_EXECUTIVE',
          },
          message: response.message,
          success: response.success,
        },
      });

      showToast('success', response?.message || 'Member created successfully!');

      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      showApiErrorToast(error);
      dispatch({
        type: types.FETCH_SALES_EXECUTIVE_FAILURE,
        payload: {
          message: getErrorMessage(error),
          success: false,
        },
      });
      if (onFailure) {
        onFailure(error);
      }
    }
  };
};
