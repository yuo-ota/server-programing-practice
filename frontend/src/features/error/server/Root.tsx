import ErrorPage from '../components/ErrorPage';

const Root = () => {
  return (
    <>
      <ErrorPage
        statusCode={500}
        message="Server Error"
        details={[
          'サーバーでエラーが発生しました。',
          '時間をおいて再度アクセスしてください。',
        ]}
      />
    </>
  );
};

export default Root;
