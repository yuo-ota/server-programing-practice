interface TextInputProps {
  label: string;
  placeholder: string;
  error: string;
  className?: string;
}

const TextInput = ({
  label,
  placeholder,
  error,
  className = '',
}: TextInputProps) => {
  return (
    <>
      {error === '' ? (
        <div className={`${className} min-w-24`}>
          <label className="text-subtitle">{label}</label>
          <input
            className="placeholder:text-placeholder text-foreground text-subtitle border-foreground ease focus:border-theme hover:border-foreground/(--hover-nega-opacity) w-full rounded-md border bg-transparent px-3 py-2 shadow-md transition duration-150 focus:shadow focus:outline-none"
            placeholder={placeholder}
          />
          <p className="text-subparagraph mx-2 min-h-5 break-all"></p>
        </div>
      ) : (
        <div className={`${className} min-w-24`}>
          <label className="text-subtitle">{label}</label>
          <input
            className="placeholder:text-placeholder text-foreground text-subtitle border-error ease focus:border-error flex w-full rounded-md border bg-transparent px-3 py-2 shadow-md transition duration-150 focus:shadow focus:outline-none"
            placeholder={placeholder}
          />
          <p className="text-subparagraph mx-2 min-h-5 break-all">
            <span className="text-error">{error}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default TextInput;
