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

const Root = ({ userData }: RootProps) => {
  const { userId } = useParams<{ userId: string }>();
  const loginUserId = getUserId();
  const navigate = useNavigate();

  const isMyProfile = loginUserId === userId;

  const handleLikedClick = () => {
    navigate(`/home/profile/${userId}/likes`);
  };

  return (
    <>
      {/* プロフィール部分 */}
      <div>
        {userData && (
          <UserProfile userData={userData} loginUserId={loginUserId} />
        )}
      </div>
      <div className="flex justify-center">
        <TabElementGroup
          tabs={
            isMyProfile
              ? [
                  { label: '投稿', onClick: () => {} },
                  {
                    label: 'いいね',
                    onClick: () => {
                      handleLikedClick();
                    },
                  },
                ]
              : [{ label: '投稿', onClick: () => {} }]
          }
          className="my-2.5 shadow-md"
          defaultIndex={0}
        />
      </div>
      {/* 過去の投稿 */}
      <div>
        {/* 投稿一覧コンポーネントをここに配置 */}
        {userData?.posts?.map((post) => (
          <div key={post.postId} className="mb-4">
            {/* Postコンポーネントを使用して投稿を表示 */}
            <Post
              icon={
                <img
                  src={`${API_URL}${userData.iconPath}`}
                  alt="User Icon"
                  className="h-full w-full"
                />
              }
              userName={userData.name}
              userId={userId!}
              postId={post.postId}
              liked={post.liked}
              text={post.content.description}
              images={{ imagePath: post.content.path, alt: post.content.alt }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Root;
