import { axiosWithAuth } from '../utils/axiosWithAuth';

export default async id => {
  const result = await axiosWithAuth()
    .delete(`/api/colors/${id}`)
    .then(res => res);

  return result;
};
