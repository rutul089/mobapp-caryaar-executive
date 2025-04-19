import types from './types';

export const loadingSet = () => ({type: types.API_LOADING_START});

export const loadingUnset = () => ({type: types.API_LOADING_STOP});

export const noInternetConnected = isConnected => ({
  type: types.IS_INTERNET_CONNECTED,
  payload: isConnected,
});

export const selectedLoanType = value => ({
  type: types.SELECTED_LOAN_TYPE,
  payload: value,
});

export const clearAllData = () => ({
  type: types.CLEAR_ALL_DATA,
});
