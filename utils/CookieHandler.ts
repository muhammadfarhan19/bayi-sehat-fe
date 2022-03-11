import Cookies from 'js-cookie';
import config from './Config';

type CookieName = 'token' | 'refreshtoken' | 'lastrefresh' | 'rememberme';
type CookieOption = Partial<{
  expires: number;
  path: string;
  domain: string;
}>;

export const getCookie = (name: CookieName) => {
  const cookieValue = Cookies.get(name);
  if (typeof cookieValue !== 'undefined') {
    return cookieValue;
  }
  return null;
};

export const setCookie = (name: CookieName, value: string | number, options: CookieOption = {}) => {
  const rememberMe = Cookies.get('rememberme', { sameSite: true, secure: config.cookieSecure });
  const cookieOption = { ...options, sameSite: true, secure: config.cookieSecure };
  if (rememberMe === 1) {
    cookieOption.expires = 30;
  }
  Cookies.set(name, value, cookieOption);
};

export const removeCookie = (name: CookieName, options: CookieOption = {}) => {
  Cookies.remove(name, { ...options, sameSite: true, secure: config.cookieSecure });
};
