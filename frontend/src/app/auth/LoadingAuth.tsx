import LoadingIcon from '@/assets/loading.svg?react';

const LoadingAuth = () => {
  return (
    <>
      <div className="w-dvw h-dvh flex justify-center items-center">
        <LoadingIcon className="w-16 h-16 animate-spin" />
      </div>
    </>
  );
};

export default LoadingAuth;
