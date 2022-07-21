import { SelectDropdownInterface } from './SelectDropdown.interface';

const SelectDropdown = ({
  handleSelectChange,
  defaultValue,
  title,
  options,
}: {
  handleSelectChange: () => void;
  defaultValue: string | number;
  title: string;
  options: Array<SelectDropdownInterface>;
}) => {
  return (
    <label className="tw-text-sm tw-flex tw-flex-col tw-text-left">
      {title}
      <select defaultValue={defaultValue} onChange={handleSelectChange}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default SelectDropdown;
