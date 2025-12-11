import { API_URL } from '@/config';
import type { ErrorResponse } from '@/interfaces/api/error';
import axios, { type AxiosResponse } from 'axios';

export const sendPasswordResetMail = async (email: string): Promise<void> => {
  await axios.post<void>(`${API_URL}/api/password-reset`, {
    email_address: email,
  });
};

export const resetPassword = async (
  token: string,
  password: string
): Promise<AxiosResponse<void | ErrorResponse>> => {
  const response = await axios.patch<void>(`${API_URL}/api/password-reset`, {
    token: token,
    password: password,
  });

  return response;
};
