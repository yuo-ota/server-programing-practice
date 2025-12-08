import LoadingIcon from '@/assets/loading.svg?react';

const LoadingAuth = () => {
  return (
    <>
      <div className="flex h-dvh w-dvw items-center justify-center">
        <LoadingIcon className="h-16 w-16 animate-spin" />
      </div>
    </>
  );
};

export default LoadingAuth;
