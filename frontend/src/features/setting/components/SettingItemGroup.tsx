import RadioButtonGroup from '@/components/RadioButtonGroup';
import SelectBox from '@/components/SelectBox';
import SNSInputGroup from '@/components/SNSInputGroup';
import TextInput from '@/components/TextInput';
import type { SNSInputValue } from '@/interfaces/app/snsInput';
import { useMemo } from 'react';

interface SettingItemGroupProps {
  displayName: string;
  setDisplayName: (displayName: string) => void;
  displayNameError: string;
  setDisplayNameError: (displayNameError: string) => void;
  userId: string;
  setUserId: (userId: string) => void;
  userIdError: string;
  setUserIdError: (userIdError: string) => void;
  birthday: Date | null;
  setBirthday: (birthday: Date) => void;
  adultContentSetting: string;
  setAdultContentSetting: (adultContentSetting: string) => void;
  SNSInputs: SNSInputValue[];
  setSNSInputs: React.Dispatch<React.SetStateAction<SNSInputValue[]>>;
}

const SettingItemGroup = ({
  displayName,
  setDisplayName,
  displayNameError,
  setDisplayNameError,
  userId,
  setUserId,
  userIdError,
  setUserIdError,
  birthday,
  setBirthday,
  adultContentSetting,
  setAdultContentSetting,
  SNSInputs,
  setSNSInputs,
}: SettingItemGroupProps) => {
  /**
   * 表示名入力時の処理
   * @param e
   */
  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  /**
   * ユーザーID入力時の処理
   * @param e
   */
  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  /**
   * 表示名入力欄からフォーカスが外れたときの処理
   */
  const handleDisplayNameBlur = () => {
    if (displayName === '') {
      setDisplayNameError('表示名を入力してください');
      return;
    }
    setDisplayNameError('');
  };

  /**
   * ユーザーID入力欄からフォーカスが外れたときの処理
   */
  const handleUserIdBlur = () => {
    if (userId === '') {
      setUserIdError('ユーザーIDを入力してください');
      return;
    }
    // if ( ) {
    //   setUserIdError('そのユーザーIDはすでに使用されています');
    //   return;
    // }
    setUserIdError('');
  };

  const currentYear = new Date().getFullYear();

  /**
   * ラジオボタンが選択されたときのハンドラ
   * @param value
   */
  const handleAdultContentChange = (value: string) => {
    setAdultContentSetting(value);
  };

  const getEighteenYearsAgo = (date: Date) => {
    return new Date(date.getFullYear() - 18, date.getMonth(), date.getDate());
  };

  const updateIsAdult = (birthday: Date) => {
    if (birthday >= getEighteenYearsAgo(new Date())) {
      setAdultContentSetting('表示しない');
    }
  };

  /**
   * 年が選択されたときの処理
   * @param value
   */
  const handleYearSelect = (value: string) => {
    let newBirthday: Date;
    if (!birthday) {
      newBirthday = new Date(parseInt(value), 0, 1);
      setBirthday(newBirthday);
      updateIsAdult(newBirthday);
      return;
    }
    newBirthday = new Date(
      parseInt(value),
      birthday.getMonth(),
      birthday.getDate()
    );
    setBirthday(newBirthday);
    updateIsAdult(newBirthday);
  };

  /**
   * 月が選択されたときの処理
   * @param value
   */
  const handleMonthSelect = (value: string) => {
    let newBirthday: Date;
    if (!birthday) {
      newBirthday = new Date(currentYear, parseInt(value), 1);
      setBirthday(newBirthday);
      updateIsAdult(newBirthday);
      return;
    }
    newBirthday = new Date(
      birthday.getFullYear(),
      parseInt(value) - 1,
      birthday.getDate()
    );
    setBirthday(newBirthday);
    updateIsAdult(newBirthday);
  };

  /**
   * 日が選択されたときの処理
   * @param value
   */
  const handleDateSelect = (value: string) => {
    let newBirthday: Date;
    if (!birthday) {
      newBirthday = new Date(currentYear, 0, parseInt(value));
      setBirthday(newBirthday);
      updateIsAdult(newBirthday);
      return;
    }
    newBirthday = new Date(
      birthday.getFullYear(),
      birthday.getMonth(),
      parseInt(value)
    );
    setBirthday(newBirthday);
    updateIsAdult(newBirthday);
  };

  const isAdult = (birthday: Date | null) => {
    if (!birthday) {
      return false;
    }
    return birthday <= getEighteenYearsAgo(new Date());
  };

  const yearOptions = useMemo(() => {
    const startYear = currentYear - 150;
    return Array.from({ length: currentYear - startYear + 1 }, (_, i) =>
      (currentYear - i).toString()
    );
  }, [currentYear]);

  const monthOptions = useMemo(
    () => Array.from({ length: 12 }, (_, i) => (i + 1).toString()),
    []
  );
  const dateOptions = useMemo(
    () => Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
    []
  );

  return (
    <>
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-2.5">
          <TextInput
            label="表示名"
            placeholder="example"
            error={displayNameError}
            id="displayName-input"
            value={displayName}
            onChange={handleDisplayNameChange}
            onBlur={handleDisplayNameBlur}
            className="h-[88.5px]"
            displayStatus={'normal'}
            prefix={''}
            isUnroundedLeft={false}
          />
          <TextInput
            label="ユーザーID"
            placeholder="example"
            error={userIdError}
            id="userId-input"
            value={userId}
            onChange={handleUserIdChange}
            onBlur={handleUserIdBlur}
            className="h-[88.5px]"
            displayStatus={'normal'}
            prefix={''}
            isUnroundedLeft={false}
          />
        </div>
        <div className="">
          <label className="text-foreground text-subtitle">生年月日</label>
          <div className="flex">
            <SelectBox
              displayStatus={'normal'}
              label={'年'}
              options={yearOptions}
              value={birthday?.getFullYear().toString() || ''}
              onSelect={handleYearSelect}
              className="w-1/3"
            />
            <SelectBox
              displayStatus={'normal'}
              label={'月'}
              options={monthOptions}
              value={birthday ? (birthday.getMonth() + 1).toString() : ''}
              onSelect={handleMonthSelect}
              className="w-1/3"
            />
            <SelectBox
              displayStatus={'normal'}
              label={'日'}
              options={dateOptions}
              value={birthday?.getDate().toString() || ''}
              onSelect={handleDateSelect}
              className="w-1/3"
            />
          </div>
        </div>
        <div className={` ${isAdult(birthday) ? '' : 'opacity-50'}`}>
          <label className="text-foreground text-subtitle">
            成人向けコンテンツ
          </label>
          <RadioButtonGroup
            groupName={'AdultContentSetting'}
            options={['表示する', '表示しない']}
            value={adultContentSetting}
            onSelect={handleAdultContentChange}
            disabled={!isAdult(birthday)}
            className="gap-20"
          />
        </div>
        <div className="">
          <label className="text-foreground text-subtitle">SNS ID</label>
          <SNSInputGroup
            className="w-full"
            setSNSInputs={setSNSInputs}
            SNSInputs={SNSInputs}
          />
        </div>
      </div>
    </>
  );
};

export default SettingItemGroup;
