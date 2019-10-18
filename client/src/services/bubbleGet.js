import { axiosWithAuth } from '../utils/axiosWithAuth';

export default async () => {
  const result = await axiosWithAuth()
    .get('/api/colors')
    .then(res => res);

  return result;
};
