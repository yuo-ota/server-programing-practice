import IconButton from '@/components/IconButton';
import LikeButton from '@/features/posts/components/LikeButton';
import KebabMenu from '@/components/KebabMenu';
import { useContext, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeLike, setLike } from '@/utils/likes';
import { API_URL } from '@/config';
import NotificationContext from '@/contexts/notificationContext';

interface images {
  imagePath: string;
  alt: string;
}

interface PostProps {
  icon: ReactNode;
  userName: string;
  userId: string;
  postId: string;
  text: string;
  images: images;
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
  const [Like, setIsLike] = useState(liked);
  const { showMessage } = useContext(NotificationContext);

  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/home/posts/${postId}`);
  };

  const handleReportClick = () => {
    navigate(`/home/profile/${userId}/report`);
  };

  const handleProfileClick = () => {
    navigate(`/home/profile/${userId}`);
  };

  const handleLikeClick = async () => {
    try {
      if (!Like) {
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
      className={`${className} flex w-full px-2`}
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
      <div className="mx-2 min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <p className="truncate">{userName}</p>
          <div className="flex items-center">
            <LikeButton
              isLiked={Like}
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
        <div>
          <p className="break-word">{text}</p>
          <div>
            <img
              src={`${API_URL}${images.imagePath}`}
              alt={images.alt}
              className="border-foreground/80 mt-2 max-h-100 w-full rounded-lg border object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
