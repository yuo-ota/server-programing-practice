import { Report as ReportRoot } from '@/features/posts/Report';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NotFound } from '../../error/NotFound';
import { getPost } from '@/api/PostApi';
import type { ReportProps } from '@/interfaces/app/report';
import { isPost } from '@/interfaces/api/post';

export const Report = () => {
  const postId = useParams<{ postId: string }>().postId || "";
  const [checking, setChecking] = useState(true);
  const [reportData, setReportData] = useState<ReportProps | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      if (!postId) {
        setChecking(false);
        return;
      }

      try {
        const response = await getPost(postId);
        if (!isPost(response.data)) {
          setReportData(null);
          return;
        }

        setReportData({
          userIconPath: response.data.icon_path,
          userName: response.data.name,
          userId: response.data.user_id,
          postId: response.data.post_id,
          postDescription: response.data.text,
          postImagePath: response.data.images[0]?.path || "",
          postImageAlt: response.data.images[0]?.alt || ""
        });
      } finally {
        setChecking(false);
      }
    };

    fetchReportData();
  }, [postId]);

  if (reportData === null && !checking) {
    return <NotFound />;
  }
  
  if (checking || !reportData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex h-dvh w-dvw items-center justify-center">
        <ReportRoot {...reportData} />
      </div>
    </>
  );
};
