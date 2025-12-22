import IconButton from '@/components/IconButton';
import TopBanner from '@/components/TopBanner';
import SettingIcon from '@/assets/setting.svg?react';
import MenuTab from '@/components/MenuTab';
import HomeIcon from '@/assets/home.svg?react';
import NotificationIcon from '@/assets/notification.svg?react';
import NewPostIcon from '@/assets/newPost.svg?react';
import { useNavigate } from 'react-router-dom';
import { getIconPath, getUserId } from '@/utils/handleLocalStorage';
import type { Notification } from '@/interfaces/app/notification';
import NotificationGroup from './components/NotificationGroup';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { getNotifications } from '@/api/Notification';
import {
  isNotificationArray,
  mapApiNotificationToNotification,
} from '@/interfaces/api/notification';
import NotificationContext from '@/contexts/notificationContext';
import { API_URL } from '@/config';

const Root = () => {
  const didInit = useRef(false);
  const navigate = useNavigate();
  const { showMessage } = useContext(NotificationContext);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getNotificationsProcess = useCallback(async () => {
    try {
      const response = await getNotifications();
      if (isNotificationArray(response.data)) {
        setNotifications(
          response.data.map((item) => mapApiNotificationToNotification(item))
        );
      } else {
        throw new Error('Invalid notification response');
      }
    } catch {
      showMessage(
        ['通知の取得に失敗しました。', '再度時間を空けてお試しください。'],
        '--color-error'
      );
    }
  }, [showMessage]);

  useEffect(() => {
    if (!didInit.current) {
      getNotificationsProcess();
      didInit.current = true;
    }
  }, [getNotificationsProcess]);

  const handleSettingClick = () => {
    navigate('/setting');
  };

  const handleNewPostClick = () => {
    navigate('/posts/new');
  };

  const handleHomeClick = () => {
    navigate(`/home/posts?date=${new Date().toISOString().split('T')[0]}`);
  };

  const handleProfileClick = () => {
    navigate(`/home/profile/${getUserId()}`);
  };

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
          className="z-20 h-16 w-full"
        />
        <div className="flex h-full w-full max-w-[500px] flex-col items-center overflow-y-auto">
          <NotificationGroup notifications={notifications} />
        </div>
        <div className="fixed bottom-0 w-full max-w-[500px]">
          <IconButton
            onClick={handleNewPostClick}
            ButtonIcon={<NewPostIcon className="h-12 w-12" />}
            className="absolute right-0 bottom-15 mr-2 mb-2 h-12 w-12"
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
              ButtonIcon={
                <img
                  src={`${API_URL}${getIconPath()}`}
                  alt="icon"
                  className="h-[80%] w-[80%] rounded-full object-cover"
                />
              }
            />,
          ]}
          className="z-20 h-17 w-full"
        />
      </div>
    </>
  );
};

export default Root;
