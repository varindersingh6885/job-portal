interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: HTMLButtonElement["type"];
}

export const Button = ({ label, onClick, type = "button" }: ButtonProps) => {
  return (
    <button
      type={type}
      className="bg-ui-button-primary text-ui-button-text-primary px-5 py-2 rounded-lg cursor-pointer hover:bg-ui-button-primary-hover active:bg-ui-button-primary"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
