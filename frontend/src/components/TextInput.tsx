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
  onChange,
  onBlur,
  className = '',
}: TextInputProps) => {
  return (
    <div className={`${className} min-h-11 min-w-24`}>
      <label htmlFor={id} className="text-subtitle h-full">
        {label}
      </label>
      <div
        className={`flex h-full w-full cursor-pointer items-center justify-start border bg-transparent transition duration-150 focus:shadow focus:outline-none ${
          error
            ? 'border-error focus:border-error'
            : 'border-foreground focus:border-theme hover:border-foreground/(--hover-nega-opacity)'
        } ${isUnroundedLeft ? 'rounded-r-lg' : 'rounded-lg'}`}
      >
        <label
          className="text-foreground text-body block flex-none cursor-pointer pl-3"
          htmlFor={id}
        >
          {prefix}
        </label>
        <input
          id={id}
          className={`placeholder:text-placeholder text-foreground text-subtitle ease -ml-3 h-full flex-1 pl-3 outline-none ${displayStatus == 'disabled' && `pointer-events-none cursor-not-allowed`} ${isUnroundedLeft ? 'rounded-r-lg' : 'rounded-lg'}`}
          value={value}
          onChange={displayStatus == 'disabled' ? () => {} : onChange}
          onBlur={displayStatus == 'disabled' ? () => {} : onBlur}
          placeholder={placeholder}
          type={type}
        />
      </div>
      <p className="text-subparagraph mx-2 min-h-5 break-all">
        {error && <span className="text-error">{error}</span>}
      </p>
    </div>
  );
};

export default TextInput;
