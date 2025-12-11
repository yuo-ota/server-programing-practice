import { API_URL } from '@/config';
import axios, { type AxiosResponse } from 'axios';

export const authToken = async (token: string, pathType: string): Promise<AxiosResponse<void>> => {
  const response = await axios.post<void>(
    `${API_URL}/api/auth/token`,
    {
      token: token,
      path_type: pathType
    },
    { withCredentials: true }
  );

  return response;
};
