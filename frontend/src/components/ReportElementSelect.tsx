import CheckBox from './CheckBox';
import type { ReportOption } from '../interfaces/app/reportOption';

interface ReportElementSelectProps {
  title: string;
  reportOptions: ReportOption[];
  checkedItems: Record<string, boolean>;
  setCheckedItems: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  className?: string;
}

const ReportElementSelect = ({
  title,
  reportOptions,
  checkedItems,
  setCheckedItems,
  className = '',
}: ReportElementSelectProps) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;

    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: checked,
    }));
  };

  return (
    <div className={`${className} space-y-4`}>
      <h2 className="text-title text-foreground">{title}</h2>

      <div className="space-y-4">
        {reportOptions.map((option) => (
          <CheckBox
            key={option.id}
            id={option.id}
            name={option.name}
            label={option.label}
            helperText={option.helperText}
            checked={!!checkedItems[option.id]}
            onChange={handleCheckboxChange}
            className=""
          />
        ))}
      </div>
    </div>
  );
};
export default ReportElementSelect;
