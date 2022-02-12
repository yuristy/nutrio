import { combineReducers } from 'redux';
import authReducer from './authReducer/authReducer';

const rootReducer = combineReducers({ authInfo: authReducer });

export default rootReducer;
