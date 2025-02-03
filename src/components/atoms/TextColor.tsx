import React from "react";

interface TextColorProps {
  color: string;
  selectedColor: string;
  onSelect: (color: string) => void;
  onMouseDown: (e: React.MouseEvent) => void;
}

const TextColor: React.FC<TextColorProps> = ({
  color,
  selectedColor,
  onSelect,
  onMouseDown,
}) => {
  const isSelected = selectedColor === color;

  return (
    <div
      className={`relative w-7 h-7 rounded-full flex items-center justify-center cursor-pointer ${
        isSelected ? "outline-2 outline-white" : ""
      }`}
      style={{
        overflow: "hidden",
        padding: isSelected ? "2px" : "0",
      }}
      onClick={() => onSelect(color)}
      onMouseDown={onMouseDown}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          backgroundColor: color,
        }}
      />
    </div>
  );
};

export default TextColor;
