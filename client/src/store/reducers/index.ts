import { combineReducers } from 'redux';
import authReducer from './authReducer/authReducer';
import uiReducer from './uiReducer/uiReducer';

const rootReducer = combineReducers({ authInfo: authReducer, uiInfo: uiReducer });

export default rootReducer;
