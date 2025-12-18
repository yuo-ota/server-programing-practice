import HeartIcon from '@/assets/heart.svg?react';
import CautionIcon from '@/assets/caution.svg?react';
import NotificationLinkButton from '@/components/NotificationLinkButton';
import {
  LIKE_NOTIFICATION,
  PENALTY_NOTIFICATION,
} from '@/constants/notificationConstants';
import { Link, useNavigate } from 'react-router-dom';
import { type Notification } from '@/interfaces/app/notification';

interface NotificationGroupProps {
  notifications: Notification[];
}

const NotificationGroup = ({ notifications }: NotificationGroupProps) => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <div className="flex h-full w-full flex-col">
        <>
          {notifications.map((notification) => (
            <div
              key={notification.notificationId}
              className="bg-background flex w-full flex-col border-b-2 p-5 first:border-t-2"
            >
              {notification.notificationType === LIKE_NOTIFICATION && (
                <div className="flex w-full flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <HeartIcon className="fill-theme h-7 w-7" />
                    <p>
                      <Link
                        className="text-link font-bold underline"
                        to={`/home/profile/${notification.content.likedByUserId}`}
                      >
                        {notification.content.likedByUserName}さん
                      </Link>
                      にいいねされました！
                    </p>
                  </div>
                  <NotificationLinkButton
                    label={'投稿を確認する'}
                    onClick={() =>
                      handleClick(
                        `/home/posts/${notification.content.likedPostId}`
                      )
                    }
                    className="h-10 w-full"
                  />
                </div>
              )}
              {notification.notificationType === PENALTY_NOTIFICATION && (
                <div className="w-full">
                  <div className="flex items-center gap-2">
                    <CautionIcon className="fill-theme h-7 w-7" />
                    <p>一定期間のペナルティーが与えられました。</p>
                  </div>
                  <p>{`${notification.content.category}のペナルティーが課されました。`}</p>
                  <p>{`詳細：${notification.content.detail}`}</p>
                  <p>{`期間：${notification.content.duration}（${new Date(notification.content.endDate).toLocaleDateString()}まで）`}</p>
                </div>
              )}
            </div>
          ))}
        </>
      </div>
    </>
  );
};

export default NotificationGroup;
