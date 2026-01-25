import { Root as PageRoot } from '@/features/root/Root';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const Root = () => {
  const didInit = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    if (localStorage.getItem('skipRootPage') === 'true') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <div className="flex h-dvh w-dvw items-center justify-center">
        <PageRoot />
      </div>
    </>
  );
};
