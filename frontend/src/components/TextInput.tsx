interface TextInputProps {
  label: string;
  placeholder: string;
  error?: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
}

const TextInput = ({
  label,
  placeholder,
  error,
  id,
  className = '',
}: TextInputProps) => {
  return (
    <div className={`${className} min-w-24`}>
      <label htmlFor={id} className="text-subtitle">
        {label}
      </label>
      <input
        id={id}
        className={
          `placeholder:text-placeholder text-foreground text-subtitle ease w-full rounded-md border bg-transparent px-3 py-2 shadow-md transition duration-150 focus:shadow focus:outline-none ` +
          (error
            ? 'border-error focus:border-error'
            : 'border-foreground focus:border-theme hover:border-foreground/(--hover-nega-opacity)')
        }
        placeholder={placeholder}
      />
      <p className="text-subparagraph mx-2 min-h-5 break-all">
        {error && <span className="text-error">{error}</span>}
      </p>
    </div>
  );
};

export default TextInput;
