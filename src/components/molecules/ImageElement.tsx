import React from "react";
import { Rnd } from "react-rnd";
import dragIndicator from "../../assets/dragIndicator.svg";
import emptyCan from "../../assets/emptyCan.svg";
import useElementEditing from "../../hooks/useElementEditing";

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
  const {
    x,
    y,
    width,
    height,
    isEditing,
    setX,
    setY,
    setWidth,
    setHeight,
    setIsEditing,
  } = useElementEditing(initialX, initialY, initialWidth, initialHeight);

  return (
    <Rnd
      position={{ x, y }}
      size={{ width, height }}
      bounds="parent"
      enableResizing={{ bottomRight: true }}
      dragHandleClassName="drag-handle"
      className={`relative ${isEditing ? "border-2 border-primary-50" : ""}`}
      onDragStart={() => setIsEditing(true)}
      onDrag={(_e, d) => {
        setX(d.x);
        setY(d.y);
      }}
      onDragStop={(_e, d) => {
        setX(d.x);
        setY(d.y);
        onDragEnd(d.x, d.y);
      }}
      onResize={(_e, _direction, ref, _delta, position) => {
        setWidth(ref.offsetWidth);
        setHeight(ref.offsetHeight);
        setX(position.x);
        setY(position.y);
      }}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
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
          <div className="absolute -bottom-3 -right-3 w-5 h-5 bg-primary-50 border-2 border-white rounded-full" />
        )}
      </div>
    </Rnd>
  );
};

export default ImageElement;
