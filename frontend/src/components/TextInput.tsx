interface TextInputProps {
  displayStatus: 'normal' | 'disabled';
  type?: string;
  label: string;
  placeholder: string;
  prefix: string;
  error?: string;
  isUnroundedLeft: boolean;
  id: string;
  value: string;
  isSNSInput?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
}

const TextInput = ({
  displayStatus,
  type = 'text',
  label,
  placeholder,
  prefix,
  error,
  isUnroundedLeft,
  id,
  value,
  isSNSInput = false,
  onChange,
  onBlur,
  className = '',
}: TextInputProps) => {
  return (
    <div className={`${className} flex min-w-24 flex-col`}>
      <label htmlFor={id} className="text-subtitle flex-none">
        {label}
      </label>
      <div
        className={`relative flex w-full flex-1 cursor-pointer items-center justify-start border bg-transparent transition duration-150 focus:shadow focus:outline-none ${
          error
            ? 'border-error focus-within:border-error'
            : 'border-foreground [&:not(:focus-within)]:hover:border-foreground/(--hover-nega-opacity) focus-within:border-theme'
        } ${isUnroundedLeft ? 'rounded-r-lg' : 'rounded-lg'}`}
      >
        <label
          className="text-annotation text-body absolute top-0 inline-block flex-none cursor-pointer pl-1"
          htmlFor={id}
        >
          {prefix}
        </label>
        <input
          id={id}
          className={`placeholder:text-placeholder text-foreground text-subtitle ease h-full flex-1 pl-1 outline-none ${prefix && `pt-1`} ${displayStatus == 'disabled' && `pointer-events-none cursor-not-allowed`} ${isUnroundedLeft ? 'rounded-r-lg' : 'rounded-lg'}`}
          value={value}
          onChange={displayStatus == 'disabled' ? () => {} : onChange}
          onBlur={displayStatus == 'disabled' ? () => {} : onBlur}
          placeholder={placeholder}
          type={type}
        />
      </div>
      {!isSNSInput && (
        <p className="text-subparagraph mx-2 min-h-5 flex-none break-all">
          {error && <span className="text-error">{error}</span>}
        </p>
      )}
    </div>
  );
};

export default TextInput;
