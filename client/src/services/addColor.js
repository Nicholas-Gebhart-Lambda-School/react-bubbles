import { axiosWithAuth } from '../utils/axiosWithAuth';

export default async (col, he) => {
  console.log(col, he);
  const result = await axiosWithAuth()
    .post('/api/colors', {
      color: col,
      code: {
        hex: he
      },
      id: 11
    })
    .then(res => res);

  return result;
};
