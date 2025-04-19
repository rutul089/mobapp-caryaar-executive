import {combineReducers} from 'redux';
import global from './global';
import {authReducer} from './authReducer';
import partnerFormReducer from './partnerFormReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  global,
  auth: authReducer,
  partnerForm: partnerFormReducer,
  user: userReducer,
});

export default rootReducer;
