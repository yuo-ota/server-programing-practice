interface CheckBoxProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText: string;
  className?: string;
}

const CheckBox = ({
  id,
  name,
  label,
  checked,
  onChange,
  helperText,
  className = '',
}: CheckBoxProps) => {
  return (
    <>
      <div className={`${className} flex flex-col items-start`}>
        <div className="flex h-5 items-center">
          <input
            name={name}
            type="checkbox"
            className="accent-theme h-4 w-4 cursor-pointer"
            id={id}
            checked={checked}
            onChange={onChange}
          />
          <label
            className="text-subtitle text-foreground ml-2 cursor-pointer"
            htmlFor={id}
          >
            {label}
          </label>
        </div>
        <p className="text-subtitle text-annotation mx-6 break-all">
          {helperText}
        </p>
      </div>
    </>
  );
};

export default CheckBox;
