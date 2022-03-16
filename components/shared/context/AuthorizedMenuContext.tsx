import * as React from 'react';

import { Navigation } from '../MainLayout/NavigationProps';

export const AuthorizedMenuContext = React.createContext<Navigation[]>([]);

export const useAuthorizedMenuContext = () => {
  return React.useContext(AuthorizedMenuContext);
};
