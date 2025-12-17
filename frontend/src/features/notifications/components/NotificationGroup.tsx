import HeartIcon from "@/assets/heart.svg?react";
import CautionIcon from "@/assets/caution.svg?react";
import NotificationLinkButton from "@/components/NotificationLinkButton";
import { LIKE_NOTIFICATION, PENALTY_NOTIFICATION } from "@/constants/notificationConstants";
import { useNavigate } from "react-router-dom";
import { type Notification } from "@/interfaces/app/notification";

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
      <div className="flex w-full h-full flex-col gap-[-10px]">
        <>
          {notifications.map((notification) => (
              <div key={notification.notificationId} className= "w-full p-5 flex flex-col border-b-2 first:border-t-2 bg-background">
                {notification.notificationType === LIKE_NOTIFICATION && (
                  <div key={`${notification.notificationId}-like`} className="w-full flex flex-col gap-4">
                    <div className="flex gap-2 items-center">
                      <HeartIcon className="w-7 h-7 fill-theme" />
                      <p>{notification.content.likedByUserId.length}人にいいねされました！</p>
                    </div>
                    <NotificationLinkButton
                      label={"いいねされました。"}
                      onClick={() => handleClick(`/home/posts/${notification.content.likedPostId}`)}
                      className="w-full h-10"
                    />
                  </div>
                )}
                {notification.notificationType === PENALTY_NOTIFICATION && (
                  <div key={`${notification.notificationId}-penalty`} className="w-full">
                    <div className="flex gap-2 items-center">
                      <CautionIcon className="w-7 h-7 fill-theme" />
                      <p>一定期間のペナルティーが与えられました。</p>
                    </div>
                    <p>{`${notification.content.category}のペナルティーが課されました。`}</p>
                    <p>{`詳細：${notification.content.detail}`}</p>
                    <p>{`期間：${notification.content.duration}（${new Date(notification.content.endDate).toLocaleDateString()}まで）`}</p>
                  </div>
                )}
              </div>
            )
          )}
        </>
      </div>
    </>
  );
};

export default NotificationGroup;
