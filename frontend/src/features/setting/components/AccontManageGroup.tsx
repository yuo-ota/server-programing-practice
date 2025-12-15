import { deleteAccount, logout } from '@/api/AuthApi';
import TransitionButton from '@/components/TransitionButton';
import { useNavigate } from 'react-router-dom';

const AccontManageGroup = () => {
  const navigate = useNavigate();

  /**
   * ログアウトボタンがクリックされたときの処理
   * @returns
   */
  const handleLogoutButtonClick = async () => {
    await logout();
    navigate('/root');
  };

  /**
   * アカウント削除ボタンがクリックされたときの処理
   * @returns
   */
  const handleDeleteAccountButtonClick = async () => {
    await deleteAccount();
    navigate('/root');
  };

  return (
    <div className="flex w-full flex-col">
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
          label={'パスワードをリセット'}
          onClick={handleDeleteAccountButtonClick}
          className="h-11 w-full"
        />
      </div>
    </div>
  );
};

export default AccontManageGroup;
