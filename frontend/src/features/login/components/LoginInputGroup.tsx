import { Link, useNavigate } from 'react-router';
import TextInput from '@/components/TextInput';
import TransitionButton from '@/components/TransitionButton';
import { useState } from 'react';
import { login } from '@/api/AuthApi';

const LoginInputGroup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  /**
   * メールアドレス入力時の処理
   * @param e
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  /**
   * パスワード入力時の処理
   * @param e
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  /**
   * メールアドレス入力欄からフォーカスが外れたときの処理
   * @param e
   */
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
      setPasswordError('パスワードは英字・数字・記号を含めた8文字以上のものです');
      return;
    }

    setPasswordError('');
  };

  /**
   * ログインボタンがクリックされたときの処理
   * @returns
   */
  const handleLoginButtonClick = async () => {
    if (getLoginButtonStatus() === 'disabled-solid') {
      return;
    }

    await login(email, password);
    navigate('/home');
  };

  /**
   * ボタンの状態の取得
   * @returns ボタンの状態
   */
  const getLoginButtonStatus = (): 'solid' | 'disabled-solid' => {
    if (
      email === '' ||
      password === '' ||
      emailError !== '' ||
      passwordError !== ''
    ) {
      return 'disabled-solid';
    }
    return 'solid';
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

  /**
   * パスワードの形式チェック
   * @param password
   * @returns
   */
  const checkPasswordFormat = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/;
    return passwordRegex.test(password);
  };

  return (
    <>
      <div className="flex w-full flex-col gap-3.5">
        <TextInput
          type="email"
          label="メールアドレス"
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
        <TextInput
          type="password"
          label="パスワード(8文字以上)"
          placeholder="********"
          error={passwordError}
          id="password-input"
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          className="mt-15 h-5"
          displayStatus={'normal'}
          prefix={''}
          isUnroundedLeft={false}
        />
        <div className="mt-3.5 flex flex-col items-center gap-2.5">
          <TransitionButton
            displayStatus={getLoginButtonStatus()}
            label={'ログイン'}
            onClick={handleLoginButtonClick}
            className="mt-15 h-11 w-full"
          />
          <Link
            className="text-annotation text-subparagraph"
            to="/password-reset"
          >
            パスワードをリセット
          </Link>
        </div>
      </div>
    </>
  );
};
export default LoginInputGroup;
