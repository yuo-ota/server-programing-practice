interface TextAreaProps {
  label: string;
  placeholder: string;
  limit?: number;
  id: string;
  value: string;
  setHasError?: (hasError: boolean) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const TextArea = ({
  label,
  placeholder,
  limit,
  id,
  value,
  setHasError = () => {},
  onChange,
  onBlur,
  className = '',
}: TextAreaProps) => {
  const formatText = (inputText?: string): string => {
    return inputText || '';
  };

  const textLength = (inputText?: string): number => {
    return formatText(inputText).length;
  };

  const isValidLength = (limit?: number, inputText?: string): boolean => {
    if (!limit) {
      setHasError(false);
      return true;
    }
    const isValid = textLength(inputText) <= limit;
    setHasError(!isValid);
    return isValid;
  };

  return (
    <div className={`${className} min-w-24`}>
      <div className="flex min-h-5 flex-none items-end justify-between">
        <label htmlFor={id} className="text-subtitle">
          {label}
        </label>
        {limit && (
          <span className="text-body text-annotation mx-2 text-right">
            {textLength(value)} / {limit}
          </span>
        )}
      </div>
      <textarea
        id={id}
        className={`placeholder:text-placeholder text-foreground text-subtitle ease h-[180px] w-full resize-none rounded-md border bg-transparent px-3 py-2 shadow-md transition duration-150 focus:shadow focus:outline-none ${
          isValidLength(limit, value)
            ? 'border-foreground focus:border-theme hover:border-foreground/(--hover-nega-opacity)'
            : 'border-error focus:border-error'
        }`}
        placeholder={placeholder}
        value={formatText(value)}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default TextArea;
