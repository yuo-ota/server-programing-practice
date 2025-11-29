import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';

const RequireAdminAuth = () => {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch('/api/admin/auth', {
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

    verifyToken();
  }, []);

  if (checking) return <div>認証中...</div>;

  if (!authenticated) return <Navigate to="/not-found" replace />;

  return <Outlet />;
};

export default RequireAdminAuth;
