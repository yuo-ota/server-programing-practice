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
          statusCode={500}
          message="Server Error"
          detail={[
            'サーバーでエラーが発生しました。',
            '時間をおいて再度アクセスしてください。',
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
