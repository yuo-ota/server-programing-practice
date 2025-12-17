import IconButton from "@/components/IconButton";
import TopBanner from "@/components/TopBanner";
import SettingIcon from "@/assets/setting.svg?react";
import NotificationGroup from "./components/NotificationGroup";
import MenuTab from "@/components/MenuTab";
import HomeIcon from '@/assets/home.svg?react';
import NotificationIcon from '@/assets/notification.svg?react';
import UserIcon from '@/assets/UserIconDefault.svg?react';
import NewPostIcon from '@/assets/newPost.svg?react';

const Root = () => {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center">
        <TopBanner
          rightElement={
            <IconButton
              ButtonIcon={<SettingIcon className={`h-8 w-8`} />}
              className="h-12 w-12"
              onClick={() => {}}
            />
          }
          label=""
          className="h-16 w-full z-20"
        />
        <div className="flex h-full w-full max-w-[500px] flex-col items-center overflow-y-auto">
          <NotificationGroup
            notifications={[
              {
                notificationId: "1",
                notificationType: 'いいね通知',
                date: "2024-06-01T12:00:00Z",
                content: {
                  likedPostId: "post123",
                  likedByUserId: ["user1", "user2", "user3", "user4"],
                },
              },
              {
                notificationId: "2",
                notificationType: "処分通知",
                date: "2024-06-02T15:30:00Z",
                content: {
                  category: "いいね停止",
                  detail: "Your post violated our community guidelines.",
                  duration: "7 days",
                  endDate: "2024-06-09T15:30:00Z",
                },
              },
              {
                notificationId: "3",
                notificationType: "処分通知",
                date: "2024-06-02T15:30:00Z",
                content: {
                  category: "いいね停止",
                  detail: "Your post violated our community guidelines.",
                  duration: "7 days",
                  endDate: "2024-06-09T15:30:00Z",
                },
              },
              {
                notificationId: "3",
                notificationType: "処分通知",
                date: "2024-06-02T15:30:00Z",
                content: {
                  category: "いいね停止",
                  detail: "Your post violated our community guidelines.",
                  duration: "7 days",
                  endDate: "2024-06-09T15:30:00Z",
                },
              },
              {
                notificationId: "3",
                notificationType: "処分通知",
                date: "2024-06-02T15:30:00Z",
                content: {
                  category: "いいね停止",
                  detail: "Your post violated our community guidelines.",
                  duration: "7 days",
                  endDate: "2024-06-09T15:30:00Z",
                },
              },
              {
                notificationId: "3",
                notificationType: "処分通知",
                date: "2024-06-02T15:30:00Z",
                content: {
                  category: "いいね停止",
                  detail: "Your post violated our community guidelines.",
                  duration: "7 days",
                  endDate: "2024-06-09T15:30:00Z",
                },
              },
              {
                notificationId: "3",
                notificationType: "処分通知",
                date: "2024-06-02T15:30:00Z",
                content: {
                  category: "いいね停止",
                  detail: "Your post violated our community guidelines.",
                  duration: "7 days",
                  endDate: "2024-06-09T15:30:00Z",
                },
              },
            ]}
          />
        </div>
        <div className="fixed w-full max-w-[500px] bottom-0">
          <IconButton
            onClick={() => {}}
            ButtonIcon={<NewPostIcon className="h-12 w-12" />}
            className="absolute h-12 w-12 bottom-15 right-0 mr-2 mb-2"
          />
        </div>
        <MenuTab
          buttons={[
            <IconButton
              onClick={() => {}}
              className="h-12 w-12"
              ButtonIcon={<HomeIcon className="h-[80%] w-[80%]" />}
            />,
            <IconButton
              onClick={() => {}}
              className="h-12 w-12"
              ButtonIcon={<NotificationIcon className="h-[80%] w-[80%]" />}
            />,
            <IconButton
              onClick={() => {}}
              className="h-12 w-12"
              ButtonIcon={<UserIcon className="h-[80%] w-[80%]" />}
            />
          ]}
          className="h-17 w-full z-20"
        />
      </div>
    </>
  );
};

export default Root;
