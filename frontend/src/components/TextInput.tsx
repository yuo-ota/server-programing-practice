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
  const hasError = error !== '';
  const inputClassName =
    `placeholder:text-placeholder text-foreground text-subtitle ease w-full rounded-md border bg-transparent px-3 py-2 shadow-md transition duration-150 focus:shadow focus:outline-none ` +
    (hasError
      ? 'border-error focus:border-error'
      : 'border-foreground focus:border-theme hover:border-foreground/(--hover-nega-opacity)');
  return (
    <div className={`${className} min-w-24`}>
      <label className="text-subtitle">{label}</label>
      <input
        className={inputClassName}
        placeholder={placeholder}
      />
      <p className="text-subparagraph mx-2 min-h-5 break-all">
        {hasError && <span className="text-error">{error}</span>}
      </p>
    </div>
  );
};

export default TextInput;
