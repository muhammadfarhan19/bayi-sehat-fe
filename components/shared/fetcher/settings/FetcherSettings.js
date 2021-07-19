import axios from 'axios';
import config from '../../../../utils/Config';

export function useUsers() {
    return () => {
        return axios
            .get(config.apiHost + '/users', {
                timeout: 15000,
            })
            .then(res => res.data)
            .catch(error => {
                throw error.response.data;
            });
    }
};

export function usePostUser() {
    return (formData) => {
        return axios
            .post(config.apiHost + '/users', formData, {
                timeout: 15000,
            })
            .then(res => res.data)
            .catch(error => {
                throw error.response.data;
            });
    }
};

export function useGetUser() {
    return (formData) => {
        return axios
            .post(config.apiHost + '/application', formData, {
                timeout: 15000,
            })
            .then(res => res.data)
            .catch(error => {
                throw error.response.data;
            });
    }
};

export function useUpdateUser() {
    return (formData) => {
        return axios
            .post(config.apiHost + '/application', formData, {
                timeout: 15000,
            })
            .then(res => res.data)
            .catch(error => {
                throw error.response.data;
            });
    }
};

export function useDeleteUser() {
    return (formData) => {
        return axios
            .delete(config.apiHost + '/users/' + formData, {
                timeout: 15000,
            })
            .then(res => res.data)
            .catch(error => {
                throw error.response.data;
            });
    }
};

export function useOrganization() {
    return () => {
        return axios
            .get(config.apiHost + '/organizations', {
                timeout: 15000,
            })
            .then(res => res.data)
            .catch(error => {
                throw error.response.data;
            });
    }
};

export function useApplication() {
    return (formData) => {
        return axios
            .post(config.apiHost + '/application', formData, {
                timeout: 15000,
            })
            .then(res => res.data)
            .catch(error => {
                throw error.response.data;
            });
    }
};