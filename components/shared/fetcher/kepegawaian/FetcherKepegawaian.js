import axios from 'axios';

export const fetcherHandler = url => {
    return axios
      .get(url, {
        timeout: 10000,
        headers: {
          Authorization: 'Bearer ' + getClientToken(),
        },
      })
      .then(res => res.data)
      .catch(error => {
        const errorObj = new Error('An error occurred while fetching the data.');
        errorObj.info = ErrorMapText[error?.response?.data?.status] || ErrorMapText['default'];
        errorObj.status = error?.response?.data?.status || null;
        throw errorObj;
      });
  };
  