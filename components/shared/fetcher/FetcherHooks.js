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
        throw error;
    });
  }
};