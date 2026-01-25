import SettingIcon from '@/assets/allowLeft.svg?react';
import IconButton from '@/components/IconButton';
import TopBanner from '@/components/TopBanner';
import { API_URL } from '@/config';
import type { PostProps } from '@/interfaces/app/post';
import { useNavigate } from 'react-router-dom';
import LikeButton from './components/LikeButton';
import KebabMenu from '@/components/KebabMenu';
import MenuTab from '@/components/MenuTab';
import HomeIcon from '@/assets/home.svg?react';
import NotificationIcon from '@/assets/notification.svg?react';
import { getIconPath, getUserId } from '@/utils/handleLocalStorage';
import PostIcon from '@/assets/post.svg?react';
import { removeLike, setLike } from '@/utils/likes';
import { useContext, useState } from 'react';
import NotificationContext from '@/contexts/notificationContext';
import AttentionDialog from '../setting/components/AttentionDialog';
import { deletePost } from '@/api/PostApi';

export const Post = (postData: PostProps) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(postData.isLiked);
  const { showMessage } = useContext(NotificationContext);

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const openDialog = () => setIsOpenDialog(true);
  const closeDialog = () => setIsOpenDialog(false);

  /**
   * 戻るボタンがクリックされたときの処理
   */
  const handleCloseButtonClick = () => {
    navigate(-1);
  };

  /**
   * 投稿者のプロフィールボタンがクリックされたときの処理
   */
  const handleProfileClick = () => {
    navigate(`/home/profile/${postData.userId}`);
  };

  /**
   * いいねボタンがクリックされたときの処理
   */
  const handleLikeClick = async () => {
    try {
      if (!isLiked) {
        await setLike(postData.postId);
        setIsLiked(true);
      } else {
        await removeLike(postData.postId);
        setIsLiked(false);
      }
    } catch {
      showMessage(
        ['いいねの設定に失敗しました。', '再度時間を空けてお試しください。'],
        '--color-error'
      );
    }
  };

  /**
   * 通報ボタンがクリックされたときの処理
   */
  const handleReportClick = () => {
    navigate(`/home/posts/${postData.postId}/report`);
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
      await deletePost(postData.postId);
      navigate(-1);
    } catch {
      showMessage(
        ['投稿の削除に失敗しました。', '再度時間を空けてお試しください。'],
        '--color-error'
      );
    }
  };

  /**
   * ホームボタンがクリックされたときの処理
   */
  const handleHomeClick = () => {
    navigate(`/home/posts`);
  };

  /**
   * 自身のプロフィールボタンがクリックされたときの処理
   */
  const handleMyProfileClick = () => {
    navigate(`/home/profile/${getUserId()}`);
  };

  /**
   * 通知ボタンがクリックされたときの処理
   */
  const handleNotificationClick = () => {
    navigate('/home/notifications');
  };

  /**
   * 投稿ボタンがクリックされたときの処理
   */
  const handlePostClick = () => {
    navigate('/posts/new');
  };

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center">
        {isOpenDialog && (
          <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center">
            <AttentionDialog
              isOpen={isOpenDialog}
              onButtonClick={() => handleDialogClick()}
              onClose={closeDialog}
              questionText="この投稿を削除しますか？"
              leftText="はい"
              rightText="いいえ"
            />
          </div>
        )}
        <TopBanner
          leftElement={
            <IconButton
              onClick={handleCloseButtonClick}
              ButtonIcon={<SettingIcon className={`h-10 w-10`} />}
              className="h-10 w-10"
            />
          }
          className="sticky top-0 h-16 w-full"
        />
        <div className="flex w-full max-w-[500px] flex-col items-center gap-6 px-2 pt-20 pb-44">
          <p className="text-foreground text-title self-start">
            {postData.postText}
          </p>
          {postData.postImagePath && (
            <img
              src={`${API_URL}${postData.postImagePath}`}
              alt={postData.postImageAlt}
              className="object-cover"
            />
          )}
          <div className="flex w-full items-start justify-between py-4">
            <div className="items-between flex min-w-0 flex-1 gap-1.5">
              <IconButton
                onClick={() => {
                  handleProfileClick();
                }}
                ButtonIcon={
                  <img
                    src={`${API_URL}${postData.userIconPath}`}
                    alt={`${postData.userName} icon`}
                    className="h-12 w-12 rounded-full"
                  />
                }
                className="h-12 w-12 flex-none rounded-full"
              />
              <div className="flex min-w-0 flex-col">
                <p className="text-title text-foreground truncate">
                  {postData.userName}
                </p>
                <p className="text-body text-placeholder truncate">
                  @{postData.userId}
                </p>
              </div>
            </div>
            <div className="ml-auto flex items-center">
              <LikeButton
                isLiked={isLiked}
                onClick={() => {
                  handleLikeClick();
                }}
                className="h-12 w-12"
              />
              <KebabMenu
                items={
                  postData.userId !== getUserId()
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
        </div>
        <div className="fixed bottom-0 left-0 z-30 w-full">
          <IconButton
            onClick={handlePostClick}
            ButtonIcon={
              <PostIcon className="flex h-full w-full items-center" />
            }
            className="absolute right-4 bottom-20 z-40 h-12 w-12 rounded-full"
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
                onClick={handleMyProfileClick}
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
            className="h-17 w-full"
          />
        </div>
      </div>
    </>
  );
};
