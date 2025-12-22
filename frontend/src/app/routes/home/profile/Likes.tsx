import { Likes as ProfileLikes } from '@/features/profile/Likes';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export const Likes = () => {
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

  return (
    <>
      <ProfileLikes key={`profile-like-${userId}`} />
    </>
  );
};
