import { API_URL } from '@/config';
import Root from '@/features/login/Root';
import { useEffect, useRef, useState } from 'react';
import LoadingAuth from '../auth/LoadingAuth';
import { Navigate } from 'react-router-dom';

export const Login = () => {
  const didInit = useRef(false);
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
      if (!didInit.current) {
        verifyToken();
        didInit.current = true;
      }
    }, []);
  
    const verifyToken = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth`, {
          method: 'POST',
          credentials: 'include',
        });
  
        if (response.ok) {
          setAuthenticated(true);
          setChecking(false);
        } else {
          setAuthenticated(false);
          setChecking(false);
        }
      } catch {
        setAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };

  if (checking) return <LoadingAuth />;

  if (authenticated) return <Navigate to="/home/posts" replace />;

  return (
    <>
      <div className="flex h-dvh w-dvw items-center justify-center">
        <Root />
      </div>
    </>
  );
};
