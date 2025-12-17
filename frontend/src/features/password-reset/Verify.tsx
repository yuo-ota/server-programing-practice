import TopBanner from '@/components/TopBanner';
import NewPasswordInputGroup from './components/NewPasswordInputGroup';

interface VerifyProps {
  token: string;
}

export const Verify = ({ token }: VerifyProps) => {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center">
        <TopBanner label="パスワード再設定" className="h-16 w-full" />
        <div className="flex h-full w-full max-w-[500px] flex-col items-center px-8 py-14">
          <NewPasswordInputGroup token={token} />
        </div>
      </div>
    </>
  );
};
