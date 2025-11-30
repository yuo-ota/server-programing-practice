import { useState } from 'react';
import CheckBox from './CheckBox';
import type { ReportOption } from '../interfaces/app/ReportOption';

interface ReportElementSelectProps {
  title: string;
  reportOptions: ReportOption[];
  className?: string;
}

const ReportElementSelect = ({
  title,
  reportOptions,
  className = '',
}: ReportElementSelectProps) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;

    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: checked,
    }));
  };

  return (
    <div className={`${className} space-y-4 p-10`}>
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
