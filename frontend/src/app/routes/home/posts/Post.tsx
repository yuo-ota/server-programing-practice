import { Post as PostRoot } from '@/features/posts/Post';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NotFound } from '../../error/NotFound';
import { getPost } from '@/api/PostApi';
import { isPost } from '@/interfaces/api/post';
import LoadingAuth from '@/app/auth/LoadingAuth';
import type { PostProps } from '@/interfaces/app/post';

export const Post = () => {
  const didInit = useRef(false);
  const postId = useParams<{ postId: string }>().postId || '';
  const [checking, setChecking] = useState(true);
  const [postData, setPostData] = useState<PostProps | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      if (didInit.current) {
        return;
      }
      didInit.current = true;

      if (!postId) {
        setChecking(false);
        return;
      }

      try {
        const response = await getPost(postId);
        if (!isPost(response.data)) {
          setPostData(null);
          return;
        }

        setPostData({
          userIconPath: response.data.icon_path,
          userName: response.data.name,
          userId: response.data.user_id,
          postId: response.data.post_id,
          postText: response.data.text,
          postImagePath: response.data.images[0]?.path || '',
          postImageAlt: response.data.images[0]?.alt || '',
          isLiked: response.data.liked,
        });
      } catch {
        setPostData(null);
      } finally {
        setChecking(false);
      }
    };

    fetchReportData();
  }, [postId]);

  if (postData === null && !checking) {
    return <NotFound />;
  }

  if (checking || !postData) {
    return <LoadingAuth />;
  }

  return (
    <>
      <div className="flex h-dvh w-dvw items-center justify-center">
        <PostRoot {...postData} />
      </div>
    </>
  );
};
