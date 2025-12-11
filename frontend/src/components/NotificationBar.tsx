import { useContext } from "react";
import { NotificationContext } from "@/providers/NotificationContext";

export default function NotificationBar() {
  const { notifications } = useContext(NotificationContext);

  if (!notifications) return null;

  return (
    <div className="w-full flex justify-center">
      <div
        className="fixed top-5 z-20 text-white p-4 text-center animate-fade-in-out transition-opacity duration-300"
        style={{ backgroundColor: `var(${notifications.backgroundColor})` }}
      >
        {notifications.messages.map((msg, index) => (
          <div key={`notification-bar-${index}`}>{msg}</div>
        ))}
      </div>
    </div>
  );
}