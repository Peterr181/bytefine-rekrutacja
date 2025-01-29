import React from "react";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <button
      className="flex flex-col items-center p-[12px] bg-white-97 rounded-[10px] cursor-pointer w-[350px] h-[225px]"
      onClick={onClick}
    >
      <div className="flex-grow flex items-center justify-center">{icon}</div>
      <span className="text-black-100 font-medium mb-4">{label}</span>{" "}
    </button>
  );
};

export default ActionButton;
