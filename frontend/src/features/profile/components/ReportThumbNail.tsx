import { API_URL } from '@/config';
import type { ReportUserProps } from '@/interfaces/app/report';

const ReportThumbNail = ({ reportData }: { reportData: ReportUserProps }) => {
  if (!reportData) {
    return null;
  }
  return (
    <>
      <div className="flex min-w-0 flex-col gap-2 px-4  w-full items-start justify-between py-4">
        <div className="flex items-center gap-1.5">
          <img
            src={`${API_URL}${reportData.userIconPath}`}
            alt={`${reportData.userName} icon`}
            className="h-10 w-10 flex-none rounded-full"
          />
          <div className="flex flex-col">
            <p>{reportData.userName}</p>
            <p className="text-sm text-gray-500">@{reportData.userId}</p>
          </div>
        </div>
        <p className="break-all">{reportData.userDescription}</p>
      </div>
    </>
  );
};

export default ReportThumbNail;
