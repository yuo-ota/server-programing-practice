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
          statusCode={404}
          message="Not Found"
          detail={[
            '指定されたパスは存在しません。',
            'URLを確認の上、再度アクセスしてください。',
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
