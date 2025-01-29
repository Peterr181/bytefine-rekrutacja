import React, { forwardRef } from "react";
import initialCanvasImage from "../../assets/initialCanvasImage.png";
import TextElement from "../molecules/TextElement";
import ImageElement from "../molecules/ImageElement";

interface CanvasProps {
  elements: {
    id: string;
    type: "text" | "image";
    content: string;
    x: number;
    y: number;
    isEditing?: boolean;
  }[];
  backgroundImage: string | null;
  onDeleteElement: (id: string) => void;
  onUpdateElementPosition: (id: string, x: number, y: number) => void;
}

const Canvas = forwardRef<HTMLDivElement, CanvasProps>(
  (
    { elements, backgroundImage, onDeleteElement, onUpdateElementPosition },
    ref
  ) => {
    return (
      <div className="flex items-center justify-center">
        <div
          ref={ref}
          className="w-[759px] h-[800px] relative bg-gray-200"
          style={{
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : `url(${initialCanvasImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {elements.map((el) =>
            el.type === "text" ? (
              <TextElement
                key={el.id}
                id={el.id}
                text={el.content}
                x={el.x}
                y={el.y}
                width={200}
                height={50}
                onUpdate={() => {}}
                onDelete={onDeleteElement}
                isEditing={el.isEditing}
                onDragEnd={(x, y) => onUpdateElementPosition(el.id, x, y)}
              />
            ) : (
              <ImageElement
                key={el.id}
                id={el.id}
                src={el.content}
                x={el.x}
                y={el.y}
                width={200}
                height={200}
                onDelete={onDeleteElement}
                onDragEnd={(x, y) => onUpdateElementPosition(el.id, x, y)}
              />
            )
          )}
        </div>
      </div>
    );
  }
);

export default Canvas;
