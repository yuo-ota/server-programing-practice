interface ErrorDetailProps {
  statusCode: number;
  message: string;
  details: string[];
}

const ErrorDetail = ({ statusCode, message, details }: ErrorDetailProps) => {
  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <div>
          <h1 className="text-4xl">{`${statusCode} ${message}`}</h1>
        </div>
        <div className="text-center">
          {details.map((line, index) => (
            <p key={`${line}-${index}`}>{line}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default ErrorDetail;
