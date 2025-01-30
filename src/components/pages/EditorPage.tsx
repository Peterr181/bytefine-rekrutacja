import React, { useState, useRef } from "react";
import Toolbar from "../organisms/Toolbar";
import Canvas from "../organisms/Canvas";
import html2canvas from "html2canvas-pro";

declare global {
  interface Window {
    showSaveFilePicker?: () => Promise<FileSystemFileHandle>;
  }
}

const EditorPage: React.FC = () => {
  const [elements, setElements] = useState<
    {
      id: string;
      type: "text" | "image";
      content: string;
      x: number;
      y: number;
      isEditing?: boolean;
      opacity?: number;
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
        content: "Type your text here",
        x: 100,
        y: 100,
        isEditing: true,
        opacity: 0.25,
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

        document.body.removeChild(offScreenCanvas);

        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob((blob) => resolve(blob), "image/png")
        );

        if (!blob) {
          console.error("Failed to create image blob.");
          return;
        }

        if ("showSaveFilePicker" in window) {
          try {
            const fileHandle = await (
              window as unknown as {
                showSaveFilePicker: (options: {
                  suggestedName: string;
                  types: {
                    description: string;
                    accept: { [mimeType: string]: string[] };
                  }[];
                }) => Promise<FileSystemFileHandle>;
              }
            ).showSaveFilePicker({
              suggestedName: "canvas.png",
              types: [
                {
                  description: "PNG Image",
                  accept: {
                    "image/png": [".png"],
                  },
                },
              ],
            });

            const writable = await fileHandle.createWritable();
            await writable.write(blob);
            await writable.close();
            return;
          } catch (pickerError) {
            console.warn("User canceled file save dialog.", pickerError);
            return;
          }
        }

        // Fallback: Automatic download (Firefox & unsupported browsers)
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = "canvas.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Error exporting canvas:", error);
      }
    }
  };

  const handleReset = () => {
    setElements([]);
    setBackgroundImage(null);
  };

  return (
    <div className="flex justify-center items-center lg:h-screen h-full">
      <div className="flex gap-6 lg:flex-row flex-col">
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
          onReset={handleReset}
        />
      </div>
    </div>
  );
};

export default EditorPage;
