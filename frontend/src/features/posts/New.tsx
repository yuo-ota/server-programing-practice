import TopBanner from "@/components/TopBanner"
import { useNavigate } from "react-router-dom";
import BannerButton from "@/components/BannerButton";
import PostInputGroup from "./components/PostInputGroup";
import { useEffect, useState } from "react";

export const New = () => {
  const navigate = useNavigate();
  const [iconUrl, setIconUrl] = useState<string | null>(null);

  useEffect(() => {
    const settingData = localStorage.getItem('settingData');
    if (settingData) {
      const parsedData = JSON.parse(settingData) as { icon?: string };
      if (parsedData?.icon) {
        setIconUrl(parsedData.icon);
      }
    }
  }, []);

  const handleReturnButtonClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="flex h-full w-full flex-col items-center">
        <TopBanner
          leftElement={
            <BannerButton
              displayStatus="cancel"
              label="キャンセル"
              onClick={handleReturnButtonClick}
              className=""
            />
          }
          rightElement={
            <BannerButton
              displayStatus="solid"
              label="投稿"
              onClick={() => {}}
              className=""
            />
          }
          className="h-16 w-full"
        />
        <div className="flex items-start gap-4 pt-6 px-2">[]
          {iconUrl ? (
            <img src={iconUrl} alt="アイコン" className="w-14 h-14 rounded-full object-cover" />
          ) : (
            <div role="img" aria-label="アイコン未設定" className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700" />
          )}
          <PostInputGroup
            className="flex-1"
          />
        </div>
      </div>
    </>
  );
  };