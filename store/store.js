import { combineReducers, createStore } from 'redux';

import PpdnReducer from '../reducer/TesReducer';

function initStore() {
  return createStore(
    combineReducers({
      ppdn: PpdnReducer,
    })
  );
}

export function useStore() {
  return initStore();
}
