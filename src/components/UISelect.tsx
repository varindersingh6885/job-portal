import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
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
  control: Control<FieldValues>;
  name: string;
  rules?: RegisterOptions;
  isRequired?: boolean;
}

export interface UISelectItem {
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
  control,
  name,
  rules,
  isRequired,
}: UISelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm">
          {label}
          {isRequired ? <span className="text-ui-text-danger">*</span> : null}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={{
          ...rules,
          onChange: (e) => {
            onChange?.(e.target.value);
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <div key={new Date().getTime()}>
              <Select
                placeholder={placeholder}
                defaultValue={value}
                isMulti={isMulti}
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={onChange}
              />
              {!!error?.message && (
                <p className="text-ui-text-danger text-xs">{error.message}</p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};
