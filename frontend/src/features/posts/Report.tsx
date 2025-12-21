import BannerButton from "@/components/BannerButton";
import TopBanner from "@/components/TopBanner";
import ReportInputGroup from "./components/ReportInputGroup";
import { useContext, useState } from "react";
import { REPORT_POST_MAP } from "@/constants/reportConstants";
import ReportThumbNail from "./components/ReportThumbNail";
import type { ReportProps } from "@/interfaces/app/report";
import { useNavigate } from "react-router-dom";
import { createReport } from "@/api/ReportApi";
import NotificationContext from "@/contexts/notificationContext";



export const Report = (reportData : ReportProps) => {
  const navigate = useNavigate();
  const { showMessage } = useContext(NotificationContext);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [reason, setReason] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  const handleCancelButtonClick = () => {
    navigate(-1);
  }

  const handleReportButtonClick = async () => {
    if (hasError || Object.values(checkedItems).filter(Boolean).length === 0) {
      return;
    }

    const reportTypes: string[] = [];
    Object.entries(checkedItems).forEach(([key, value]) => {
      if (value) {
        reportTypes.push(REPORT_POST_MAP[key as keyof typeof REPORT_POST_MAP]);
      }
    });

    try {
      await createReport(reportData.postId, reportTypes, reason);
      navigate(-1);
    } catch {
      showMessage(
        ['通報の送信に失敗しました。', '再度時間を空けてお試しください。'],
        '--color-error'
      );
    }
  }

  return (
    <>
      <div className="flex h-full w-full flex-col items-center">
        <TopBanner
          leftElement={
            <BannerButton
              displayStatus={"cancel"}
              label={"キャンセル"}
              onClick={handleCancelButtonClick}
            />
          }
          rightElement={
            <BannerButton
              displayStatus={"attention"}
              label={"通報する"}
              onClick={handleReportButtonClick}
            />
          }
          className="h-16 w-full fixed"
        />
        <div className="flex h-full w-full max-w-[500px] flex-col items-center py-16">
          <ReportThumbNail {...reportData} />
          <ReportInputGroup checkedItems={checkedItems} setCheckedItems={setCheckedItems} setReason={setReason} setHasError={setHasError} reason={reason} />
        </div>
      </div>
    </>
  );
};

