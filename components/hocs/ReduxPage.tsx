import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore, ReducersMapObject } from 'redux';
import thunk from 'redux-thunk';

import commonReducer from '../../reducer/CommonReducer';

export const withReduxPage =
  (reducers: ReducersMapObject = {}) =>
  Component => {
    function ReduxPage(props) {
      Component;
      const store = createStore(
        combineReducers({
          common: commonReducer,
          ...reducers,
        }),
        applyMiddleware(thunk)
      );

      return (
        <Provider store={store}>
          <Component {...props} />
        </Provider>
      );
    }
    return ReduxPage;
  };
