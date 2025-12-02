import { useNavigate } from 'react-router';
import TransitionButton from '../../../components/TransitionButton';
import ErrorDetail from './ErrorDetail';

interface ErrorPageProps {
  statusCode: number;
  message: string;
  details: string[];
}

const ErrorPage = ({ statusCode, message, details }: ErrorPageProps) => {
  const navigate = useNavigate();

  const handleHomeButtonClick = () => {
    navigate('/');
  };

  return (
    <>
      <div className="flex flex-col items-center gap-12">
        <ErrorDetail
          statusCode={statusCode}
          message={message}
          details={details}
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

export default ErrorPage;
