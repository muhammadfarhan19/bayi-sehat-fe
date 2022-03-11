import axios from 'axios';

export const encrypt = (text: string) => {
  return axios
    .get<string>('/api/encrypt?text=' + text)
    .then(res => res.data)
    .catch(() => '');
};
