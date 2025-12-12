import { sendPasswordResetMail } from '@/api/PasswordResetApi';
import TextInput from '@/components/TextInput';
import TransitionButton from '@/components/TransitionButton';
import { EMAIL_RESEND_INTERVAL_MS } from '@/constants/ResetPasswordConstants';
import { checkEmailFormat } from '@/utils/validation';
import { useState } from 'react';

let globalIntervalId: NodeJS.Timeout | null = null;

const EmailInputGroup = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSentTime, setEmailSentTime] = useState<Date | null>(null);
  const [passwordResetButtonLabel, setPasswordResetButtonLabel] =
    useState('パスワードリセット');

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
    setEmailSentTime(new Date());
    countDownResendEmail();

    await sendPasswordResetMail(email);
  };

  /**
   * メール再送信のカウントダウン処理
   */
  const countDownResendEmail = () => {
    if (globalIntervalId) {
      clearInterval(globalIntervalId);
    }

    let remainingTime = EMAIL_RESEND_INTERVAL_MS / 1000;
    setPasswordResetButtonLabel(`再送可能まであと ${remainingTime} 秒`);

    globalIntervalId = setInterval(() => {
      remainingTime -= 1;
      if (remainingTime > 0) {
        setPasswordResetButtonLabel(`再送可能まであと ${remainingTime} 秒`);
      } else {
        setPasswordResetButtonLabel('パスワードリセット');

        if (globalIntervalId !== null) {
          clearInterval(globalIntervalId);
          globalIntervalId = null;
        }
      }
    }, 1000);
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
