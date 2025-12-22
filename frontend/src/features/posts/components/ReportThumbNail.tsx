import { API_URL } from '@/config';
import type { ReportProps } from '@/interfaces/app/report';

const ReportThumbNail = ({ reportData }: { reportData: ReportProps }) => {
  if (!reportData) {
    return null;
  }
  return (
    <>
      <div className="flex w-full items-start justify-between py-4">
        <div className="flex min-w-0 flex-2 flex-col gap-2 px-4">
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
          <p className="truncate">{reportData.postDescription}</p>
        </div>
        <img
          src={`${API_URL}${reportData.postImagePath}`}
          alt={reportData.postImageAlt}
          className="mr-4 min-w-0 flex-1 object-cover"
        />
      </div>
    </>
  );
};

export default ReportThumbNail;
