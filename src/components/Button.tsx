import { FC, ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-100 py-1 px-4 rounded-full text-xs hover:bg-blue-300 font-medium text-blue-800 border border-blue-500"
    >
      {children}
    </button>
  );
};

export default Button;
