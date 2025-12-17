import TopBanner from '@/components/TopBanner';
import IconButton from '@/components/IconButton';
import SettingIcon from '@/assets/allowLeft.svg?react';
import { useNavigate } from 'react-router';
import SignupInputGroup from './components/SignupInputGroup';
import TransitionButton from '@/components/TransitionButton';

export const Root = () => {
  const navigate = useNavigate();

  const handleReturnButtonClick = () => {
    navigate(-1);
  };

  const handleLoginTransitionButtonClick = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="flex h-full w-full flex-col items-center">
        <TopBanner
          leftElement={
            <IconButton
              onClick={handleReturnButtonClick}
              ButtonIcon={<SettingIcon className={`h-8 w-8`} />}
              className="h-10 w-10"
            />
          }
          label="新規登録"
          className="h-16 w-full"
        />
        <div className="flex h-full w-full max-w-[500px] flex-col items-center justify-between px-8 py-14">
          <SignupInputGroup />
          <TransitionButton
            displayStatus={'outline'}
            label={'ログイン画面へ戻る'}
            onClick={handleLoginTransitionButtonClick}
            className="h-11 w-full"
          />
        </div>
      </div>
    </>
  );
};
