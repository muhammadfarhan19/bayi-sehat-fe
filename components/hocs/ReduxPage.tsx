import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore, ReducersMapObject } from 'redux';
import thunk from 'redux-thunk';

import commonReducer from '../../reducer/CommonReducer';
import config from '../../utils/Config';
import ModalDialog from '../shared/ModalDialog/ModalDialog';
import NotificationBar from '../shared/NotificationBar/NotificationBar';

function logger({ getState }) {
  return next => action => {
    console.groupCollapsed('Redux');
    console.log('%cState before', 'color:yellow', getState());
    console.log('Dispatch', action);
    const returnValue = next(action);
    console.log('%cState after', 'color:teal', getState());
    console.groupEnd();
    return returnValue;
  };
}

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
        config.environment === 'development' ? applyMiddleware(thunk, logger) : applyMiddleware(thunk)
      );

      return (
        <Provider store={store}>
          <NotificationBar />
          <Component {...props} />
          <ModalDialog />
        </Provider>
      );
    }
    return ReduxPage;
  };
