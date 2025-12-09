import { useNavigate } from 'react-router';
import TransitionButton from '@/components/TransitionButton';
import LoginInputGroup from './components/LoginInputGroup';

import LogoImage from './assets/logo.jpg';

const Root = () => {
  const navigate = useNavigate();

  const handleRegisterButtonClick = () => {
    navigate('/signup');
  };

  return (
    <>
      <div className="flex h-full w-full max-w-[500px] flex-col items-center justify-between px-8 py-14">
        <div className="flex w-full flex-col items-center gap-8">
          <img src={LogoImage} alt="Logo" className="h-30 w-30" />
          <LoginInputGroup />
        </div>
        <div className="w-full">
          <TransitionButton
            displayStatus={'outline'}
            label={'新規登録'}
            onClick={handleRegisterButtonClick}
            className="h-11 w-full"
          />
        </div>
      </div>
    </>
  );
};

export default Root;
