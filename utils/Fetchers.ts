import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

import { AuthAPI } from '../constants/APIUrls';
import { PostAuthRefreshRes } from '../types/api/AuthAPI';
import config from './Config';
import { getCookie, removeCookie, setCookie } from './CookieHandler';

export interface CallAPIOptions {
  checkToken: boolean;
  method: Method;
  withToken: boolean;
  isMultipart: boolean;
  isBlob: boolean;
}

interface CallAPI {
  <Req, Res>(url: string, requestData: Req, options?: Partial<CallAPIOptions>): Promise<Partial<AxiosResponse<Res>>>;
}

export const callAPI: CallAPI = async (url, requestData, options) => {
  const { checkToken = true, isMultipart = false, method = 'post', withToken = true, isBlob = false } = options || {};

  const headers: {
    'Content-Type': string;
    Authorization?: string;
  } = {
    'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
  };

  // CHECK is token expired
  if (checkToken) {
    await checkTokenHandler();
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
    timeout: config.apiTimeoutMs, // Timeout 15 seconds
    url,
    paramsSerializer: { indexes: null },
  };

  if (isBlob) {
    axiosProps.responseType = 'blob';
  }

  if (method.toLowerCase() === 'post' || method.toLowerCase() === 'put' || method.toLowerCase() === 'delete') {
    axiosProps.data = requestData;
  } else if (method.toLowerCase() === 'get') {
    axiosProps.params = requestData;
  }

  return axios(axiosProps)
    .then(response => {
      return response || {};
    })
    .catch((err: AxiosError) => {
      const { response } = err;
      return response || {};
    });
};

export const refreshTokenHandler = async () => {
  //@ts-ignore
  window.refreshcalled = true;
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
      window.refreshcalled = false;
      return true;
    })
    .catch(() => {
      removeCookie('token');
      removeCookie('refreshtoken');
      removeCookie('lastrefresh');
      window.refreshcalled = false;
      window.location.href = '/login';
      return true;
    });
};

export const checkTokenHandler = async () => {
  const lastRefresh = getCookie('lastrefresh');
  if (!window.refreshcalled) {
    if (lastRefresh && Date.now() - Number(lastRefresh) > config.tokenExpiredMs) {
      await refreshTokenHandler();
    } else if (isNaN(lastRefresh)) {
      await refreshTokenHandler();
    }
  }
  return;
};

export const callAPIParallel = <T extends readonly unknown[] | []>(promises: () => T) => {
  return checkTokenHandler().then(() => Promise.all(promises()));
};
