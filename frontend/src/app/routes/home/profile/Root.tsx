import { Root as ProfileRoot } from '@/features/profile/Root';
import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const Root = () => {
  const didInit = useRef(false);
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    if (!didInit.current) {
      didInit.current = true;

      if (!userId) {
        navigate('/not-found');
      }
    }
  }, [userId, navigate]);

  return <ProfileRoot key={`profile-root-${userId}`} />;
};
