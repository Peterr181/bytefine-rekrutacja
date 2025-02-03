import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ children, disabled, onClick }) => {
  return (
    <button
      className={clsx(
        "pt-[8px] pb-[8px] pr-[32px] pl-[32px] text-[15px] rounded-lg text-white font-medium transition-all duration-200 cursor-pointer",
        "bg-primary-50 hover:bg-[#550788] focus:ring-2 focus:ring-primary-50",
        "disabled:bg-[#CDCDCD] disabled:cursor-not-allowed"
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
