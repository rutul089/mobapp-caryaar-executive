import {combineReducers} from 'redux';
import appStateReducer from './appStateReducer';
import authReducer from './authReducer';
import partnerFormReducer from './partnerFormReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  appState: appStateReducer,
  auth: authReducer,
  partnerForm: partnerFormReducer,
  user: userReducer,
});

export default rootReducer;
