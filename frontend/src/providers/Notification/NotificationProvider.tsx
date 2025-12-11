import type { NotificationProps } from '@/interfaces/app/NotificationBar';
import { useState, type ReactNode } from 'react';
import NotificationContext from './NotificationContext';

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationProps | null>(
    null
  );
  let timer: NodeJS.Timeout | null = null;

  const showMessage = (messages: string[], backgroundColor: string) => {
    setNotifications({ messages, backgroundColor });
    // 既にタイマーがある場合はリセット
    if (timer) {
      clearTimeout(timer);
    }

    // 3秒後に消す
    timer = setTimeout(() => {
      setNotifications(null);
      timer = null;
    }, 3000);
  };

  const clearMessage = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    setNotifications(null);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, showMessage, clearMessage }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
