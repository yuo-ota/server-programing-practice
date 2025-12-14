import { sendPasswordResetMail } from '@/api/PasswordResetApi';
import TextInput from '@/components/TextInput';
import TransitionButton from '@/components/TransitionButton';
import { EMAIL_RESEND_INTERVAL_MS } from '@/constants/resetPasswordConstants';
import NotificationContext from '@/contexts/NotificationContext';
import { checkEmailFormat } from '@/utils/validation';
import { useContext, useEffect, useRef, useState } from 'react';

const didInit = false;

const EmailInputGroup = () => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const { showMessage } = useContext(NotificationContext);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSentTime, setEmailSentTime] = useState<Date | null>(null);
  const [passwordResetButtonLabel, setPasswordResetButtonLabel] =
    useState('パスワードリセット');

  useEffect(() => {
    if (!didInit) {
      const storedEmailSentTime = localStorage.getItem('resetEmailSentTime');
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
   * メールアドレス入力欄の値が変更されたときの処理
   * @param e
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  /**
   * メールアドレス入力欄からフォーカスが外れたときの処理
   * @param e
   * @returns
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
   * ボタンの状態の取得
   * @returns ボタンの状態
   */
  const getPasswordResetButtonStatus = (): 'solid' | 'disabled-solid' => {
    if (
      email === '' ||
      emailError !== '' ||
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
   * パスワードリセットボタンがクリックされたときの処理
   * @returns
   */
  const handlePasswordResetButtonClick = async () => {
    if (getPasswordResetButtonStatus() === 'disabled-solid') {
      return;
    }

    const emailSentTime = new Date();
    localStorage.setItem('resetEmailSentTime', emailSentTime.toISOString());
    setEmailSentTime(emailSentTime);
    countDownResendEmail(emailSentTime);

    try {
      await sendPasswordResetMail(email);
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
    setPasswordResetButtonLabel(`再送可能まであと ${remainingTime} 秒`);

    timer.current = setInterval(() => {
      remainingTime -= 1;
      if (remainingTime > 0) {
        setPasswordResetButtonLabel(`再送可能まであと ${remainingTime} 秒`);
      } else {
        setPasswordResetButtonLabel('パスワードリセット');

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
    setPasswordResetButtonLabel('パスワードリセット');
  };

  return (
    <>
      <div className="flex w-full flex-col gap-3.5">
        <TextInput
          type="email"
          label="登録メールアドレス"
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
          label={passwordResetButtonLabel}
          onClick={handlePasswordResetButtonClick}
          className="mt-15 h-11 w-full"
        />
      </div>
    </>
  );
};

export default EmailInputGroup;
