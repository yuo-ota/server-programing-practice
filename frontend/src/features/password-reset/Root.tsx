import TopBanner from '@/components/TopBanner';
import PasswordInputGroup from './components/PasswordInputGroup';
import IconButton from '@/components/IconButton';
import SettingIcon from '@/assets/allowLeft.svg?react';
import { useNavigate } from 'react-router';

export const Root = () => {
  const navigate = useNavigate();

  const handleReturnButtonClick = () => {
    navigate(-1);
  }

  return (
    <>
      <div className="flex h-full w-full flex-col items-center">
        <TopBanner
          leftElement={
            <IconButton
              onClick={handleReturnButtonClick}
              ButtonIcon={<SettingIcon className={`h-8 w-8`} />}
              className="w-10 h-10"
            />
          }
          label="パスワード再設定"
          className="w-full h-16"
        />
        <div className="flex h-full w-full max-w-[500px] flex-col items-center px-8 py-14">
          <PasswordInputGroup />
        </div>
      </div>
    </>
  );
};
