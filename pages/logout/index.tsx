import React from 'react';

import Loader from '../../components/shared/Loader/Loader';
import { UserAPI } from '../../constants/APIUrls';
import { removeCookie } from '../../utils/CookieHandler';
import { callAPI } from '../../utils/Fetchers';

function Logout() {
  React.useEffect(() => {
    (async () => {
      await callAPI(UserAPI.POST_AUTH_LOGOUT, {}, { checkToken: false });
      removeCookie('lastrefresh');
      removeCookie('refreshtoken');
      removeCookie('rememberme');
      removeCookie('token');
      window.location.href = '/login';
    })();
  });
  return <Loader />;
}

export default Logout;
