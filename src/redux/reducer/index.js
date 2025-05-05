import {combineReducers} from 'redux';
import appStateReducer from './appStateReducer';
import authReducer from './authReducer';
import partnerFormReducer from './partnerFormReducer';
import userReducer from './userReducer';
import partnersReducer from './partnersReducer';
import salesExecutiveReducer from './salesExecutiveReducer';
import bankReducer from './bankReducer';
import loanApplicationReducer from './loanApplicationReducer';

const rootReducer = combineReducers({
  appState: appStateReducer,
  auth: authReducer,
  partnerForm: partnerFormReducer,
  user: userReducer,
  partners: partnersReducer,
  salesExecutives: salesExecutiveReducer,
  banks: bankReducer,
  applications: loanApplicationReducer,
});

export default rootReducer;
