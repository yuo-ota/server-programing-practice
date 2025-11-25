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
        <div className="flex items-center h-5" >
          <input name={name} type="checkbox" className="cursor-pointer w-4 h-4 accent-theme" id={id} checked={checked} onChange={onChange}/>
          <label className="cursor-pointer ml-2 text-subtitle text-foreground" htmlFor={id}>{label}</label>
        </div>
        <p className="text-subtitle mx-6 text-annotation break-all">{helperText}</p>
      </div>
    </>
  );
};

export default CheckBox;