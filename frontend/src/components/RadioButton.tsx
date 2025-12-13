interface RadioButtonProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const RadioButton = ({
  id,
  name,
  label,
  checked,
  disabled = true,
  onChange,
  className = '',
}: RadioButtonProps) => {
  return (
    <div className={`${className} inline-flex items-center`}>
      <label className="relative flex cursor-pointer items-center">
        <input
          name={name}
          type="radio"
          className="peer checked:border-theme h-[17px] w-[17px] cursor-pointer appearance-none rounded-full border border-slate-300 transition-all"
          id={id}
          disabled={disabled}
          checked={checked}
          onChange={onChange}
        />
        <span className="bg-theme absolute top-1/2 left-1/2 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 transform rounded-full opacity-0 transition-opacity duration-200 peer-checked:opacity-100"></span>
      </label>
      <label
        className="text-foreground text-subtitle ml-2 cursor-pointer"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
