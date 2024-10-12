import Select, { MultiValue, SingleValue } from "react-select";

interface UISelectProps {
  label?: string;
  placeholder?: string;
  defaultValue?: UISelectItem;
  options: UISelectItem[];
  isMulti?: boolean;
  onChange?: (
    value: MultiValue<UISelectItem> | SingleValue<UISelectItem>
  ) => void;
}

interface UISelectItem {
  value: string | number;
  label: string;
}

export const UISelect = ({
  defaultValue,
  options,
  isMulti = false,
  onChange,
  label,
  placeholder,
}: UISelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <Select
        placeholder={placeholder}
        defaultValue={defaultValue}
        isMulti={isMulti}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={onChange}
      />
    </div>
  );
};
