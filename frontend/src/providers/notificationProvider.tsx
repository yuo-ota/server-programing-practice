import type { NotificationProps } from '@/interfaces/app/notificationBar';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import NotificationContext from '../contexts/notificationContext';

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationProps | null>(
    null
  );
  const timer = useRef<NodeJS.Timeout | null>(null);

  const showMessage = (messages: string[], backgroundColor: string) => {
    setNotifications({ messages, backgroundColor });

    // 既存のタイマーがあれば削除
    if (timer.current) {
      clearTimeout(timer.current);
    }

    // 3秒後に消える
    timer.current = setTimeout(() => {
      setNotifications(null);
      timer.current = null;
    }, 3000);
  };

  const clearMessage = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setNotifications(null);
  };

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, showMessage, clearMessage }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
