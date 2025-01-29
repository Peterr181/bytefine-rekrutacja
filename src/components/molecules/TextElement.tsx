import React, { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import dragIndicator from "../../assets/dragIndicator.svg";
import emptyCan from "../../assets/emptyCan.svg";

interface TextElementProps {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  onUpdate: (id: string, newText: string, newColor: string) => void;
  onDelete: (id: string) => void;
  isEditing?: boolean; // Add isEditing prop
}

const TextElement: React.FC<TextElementProps> = ({
  id,
  text,
  x,
  y,
  width,
  height,
  onUpdate,
  onDelete,
  isEditing: initialIsEditing = false, // Use initialIsEditing for initial state
}) => {
  const [isEditing, setIsEditing] = useState(initialIsEditing);
  const [color, setColor] = useState("#353535");
  const [value, setValue] = useState(text);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  return (
    <Rnd
      default={{ x, y, width, height }}
      bounds="parent"
      enableResizing={{ bottomRight: true }}
      className={`relative ${isEditing ? "border-2 border-purple-500" : ""}`}
    >
      {/* Drag Icon */}
      {isEditing && (
        <div className="absolute -top-4 -left-4 cursor-move p-1 bg-white rounded-full shadow">
          <img src={dragIndicator} alt="drag indicator" className="w-4 h-4" />
        </div>
      )}

      {/* Delete Icon */}
      {isEditing && (
        <button
          onClick={() => onDelete(id)}
          className="absolute -top-4 -right-4 bg-white p-1 rounded-full shadow cursor-pointer"
        >
          <img src={emptyCan} alt="delete icon" className="w-4 h-4" />
        </button>
      )}

      {/* Editable Text */}
      {isEditing ? (
        <textarea
          ref={inputRef}
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => {
            onUpdate(id, value, color);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              setIsEditing(false);
              onUpdate(id, value, color);
            }
          }}
          className="w-full h-full border-none text-center outline-none resize-none font-bold text-[32px]"
          style={{ color, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center font-bold text-[32px]"
          onDoubleClick={() => setIsEditing(true)} // Change to onDoubleClick
          style={{ color, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {value}
        </div>
      )}

      {/* Color Picker */}
      {isEditing && (
        <div className="absolute -bottom-8 left-2 flex gap-2">
          {["#353535", "white", "red", "blue", "green"].map((c) => (
            <button
              key={c}
              className={`w-5 h-5 rounded-full border ${
                color === c ? "border-2 border-gray-500" : ""
              }`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      )}

      {/* Resize Handle (Purple Circle) */}
      {isEditing && (
        <div className="absolute -bottom-3 -right-3 w-5 h-5 bg-purple-600 border-2 border-white rounded-full" />
      )}
    </Rnd>
  );
};

export default TextElement;
