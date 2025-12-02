interface ErrorDetailProps {
  statusCode: number;
  message: string;
  detail: string[];
}

const ErrorDetail = ({ statusCode, message, detail }: ErrorDetailProps) => {
  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <div>
          <h1 className="text-4xl">{`${statusCode} ${message}`}</h1>
        </div>
        <div className="text-center">
          {detail.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default ErrorDetail;
