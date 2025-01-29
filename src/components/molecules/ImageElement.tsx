import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import dragIndicator from "../../assets/dragIndicator.svg";
import emptyCan from "../../assets/emptyCan.svg";

interface ImageElementProps {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  onDelete: (id: string) => void;
  onDragEnd: (x: number, y: number) => void;
}

const ImageElement: React.FC<ImageElementProps> = ({
  id,
  src,
  x: initialX,
  y: initialY,
  width: initialWidth,
  height: initialHeight,
  onDelete,
  onDragEnd,
}) => {
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEditing]);

  return (
    <Rnd
      position={{ x, y }}
      size={{ width, height }}
      bounds="parent"
      enableResizing={{ bottomRight: true }}
      dragHandleClassName="drag-handle"
      className={`relative ${isEditing ? "border-2 border-purple-500" : ""}`}
      onDragStart={() => setIsEditing(true)}
      onDrag={(e, d) => {
        setX(d.x);
        setY(d.y);
      }}
      onDragStop={(e, d) => {
        setX(d.x);
        setY(d.y);
        onDragEnd(d.x, d.y);
      }}
      onResize={(e, direction, ref, delta, position) => {
        setWidth(ref.offsetWidth);
        setHeight(ref.offsetHeight);
        setX(position.x);
        setY(position.y);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setWidth(ref.offsetWidth);
        setHeight(ref.offsetHeight);
        setX(position.x);
        setY(position.y);
      }}
    >
      <div>
        {isEditing && (
          <div
            className="absolute -top-4 -left-4 cursor-move p-1 bg-white rounded-full shadow drag-handle"
            onMouseDown={(e) => e.preventDefault()}
          >
            <img src={dragIndicator} alt="drag indicator" className="w-4 h-4" />
          </div>
        )}

        {isEditing && (
          <button
            onClick={() => onDelete(id)}
            className="absolute -top-4 -right-4 bg-white p-1 rounded-full shadow cursor-pointer"
          >
            <img src={emptyCan} alt="delete icon" className="w-4 h-4" />
          </button>
        )}

        <img
          src={src}
          alt="user upload"
          className="w-full h-full object-cover"
          draggable={false}
          onDoubleClick={() => setIsEditing(true)}
        />

        {isEditing && (
          <div className="absolute -bottom-3 -right-3 w-5 h-5 bg-purple-600 border-2 border-white rounded-full" />
        )}
      </div>
    </Rnd>
  );
};

export default ImageElement;
