import ErrorPage from '../components/ErrorPage';

const Root = () => {
  return (
    <>
      <ErrorPage
        statusCode={401}
        message="Unauthorized"
        details={[
          '認証情報が不足しています。',
          'ログイン後、再度アクセスしてください。',
        ]}
      />
    </>
  );
};

export default Root;
