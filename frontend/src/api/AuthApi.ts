import { API_URL } from '@/config';
import axios from 'axios';

export const login = async (email: string, password: string): Promise<void> => {
  await axios.post<void>(
    `${API_URL}/api/login`,
    {
      email_address: email,
      password: password,
    },
    { withCredentials: true }
  );
};

export const logout = async (): Promise<void> => {
  await axios.post<void>(`${API_URL}/api/logout`, { withCredentials: true });
};

export const signup = async (
  email: string,
  password: string
): Promise<void> => {
  await axios.post<void>(
    `${API_URL}/api/register`,
    {
      email_address: email,
      password: password,
    },
    { withCredentials: true }
  );
};

export const deleteAccount = async (): Promise<void> => {
  await axios.delete<void>(`${API_URL}/api/user`, { withCredentials: true });
};

export const adminLogin = async (
  email: string,
  password: string
): Promise<void> => {
  await axios.post<void>(
    `${API_URL}/api/admin/login`,
    {
      email_address: email,
      password: password,
    },
    { withCredentials: true }
  );
};
