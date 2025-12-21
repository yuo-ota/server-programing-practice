import { authToken } from '@/api/AuthParamToken';
import LoadingAuth from '@/app/auth/LoadingAuth';
import { TOKEN_TYPE } from '@/constants/tokenType';
import { Setting as SignupSetting } from '@/features/signup/Setting';
import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation } from "react-router-dom";

type LocationState = {
  token: string;
};

export const Setting = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const token = state?.token;
  const didInit = useRef(false);
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (!didInit.current && token) {
      console.log("Verifying token in Setting route:", token);
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
      const response = await authToken(token, TOKEN_TYPE.PRE_REGISTER);

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
        <SignupSetting
          token={token}
        />
      </div>
    </>
  );
};
