import { useNavigate } from 'react-router';
import TransitionButton from '../../../components/TransitionButton';
import ErrorDetail from '../components/ErrorDetail';

const Root = () => {
  const navigate = useNavigate();

  const handleHomeButtonClick = () => {
    navigate('/');
  };

  return (
    <>
      <div className="flex flex-col items-center gap-12">
        <ErrorDetail
          statusCode={401}
          message="Unauthorized"
          detail={[
            '認証情報が不足しています。',
            'ログイン後、再度アクセスしてください。',
          ]}
        />
        <TransitionButton
          displayStatus={'outline'}
          label={'ホームに戻る'}
          onClick={handleHomeButtonClick}
          className="h-11 w-full"
        />
      </div>
    </>
  );
};

export default Root;
