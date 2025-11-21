import LikeButton from "../features/posts/components/LikeButton";

interface RadioButtonProps {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const RadioButton = ({
  id,
  name,
  value,
  label,
  checked,
  onChange,
  className = '',
}: RadioButtonProps) => {
  return (
    <div className="flex gap-10">
      <div className="inline-flex items-center">
        <label className="relative flex items-center cursor-pointer" htmlFor={id}>
          <input
            name={name}
            type="radio"
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-theme transition-all"
            id={id}
            checked={checked}
            onChange={onChange}
          />
          <span className="absolute bg-theme w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
        </label>
        <label className="ml-2 text-foreground cursor-pointer text-subtitle">{label}</label>
      </div>
    </div>
  )
}

export default RadioButton;