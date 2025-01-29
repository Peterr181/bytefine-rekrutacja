import React from "react";
import { Rnd } from "react-rnd";
import initialCanvasImage from "../../assets/initialCanvasImage.png";
import TextElement from "../molecules/TextElement"; // Import TextElement

interface CanvasProps {
  elements: {
    id: string;
    type: "text" | "image";
    content: string;
    x: number;
    y: number;
    isEditing?: boolean; // Add isEditing property
  }[];
  backgroundImage: string | null;
  onDeleteElement: (id: string) => void; // Add onDeleteElement prop
}

const Canvas: React.FC<CanvasProps> = ({
  elements,
  backgroundImage,
  onDeleteElement,
}) => {
  const handleUpdate = (id: string, newText: string, newColor: string) => {
    // Handle text update logic here
  };

  return (
    <div className="flex items-center justify-center">
      <div
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
              onUpdate={handleUpdate}
              onDelete={() => onDeleteElement(el.id)} // Call onDeleteElement
              isEditing={el.isEditing} // Pass isEditing property
            />
          ) : (
            <Rnd
              key={el.id}
              default={{ x: el.x, y: el.y, width: 200, height: 50 }}
            >
              <img
                src={el.content}
                alt="user upload"
                className="w-full h-full object-cover"
              />
            </Rnd>
          )
        )}
      </div>
    </div>
  );
};

export default Canvas;
