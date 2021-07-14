import axios from 'axios';
import config from '../../../utils/Config';

export function useLogin(){
  return (formData) => {
    return axios
      .post(config.apiHost + '/auth/login', formData, {
        timeout: 10000,
      })
      .then(res => res.data)
      .catch(error => {
        throw error.response.data;
    });
  }
};

export function useApplication(){
  return () => {
    return axios
      .get(config.apiHost + '/menu-application', {
        timeout: 10000,
      })
      .then(res => res.data)
      .catch(error => {
        throw error;
    });
  }
};

export function useModule(){
  return (data) => {
    return axios
      .get(config.apiHost + '/menu-modules/'+ data, {
        timeout: 10000,
      })
      .then(res => res.data)
      .catch(error => {
        throw error;
    });
  }
};