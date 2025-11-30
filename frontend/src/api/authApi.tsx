import axios from 'axios';

export const login = async (email: string, password: string): Promise<void> => {
  await axios.post<void>('/api/login', {
    email,
    password,
  });
};
