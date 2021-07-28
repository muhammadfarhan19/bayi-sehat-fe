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

export function useGetSkp() {
  return () => {
    return axios
      .get(config.apiHost + '/skp-dikbud', {
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

export function useGetLencana() {
  return () => {
    return axios
      .get(config.apiHost + '/satya-lencana', {
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

export function useGetKgb() {
  return () => {
    return axios
      .get(config.apiHost + '/kenaikan-gaji-berkala', {
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


export function useGetTukin() {
  return () => {
    return axios
      .get(config.apiHost + '/tukin', {
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

