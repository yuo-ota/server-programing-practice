import { deleteAccount, logout } from '@/api/AuthApi';
import TransitionButton from '@/components/TransitionButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteAccountDialog from './DeleteAccountDialog';

const AccontManageGroup = () => {
  const navigate = useNavigate();
  const [isOpenLogout, setIsOpenLogout] = useState(false);
  const openLogoutDialog = () => setIsOpenLogout(true);
  const closeLogoutDialog = () => setIsOpenLogout(false);

  const [isOpenDelete1, setIsOpenDelete1] = useState(false);
  const openDeleteDialog1 = () => setIsOpenDelete1(true);
  const closeDeleteDialog1 = () => setIsOpenDelete1(false);

  const [isOpenDelete2, setIsOpenDelete2] = useState(false);
  const openDeleteDialog2 = () => setIsOpenDelete2(true);
  const closeDeleteDialog2 = () => setIsOpenDelete2(false);

  /**
   * ログアウトボタンがクリックされたときの処理
   * @returns
   */
  const handleLogoutButtonClick = () => {
    openLogoutDialog();
  };

  /**
   * ログアウトダイアログのボタンがクリックされたときの処理
   */
  const handleLogoutDialogClick = async () => {
    await logout();
    navigate('/');
  };

  /**
   * アカウント削除ボタンがクリックされたときの処理
   * @returns
   */
  const handleDeleteAccountButtonClick = () => {
    openDeleteDialog1();
  };

  /**
   * アカウント削除ダイアログのボタンがクリックされたときの処理
   */
  const handleDeleteDialogClick1 = () => {
    openDeleteDialog2();
  };
  const handleDeleteDialogClick2 = async () => {
    await deleteAccount();
    navigate('/');
  };

  return (
    <div className="flex w-full flex-col">
      {isOpenLogout && (
          <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center">
            <DeleteAccountDialog
              isOpen={isOpenLogout}
              onButtonClick={() => handleLogoutDialogClick()}
              onClose={closeLogoutDialog}
              questionText="本当にログアウトしますか？"
              leftText="はい"
              rightText="いいえ"
            />
          </div>
        )}
      {isOpenDelete1 && (
          <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center">
            <DeleteAccountDialog
              isOpen={isOpenDelete1}
              onButtonClick={() => handleDeleteDialogClick1()}
              onClose={closeDeleteDialog1}
              questionText="本当にアカウントを削除しますか？"
              leftText="はい"
              rightText="いいえ"
            />
          </div>
        )}
      {isOpenDelete2 && (
          <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center">
            <DeleteAccountDialog
              isOpen={isOpenDelete2}
              onButtonClick={() => handleDeleteDialogClick2()}
              onClose={closeDeleteDialog2}
              questionText="こうかいしませんね？"
              leftText="はい"
              rightText="いいえ"
            />
          </div>
        )}
      <label className="text-foreground text-subtitle self-start">
        アカウント管理
      </label>
      <div className="flex w-full flex-col items-center gap-2.5">
        <TransitionButton
          displayStatus={'outline'}
          label={'ログアウト'}
          onClick={handleLogoutButtonClick}
          className="h-11 w-full"
        />
        <TransitionButton
          displayStatus={'attention'}
          label={'アカウントを削除'}
          onClick={handleDeleteAccountButtonClick}
          className="h-11 w-full"
        />
      </div>
    </div>
  );
};

export default AccontManageGroup;
