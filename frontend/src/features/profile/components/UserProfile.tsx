import { API_URL } from '@/config';
import type { Profile } from '@/interfaces/api/user';
import UserCoreInfomation from './UserCoreInfomation';
import SimpleButton from '@/components/SimpleButton';
import KebabMenu from '@/components/KebabMenu';
import { useNavigate, useParams } from 'react-router-dom';

interface UserProfileProps {
  userData: Profile;
  loginUserId?: string;
}

const UserProfile = ({ userData, loginUserId }: UserProfileProps) => {
  const { userId } = useParams<{ userId: string }>();
  const isMyProfile = loginUserId === userId;
  const navigate = useNavigate();

  const handleReportClick = () => {
    navigate(`/home/profile/${userId}/report`);
  };
  const handleEditClick = () => {
    if (isMyProfile) {
      navigate(`/home/profile/${userId}/edit`);
    }
  };

  return (
    <>
      <div>
        <div className="flex h-[110px] w-full">
          <img
            src={`${API_URL}${userData?.headerPath}`}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mx-5 my-2.5">
          <div className="flex items-center justify-between">
            <UserCoreInfomation
              icon={
                <img
                  src={`${API_URL}${userData?.iconPath}`}
                  className="h-full w-full"
                />
              }
              name={`${userData?.name}`}
              userId={`${userId}`}
              className=""
            />
            {isMyProfile ? (
              <SimpleButton
                label="編集"
                onClick={() => {
                  handleEditClick();
                }}
                className=""
              />
            ) : (
              <KebabMenu
                items={[
                  {
                    label: '通報する',
                    onClick: () => {
                      handleReportClick();
                    },
                    itemsClassName: 'text-error',
                  },
                ]}
                className="ml-12 h-12 w-12"
              />
            )}
          </div>
          <p className="text-foreground text-subtitle my-2.5">
            {userData?.introduction}
          </p>
          <div>
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
      </div>
    </>
  );
};

export default UserProfile;
