import { useContext, useEffect, useState } from 'react';
import BottomTab from './components/BottomTab';
import SettingItemGroup from './components/SettingItemGroup';
import SettingIcon from '@/assets/allowLeft.svg?react';
import IconButton from '@/components/IconButton';
import TopBanner from '@/components/TopBanner';
import { setting } from '@/api/SettingApi';
import { useNavigate } from 'react-router-dom';
import NotificationContext from '@/contexts/notificationContext';
import type { SNSInputValue } from '@/interfaces/app/snsInput';
import type { SocialAccount } from '@/interfaces/app/socialAccount';
import AccontManageGroup from './components/AccontManageGroup';
import {
  getParsedData,
  getUserId,
  saveUserSettingToLocalStorage,
} from '@/utils/handleLocalStorage';

const Root = () => {
  const navigate = useNavigate();
  const { showMessage } = useContext(NotificationContext);
  const [displayName, setDisplayName] = useState('');
  const [displayNameError, setDisplayNameError] = useState('');
  const [userId, setUserId] = useState('');
  const [userIdError, setUserIdError] = useState('');

  const [birthday, setBirthday] = useState<Date | null>(null);

  const [adultContentSetting, setAdultContentSetting] = useState('表示しない');

  const [SNSInputs, setSNSInputs] = useState<SNSInputValue[]>([]);

  // 日付を YYYY-MM-DD (ローカル日) に変換
  const formatLocalDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // YYYY-MM-DD からローカル日付の Date オブジェクトを作る
  const parseLocalDate = (s: string) => {
    const [y, m, d] = s.split('-').map((v) => parseInt(v, 10));
    return new Date(y, m - 1, d);
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
      setBirthday(
        parsedData.birthday ? parseLocalDate(parsedData.birthday) : null
      );
      setAdultContentSetting(
        parsedData.show_adult_content ? '表示する' : '表示しない'
      );
      if (
        parsedData.social_accounts &&
        Array.isArray(parsedData.social_accounts)
      ) {
        const mapped = parsedData.social_accounts.map((acc: SocialAccount) => {
          const rawValue = acc.identifier ?? acc.link ?? '';
          const extractedValue = extractValue(acc.name ?? '', rawValue);
          return {
            snsId: acc.name ?? (acc.platform_id ? String(acc.platform_id) : ''),
            value: extractedValue,
            platform_id: acc.platform_id ?? undefined,
            identifier: extractedValue,
          };
        });
        setSNSInputs(mapped);
      }
    }
  }, []);

  /**
   * リンクからidentifierを抽出する
   */
  const extractValue = (name: string, link: string): string => {
    if (!link) return '';

    // nameがない場合やURLでない場合はそのまま返す
    if (!name || !link.includes('://')) {
      return link;
    }

    let result = link;

    try {
      switch (name.toLowerCase()) {
        case 'x':
          result = result.replace(/https?:\/\/x\.com\/?/, '');
          break;
        case 'instagram':
          result = result.replace(/https?:\/\/(www\.)?instagram\.com\/?/, '');
          break;
        case 'skeb':
          result = result.replace(/https?:\/\/skeb\.jp\/@?/, '');
          break;
        case 'bluesky':
          result = result.replace(/https?:\/\/bsky\.app\/profile\/?/, '');
          break;
        default:
          break;
      }
      return result.replace(/^\//, '');
    } catch {
      return result;
    }
  };

  const isError = (): boolean => {
    let errorExists = false;
    if (displayNameError || userIdError) {
      errorExists = true;
    }
    return errorExists;
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
    if (birthday) {
      formData.append('birthday', formatLocalDate(birthday));
    }
    formData.append(
      'showAdultContent',
      adultContentSetting === '表示する' ? 'true' : 'false'
    );
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
      showMessage(['設定を保存しました'], '--color-success');
    } catch {
      showMessage(['設定の保存に失敗しました'], '--color-error');
    }
  };

  /**
   * 閉じるボタンがクリックされたときの処理
   * @returns
   */
  const handleCloseButtonClick = () => {
    navigate(-1);
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
          label="設定"
          className="absolute top-0 h-16 w-full"
        />
        <div className="flex w-full max-w-[500px] flex-col items-center gap-6 px-8 pt-20 pb-48">
          <SettingItemGroup
            displayName={displayName}
            setDisplayName={setDisplayName}
            displayNameError={displayNameError}
            setDisplayNameError={setDisplayNameError}
            userId={userId}
            setUserId={setUserId}
            userIdError={userIdError}
            setUserIdError={setUserIdError}
            birthday={birthday}
            setBirthday={setBirthday}
            adultContentSetting={adultContentSetting}
            setAdultContentSetting={setAdultContentSetting}
            SNSInputs={SNSInputs}
            setSNSInputs={setSNSInputs}
          />
          <AccontManageGroup />
        </div>
        <BottomTab
          handleSaveButtonClick={handleSaveButtonClick}
          handleCloseButtonClick={handleCloseButtonClick}
        />
      </div>
    </>
  );
};

export default Root;
