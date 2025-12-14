import { authToken } from '@/api/AuthParamToken';
import LoadingAuth from '@/app/auth/LoadingAuth';
import { TOKEN_TYPE } from '@/constants/tokenType_1';
import { Verify as PasswordResetVerify } from '@/features/password-reset/Verify';
import { useEffect, useRef, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router';

export const Verify = () => {
  const didInit = useRef(false);
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!didInit.current && token) {
      verifyToken(token);
      didInit.current = true;
    }
  }, [token]);

  /**
   * トークンの検証ロジック
   * @return void
   */
  const verifyToken = async (token: string) => {
    try {
      if (!token) {
        throw new Error('No token provided');
      }
      const response = await authToken(token, TOKEN_TYPE.PASSWORD_RESET);

      if (response.status === 204) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch {
      setAuthenticated(false);
    } finally {
      setChecking(false);
    }
  };

  if (checking) return <LoadingAuth />;

  if (!authenticated || !token) return <Navigate to="/not-found" replace />;

  return (
    <>
      <div className="flex h-dvh w-dvw items-center justify-center">
        <PasswordResetVerify token={token} />
      </div>
    </>
  );
};
