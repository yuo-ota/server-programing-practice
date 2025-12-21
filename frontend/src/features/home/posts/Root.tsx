import IconButton from "@/components/IconButton";
import TopBanner from "@/components/TopBanner";
import MenuTab from "@/components/MenuTab";
import HomeIcon from "@/assets/home.svg?react";
import NotificationIcon from "@/assets/notification.svg?react";
import UserIcon from "@/assets/userIconDefault.svg?react";
import SettingIcon from "@/assets/setting.svg?react";
import PostIcon from "@/assets/post.svg?react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { isPostArray, mapPost } from "@/interfaces/api/post";
import type { Post } from "@/interfaces/app/post";
import { getPosts } from "@/api/PostApi";
import NotificationContext from "@/contexts/notificationContext";
import PostComponent from "@/components/Post";
import { API_URL } from "@/config";


const Root = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const { showMessage } = useContext(NotificationContext);
  const loginUserId = localStorage.getItem('userId');

  // apiからポスト情報を取得
  useEffect(() => {
    const getPostsArray = async () => {
    try {
      const nowDate = new Date().toISOString().split('T')[0]
      const response = await getPosts(nowDate);
      console.log(response.data);
      if(isPostArray(response.data)){
        setPosts(response.data.map((item) => mapPost(item)));
        console.log(posts);
        return;
      }
    } catch {
      showMessage(
        [
          '投稿の取得に失敗しました。',
          '再度時間を空けてお試しください。',
        ],
        '--color-error'
      )
    }
  };
    getPostsArray();
  }, []);
  
  // 各ボタンのクリックハンドラ
  const handleHomeClick = () => {
    navigate(`/home/posts?date=${new Date().toISOString().split('T')[0]}`);
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

  return (
    <>
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
        {posts.map((post) => (
          <div key={post.postId} className="mb-4">
            <PostComponent
              icon={
                <img
                  src={`${API_URL}${post.iconPath}`}
                  alt="User Icon"
                  className="h-full w-full rounded-full" />
              }
              userName={post.name}
              userId={post.userId}
              postId={post.postId}
              liked={post.liked}
              text={post.text}
              images={{ imagePath: post.images[0].path, alt: post.images[0].alt }}
            />
          </div>
        ))}
      </main>

      {/* MenuTab（下固定） */}
      <div className="fixed bottom-0 left-0 z-30 w-full">
        <IconButton
          onClick={handlePostClick}
          ButtonIcon={<PostIcon className="flex h-full w-full items-center" />}
          className="absolute right-4 bottom-20 z-40 h-12 w-12 rounded-full"
        />
        <MenuTab
          buttons={[
            <IconButton
              key="Home"
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
          className="h-17 w-full"
        />
      </div>
    </div>
    </>
  );
}

export default Root;