import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toolbar from "../organisms/Toolbar";
import Canvas from "../organisms/Canvas";
import { RootState } from "../../redux/store";
import {
  resetElements,
  setBackgroundImage,
} from "../../redux/slices/editorSlice";
import useExportToPNG from "../../hooks/useExportToPNG";

const EditorPage: React.FC = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state: RootState) => state.editor.elements);
  const backgroundImage = useSelector(
    (state: RootState) => state.editor.backgroundImage
  );
  const canvasRef = useRef<HTMLDivElement>(null);
  const handleExportToPNG = useExportToPNG(canvasRef);

  const handleReset = () => {
    dispatch(resetElements());
    dispatch(setBackgroundImage(null));
  };

  return (
    <div className="flex justify-center items-center lg:h-screen h-full">
      <div className="flex gap-6 lg:flex-row flex-col">
        <Canvas
          ref={canvasRef}
          elements={elements}
          backgroundImage={backgroundImage}
        />
        <Toolbar onExportToPNG={handleExportToPNG} onReset={handleReset} />
      </div>
    </div>
  );
};

export default EditorPage;
