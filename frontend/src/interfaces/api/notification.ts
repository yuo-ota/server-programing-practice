import { NOTIFICATION_TYPE } from '@/constants/notificationConstants';
import { type Notification } from '@/interfaces/app/notification';

interface ApiBaseNotification {
  notificate_id: string;
  date: string;
}

interface ApiLikeNotification {
  liked_post_id: string;
  liked_by_user_id: string;
  liked_by_user_name: string;
}

interface ApiPenaltyNotification {
  category: string;
  detail: string;
  duration: string;
  end_date: string;
}

interface ApiLikeNotificationGroup extends ApiBaseNotification {
  notificate_type: typeof NOTIFICATION_TYPE.LIKE;
  content: ApiLikeNotification;
}

interface ApiPenaltyNotificationGroup extends ApiBaseNotification {
  notificate_type: typeof NOTIFICATION_TYPE.PENALTY;
  content: ApiPenaltyNotification;
}

export type ApiNotification =
  | ApiLikeNotificationGroup
  | ApiPenaltyNotificationGroup;

export const mapApiNotificationToNotification = (
  apiNotification: ApiNotification
): Notification => {
  if (apiNotification.notificate_type === NOTIFICATION_TYPE.LIKE) {
    return {
      notificationId: apiNotification.notificate_id,
      date: apiNotification.date,
      notificationType: NOTIFICATION_TYPE.LIKE,
      content: {
        likedPostId: apiNotification.content.liked_post_id,
        likedByUserId: apiNotification.content.liked_by_user_id,
        likedByUserName: apiNotification.content.liked_by_user_name,
      },
    };
  } else {
    return {
      notificationId: apiNotification.notificate_id,
      date: apiNotification.date,
      notificationType: NOTIFICATION_TYPE.PENALTY,
      content: {
        category: apiNotification.content.category,
        detail: apiNotification.content.detail,
        duration: apiNotification.content.duration,
        endDate: apiNotification.content.end_date,
      },
    };
  }
};

export const isNotificationArray = (
  data: unknown
): data is ApiNotification[] => {
  return (
    Array.isArray(data) &&
    data.every((item: unknown) => {
      return (
        typeof item === 'object' &&
        item !== null &&
        'notificate_id' in item &&
        typeof (item as { notificate_id: unknown }).notificate_id ===
          'string' &&
        'date' in item &&
        typeof (item as { date: unknown }).date === 'string' &&
        'notificate_type' in item &&
        typeof (item as { notificate_type: unknown }).notificate_type ===
          'string' &&
        ((item.notificate_type === NOTIFICATION_TYPE.LIKE &&
          'content' in item &&
          typeof (item as { content: unknown }).content === 'object' &&
          (item as { content: unknown }).content !== null &&
          isLikeNotification(item.content)) ||
          (item.notificate_type === NOTIFICATION_TYPE.PENALTY &&
            'content' in item &&
            typeof (item as { content: unknown }).content === 'object' &&
            (item as { content: unknown }).content !== null &&
            isPenaltyNotification(item.content)))
      );
    })
  );
};

const isLikeNotification = (content: unknown) => {
  return (
    typeof content === 'object' &&
    content !== null &&
    'liked_post_id' in content &&
    typeof (content as { liked_post_id: unknown }).liked_post_id === 'string' &&
    'liked_by_user_id' in content &&
    typeof (content as { liked_by_user_id: unknown }).liked_by_user_id ===
      'string' &&
    'liked_by_user_name' in content &&
    typeof (content as { liked_by_user_name: unknown }).liked_by_user_name ===
      'string'
  );
};

const isPenaltyNotification = (content: unknown) => {
  return (
    typeof content === 'object' &&
    content !== null &&
    'category' in content &&
    typeof (content as { category: unknown }).category === 'string' &&
    'detail' in content &&
    typeof (content as { detail: unknown }).detail === 'string' &&
    'duration' in content &&
    typeof (content as { duration: unknown }).duration === 'string' &&
    'end_date' in content &&
    typeof (content as { end_date: unknown }).end_date === 'string'
  );
};
