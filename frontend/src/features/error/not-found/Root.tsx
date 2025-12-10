import ErrorPage from '../components/ErrorPage';

const Root = () => {
  return (
    <>
      <ErrorPage
        statusCode={404}
        message="Not Found"
        details={[
          '指定されたパスは存在しません。',
          'URLを確認の上、再度アクセスしてください。',
        ]}
      />
    </>
  );
};

export default Root;
