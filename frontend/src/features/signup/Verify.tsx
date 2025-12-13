import TopBanner from '@/components/TopBanner';
import TransitionButton from '@/components/TransitionButton';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

interface VerifyProps {
  token: string;
}

export const Verify = ({ token }: VerifyProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/signup/setting', { state: { token } });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleTransitionSignupSetting = () => {
    navigate('/signup/setting', { state: { token } });
  };

  return (
    <>
      <div className="flex h-full w-full flex-col items-center">
        <TopBanner label="新規登録" className="h-16 w-full" />
        <div className="flex h-full w-full max-w-[500px] flex-col items-center px-8 py-14">
          <p className="self-start">
            メールアドレスが認証されました。<br />
            3秒後に初期設定画面へ移ります。
          </p>
          <TransitionButton
            displayStatus={'solid'}
            label={'初期設定画面へ進む'}
            onClick={handleTransitionSignupSetting}
            className="h-11 w-full mt-14"
          />
        </div>
      </div>
    </>
  );
};
