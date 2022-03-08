import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { AuthAPI } from '../constants/APIUrls';
import { PostAuthRefreshRes } from '../types/AuthAPI';
import { getCookie, removeCookie, setCookie } from './CookieHandler';

interface CallAPIOptions {
  checkToken: boolean;
  method: Method;
  withToken: boolean;
  isMultipart: boolean;
}

interface CallAPI {
  <Req, Res>(url: string, requestData?: Req | {}, options?: Partial<CallAPIOptions>): Promise<
    Partial<AxiosResponse<Res>>
  >;
}

export const callAPI: CallAPI = async (url, requestData = {}, options) => {
  const { checkToken = true, isMultipart = false, method = 'post', withToken = true } = options || {};

  const headers = {
    'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
  };

  /**
   * Check token
   */
  const lastRefresh = getCookie('lastrefresh');
  // Check last 9 seconds
  if (lastRefresh && Date.now() - Number(lastRefresh) > 9000) {
    await refreshTokenHandler();
  } else if (isNaN(lastRefresh)) {
    await refreshTokenHandler();
  }

  if (withToken) {
    const tokenCookie = getCookie('token');
    if (tokenCookie) {
      headers['Authorization'] = 'Bearer ' + tokenCookie;
    }
  }

  const axiosProps: AxiosRequestConfig = {
    headers,
    method,
    timeout: 15000, // Timeout 15 seconds
    url,
  };
  if (method === 'post' || method === 'put' || method === 'delete') {
    axiosProps.data = requestData;
  } else if (method === 'get') {
    axiosProps.params = requestData;
  }

  return axios(axiosProps)
    .then(response => {
      return response || {};
    })
    .catch((err: AxiosError) => {
      const { response } = err;
      if (checkToken && response?.status === 401) {
        refreshTokenHandler();
      }
      return response || {};
    });
};

export const refreshTokenHandler = () => {
  return axios
    .post<PostAuthRefreshRes>(
      AuthAPI.POST_AUTH_REFRESH,
      {
        refresh_token: getCookie('refreshtoken'),
      },
      {
        headers: {
          Authorization: 'Bearer ' + getCookie('token'),
          'Content-Type': 'application/json',
        },
      }
    )
    .then(response => {
      const { access_token, refresh_token } = response?.data?.data || {};
      setCookie('token', access_token);
      setCookie('refreshtoken', refresh_token);
      setCookie('lastrefresh', Date.now());
    })
    .catch(() => {
      removeCookie('token');
      removeCookie('refreshtoken');
      removeCookie('lastrefresh');
      window.location.href = '/login';
    });
};
