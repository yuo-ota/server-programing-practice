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
