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
  type?: HTMLInputElement["type"];
  rules?: RegisterOptions;
  errorMessage?: DeepMap<FieldValues, FieldError>;
}

export const TextInput = ({
  name,
  label,
  onChange,
  placeholder,
  type = "text",
  register,
  rules,
  errorMessage,
}: TextInputProps) => {
  return (
    <div>
      <div className="flex flex-col gap-1">
        {label ? <label htmlFor={name}>{label}</label> : null}
        <input
          id={name}
          className="border border-1 border-solid border-ui-input-primary rounded-[4px] p-2 w-full outline-none"
          placeholder={placeholder}
          type={type}
          {...register(name, {
            ...rules,
            onChange,
          })}
        />
      </div>
      {!!errorMessage?.message && (
        <p className="text-ui-text-danger text-sm">{errorMessage.message}</p>
      )}
    </div>
  );
};
