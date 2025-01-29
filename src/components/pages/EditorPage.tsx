import React, { useState } from "react";
import Toolbar from "../organisms/Toolbar";
import Canvas from "../organisms/Canvas";

const EditorPage: React.FC = () => {
  const [elements, setElements] = useState<
    {
      id: string;
      type: "text" | "image";
      content: string;
      x: number;
      y: number;
    }[]
  >([]);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  const addText = () => {
    setElements([
      ...elements,
      {
        id: Date.now().toString(),
        type: "text",
        content: "New Text",
        x: 100,
        y: 100,
      },
    ]);
  };

  const addImage = (image: string) => {
    setElements([
      ...elements,
      {
        id: Date.now().toString(),
        type: "image",
        content: image,
        x: 100,
        y: 100,
      },
    ]);
  };

  const handleDeleteElement = (id: string) => {
    setElements((prevElements) => prevElements.filter((el) => el.id !== id));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex gap-6">
        <Canvas
          elements={elements}
          backgroundImage={backgroundImage}
          onDeleteElement={handleDeleteElement}
        />
        <Toolbar
          onAddText={addText}
          onAddImage={addImage}
          onSetBackgroundImage={setBackgroundImage}
        />
      </div>
    </div>
  );
};

export default EditorPage;
