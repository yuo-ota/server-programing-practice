import { API_URL } from '@/config';
import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import LoadingAuth from './LoadingAuth';

let didInit = false;

const RequireAdminAuth = () => {
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
      const response = await fetch(`${API_URL}/api/admin/auth`, {
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

  if (!authenticated) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
};

export default RequireAdminAuth;
