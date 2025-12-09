import PasswordInputGroup from './components/PasswordInputGroup';

export const Root = () => {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center">
        <div className="top-0 h-32 w-full bg-red-200"></div>
        <div className="flex h-full w-full max-w-[500px] flex-col items-center px-8 py-14">
          <PasswordInputGroup />
        </div>
      </div>
    </>
  );
};
