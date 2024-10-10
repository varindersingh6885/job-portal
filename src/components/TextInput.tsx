interface TextInputProps {
  label?: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: HTMLInputElement["type"];
}

export const TextInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  type = "text",
}: TextInputProps) => {
  return (
    <div>
      {label ? <label htmlFor="inputField">{label}</label> : null}
      <input
        id={name}
        className="border-1 border-solid border-2 border-black rounded-md p-2 w-full"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        type={type}
      />
    </div>
  );
};
