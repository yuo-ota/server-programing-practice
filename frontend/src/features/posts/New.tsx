import TopBanner from "@/components/TopBanner"
import { useNavigate } from "react-router-dom";
import BannerButton from "@/components/BannerButton";
import PostInputGroup from "./components/PostInputGroup";

export const New = () => {
  const navigate = useNavigate();

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
        <PostInputGroup
          className=""
        />
      </div>
    </>
  );
  };