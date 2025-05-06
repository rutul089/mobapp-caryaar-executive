import {types} from '../actions';

const initialState = {
  loading: false,
  loanApplications: [],
  loanPage: 1,
  loanTotalPages: 1,
  selectedLoanApplications: null,
  searchPage: 1,
  searchTotalPages: 1,
  searchedLoanApplications: [],
};

const loanApplicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_LOAN_APPLICATIONS_REQUEST:
    case types.SEARCH_LOAN_APPLICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case types.FETCH_LOAN_APPLICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        loanApplications:
          action.payload.page === 1
            ? action.payload.data
            : [...state.loanApplications, ...action.payload.data],
        loanPage: action.payload.page,
        loanTotalPages: action.payload.totalPages,
      };

    case types.FETCH_LOAN_APPLICATIONS_FAILURE:
    case types.SEARCH_LOAN_APPLICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case types.FETCH_LOAN_APPLICATIONS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedLoanApplications: action.payload,
      };

    case types.SEARCH_LOAN_APPLICATIONS_SUCCESS:
      return {
        ...state,
        searchedLoanApplications:
          action.payload.page === 1
            ? action.payload.data
            : [...state.searchedLoanApplications, ...action.payload.data],
        loading: false,
        message: action.payload.message,
        success: action.payload.success,
        searchPage: action.payload.page,
        searchTotalPages: action.payload.totalPages,
      };

    case types.CLEAR_LOAN_SEARCH:
      return {
        ...state,
        searchedLoanApplications: [],
        searchPage: 1,
        searchTotalPages: 1,
        loading: false,
      };

    case types.RESET_APP_STATE:
      return {...initialState};

    default:
      return state;
  }
};

export default loanApplicationReducer;
