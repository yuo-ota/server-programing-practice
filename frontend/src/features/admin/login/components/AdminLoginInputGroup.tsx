import { Link, useNavigate } from 'react-router';
import TextInput from '@/components/TextInput';
import TransitionButton from '@/components/TransitionButton';
import { useContext, useState } from 'react';
import { adminLogin } from '@/api/AuthApi';
import { checkEmailFormat, checkPasswordFormat } from '@/utils/validation';
import NotificationContext from '@/contexts/NotificationContext';

const AdminLoginInputGroup = () => {
  const navigate = useNavigate();
  const { showMessage } = useContext(NotificationContext);
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
      setPasswordError('パスワードは英字・数字・記号を含めてください');
      return;
    }
    if (password.length < 8) {
      setPasswordError('パスワードは8文字以上で入力してください');
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

    try {
      await adminLogin(email, password);
      navigate('/admin/home');
    } catch {
      showMessage(
        [
          'ログインに失敗しました。',
          '管理者でない場合にはログインページへ戻ってください。',
        ],
        '--color-error'
      );
    }
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
          label="パスワード(英数字・記号を含む8文字以上)"
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
            ログインページへ戻る
          </Link>
        </div>
      </div>
    </>
  );
};
export default AdminLoginInputGroup;
