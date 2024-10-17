interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: HTMLButtonElement["type"];
  disabled?: boolean;
}

export const Button = ({
  label,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`bg-ui-button-primary text-ui-button-text-primary px-5 py-2 rounded-lg cursor-pointer  active:bg-ui-button-primary ${
        disabled
          ? "opacity-70 cursor-default"
          : "hover:bg-ui-button-primary-hover"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
