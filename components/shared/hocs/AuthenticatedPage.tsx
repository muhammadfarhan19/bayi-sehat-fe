import { useRouter } from 'next/router';
import * as React from 'react';
import useSWR from 'swr/immutable';

import { AuthAPI, RbacAPI } from '../../../constants/APIUrls';
import { NavigationId } from '../../../constants/NavigationList';
import { GetAuthInfoRes } from '../../../types/api/AuthAPI';
import { PostRbacAuthorizeRes, PostRbacBulkAuthorizeReq } from '../../../types/api/RbacAPI';
import { filterMenu } from '../../../utils/Components';
import { removeCookie } from '../../../utils/CookieHandler';
import { callAPI } from '../../../utils/Fetchers';
import { AuthorizedMenuContext } from '../context/AuthorizedMenuContext';

interface WithAuthenticatedPageProps {
  checkLogin: boolean;
  resourceId: number;
}

interface WithAuthenticatedPage {
  (withProps?: Partial<WithAuthenticatedPageProps>): <
    T extends React.FunctionComponent<P>,
    P extends Record<string, unknown>
  >(
    Component: T
  ) => (props: P) => JSX.Element;
}

export const withAuthenticatedPage: WithAuthenticatedPage =
  (withProps = {}) =>
  Component => {
    const { checkLogin = true, resourceId } = withProps;

    function AuthenticatedPage(props = {}) {
      const { asPath, push } = useRouter();
      const currentPath = typeof window !== 'undefined' ? new URL(asPath, window.location.href).pathname : '/';

      const swrFetcher = async (resourceIdParam: number | undefined) => {
        const infoRes = await callAPI<null, GetAuthInfoRes>(AuthAPI.GET_AUTH_INFO, null, {
          method: 'get',
        });
        if (infoRes.status === 200 && infoRes.data?.data) {
          if (!checkLogin) {
            push('/');
          }

          // Check RBAC
          const allowedMap = await getAuthorizedNavigation(infoRes.data.data.user_id);
          if (resourceIdParam && !allowedMap[resourceIdParam]) {
            push('/');
          }

          return allowedMap;
        }
        removeCookie('token');
        removeCookie('refreshtoken');
        removeCookie('lastrefresh');
        if (checkLogin) {
          push('/login');
        }
      };

      const { data: authPageState, isValidating } = useSWR([resourceId], swrFetcher, {});

      return (
        <AuthorizedMenuContext.Provider value={filterMenu(currentPath, authPageState)}>
          {/* @ts-ignore */}
          {!isValidating && <Component {...props} />}
        </AuthorizedMenuContext.Provider>
      );
    }
    return AuthenticatedPage;
  };

const getAuthorizedNavigation = async (userId: number) => {
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
    return authRbacRes.data.data.reduce<Record<number, boolean>>((res, each) => {
      res[each.resource_id] = each.is_authorized;
      return res;
    }, {});
  }
  return {};
};
