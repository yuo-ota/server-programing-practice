import { Report as ReportRoot } from '@/features/profile/Report';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NotFound } from '../../error/NotFound';
import type { ReportUserProps } from '@/interfaces/app/report';
import LoadingAuth from '@/app/auth/LoadingAuth';
import { getProfile } from '@/api/ProfileApi';
import { isProfile } from '@/interfaces/api/user';

export const Report = () => {
  const didInit = useRef(false);
  const userId = useParams<{ userId: string }>().userId || '';
  const [checking, setChecking] = useState(true);
  const [reportData, setReportData] = useState<ReportUserProps | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      if (didInit.current) {
        return;
      }
      didInit.current = true;

      if (!userId) {
        setChecking(false);
        return;
      }

      try {
        const response = await getProfile(userId);
        if (!isProfile(response)) {
          setReportData(null);
          return;
        }

        setReportData({
          userIconPath: response.iconPath,
          userName: response.name,
          userId: userId,
          userDescription: response.introduction || '',
        });
      } catch {
        setReportData(null);
      } finally {
        setChecking(false);
      }
    };

    fetchReportData();
  }, [userId]);

  if (reportData === null && !checking) {
    return <NotFound />;
  }

  if (checking || !reportData) {
    return <LoadingAuth />;
  }

  return (
    <>
      <div className="flex h-dvh w-dvw items-center justify-center">
        <ReportRoot {...reportData} />
      </div>
    </>
  );
};
