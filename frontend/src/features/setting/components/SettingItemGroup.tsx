import RadioButtonGroup from "@/components/RadioButtonGroup";
import SelectBox from "@/components/SelectBox";
import TextInput from "@/components/TextInput";
import { useCallback, useMemo, useState } from "react";

const SettingItemGroup = () => {

  const [displayName, setDisplayName] = useState('');
  const [displayNameError, setDisplayNameError] = useState('');
  const [userId, setUserId] = useState('');
  const [userIdError, setUserIdError] = useState('');

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
   * @param e
   */
  const handleDisplayNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (displayName === '') {
      setDisplayNameError('表示名を入力してください');
      return;
    }
    setDisplayNameError('');
  };

  /**
   * ユーザーID入力欄からフォーカスが外れたときの処理
   * @param e
   */
  const handleUserIdBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');

  const [isAdult, setIsAdult] = useState(false);
  
    /**
   * 成人判定を行う処理
   * @param e
   */
  const checkIsAdult = useCallback((selectedYear: string, selectedMonth: string, selectedDate: string): boolean => {
        if (!selectedYear || !selectedMonth || !selectedDate) {
            return false;
        }

        const today = new Date();
        const birthDate = new Date(
            parseInt(selectedYear),
            parseInt(selectedMonth) - 1, 
            parseInt(selectedDate)
        );

        const eighteenYearsAgo = new Date(
            today.getFullYear() - 18, 
            today.getMonth(), 
            today.getDate()
        );

        return birthDate <= eighteenYearsAgo;
    }, []);

    /**
   * 誕生日設定を行う処理
   * @param e
   */
    const handleBirthDay = useCallback((y: string, m: string, d: string) => {
        const finalYear = y || year;
        const finalMonth = m || month;
        const finalDate = d || date;

        if (finalYear && finalMonth && finalDate) {
            const adultStatus = checkIsAdult(finalYear, finalMonth, finalDate);
            setIsAdult(adultStatus);
        } else {
            setIsAdult(false);
        }
    }, [year, month, date, checkIsAdult]);


    /**
   * 年が選択されたときの処理
   * @param e
   */
  const handleYearSelect = (value: string) => {
    setYear(value);
    handleBirthDay(value, month, date);
  }

  /**
   * 月が選択されたときの処理
   * @param e
   */
  const handleMonthSelect = (value: string) => {
    setMonth(value);
    handleBirthDay(year, value, date);
  }

  /**
   * 日が選択されたときの処理
   * @param e
   */
  const handleDateSelect = (value: string) => {
    setDate(value);
    handleBirthDay(year, month, value);
  }

  const yearOptions = useMemo(() => {
        const startYear = currentYear - 150;
        return Array.from({ length: currentYear - startYear + 1 }, (_, i) => 
            (currentYear - i).toString()
        );
    }, [currentYear]);

  const monthOptions = useMemo(() => Array.from({ length: 12 }, (_, i) => (i + 1).toString()), []);
  const dateOptions = useMemo(() => Array.from({ length: 31 }, (_, i) => (i + 1).toString()), []);

  return (
    <>
      <div className="flex w-full flex-col">
        <div>
          <TextInput
            label="表示名"
            placeholder="example"
            error={displayNameError}
            id="displayName-input"
            value={displayName}
            onChange={handleDisplayNameChange}
            onBlur={handleDisplayNameBlur}
            className="h-5"
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
            className="mt-11 h-5"
            displayStatus={'normal'}
            prefix={''}
            isUnroundedLeft={false}
          />
        </div>
        <div className="mt-15">
          <label className="text-foreground text-subtitle">生年月日</label>
          <div className="flex">
            <SelectBox 
              displayStatus={"normal"}
              label={"年"} 
              options= {yearOptions}
              onSelect={handleYearSelect}
              className="w-1/3"
            />
            <SelectBox 
              displayStatus={"normal"}
              label={"月"} 
              options= {monthOptions}
              onSelect={handleMonthSelect}
              className="w-1/3"
            />
            <SelectBox 
              displayStatus={"normal"}
              label={"日"} 
              options= {dateOptions}
              onSelect={handleDateSelect}
              className="w-1/3"
            />
          </div>
        </div>
        <div className="mt-15">
          <label className="text-foreground text-subtitle">成人向けコンテンツ</label>
          <RadioButtonGroup
            groupName={"AdultContentSetting"}
            options={['表示する', '表示しない']}
            initialValue={"表示しない"}
          />
        </div>
      </div>
    </>
  );
};

export default SettingItemGroup;