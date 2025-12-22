import IconButton from '@/components/IconButton';
import TopBanner from '@/components/TopBanner';
import MenuTab from '@/components/MenuTab';
import HomeIcon from '@/assets/home.svg?react';
import NotificationIcon from '@/assets/notification.svg?react';
import UserIcon from '@/assets/userIconDefault.svg?react';
import SettingIcon from '@/assets/setting.svg?react';
import PostIcon from '@/assets/post.svg?react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { isPostArray, mapPost } from '@/interfaces/api/post';
import type { Post } from '@/interfaces/app/post';
import { getTodayPost } from '@/api/PostApi';
import NotificationContext from '@/contexts/notificationContext';
import PostComponent from '@/components/Post';
import { API_URL } from '@/config';
import TabElementGroup from '@/components/TabElementGroup';
import { getUserId } from '@/utils/handleLocalStorage';

const Root = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const { showMessage } = useContext(NotificationContext);
  const loginUserId = getUserId();
  const [searchParams, setSearchParams] = useSearchParams();

  // 日付管理
  const formatDate = (date: Date) => {
    // JSTに変換
    const jst = new Date(
      date.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })
    );

    // 午前7時前なら「前日扱い」
    if (jst.getHours() < 7) {
      jst.setDate(jst.getDate() - 1);
    }

    return new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'Asia/Tokyo',
    }).format(jst);
  };

  const paramValue = searchParams.get('date');
  const currentDate = paramValue ?? formatDate(new Date());

  // apiからポスト情報を取得

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getTodayPost(currentDate);
        if (isPostArray(response.data)) {
          setPosts(response.data.map((item) => mapPost(item)));
        }
      } catch {
        navigate('/not-found');
        showMessage(
          ['投稿の取得に失敗しました。', '再度時間を空けてお試しください。'],
          '--color-error'
        );
      }
    };

    fetchPosts();
  }, [currentDate, navigate, showMessage]);

  // 各ボタンのクリックハンドラ
  const handleHomeClick = () => {
    navigate(`/home/posts?date=${formatDate(new Date())}`);
  };

  const handleProfileClick = () => {
    navigate(`/home/profile/${loginUserId}`);
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

  const handleTodaySelected = () => {
    const today = formatDate(new Date());
    if (currentDate === today) return;
    setSearchParams({ date: today });
  };

  const handleYesterdaySelected = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = formatDate(yesterday);
    if (currentDate === yesterdayStr) return;
    setSearchParams({ date: yesterdayStr });
  };

  return (
    <>
      <div className="relative h-dvh w-dvw overflow-x-hidden overflow-y-clip">
        <div className="sticky z-10">
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
            className="top-0 left-0 h-16 w-full"
          />
          <TabElementGroup
            tabs={[
              {
                label: '今日の投稿',
                onClick: () => {
                  handleTodaySelected();
                },
              },
              {
                label: '昨日の投稿',
                onClick: () => {
                  handleYesterdaySelected();
                },
              },
            ]}
            className="shadow-md"
            defaultIndex={0}
          />
        </div>

        {/* メインコンテンツ */}
        <main
          className="relative h-dvh w-full overflow-y-auto pb-48"
          key={`PostAt${currentDate}`}
        >
          {posts.map((post) => (
            <div key={post.postId} className="">
              <PostComponent
                icon={
                  <img
                    src={`${API_URL}${post.iconPath}`}
                    alt="User Icon"
                    className="h-full w-full rounded-full"
                  />
                }
                userName={post.name}
                userId={post.userId}
                postId={post.postId}
                liked={post.liked}
                text={post.text}
                images={{
                  imagePath: post.images[0].path,
                  alt: post.images[0].alt,
                }}
              />
            </div>
          ))}
        </main>

        {/* MenuTab（下固定） */}
        <div className="absolute bottom-0 left-0 z-0 w-full">
          <IconButton
            onClick={handlePostClick}
            ButtonIcon={
              <PostIcon className="flex h-full w-full items-center" />
            }
            className="absolute right-4 bottom-20 z-20 h-12 w-12 rounded-full"
          />
          <MenuTab
            buttons={[
              <IconButton
                key="Home"
                disabled={true}
                onClick={handleHomeClick}
                className="h-12 w-12"
                ButtonIcon={<HomeIcon className="h-[80%] w-[80%]" />}
              />,
              <IconButton
                key="Notification"
                onClick={handleNotificationClick}
                className="h-12 w-12"
                ButtonIcon={<NotificationIcon className="h-[80%] w-[80%]" />}
              />,
              <IconButton
                key="Profile"
                onClick={handleProfileClick}
                className="h-12 w-12"
                ButtonIcon={<UserIcon className="h-[80%] w-[80%]" />}
              />,
            ]}
            className="sticky h-17 w-full"
          />
        </div>
      </div>
    </>
  );
};

export default Root;
