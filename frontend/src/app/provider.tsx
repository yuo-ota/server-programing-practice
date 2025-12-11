import NotificationBar from '@/components/NotificationBar';
import { NotificationProvider } from '@/providers/NotificationContext';
import type { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <NotificationProvider>
      <NotificationBar />
      <Router>
        {children}
      </Router>
    </NotificationProvider>
  );
};
