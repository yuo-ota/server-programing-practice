import { API_URL } from "@/config";
import type { ReportProps } from "@/interfaces/app/report";

const ReportThumbNail = ( reportData?: ReportProps ) => {
  if (!reportData) {
    return null;
  }
  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-4 flex-2 min-w-0">
          <div className="flex gap-1.5">
            <img
              src={`${API_URL}${reportData.userIconPath}`}
              alt={`${reportData.userName} icon`}
              className="w-8 h-8 rounded-full flex-none"
            />
            <div className="flex flex-col">
              <p>{reportData.userName}</p>
              <p className="text-sm text-gray-500">@{reportData.userId}</p>
            </div>
          </div>
        </div>
        <img
          src={`${API_URL}${reportData.postImagePath}`}
          alt={reportData.postImageAlt}
          className="object-cover flex-1 min-w-0"
        />
      </div>
    </>
  );
};

export default ReportThumbNail