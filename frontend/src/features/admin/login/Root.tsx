import TopBanner from '@/components/TopBanner';
import AdminLoginInputGroup from './components/AdminLoginInputGroup';

const Root = () => {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center">
        <TopBanner label="管理者ログイン" className="h-16 w-full" />
        <div className="flex h-full w-full max-w-[500px] flex-col items-center px-8 py-14">
          <AdminLoginInputGroup />
        </div>
      </div>
    </>
  );
};

export default Root;
