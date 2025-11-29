import type { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return <Router>{children}</Router>;
};
