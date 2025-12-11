import TopBanner from '@/components/TopBanner';
import PasswordInputGroup from './components/PasswordInputGroup';

export const Root = () => {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center">
        <TopBanner
          displayStatus={'normal'}
          bannerButoonStatus={'solid'}
          onClick={() => {}}
        />
        <div className="flex h-full w-full max-w-[500px] flex-col items-center px-8 py-14">
          <PasswordInputGroup />
        </div>
      </div>
    </>
  );
};
