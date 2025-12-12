import type { NotificationProps } from '@/interfaces/app/NotificationBar';
import { createContext } from 'react';

type NotificationContextType = {
  notifications: NotificationProps | null;
  showMessage: (messages: string[], backgroundColor: string) => void;
  clearMessage: () => void;
};

const NotificationContext = createContext<NotificationContextType>({
  notifications: null,
  showMessage: () => {},
  clearMessage: () => {},
});

export default NotificationContext;
