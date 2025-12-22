import { useContext, useState } from 'react';
import SettingItemGroup from '../setting/components/SettingItemGroup';
import TopBanner from '@/components/TopBanner';
import NotificationContext from '@/contexts/notificationContext';
import type { SNSInputValue } from '@/interfaces/app/snsInput';
import TransitionButton from '@/components/TransitionButton';
import { useNavigate } from 'react-router-dom';
import { createUser } from '@/api/UserApi';
import { saveUserSettingToLocalStorage } from '@/utils/handleLocalStorage';

interface SettingProps {
  token: string;
}

export const Setting = ({ token }: SettingProps) => {
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

  const isError = (): boolean => {
    let errorExists = false;
    if (displayNameError || userIdError) {
      errorExists = true;
    }
    return errorExists;
  };

  /**
   * はじめるボタンがクリックされたときの処理
   */
  const handleDoneButtonClick = async () => {
    if (isError()) {
      showMessage(['入力内容にエラーがあります'], '--color-error');
      return;
    }
    try {
      await createUser(
        token,
        displayName,
        userId,
        birthday ? formatLocalDate(birthday) : '',
        adultContentSetting === '表示する',
        SNSInputs.map((s) => ({ name: s.snsId, identifier: s.value }))
      );
      await saveUserSettingToLocalStorage();

      showMessage(['初期登録が完了しました'], '--color-success');
      navigate('/home/');
    } catch {
      showMessage(['登録情報の保存に失敗しました'], '--color-error');
    }
  };

  return (
    <>
      <div className="flex h-full w-full flex-col items-center">
        <TopBanner label="初期登録" className="absolute top-0 h-16 w-full" />
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
          <TransitionButton
            displayStatus="solid"
            label="はじめる"
            onClick={handleDoneButtonClick}
            className="mt-10 h-11 w-full"
          />
        </div>
      </div>
    </>
  );
};
