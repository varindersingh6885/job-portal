import {
  DeepMap,
  FieldError,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { UseFormRegister } from "react-hook-form";

interface TextInputProps {
  label?: string;
  placeholder?: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rules?: RegisterOptions;
  errorMessage?: DeepMap<FieldValues, FieldError>;
  isRequired?: boolean;
  rows?: number;
}

export const TextArea = ({
  name,
  label,
  onChange,
  placeholder,
  register,
  rules,
  errorMessage,
  isRequired,
  rows = 4,
}: TextInputProps) => {
  return (
    <div>
      <div className="flex flex-col gap-1">
        {label ? (
          <label htmlFor={name}>
            {label}

            {isRequired ? <span className="text-ui-text-danger">*</span> : null}
          </label>
        ) : null}
        <textarea
          id={name}
          className="border border-1 border-solid border-ui-input-primary rounded-[4px] p-2 w-full outline-none resize-none "
          placeholder={placeholder}
          {...register(name, {
            ...rules,
            onChange,
          })}
          rows={rows}
        />
      </div>
      {!!errorMessage?.message && (
        <p className="text-ui-text-danger text-sm">{errorMessage.message}</p>
      )}
    </div>
  );
};
