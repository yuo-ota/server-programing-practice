import TopBanner from '@/components/TopBanner';
import { useNavigate } from 'react-router-dom';
import BannerButton from '@/components/BannerButton';
import PostInputGroup from './components/PostInputGroup';
import { useContext, useEffect, useState } from 'react';
import NotificationContext from '@/contexts/notificationContext';
import { createPost } from '@/api/PostApi';
import { getIconPath } from '@/utils/handleLocalStorage';
import { API_URL } from '@/config';

export const New = () => {
  const navigate = useNavigate();
  const { showMessage } = useContext(NotificationContext);
  const [title, setTitle] = useState<string>('');
  const TITLE_MAX_LENGTH = 32;
  const [titleError, setTitleError] =
    useState<string>('タイトルを入力してください。');
  const [visibility, setVisibility] = useState<string>('全年齢');
  const [image, setImage] = useState<{
    id: string;
    file: File;
    url: string;
  } | null>(null);
  const [imageError, setImageError] =
    useState<string>('画像を追加してください。');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /**
   * タイトルが変更されたときの処理
   * @param value
   */
  const handleTitleChange = (value: string) => {
    if (value.length === 0) {
      setTitle(value);
      setTitleError('タイトルを入力してください。');
      return;
    }
    if (value.length > TITLE_MAX_LENGTH) {
      setTitle(value.slice(0, TITLE_MAX_LENGTH));
      setTitleError(`タイトルは最大 ${TITLE_MAX_LENGTH} 文字です。`);
      return;
    }
    setTitle(value);
    setTitleError('');
  };

  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const allowedExts = ['png', 'jpg', 'jpeg', 'jpe', 'gif', 'webp', 'svg'];
  const getExtension = (fileName: string) => {
    const idx = fileName.lastIndexOf('.');
    return idx === -1 ? '' : fileName.slice(idx + 1).toLowerCase();
  };
  const isAllowedExt = (file: File) => {
    const ext = getExtension(file.name);
    return allowedExts.includes(ext);
  };

  /**
   * 画像が変更されたときの処理
   * @param file
   */
  const handleImageChange = (file: File | null) => {
    if (file === null) {
      setImage((prev) => {
        if (prev) URL.revokeObjectURL(prev.url);
        return null;
      });
      setImageError('画像を選択してください。');
      return;
    }

    if (!isAllowedExt(file)) {
      setImageError('対応していないファイル形式です。');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setImageError('ファイルサイズは 10MB 以下にしてください。');
      return;
    }

    const url = URL.createObjectURL(file);

    setImage((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return { id: `${Date.now()}-${Math.random()}`, file, url };
    });
    setImageError('');
  };

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image.url);
    };
  }, [image]);

  const isError = (): boolean => {
    let errorExists = false;
    if (titleError || imageError) {
      errorExists = true;
    }
    return errorExists;
  };

  /**
   * 戻るボタンがクリックされたときの処理
   */
  const handleReturnButtonClick = () => {
    navigate(-1);
  };

  /**
   * 投稿ボタンがクリックされたときの処理
   */
  const handlePostButtonClick = async () => {
    if (isSubmitting) return;

    if (isError()) {
      showMessage(['入力内容にエラーがあります'], '--color-error');
      return;
    }

    if (!image) {
      showMessage(['画像を追加してください。'], '--color-error');
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('text', title);
      formData.append(
        'sensitive',
        visibility === '成人向け' ? 'true' : 'false'
      );
      formData.append('images', image.file);

      await createPost(formData);

      showMessage(['投稿しました'], '--color-success');
      navigate(-1);
    } catch {
      showMessage(
        ['投稿に失敗しました。', '再度時間を空けてお試しください。'],
        '--color-error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex h-full w-full flex-col items-center">
        <TopBanner
          leftElement={
            <BannerButton
              displayStatus="cancel"
              label="キャンセル"
              onClick={handleReturnButtonClick}
              className=""
            />
          }
          rightElement={
            <BannerButton
              displayStatus="solid"
              label="投稿"
              onClick={handlePostButtonClick}
              className=""
            />
          }
          className="h-16 w-full"
        />
        <div className="flex items-start gap-4 px-2 pt-6">
          <img
            src={`${API_URL}${getIconPath()}`}
            alt="icon"
            className="h-14 w-14 rounded-full object-cover"
          />
          <PostInputGroup
            className="min-w-0 flex-1"
            title={title}
            onTitleChange={handleTitleChange}
            visibility={visibility}
            onVisibilityChange={setVisibility}
            image={image}
            onImageChange={handleImageChange}
            error={imageError}
            titleMaxLength={TITLE_MAX_LENGTH}
            titleError={titleError}
          />
        </div>
      </div>
    </>
  );
};
