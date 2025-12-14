import TextInput from '@/components/TextInput';
import TransitionButton from '@/components/TransitionButton';
import { useContext, useEffect, useRef, useState } from 'react';
import { signup } from '@/api/AuthApi';
import { checkEmailFormat, checkPasswordFormat } from '@/utils/validation';
import { EMAIL_RESEND_INTERVAL_MS } from '@/constants/resetPasswordConstants';
import NotificationContext from '@/contexts/notificationContext';

const didInit = false;

const SignupInputGroup = () => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const { showMessage } = useContext(NotificationContext);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');
  const [emailSentTime, setEmailSentTime] = useState<Date | null>(null);
  const [signupButtonLabel, setSignupButtonLabel] =
    useState('確認メールを送信');

  useEffect(() => {
    if (!didInit) {
      const storedEmailSentTime = localStorage.getItem('registerEmailSentTime');
      if (storedEmailSentTime) {
        const sentTime = new Date(storedEmailSentTime);
        if (!canResendEmail(sentTime)) {
          setEmailSentTime(sentTime);
          countDownResendEmail(sentTime);
        }
      }
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, []);

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

  const handlePasswordCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordCheck(e.target.value);
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
    handlePasswordCheckBlur();
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
   * パスワード確認入力欄からフォーカスが外れたときの処理
   * @param e
   */
  const handlePasswordCheckBlur = () => {
    if (passwordCheck === '') {
      setPasswordCheckError('確認用パスワードを入力してください');
      return;
    }
    if (password !== passwordCheck) {
      setPasswordCheckError('パスワードが一致しません');
      return;
    }

    setPasswordCheckError('');
  };

  /**
   * ボタンの状態の取得
   * @returns ボタンの状態
   */
  const getSignupButtonStatus = (): 'solid' | 'disabled-solid' => {
    if (
      email === '' ||
      password === '' ||
      emailError !== '' ||
      passwordError !== '' ||
      passwordCheck === '' ||
      passwordCheckError !== '' ||
      (emailSentTime !== null && !canResendEmail(emailSentTime))
    ) {
      return 'disabled-solid';
    }
    return 'solid';
  };

  /**
   * メール再送信可能かどうかを判定する
   * @param emailSentTime
   * @returns メール再送信可能かどうか
   */
  const canResendEmail = (emailSentTime: Date): boolean => {
    return (
      new Date().getTime() - emailSentTime.getTime() >= EMAIL_RESEND_INTERVAL_MS
    );
  };

  /**
   * 登録ボタンがクリックされたときの処理
   * @returns
   */
  const handleSignupButtonClick = async () => {
    if (getSignupButtonStatus() === 'disabled-solid') {
      return;
    }

    const emailSentTime = new Date();
    localStorage.setItem('registerEmailSentTime', emailSentTime.toISOString());
    setEmailSentTime(emailSentTime);
    countDownResendEmail(emailSentTime);

    try {
      await signup(email, password);
      showMessage(['メールの送信に成功しました。'], '--color-success');
    } catch {
      setEmailSentTime(null);
      resetCountDown();
      showMessage(
        ['メールの送信に失敗しました。', '再度時間を空けてお試しください。'],
        '--color-error'
      );
    }
  };

  /**
   * メール再送信のカウントダウン処理
   */
  const countDownResendEmail = (emailSentTime: Date) => {
    if (timer.current) {
      clearInterval(timer.current);
    }

    const substractTime = Math.max(
      new Date().getTime() - emailSentTime.getTime(),
      0
    );
    let remainingTime = Math.floor(
      (EMAIL_RESEND_INTERVAL_MS - substractTime) / 1000
    );
    setSignupButtonLabel(`再送可能まであと ${remainingTime} 秒`);

    timer.current = setInterval(() => {
      remainingTime -= 1;
      if (remainingTime > 0) {
        setSignupButtonLabel(`再送可能まであと ${remainingTime} 秒`);
      } else {
        setSignupButtonLabel('確認メールを送信');

        if (timer.current !== null) {
          clearInterval(timer.current);
          timer.current = null;
        }
      }
    }, 1000);
  };

  const resetCountDown = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    setSignupButtonLabel('確認メールを送信');
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
        <TextInput
          type="password"
          label="パスワード確認(英数字・記号を含む8文字以上)"
          placeholder="********"
          error={passwordCheckError}
          id="password-input-check"
          value={passwordCheck}
          onChange={handlePasswordCheckChange}
          onBlur={handlePasswordCheckBlur}
          displayStatus={'normal'}
          prefix={''}
          isUnroundedLeft={false}
          className="mt-15 h-5"
        />
        <div className="mt-3.5 flex flex-col items-center gap-2.5">
          <TransitionButton
            displayStatus={getSignupButtonStatus()}
            label={signupButtonLabel}
            onClick={handleSignupButtonClick}
            className="mt-15 h-11 w-full"
          />
        </div>
      </div>
    </>
  );
};
export default SignupInputGroup;
