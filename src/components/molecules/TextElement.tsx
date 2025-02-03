import React, { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import dragIndicator from "../../assets/dragIndicator.svg";
import emptyCan from "../../assets/emptyCan.svg";
import { ResizeDirection } from "re-resizable";
import { useDispatch } from "react-redux";
import { updateElementContent } from "../../redux/slices/editorSlice";
import useElementEditing from "../../hooks/useElementEditing";
import TextColor from "../atoms/TextColor";

interface TextElementProps {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  onDelete: (id: string) => void;
  isEditing?: boolean;
  onDragEnd: (x: number, y: number) => void;
  opacity?: number;
}

const TextElement: React.FC<TextElementProps> = ({
  id,
  text,
  x: initialX,
  y: initialY,
  width: initialWidth,
  height: initialHeight,
  onDelete,
  onDragEnd,
  opacity: initialOpacity = 1,
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

  const [color, setColor] = useState("#353535");
  const [value, setValue] = useState(text);
  const [isResizing, setIsResizing] = useState(false);
  const [fontSize, setFontSize] = useState(32);
  const [opacity, setOpacity] = useState(initialOpacity);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const colorButtonRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  useEffect(() => {
    if (!isEditing && value === "Type your text here") {
      setOpacity(0.25);
    } else {
      setOpacity(1);
    }
  }, [isEditing, value]);

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (
      !isResizing &&
      !colorButtonRef.current?.contains(e.relatedTarget as Node)
    ) {
      setIsEditing(false);
      dispatch(updateElementContent({ id, content: value, color }));
    }
  };

  const handleResizeStart = () => {
    setIsResizing(true);
  };

  const handleResize = (
    _e: MouseEvent | TouchEvent,
    _direction: ResizeDirection,
    ref: HTMLElement
  ) => {
    const newWidth = ref.offsetWidth;
    const newHeight = ref.offsetHeight;
    const newFontSize = Math.min(newWidth, newHeight) / 2;
    setFontSize(newFontSize);
    setWidth(newWidth);
    setHeight(newHeight);
  };

  return (
    <Rnd
      position={{ x, y }}
      size={{ width, height }}
      bounds="parent"
      enableResizing={{ bottomRight: true }}
      dragHandleClassName="drag-handle"
      className={`relative ${isEditing ? "border-2 border-primary-50" : ""}`}
      onDrag={(_e, d) => {
        setX(d.x);
        setY(d.y);
      }}
      onDragStop={(_e, d) => {
        setX(d.x);
        setY(d.y);
        onDragEnd(d.x, d.y);
      }}
      onResizeStart={handleResizeStart}
      onResize={(
        e: MouseEvent | TouchEvent,
        direction: ResizeDirection,
        ref
      ) => {
        handleResize(e, direction, ref);
      }}
      onResizeStop={(
        e: MouseEvent | TouchEvent,
        direction: ResizeDirection,
        ref,
        _delta,
        position
      ) => {
        setIsResizing(false);
        handleResize(e, direction, ref);
        setX(position.x);
        setY(position.y);
        dispatch(updateElementContent({ id, content: value, color }));
      }}
    >
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
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onClick={() => {
            onDelete(id);
          }}
          className="absolute -top-4 -right-4 bg-white p-1 rounded-full shadow cursor-pointer"
        >
          <img src={emptyCan} alt="delete icon" className="w-4 h-4" />
        </button>
      )}
      {isEditing ? (
        <textarea
          ref={inputRef}
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              setIsEditing(false);
              dispatch(updateElementContent({ id, content: value, color }));
            }
          }}
          className={`w-full h-full border-none outline-none resize-none font-bold text-center break-words whitespace-pre-wrap ${
            value === "Type your text here" ? "opacity-25" : "opacity-100"
          }`}
          style={{ color, fontSize: `${fontSize}px` }}
        />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center font-bold text-center break-words whitespace-pre-wrap ${
            opacity === 0.25 ? "opacity-25" : "opacity-100"
          }`}
          onDoubleClick={() => setIsEditing(true)}
          style={{ color, fontSize: `${fontSize}px` }}
          draggable={false}
        >
          {value}
        </div>
      )}
      {isEditing && (
        <div
          ref={colorButtonRef}
          className="absolute -bottom-8 left-2 flex gap-2"
        >
          {["#353535", "white", "red", "blue", "green"].map((c) => (
            <TextColor
              key={c}
              color={c}
              selectedColor={color}
              onSelect={setColor}
              onMouseDown={(e) => e.preventDefault()}
            />
          ))}
        </div>
      )}
      {isEditing && (
        <div
          className="absolute -bottom-3 -right-3 w-5 h-5 bg-primary-50 border-2 border-white rounded-full"
          onMouseDown={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
        />
      )}
    </Rnd>
  );
};

export default TextElement;
