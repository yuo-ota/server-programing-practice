import { useContext } from 'react';
import NotificationContext from '@/contexts/notificationContext';

export default function NotificationBar() {
  const { notifications } = useContext(NotificationContext);

  if (!notifications) return null;

  return (
    <div className="flex w-full justify-center">
      <div
        className="animate-fade-in-out fixed top-5 z-100 p-4 text-center text-white transition-opacity duration-300"
        style={{ backgroundColor: `var(${notifications.backgroundColor})` }}
      >
        {notifications.messages.map((msg, index) => (
          <div key={`notification-bar-${index}`}>{msg}</div>
        ))}
      </div>
    </div>
  );
}
