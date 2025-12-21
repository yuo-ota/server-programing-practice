import type { Profile } from '@/interfaces/api/user';
import { getUserId } from '@/utils/handleLocalStorage';
import { useNavigate, useParams } from 'react-router-dom';
import TabElementGroup from '@/components/TabElementGroup';
import UserProfile from './components/UserProfile';
import Post from '@/components/Post';
import { API_URL } from '@/config';

interface RootProps {
  userData?: Profile;
}

export const Likes = ({ userData }: RootProps) => {
  const { userId } = useParams<{ userId: string }>();
  const loginUserId = getUserId();
  const navigate = useNavigate();

  const handlePostsClick = () => {
    navigate(`/home/profile/${userId}`);
  };

  return (
    <>
      {/* プロフィール部分 */}
      <div>
        <UserProfile userData={userData!} loginUserId={loginUserId} />
      </div>
      <div className="flex justify-center">
        <TabElementGroup
          tabs={[
            {
              label: '投稿',
              onClick: () => {
                handlePostsClick();
              },
            },
            { label: 'いいね', onClick: () => {} },
          ]}
          className="mx-5 mt-2.5"
          defaultIndex={1}
        />
      </div>
      {/* 過去のいいね */}
      <div>
        {/* いいね一覧コンポーネントをここに配置 */} 
        {userData?.likedPosts?.map((post) => (
          <div key={post.postId} className="mb-4">
            {/* Postコンポーネントを使用して投稿を表示 */}
            <Post
              icon={<img src={`${API_URL}${post.iconPath}`} alt="User Icon" className="h-full w-full" />}
              userName={post.name}
              userId={post.userId}
              postId={post.postId}
              text={post.content.description}
              liked={true}
              images={{ imagePath: `${post.content.path}`, alt: post.content.alt }}
            />
          </div>
        ))
        }
      </div>
    </>
  );
};

export default Likes;
