import type { NOTIFICATION_TYPE } from "@/constants/notificationConstants";

interface BaseNotification {
  notificationId: string;
  date: string;
}

interface LikeNotification {
  likedPostId: string;
  likedByUserId: string[];
}

interface PenaltyNotification {
  category: string;
  detail: string;
  duration: string;
  endDate: string;
}

interface LikeNotificationGroup extends BaseNotification {
  notificationType: typeof NOTIFICATION_TYPE.LIKE;
  content: LikeNotification;
}

interface PenaltyNotificationGroup extends BaseNotification {
  notificationType: typeof NOTIFICATION_TYPE.PENALTY;
  content: PenaltyNotification;
}

export type Notification =
  | LikeNotificationGroup
  | PenaltyNotificationGroup;