import { NOTIFICATION_TYPE } from "@/constants/notificationConstants";
import { type Notification } from "@/interfaces/app/notification";

export interface NotificationResponse {
  notifications: Notification[];
}

export const isNotificationResponse = (data: unknown): data is NotificationResponse => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'notifications' in data &&
    Array.isArray((data as { notifications: unknown[] }).notifications) &&
    (data as { notifications: unknown[] }).notifications.every((item: unknown) => {
      return (
        typeof item === 'object' &&
        item !== null &&
        'notificationId' in item &&
        typeof (item as any).notificationId === 'string' &&
        'date' in item &&
        typeof (item as any).date === 'string' &&
        'notificationType' in item &&
        typeof (item as any).notificationType === typeof NOTIFICATION_TYPE &&
        ((
          item.notificationType === NOTIFICATION_TYPE.LIKE &&
          'content' in item &&
          typeof (item as any).content === 'object' &&
          (item as any).content !== null &&
          isLikeNotification(item.content)
        ) || (
          item.notificationType === NOTIFICATION_TYPE.PENALTY &&
          'content' in item &&
          typeof (item as any).content === 'object' &&
          (item as any).content !== null &&
          isPenaltyNotification(item.content)
        ))
      );
    })
  );
};

const isLikeNotification = (content: unknown) => {
  return (
    typeof content === 'object' &&
    content !== null &&
    'likedPostId' in content &&
    typeof (content as any).likedPostId === 'string' &&
    'likedByUserId' in content &&
    Array.isArray((content as { likedByUserId: unknown[] }).likedByUserId) &&
    (content as { likedByUserId: unknown[] }).likedByUserId.every((id: unknown) => typeof id === 'string')
  );
};

const isPenaltyNotification = (content: unknown) => {
  return (
    typeof content === 'object' &&
    content !== null &&
    'category' in content &&
    typeof (content as any).category === 'string' &&
    'detail' in content &&
    typeof (content as any).detail === 'string' &&
    'duration' in content &&
    typeof (content as any).duration === 'string' &&
    'endDate' in content &&
    typeof (content as any).endDate === 'string'
  );
};