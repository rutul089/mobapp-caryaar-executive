import {combineReducers} from 'redux';
import global from './global';
import {authReducer} from './authReducer';

const rootReducer = combineReducers({
  global,
  auth: authReducer,
});

export default rootReducer;
