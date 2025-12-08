import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import LoadingAuth from './LoadingAuth';


const RequireAuth = () => {
  let didInit = false;
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
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

  if (!authenticated) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
};

export default RequireAuth;
