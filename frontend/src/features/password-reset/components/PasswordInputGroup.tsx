import { passwordReset } from "@/api/PasswordResetApi";
import TextInput from "@/components/TextInput";
import TransitionButton from "@/components/TransitionButton";
import { useState } from "react";

const PasswordInputGroup = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (email === '') {
      setEmailError('メールアドレスを入力してください');
      return;
    }
    if (!checkEmailFormat(e.target.value)) {
      setEmailError('メールアドレスの形式が正しくありません');
      return;
    }

    setEmailError('');
  }

  /**
   * ボタンの状態の取得
   * @returns ボタンの状態
   */
  const getPasswordResetButtonStatus = (): 'solid' | 'disabled-solid' => {
    if (
      email === '' ||
      emailError !== ''
    ) {
      return 'disabled-solid';
    }
    return 'solid';
  };
  
  /**
   * ログインボタンがクリックされたときの処理
   * @returns
   */
  const handlePasswordResetButtonClick = async () => {
    if (getPasswordResetButtonStatus() === 'disabled-solid') {
      return;
    }

    await passwordReset(email);
  };

  /**
   * メールアドレスの形式チェック
   * @param email
   * @returns
   */
  const checkEmailFormat = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <div className="flex w-full flex-col gap-3.5">
        <TextInput
          type="email"
          label="確認用メールアドレス"
          placeholder="xxx@example.com"
          error={emailError}
          id="email-input"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          className="h-5"
          displayStatus={'normal'}
          prefix={''}
          isUnroundedLeft={false}
        />
        <TransitionButton
          displayStatus={getPasswordResetButtonStatus()}
          label={'パスワードリセット'}
          onClick={handlePasswordResetButtonClick}
          className="mt-15 h-11 w-full"
        />
      </div>
    </>
  );
};

export default PasswordInputGroup;