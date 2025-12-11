import { resetPassword } from "@/api/PasswordResetApi";
import TextInput from "@/components/TextInput";
import TransitionButton from "@/components/TransitionButton";
import { NotificationContext } from "@/providers/NotificationContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";

interface NewPasswordInputGroupProps {
  token: string;
}

const NewPasswordInputGroup = ({ token }: NewPasswordInputGroupProps) => {
  const navigate = useNavigate();
  const { showMessage } = useContext(NotificationContext);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  /**
   * パスワード入力時の処理
   * @param e
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };

  /**
   * パスワード入力欄からフォーカスが外れたときの処理
   * @param e
   */
  const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (password === '') {
      setPasswordError('パスワードを入力してください');
      return;
    }
    if (!checkPasswordFormat(e.target.value)) {
      setPasswordError('パスワードは8文字以上で入力してください');
      return;
    }

    setPasswordError('');
  };

  /**
   * パスワード確認入力欄からフォーカスが外れたときの処理
   * @param e
   */
  const handlePasswordCheckBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (passwordCheck === '') {
      setPasswordCheckError('確認用パスワードを入力してください');
      return;
    }
    if (password !== e.target.value) {
      setPasswordCheckError('パスワードが一致しません');
      return;
    }

    setPasswordCheckError('');
  }

  /**
   * パスワードの形式チェック
   * @param password
   * @returns
   */
  const checkPasswordFormat = (password: string): boolean => {
    return true;
    return password.length >= 8;
  };

  /**
   * ボタンの状態の取得
   * @returns ボタンの状態
   */
  const getPasswordResetButtonStatus = (): 'solid' | 'disabled-solid' => {
    if (
      password === '' ||
      passwordError !== '' ||
      passwordCheck === '' ||
      passwordCheckError !== '' ||
      isResetting
    ) {
      return 'disabled-solid';
    }
    return 'solid';
  };

  /**
   * パスワードリセットボタンがクリックされたときの処理
   * @returns
   */
  const handlePasswordResetButtonClick = async () => {
    if (getPasswordResetButtonStatus() === 'disabled-solid') {
      return;
    }

    await callResetPasswordApi();
  };

  const callResetPasswordApi = async () => {
    setIsResetting(true);
    try {
      const response = await resetPassword(token, password);

      if (response.status === 204) {
        showMessage(["パスワードリセットに成功しました。"], "--color-success");
        navigate('/login');
      } else {
        throw new Error('パスワードリセットに失敗しました');
      }
    } catch (error) {
      showMessage(["パスワードリセットに失敗しました。", "再度時間を空けてお試しください。"], "--color-error");
    } finally {
      setIsResetting(false);
    }
  }

  return (
      <div className="flex w-full flex-col gap-3.5">
        <TextInput
          type="password"
          label="新規パスワード(半角英数字8文字以上)"
          placeholder="********"
          error={passwordError}
          id="password-input"
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          displayStatus={'normal'}
          prefix={''}
          isUnroundedLeft={false}
          className="h-5"
        />
        <TextInput
          type="password"
          label="新規パスワード確認"
          placeholder="********"
          error={passwordCheckError}
          id="password-input-check"
          value={passwordCheck}
          onChange={handlePasswordCheckChange}
          onBlur={handlePasswordCheckBlur}
          displayStatus={'normal'}
          prefix={''}
          isUnroundedLeft={false}
          className="h-5 mt-15"
        />
        <div className="mt-3.5 flex flex-col items-center gap-2.5">
          <TransitionButton
            displayStatus={getPasswordResetButtonStatus()}
            label="パスワードリセット"
            onClick={handlePasswordResetButtonClick}
            className="mt-15 h-11 w-full"
          />
        </div>
      </div>
  );
};

export default NewPasswordInputGroup;
