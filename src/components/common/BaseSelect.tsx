import Select, { SingleValue } from "react-select";
import { baseSelectStyles } from "../../styles/selectStyles";

interface BaseOption<T> {
  value: T;
  label: string;
}

interface BaseSelectProps<T> {
  value: T;
  onChange: (value: T) => void;
  options: BaseOption<T>[];
  placeholder?: string;
}

export default function BaseSelect<T>({
  value,
  onChange,
  options,
  placeholder,
}: BaseSelectProps<T>) {
  const selectedOption = options.find((o) => o.value === value);

  const handleChange = (selected: SingleValue<BaseOption<T>>) => {
    if (selected) {
      onChange(selected.value);
    }
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      styles={baseSelectStyles}
      isSearchable={false}
      placeholder={placeholder}
      menuPlacement="auto"
    />
  );
}
