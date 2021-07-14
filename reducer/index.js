import { combineReducers } from 'redux';
import AlertReducer from './AlertReducer';
import ModuleReducer from './ModuleReducer';

export default combineReducers({
  AlertReducer,
  ModuleReducer,
});
