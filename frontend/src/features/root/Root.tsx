import TransitionButton from '@/components/TransitionButton';
import Introduction from './components/Introduction';
import CheckBox from '@/components/CheckBox';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Root = () => {
  const navigate = useNavigate();
  const [skipRootPage, setSkipRootPage] = useState(false);

  const handleSkipRootPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('skipRootPage', e.target.checked ? 'true' : 'false');
    setSkipRootPage(e.target.checked);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/signup');
  };

  return (
    <>
      <div className="flex h-full w-full max-w-[500px] flex-col items-center justify-between px-8 py-14">
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-8">
          <Introduction />
        </div>
        <div className="flex w-full flex-col gap-4">
          <CheckBox
            id={'skipRootPage'}
            name={''}
            label={'次回からログイン画面を起動する'}
            checked={skipRootPage}
            onChange={handleSkipRootPageChange}
            helperText={''}
            className="self-center"
          />
          <TransitionButton
            displayStatus={'solid'}
            label={'ログイン'}
            onClick={handleLoginClick}
            className="h-11 w-full"
          />
          <TransitionButton
            displayStatus={'outline'}
            label={'新規登録'}
            onClick={handleRegisterClick}
            className="h-11 w-full"
          />
        </div>
      </div>
    </>
  );
};
