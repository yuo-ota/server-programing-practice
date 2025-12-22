import IconButton from '@/components/IconButton';
import LikeButton from '@/features/posts/components/LikeButton';
import KebabMenu from '@/components/KebabMenu';
import { useContext, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeLike, setLike } from '@/utils/likes';
import { API_URL } from '@/config';
import NotificationContext from '@/contexts/notificationContext';
import { getUserId } from '@/utils/handleLocalStorage';
import AttentionDialog from '@/features/setting/components/AttentionDialog';
import { deletePost } from '@/api/PostApi';

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
  const [isLiked, setIsLiked] = useState(liked);
  const { showMessage } = useContext(NotificationContext);

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const openDialog = () => setIsOpenDialog(true);
  const closeDialog = () => setIsOpenDialog(false);

  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/home/posts/${postId}`);
  };

  const handleReportClick = () => {
    navigate(`/home/posts/${postId}/report`);
  };

  /**
   * 削除ボタンがクリックされたときの処理
   */
  const handleDeleteClick = () => {
    openDialog();
  };

  /**
   * ダイアログのボタンがクリックされたときの処理
   */
  const handleDialogClick = async () => {
    try {
      await deletePost(postId);
      window.location.reload();
    } catch {
      showMessage(
        ['投稿の削除に失敗しました。', '再度時間を空けてお試しください。'],
        '--color-error'
      );
    }
  };

  const handleProfileClick = () => {
    navigate(`/home/profile/${userId}`);
  };

  const handleLikeClick = async () => {
    try {
      if (!isLiked) {
        await setLike(postId);
        setIsLiked(true);
      } else {
        await removeLike(postId);
        setIsLiked(false);
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
      {isOpenDialog && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center">
          <AttentionDialog
            isOpen={isOpenDialog}
            onButtonClick={handleDialogClick}
            onClose={closeDialog}
            questionText="この投稿を削除しますか？"
            leftText="はい"
            rightText="いいえ"
          />
        </div>
      )}
      <IconButton
        onClick={() => {
          handleProfileClick();
        }}
        ButtonIcon={icon}
        className="h-12 w-12 rounded-full"
      />
      <div className="min-w-0 flex-1 px-2">
        <div className="flex w-full items-center justify-between">
          <p className="text-title truncate">{userName}</p>
          <div className="flex items-center">
            <LikeButton
              isLiked={isLiked}
              onClick={() => {
                handleLikeClick();
              }}
              className="h-12 w-12"
            />
            <KebabMenu
              items={
                userId !== getUserId()
                  ? [
                      {
                        label: '通報する',
                        onClick: () => {
                          handleReportClick();
                        },
                        itemsClassName: 'text-error',
                      },
                    ]
                  : [
                      {
                        label: '削除する',
                        onClick: () => {
                          handleDeleteClick();
                        },
                        itemsClassName: 'text-error',
                      },
                    ]
              }
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
