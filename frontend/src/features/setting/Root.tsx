import { useState } from "react";
import BottomTab from "./components/BottomTab";
import SettingItemGroup from "./components/SettingItemGroup";

const Root = () => {
  const [displayName, setDisplayName] = useState('');
  const [displayNameError, setDisplayNameError] = useState('');
  const [userId, setUserId] = useState('');
  const [userIdError, setUserIdError] = useState('');

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');

  const [isAdult, setIsAdult] = useState(false);
  const [adultContentSetting, setAdultContentSetting] = useState('表示しない');

    /**
   * 保存ボタンがクリックされたときの処理
   * @returns
   */
  const handleSaveButtonClick = () => {
    return;
  };

  /**
   * 閉じるボタンがクリックされたときの処理
   * @returns
   */
  const handleCloseButtonClick = () => {
    return;
  };

  return (
    <>
      <div className="flex h-full w-full max-w-[500px] flex-col items-center justify-between px-8 py-14">
        <SettingItemGroup
          displayName={displayName}
          setDisplayName={setDisplayName}
          displayNameError={displayNameError}
          setDisplayNameError={setDisplayNameError}
          userId={userId}
          setUserId={setUserId}
          userIdError={userIdError}
          setUserIdError={setUserIdError}
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
          date={date}
          setDate={setDate}
          isAdult={isAdult}
          setIsAdult={setIsAdult}
          adultContentSetting={adultContentSetting}
          setAdultContentSetting={setAdultContentSetting}
        />
        <BottomTab
          handleSaveButtonClick={handleSaveButtonClick}
          handleCloseButtonClick={handleCloseButtonClick}
        />
      </div>
    </>
  )
};

export default Root;