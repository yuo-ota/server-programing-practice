import type { Profile } from "@/interfaces/api/user";
import { getUserId } from "@/utils/handleLocalStorage";
import { useNavigate, useParams } from "react-router-dom";
import UserCoreInfomation from "./components/UserCoreInfomation";
import SimpleButton from "@/components/SimpleButton";
import KebabMenu from "@/components/KebabMenu";
import TabElementGroup from "@/components/TabElementGroup";
import { API_URL } from "@/config";

interface RootProps {
  userData?: Profile;
}

export const Likes = ({ userData }: RootProps) => {
  const {userId} = useParams<{ userId : string }>();
  const loginUserId = getUserId();
  const isMyProfile = loginUserId === userId;
  const navigate = useNavigate();

  const handlePostsClick = () => {
    navigate(`/home/profile/${userId}`);
  }

  return(
    <>
    {/* プロフィール部分 */}
    <div>
      <div className="w-full h-[110px] flex">
        <img src={`${API_URL}/images/headers/default.png`} className="w-full h-full object-cover"/>
      </div>
      <div className="mx-5 my-2.5">
        <div className="flex items-center justify-between">
          <UserCoreInfomation
            icon={<img src={`${userData?.iconPath}`} className="w-full h-full"/>}
            name={`${userData?.name}`}
            userId={`${userId}`}
            className=""
          />
          {isMyProfile ? (
            <SimpleButton
              label="編集"
              onClick={() => {}}
              className=""
            />
          ) : (
            <KebabMenu
              items={[{ label: 'テキスト1', onClick: () => {} }]}
              className="w-12 h-12"
            />
          )}
        </div>
        <p className="text-foreground text-subtitle my-2.5">
          {userData?.introduction}
        </p>
        {userData?.socialAccounts?.filter(Boolean).map((item, idx) => (
          <SimpleButton
            key={idx}
            label={`${item?.name}`}
            onClick={() => {}}
            className=""
          />
        ))}
      </div>
    </div>
    <div className="flex justify-center">
    <TabElementGroup
      tabs={[
        { label: '投稿', onClick: () => {handlePostsClick()} },
        { label: 'いいね', onClick: () => {} },
      ]}
      className="mx-5 mt-2.5"
      defaultIndex={1}
    />
    </div>
    {/* 過去の投稿 */}
    </>
  )
};

export default Likes;