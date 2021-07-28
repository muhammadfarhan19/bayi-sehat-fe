import axios from 'axios';
import config from '../../../../utils/Config';
import { getClientToken } from '../../../../utils/CookieHandler';

export function useGetKepangkatan() {
  return () => {
    return axios
      .get(config.apiHost + '/daftar-kepangkatan', {
        timeout: 15000,
        headers: {
          Authorization: 'Bearer ' + getClientToken(),
        },
      })
      .then(res => res.data)
      .catch(error => {
        throw error;
      });
  }
};