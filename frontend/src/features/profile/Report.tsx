import BannerButton from '@/components/BannerButton';
import TopBanner from '@/components/TopBanner';
import { useContext, useState } from 'react';
import { REPORT_USER_MAP } from '@/constants/reportConstants';
import type { ReportUserProps } from '@/interfaces/app/report';
import { useNavigate } from 'react-router-dom';
import { createUserReport } from '@/api/ReportApi';
import NotificationContext from '@/contexts/notificationContext';
import ReportInputGroup from './components/ReportInputGroup';
import ReportThumbNail from './components/ReportThumbNail';

export const Report = (reportData: ReportUserProps) => {
  const navigate = useNavigate();
  const { showMessage } = useContext(NotificationContext);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [reason, setReason] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);

  const handleCancelButtonClick = () => {
    navigate(-1);
  };

  const handleReportButtonClick = async () => {
    if (hasError || Object.values(checkedItems).filter(Boolean).length === 0) {
      return;
    }

    const reportTypes: string[] = [];
    Object.entries(checkedItems).forEach(([key, value]) => {
      if (value) {
        reportTypes.push(REPORT_USER_MAP[key as keyof typeof REPORT_USER_MAP]);
      }
    });

    try {
      await createUserReport(reportData.userId, reportTypes, reason);
      navigate(-1);
    } catch {
      showMessage(
        ['通報の送信に失敗しました。', '再度時間を空けてお試しください。'],
        '--color-error'
      );
    }
  };

  return (
    <>
      <div className="flex h-full w-full flex-col items-center">
        <TopBanner
          leftElement={
            <BannerButton
              displayStatus={'cancel'}
              label={'キャンセル'}
              onClick={handleCancelButtonClick}
            />
          }
          rightElement={
            <BannerButton
              displayStatus={'attention'}
              label={'通報する'}
              onClick={handleReportButtonClick}
            />
          }
          className="fixed h-16 w-full"
        />
        <div className="flex h-full w-full max-w-[500px] flex-col items-center py-16">
          <ReportThumbNail reportData={reportData} />
          <ReportInputGroup
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            setReason={setReason}
            setHasError={setHasError}
            reason={reason}
          />
        </div>
      </div>
    </>
  );
};
