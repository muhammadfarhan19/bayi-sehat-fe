import * as React from 'react';

import { UserAPI } from '../../constants/APIUrls';
import { PostAuthInfoRes } from '../../types/UserAPI';
import { removeCookie } from '../../utils/CookieHandler';
import { callAPI } from '../../utils/Fetchers';
import Loader from '../shared/Loader/Loader';

interface WithAuthenticatedPageProps {
  checkLogin: boolean;
}

interface WithAuthenticatedPage {
  (withProps?: Partial<WithAuthenticatedPageProps>): (
    Component: <T = unknown>(...T) => JSX.Element
  ) => (...T) => JSX.Element;
}

export const withAuthenticatedPage: WithAuthenticatedPage =
  (withProps = {}) =>
  Component => {
    const { checkLogin = true } = withProps;

    function AuthenticatedPage(props) {
      const [loadPage, setLoadPage] = React.useState(false);

      React.useEffect(() => {
        (async () => {
          const infoRes = await callAPI<never, PostAuthInfoRes>(UserAPI.POST_AUTH_INFO, {}, { checkToken: false });
          if (infoRes.status === 200) {
            if (checkLogin) {
              setLoadPage(true);
            } else {
              window.location.href = '/';
            }
          } else {
            removeCookie('token');
            removeCookie('refreshtoken');
            removeCookie('lastrefresh');
            if (checkLogin) {
              window.location.href = '/login';
            } else {
              setLoadPage(true);
            }
          }
        })();
      }, []);

      if (!loadPage) {
        return <Loader />;
      }

      return <Component {...props} />;
    }
    return AuthenticatedPage;
  };
