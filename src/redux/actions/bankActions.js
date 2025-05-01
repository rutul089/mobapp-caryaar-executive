import {
  getBankBySearchCode,
  searchBanks,
  verifyBankIFSC,
} from '../../api/bankServices';
import {showApiErrorToast} from '../../utils/helper';
import types from './types';

// Thunk to fetch all banks
export const searchBanksThunk =
  (query, onSuccess, onFailure) => async dispatch => {
    dispatch({type: types.FETCH_BANKS_REQUEST});
    try {
      const response = await searchBanks(query);
      dispatch({type: types.FETCH_BANKS_SUCCESS, payload: response?.data});
      if (onSuccess) {
        onSuccess(response?.data);
      }
    } catch (error) {
      dispatch({
        type: types.FETCH_BANKS_FAILURE,
        payload: error.message || 'Failed to fetch banks',
      });
      showApiErrorToast(error);
      if (onFailure) {
        onFailure(error);
      }
    }
  };

// Thunk to fetch bank by name and search code
export const verifyBankByIFSCThunk =
  (bankName, ifscCode, onSuccess, onFailure) => async dispatch => {
    dispatch({type: types.FETCH_BANK_BY_SEARCH_REQUEST});
    try {
      const response = await verifyBankIFSC(bankName, ifscCode);
      dispatch({
        type: types.FETCH_BANK_BY_SEARCH_SUCCESS,
        payload: response?.data,
      });
      console.log('response----->', JSON.stringify(response));
      onSuccess?.(response);
    } catch (error) {
      dispatch({
        type: types.FETCH_BANK_BY_SEARCH_FAILURE,
        payload: error.message || 'Failed to verify bank IFSC',
      });
      showApiErrorToast(error);
      onFailure?.(error.message);
    }
  };
