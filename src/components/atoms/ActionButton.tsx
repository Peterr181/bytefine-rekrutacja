import React from "react";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`
        flex flex-col items-center p-[12px] rounded-[10px] cursor-pointer w-[350px] h-[225px]
        bg-[#F7F7F8] transition-all
        hover:bg-black/25 
        focus:outline-none focus:ring-2 focus:ring-primary-50 focus:bg-white-97
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      onClick={onClick}
      disabled={disabled}
    >
      <div
        className={`flex-grow flex items-center justify-center ${
          disabled ? "opacity-50" : ""
        }`}
      >
        {icon}
      </div>
      <span className="text-black-100 font-medium mb-4">{label}</span>
    </button>
  );
};

export default ActionButton;
