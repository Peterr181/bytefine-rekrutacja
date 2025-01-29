import React, { useState, useRef } from "react";
import Toolbar from "../organisms/Toolbar";
import Canvas from "../organisms/Canvas";
import html2canvas from "html2canvas-pro";

const EditorPage: React.FC = () => {
  const [elements, setElements] = useState<
    {
      id: string;
      type: "text" | "image";
      content: string;
      x: number;
      y: number;
      isEditing?: boolean;
    }[]
  >([]);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addText = () => {
    setElements([
      ...elements,
      {
        id: Date.now().toString(),
        type: "text",
        content: "New Text",
        x: 100,
        y: 100,
        isEditing: true,
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

  const updateElementPosition = (id: string, x: number, y: number) => {
    setElements((prevElements) =>
      prevElements.map((el) => (el.id === id ? { ...el, x, y } : el))
    );
  };

  const handleExportToPNG = async () => {
    if (canvasRef.current) {
      const offScreenCanvas = canvasRef.current.cloneNode(
        true
      ) as HTMLDivElement;
      offScreenCanvas.style.width = "1080px";
      offScreenCanvas.style.height = "1350px";
      offScreenCanvas.style.position = "absolute";
      offScreenCanvas.style.top = "-9999px";
      document.body.appendChild(offScreenCanvas);

      try {
        const canvas = await html2canvas(offScreenCanvas, {
          width: 1080,
          height: 1350,
          useCORS: true,
        });

        const link = document.createElement("a");
        link.download = "canvas.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      } catch (error) {
        console.error("Error exporting canvas:", error);
      } finally {
        document.body.removeChild(offScreenCanvas);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex gap-6">
        <Canvas
          ref={canvasRef}
          elements={elements}
          backgroundImage={backgroundImage}
          onDeleteElement={handleDeleteElement}
          onUpdateElementPosition={updateElementPosition}
        />
        <Toolbar
          onAddText={addText}
          onAddImage={addImage}
          onSetBackgroundImage={setBackgroundImage}
          onExportToPNG={handleExportToPNG}
        />
      </div>
    </div>
  );
};

export default EditorPage;
