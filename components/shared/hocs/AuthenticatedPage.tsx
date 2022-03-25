import * as React from 'react';

import { AuthAPI, RbacAPI } from '../../../constants/APIUrls';
import { NavigationId } from '../../../constants/NavigationList';
import { GetAuthInfoRes } from '../../../types/AuthAPI';
import { PostRbacAuthorizeRes, PostRbacBulkAuthorizeReq } from '../../../types/RbacAPI';
import { filterMenu } from '../../../utils/Components';
import { removeCookie } from '../../../utils/CookieHandler';
import { callAPI } from '../../../utils/Fetchers';
import { AuthorizedMenuContext } from '../context/AuthorizedMenuContext';
import Loader from '../Loader/Loader';
import { Navigation } from '../MainLayout/NavigationProps';

interface WithAuthenticatedPageProps {
  checkLogin: boolean;
  resourceId: number;
}

interface WithAuthenticatedPage {
  (withProps?: Partial<WithAuthenticatedPageProps>): <T extends React.FunctionComponent<P>, P = unknown>(
    Component: T
  ) => (props: P) => JSX.Element;
}

export const withAuthenticatedPage: WithAuthenticatedPage =
  (withProps = {}) =>
  Component => {
    const { checkLogin = true, resourceId } = withProps;

    function AuthenticatedPage(props = {}) {
      const [authPageState, setAuthPageState] = React.useState<{
        loadPage: boolean;
        navigation: Navigation[];
      }>({
        loadPage: false,
        navigation: [],
      });

      React.useEffect(() => {
        (async () => {
          const infoRes = await callAPI<null, GetAuthInfoRes>(AuthAPI.GET_AUTH_INFO, null, {
            method: 'get',
          });
          if (infoRes.status === 200 && infoRes.data?.data) {
            if (checkLogin) {
              // Check RBAC
              const [filteredMenu, allowedMap] = await getAuthorizedNavigation(infoRes.data.data.user_id);
              const authorizedNavigations = filteredMenu;
              if (resourceId && !allowedMap[resourceId]) {
                window.location.href = '/';
                return null;
              }

              // Load page
              setAuthPageState({
                loadPage: true,
                navigation: authorizedNavigations,
              });
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
              setAuthPageState({
                loadPage: true,
                navigation: [],
              });
            }
          }
        })();
      }, []);

      if (!authPageState.loadPage) {
        return <Loader />;
      }

      return (
        <AuthorizedMenuContext.Provider value={authPageState.navigation}>
          <Component {...(props as never)} />
        </AuthorizedMenuContext.Provider>
      );
    }
    return AuthenticatedPage;
  };

const getAuthorizedNavigation = async (userId: number): Promise<[Navigation[], Record<number, boolean>]> => {
  const authRbacRes = await callAPI<PostRbacBulkAuthorizeReq, PostRbacAuthorizeRes>(RbacAPI.POST_RBAC_BULK_AUTHORIZE, {
    bulk_request: Object.keys(NavigationId).map(each => {
      const key = each as keyof typeof NavigationId;
      return {
        action: 'read',
        resource_id: NavigationId[key],
        user_id: userId,
      };
    }),
  });
  if (authRbacRes.status === 200 && authRbacRes.data && Array.isArray(authRbacRes.data?.data)) {
    const allowedMap = authRbacRes.data.data.reduce<Record<number, boolean>>((res, each) => {
      res[each.resource_id] = each.is_authorized;
      return res;
    }, {});
    const filteredMenu = filterMenu(allowedMap);

    return [filteredMenu, allowedMap];
  }
  return [[], {}];
};
