import { API_URL } from '@/config';
import type { Profile } from '@/interfaces/api/user';
import UserCoreInformation from './UserCoreInformation';
import SimpleButton from '@/components/SimpleButton';
import KebabMenu from '@/components/KebabMenu';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Dialog from './Dialog';

interface UserProfileProps {
  userData: Profile;
  loginUserId?: string;
}

const UserProfile = ({ userData, loginUserId }: UserProfileProps) => {
  const { userId } = useParams<{ userId: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const isMyProfile = loginUserId === userId;
  const [dialogUrl, setDialogUrl] = useState('');
  const navigate = useNavigate();

  const handleReportClick = () => {
    navigate(`/home/profile/${userId}/report`);
  };
  const handleEditClick = () => {
    if (isMyProfile) {
      navigate(`/home/profile/${userId}/edit`);
    }
  };

  const getSafeUrl = (url: string): string | null => {
    try {
      const parsedUrl = new URL(url, window.location.origin);
      if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
        return parsedUrl.toString();
      }
      return null;
    } catch {
      return null;
    }
  };
  const handleLinkClick = (url: string) => {
    openDialog();
    setDialogUrl(url);
  };
  const handleDialogLinkClick = (url: string) => {
    const safeUrl = getSafeUrl(url);
    if (!safeUrl) {
      closeDialog();
      return;
    }
    window.open(safeUrl, '_blank', 'noopener,noreferrer');
    closeDialog();
  };

  return (
    <>
      <div>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center">
            <Dialog
              isOpen={isOpen}
              onButtonClick={() => handleDialogLinkClick(dialogUrl)}
              onClose={closeDialog}
              text={`以下のリンク先へアクセスしますか?\n${dialogUrl}`}
            />
          </div>
        )}
        <div className="flex h-[110px] w-full">
          <img
            src={`${API_URL}${userData?.headerPath}`}
            className="h-full w-full object-cover"
            alt="Header Image"
          />
        </div>
        <div className="mx-5 my-2.5">
          <div className="flex items-center justify-between">
            <UserCoreInformation
              icon={
                <img
                  src={`${API_URL}${userData?.iconPath}`}
                  className="h-full w-full rounded-full"
                  alt="User Icon"
                />
              }
              name={`${userData?.name}`}
              userId={`${userId}`}
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
          <p className="text-foreground text-subtitle my-2.5 break-all">
            {userData?.introduction}
          </p>
          <div>
            {userData?.socialAccounts?.filter(Boolean).map((item) => (
              <SimpleButton
                key={`${item?.name}-${item?.identifier}`}
                label={`${item?.name}`}
                onClick={() => {
                  handleLinkClick(item?.identifier);
                }}
                className={'mb-2'}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
