import HomeProfileLikes from '@/features/profile/Likes';
import { useNavigate, useParams } from 'react-router-dom';
import { getProfile } from '@/api/ProfileApi';
import { type Profile } from '@/interfaces/api/user';
import { useEffect, useState } from 'react';
import { getUserId } from '@/utils/handleLocalStorage';
import MenuTab from '@/components/MenuTab';
import IconButton from '@/components/IconButton';
import HomeIcon from '@/assets/home.svg?react';
import NotificationIcon from '@/assets/notification.svg?react';
import UserIcon from '@/assets/userIconDefault.svg?react';
import SettingIcon from '@/assets/setting.svg?react';
import TopBanner from '@/components/TopBanner';
import PostIcon from '@/assets/post.svg?react';

export const Likes = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<Profile | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    const getUserProfile = async () => {
      const profile = await getProfile(userId);
      setUserData(profile);
    };

    getUserProfile();
  }, [userId]);

  const handleHomeClick = () => {
    navigate(`/home/posts?date=${new Date().toISOString().split('T')[0]}`);
  };

  const handleProfileClick = () => {
    navigate(`/home/profile/${getUserId()}`);
  };

  const handleSettingClick = () => {
    navigate('/setting');
  };

  const handleNotificationClick = () => {
    navigate('/home/notifications');
  };

  const handlePostClick = () => {
    navigate('/posts/new');
  };

  return (
    <div className="relative h-dvh w-dvw">
      {/* TopBanner（上固定） */}
      <TopBanner
        rightElement={
          <IconButton
            ButtonIcon={<SettingIcon className="h-8 w-8" />}
            className="h-12 w-12"
            onClick={handleSettingClick}
          />
        }
        label=""
        className="fixed top-0 left-0 z-30 h-16 w-full"
      />

      {/* メインコンテンツ */}
      <main className="h-full overflow-y-auto pt-16 pb-17">
        <HomeProfileLikes userData={userData} />
      </main>

      {/* MenuTab（下固定） */}
      <div className="fixed bottom-0 left-0 z-30 w-full">
      <IconButton
        onClick={handlePostClick}
        ButtonIcon={<PostIcon className="h-full w-full flex items-center" />}
        className=" h-12 w-12 absolute bottom-20 right-4 z-40 rounded-full"
      />
      <MenuTab
        buttons={[
          <IconButton
            onClick={handleHomeClick}
            className="h-12 w-12"
            ButtonIcon={<HomeIcon className="h-[80%] w-[80%]" />}
          />,
          <IconButton
            onClick={handleNotificationClick}
            className="h-12 w-12"
            ButtonIcon={<NotificationIcon className="h-[80%] w-[80%]" />}
          />,
          <IconButton
            onClick={handleProfileClick}
            className="h-12 w-12"
            ButtonIcon={<UserIcon className="h-[80%] w-[80%]" />}
          />,
        ]}
        className="h-17 w-full"
      />
      </div>
    </div>
  );
};
