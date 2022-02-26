import Cookies from 'js-cookie';

export const getClientToken = () => {
  const cToken = Cookies.get('token');
  if (typeof cToken !== 'undefined') {
    return cToken;
  }
  return null;
};

export const getRefreshToken = () => {
  const cToken = Cookies.get('refreshtoken');
  if (typeof cToken !== 'undefined') {
    return cToken;
  }
  return null;
};
