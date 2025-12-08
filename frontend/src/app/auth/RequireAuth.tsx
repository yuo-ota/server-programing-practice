import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';

let didInit = false;

const RequireAuth = () => {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    console.log("aa");
    if (!didInit) {
      verifyToken();
      didInit = true;
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

  if (checking) return <div>認証中...</div>;

  if (!authenticated) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
};

export default RequireAuth;
