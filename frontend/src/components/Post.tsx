import IconButton from '@/components/IconButton';
import LikeButton from '@/features/posts/components/LikeButton';
import KebabMenu from '@/components/KebabMenu';
import { useContext, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeLike, setLike } from '@/utils/likes';
import { API_URL } from '@/config';
import NotificationContext from '@/contexts/notificationContext';

interface Images {
  imagePath: string;
  alt: string;
}

interface PostProps {
  icon: ReactNode;
  userName: string;
  userId: string;
  postId: string;
  text: string;
  images: Images;
  liked: boolean;
  className?: string;
}

const Post = ({
  icon,
  userName,
  userId,
  postId,
  text,
  images,
  liked,
  className = '',
}: PostProps) => {
  const [like, setIsLike] = useState(liked);
  const { showMessage } = useContext(NotificationContext);

  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/home/posts/${postId}`);
  };

  const handleReportClick = () => {
    navigate(`/home/posts/${postId}/report`);
  };

  const handleProfileClick = () => {
    navigate(`/home/profile/${userId}`);
  };

  const handleLikeClick = async () => {
    try {
      if (!like) {
        await setLike(postId);
        setIsLike(true);
      } else {
        await removeLike(postId);
        setIsLike(false);
      }
    } catch {
      showMessage(
        ['いいねの設定に失敗しました。', '再度時間を空けてお試しください。'],
        '--color-error'
      );
    }
  };

  return (
    <div
      className={`${className} bg-background border-annotation flex w-full border-b-2 px-2 py-2`}
      tabIndex={0}
      onClick={() => {
        handlePostClick();
      }}
    >
      <IconButton
        onClick={() => {
          handleProfileClick();
        }}
        ButtonIcon={icon}
        className="h-12 w-12 flex-none"
      />
      <div className="min-w-0 flex-1 px-2">
        <div className="flex w-full items-center justify-between">
          <p className="text-title truncate">{userName}</p>
          <div className="flex items-center">
            <LikeButton
              isLiked={like}
              onClick={() => {
                handleLikeClick();
              }}
              className="h-12 w-12"
            />
            <KebabMenu
              items={[
                {
                  label: '通報する',
                  onClick: () => {
                    handleReportClick();
                  },
                  itemsClassName: 'text-error',
                },
              ]}
              className="ml-2 h-12 w-12"
            />
          </div>
        </div>
        <div className="w-full">
          <p className="break-word">{text}</p>
          <div>
            <img
              src={`${API_URL}${images.imagePath}`}
              alt={images.alt}
              className="mt-2 max-h-96 w-full rounded-lg object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
