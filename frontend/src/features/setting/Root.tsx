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
import AccontManageGroup from './components/AccontManageGroup';

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

  useEffect(() => {
    const settingData = localStorage.getItem('settingData');
    if (settingData) {
      const parsedData = JSON.parse(settingData);
      setDisplayName(parsedData.name || '');
      setUserId(parsedData.user_id || '');
      setBirthday(parsedData.birthday ? new Date(parsedData.birthday) : null);
      setAdultContentSetting(
        parsedData.show_adult_contents ? '表示する' : '表示しない'
      );
    }
  }, []);

  /**
   * formData作成
   */
  const createFormData = () => {
    const formData = new FormData();
    if (userId) {
      formData.append('user_id', userId);
    }
    if (displayName) {
      formData.append('name', displayName);
    }
    if (birthday) {
      formData.append('birthday', birthday.toISOString().split('T')[0]);
    }
    formData.append(
      'show_adult_contents',
      adultContentSetting === '表示する' ? 'true' : 'false'
    );
    return formData;
  };

  /**
   * 保存ボタンがクリックされたときの処理
   */
  const handleSaveButtonClick = async () => {
    try {
      const formData = createFormData();
      // API呼び出し
      await setting(formData);
      // ローカルストレージに保存
      const prevSettingData = localStorage.getItem('settingData');
      const prevSettingJson = prevSettingData
        ? JSON.parse(prevSettingData)
        : {};
      localStorage.setItem(
        'settingData',
        JSON.stringify({
          ...prevSettingJson,
          ...(userId
            ? {
                user_id: userId,
              }
            : {}),
          ...(displayName
            ? {
                name: displayName,
              }
            : {}),
          ...(birthday
            ? {
                birthday: birthday.toISOString().split('T')[0],
              }
            : {}),
          show_adult_contents: adultContentSetting === '表示する',
        })
      );
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
