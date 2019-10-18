import { axiosWithAuth } from '../utils/axiosWithAuth';

export default async (color, id) => {
  const result = await axiosWithAuth()
    .put(`api/colors/${id}`, color)
    .then(res => res);

  return result;
};
