import * as React from 'react';
import { Provider } from 'react-redux';
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
  Dispatch,
  MiddlewareAPI,
  ReducersMapObject,
} from 'redux';
import thunk from 'redux-thunk';

import commonReducer from '../../../reducer/CommonReducer';
import config from '../../../utils/Config';
import ModalDialog from '../ModalDialog';
import NotificationBar from '../NotificationBar';

function logger({ getState }: MiddlewareAPI) {
  return (next: Dispatch) => (action: AnyAction) => {
    console.groupCollapsed('Redux');
    console.log('%cState before', 'color:yellow', getState());
    console.log('Dispatch', action);
    const returnValue = next(action);
    console.log('%cState after', 'color:teal', getState());
    console.groupEnd();
    return returnValue;
  };
}

interface WithReduxPage {
  <T extends React.FunctionComponent<P>, P>(Component: T): (props: P) => JSX.Element;
}

export const withReduxPage =
  (reducers: ReducersMapObject = {}): WithReduxPage =>
  Component => {
    function ReduxPage(props = {}) {
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
          {/* @ts-ignore */}
          <Component {...props} />
          <ModalDialog />
        </Provider>
      );
    }
    return ReduxPage;
  };
