import SettingIcon from '@/assets/allowLeft.svg?react';
import IconButton from '@/components/IconButton';
import TopBanner from '@/components/TopBanner';
import NotificationContext from '@/contexts/notificationContext';
import type { SNSInputValue } from '@/interfaces/app/snsInput';
import type { SocialAccount } from '@/interfaces/app/socialAccount';
import {
  getParsedData,
  getUserId,
  saveUserSettingToLocalStorage,
} from '@/utils/handleLocalStorage';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomTab from '../setting/components/BottomTab';
import ProfileEditGroup from './components/ProfileEditGroup';
import { API_URL } from '@/config';
import { setting } from '@/api/SettingApi';

export const Edit = () => {
  const navigate = useNavigate();
  const { showMessage } = useContext(NotificationContext);

  const iconInputRef = useRef<HTMLInputElement | null>(null);
  const headerInputRef = useRef<HTMLInputElement | null>(null);

  const [displayName, setDisplayName] = useState('');
  const [displayNameError, setDisplayNameError] = useState('');

  const [userId, setUserId] = useState('');
  const [userIdError, setUserIdError] = useState('');

  const [introduction, setIntroduction] = useState('');
  const [introductionError, setIntroductionError] = useState('');

  const [iconPath, setIconPath] = useState<string>('');
  const [headerPath, setHeaderPath] = useState<string>('');

  const [iconFile, setIconFile] = useState<File | null>(null);
  const [headerFile, setHeaderFile] = useState<File | null>(null);

  const [SNSInputs, setSNSInputs] = useState<SNSInputValue[]>([]);

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

  useEffect(() => {
    const settingData = localStorage.getItem('settingData');
    if (settingData) {
      const parsedData = getParsedData();
      if (!parsedData) {
        return;
      }
      setDisplayName(parsedData.name || '');
      setUserId(parsedData.display_id || '');
      setIntroduction(parsedData.introduction || '');
      if (parsedData.icon_path) {
        setIconPath(parsedData.icon_path);
      }
      if (parsedData.header_path) {
        setHeaderPath(parsedData.header_path);
      }
      if (
        parsedData.social_accounts &&
        Array.isArray(parsedData.social_accounts)
      ) {
        const mapped = parsedData.social_accounts.map((acc: SocialAccount) => ({
          snsId: acc.name ?? (acc.platform_id ? String(acc.platform_id) : ''),
          value: acc.identifier ?? acc.link ?? '',
          platform_id: acc.platform_id ?? undefined,
          identifier: acc.identifier ?? acc.link ?? '',
        }));
        setSNSInputs(mapped);
      }
    }
  }, []);

  const isError = (): boolean => {
    let errorExists = false;
    if (displayNameError || userIdError || introductionError) {
      errorExists = true;
    }
    return errorExists;
  };

  /**
   * 共通のファイル変更ハンドラー
   */
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'icon' | 'header'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 拡張子チェック
    if (!isAllowedExt(file)) {
      showMessage(['対応していないファイル形式です'], '--color-error');
      return;
    }
    // サイズチェック
    if (file.size > MAX_FILE_SIZE) {
      showMessage(['ファイルサイズが大きすぎます (10MB以下)'], '--color-error');
      return;
    }
    const url = URL.createObjectURL(file);

    if (type === 'icon') {
      setIconFile(file);
      setIconPath(url);
    } else if (type === 'header') {
      setHeaderFile(file);
      setHeaderPath(url);
    }
  };

  /**
   * 画像パスを判定して正しいURLを返す関数
   */
  const getImageUrl = (path: string) => {
    // if (!path) return '';

    // パスが 'blob:' (ローカルのプレビュー) または 'http' (外部URL) で始まるなら、そのまま返す
    if (path.startsWith('blob:') || path.startsWith('http')) {
      return path;
    }

    // それ以外（サーバー上のパス）なら API_URL をつける
    return `${API_URL}${path}`;
  };

  /**
   * formData作成
   */
  const createFormData = () => {
    const formData = new FormData();
    if (userId && userId !== getUserId()) {
      formData.append('userId', userId);
    }
    if (displayName) {
      formData.append('name', displayName);
    }
    if (introduction) {
      formData.append('introduction', introduction);
    }
    if (iconFile) {
      formData.append('icon', iconFile);
    }
    if (headerFile) {
      formData.append('header', headerFile);
    }
    SNSInputs.forEach((sns, index) => {
      if (sns.snsId && sns.value) {
        formData.append(`socialAccounts[${index}].name`, sns.snsId);
        formData.append(`socialAccounts[${index}].identifier`, sns.value);
        if (sns.platform_id !== undefined && sns.platform_id !== null) {
          formData.append(
            `socialAccounts[${index}].platform_id`,
            String(sns.platform_id)
          );
        }
      }
    });
    return formData;
  };

  /**
   * 閉じるボタンがクリックされたときの処理
   */
  const handleCloseButtonClick = () => {
    navigate(`/home/profile/${getUserId()}`);
  };

  /**
   * 保存ボタンがクリックされたときの処理
   */
  const handleSaveButtonClick = async () => {
    if (isError()) {
      showMessage(['入力内容にエラーがあります'], '--color-error');
      return;
    }
    try {
      const formData = createFormData();
      await setting(formData);
      await saveUserSettingToLocalStorage();

      showMessage(['プロフィールを更新しました'], '--color-success');
    } catch {
      showMessage(['プロフィールの更新に失敗しました'], '--color-error');
    }
  };

  return (
    <>
      <div className="flex h-full w-full flex-col items-center">
        <TopBanner
          leftElement={
            <IconButton
              onClick={handleCloseButtonClick}
              ButtonIcon={<SettingIcon className={`h-10 w-10`} />}
              className="h-10 w-10"
            />
          }
          label="プロフィール編集"
          className="absolute top-0 h-16 w-full"
        />
        <div className="flex w-full flex-col items-center gap-6 pb-48">
          <div className="mt-16 flex w-full flex-col gap-6">
            <input
              ref={headerInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,.jpe,.gif,.webp,.svg"
              className="hidden"
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange(e, 'header')}
            />
            <IconButton
              ButtonIcon={
                <img
                  src={getImageUrl(headerPath)}
                  className="h-full w-full object-cover"
                  alt="Header Image"
                />
              }
              onClick={() => headerInputRef.current?.click()}
              className="h-[110px] w-full"
            ></IconButton>
          </div>
          <div className="flex w-full max-w-[500px] flex-col items-center gap-6 px-8">
            <input
              ref={iconInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,.jpe,.gif,.webp,.svg"
              className="hidden"
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange(e, 'icon')}
            />
            <IconButton
              ButtonIcon={
                <img
                  src={getImageUrl(iconPath)}
                  className="h-full w-full rounded-full object-cover"
                  alt="Icon Image"
                />
              }
              onClick={() => iconInputRef.current?.click()}
              className="h-18 w-18 self-start rounded-full"
            />
            <ProfileEditGroup
              displayName={displayName}
              setDisplayName={setDisplayName}
              displayNameError={displayNameError}
              setDisplayNameError={setDisplayNameError}
              userId={userId}
              setUserId={setUserId}
              userIdError={userIdError}
              setUserIdError={setUserIdError}
              introduction={introduction}
              setIntroduction={setIntroduction}
              introductionError={introductionError}
              setIntroductionError={setIntroductionError}
              SNSInputs={SNSInputs}
              setSNSInputs={setSNSInputs}
            />
          </div>
        </div>
        <BottomTab
          handleSaveButtonClick={handleSaveButtonClick}
          handleCloseButtonClick={handleCloseButtonClick}
        />
      </div>
    </>
  );
};

export default Edit;
