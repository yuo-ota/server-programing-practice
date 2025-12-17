import IconButton from "@/components/IconButton";
import TopBanner from "@/components/TopBanner";
import SettingIcon from "@/assets/setting.svg?react";
import MenuTab from "@/components/MenuTab";
import HomeIcon from '@/assets/home.svg?react';
import NotificationIcon from '@/assets/notification.svg?react';
import UserIcon from '@/assets/UserIconDefault.svg?react';
import NewPostIcon from '@/assets/newPost.svg?react';
import { useNavigate } from "react-router-dom";
import { getUserId } from "@/utils/handleLocalStrage";
import type { Notification } from "@/interfaces/app/notification";
import NotificationGroup from "./components/NotificationGroup";
import { useContext, useEffect, useState } from "react";
import { getNotifications } from "@/api/notification";
import { isNotificationResponse } from "@/interfaces/api/notification";
import NotificationContext from "@/contexts/notificationContext";

let didInit = false;

const Root = () => {
  const navigate = useNavigate();
  const { showMessage } = useContext(NotificationContext);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!didInit) {
      getNotificationsProcess();
      didInit = true;
    }
  }, []);

  const getNotificationsProcess = async () => {
    try {
      const response = await getNotifications();
      if (isNotificationResponse(response.data)) {
        setNotifications(response.data.notifications);
      } else {
        throw new Error('Invalid notification response');
      }
    } catch {
      showMessage(
        [
          '通知の取得に失敗しました。',
          '再度時間を空けてお試しください。',
        ],
        '--color-error'
      );
    }
  };

  const handleSettingClick = () => {
    navigate('/setting');
  };

  const handleNewPostClick = () => {
    navigate('/posts/new');
  };

  const handleHomeClick = () => {
    navigate(`/home/posts?date=${new Date().toISOString().split('T')[0]}`);
  }

  const handleProfileClick = () => {
    navigate(`/home/profile/${getUserId()}`);
  }

  return (
    <>
      <div className="flex h-full w-full flex-col items-center">
        <TopBanner
          rightElement={
            <IconButton
              ButtonIcon={<SettingIcon className={`h-8 w-8`} />}
              className="h-12 w-12"
              onClick={handleSettingClick}
            />
          }
          label=""
          className="h-16 w-full z-20"
        />
        <div className="flex h-full w-full max-w-[500px] flex-col items-center overflow-y-auto">
          <NotificationGroup
            notifications={notifications}
          />
        </div>
        <div className="fixed w-full max-w-[500px] bottom-0">
          <IconButton
            onClick={handleNewPostClick}
            ButtonIcon={<NewPostIcon className="h-12 w-12" />}
            className="absolute h-12 w-12 bottom-15 right-0 mr-2 mb-2"
          />
        </div>
        <MenuTab
          buttons={[
            <IconButton
              onClick={handleHomeClick}
              className="h-12 w-12"
              ButtonIcon={<HomeIcon className="h-[80%] w-[80%]" />}
            />,
            <IconButton
              disabled={true}
              onClick={() => {}}
              className="h-12 w-12"
              ButtonIcon={<NotificationIcon className="h-[80%] w-[80%]" />}
            />,
            <IconButton
              onClick={handleProfileClick}
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
