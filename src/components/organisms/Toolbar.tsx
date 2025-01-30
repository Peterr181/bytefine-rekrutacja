import React, { useState } from "react";
import AddContent from "../molecules/AddContent";
import canvasLogo from "../../assets/canvasLogo.svg";
import resetIcon from "../../assets/resetIcon.svg";
import Button from "../atoms/Button";
import Modal from "./Modal";

interface ToolbarProps {
  onAddText: () => void;
  onAddImage: (image: string) => void;
  onSetBackgroundImage: (image: string) => void;
  onExportToPNG: () => void;
  onReset: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onAddText,
  onAddImage,
  onSetBackgroundImage,
  onExportToPNG,
  onReset,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleReset = () => {
    onReset();
    toggleModal();
  };

  return (
    <div className=" bg-white rounded-lg w-full flex flex-col justify-between h-[800px]">
      <div>
        <div className="flex justify-between flex-col lg:flex-row items-center border-b border-white-98 pb-3">
          <div className="flex items-center gap-3 mb-6">
            <img
              src={canvasLogo}
              alt="canvas logo image"
              className="w-[48px] h-[48px]"
            />
            <h1 className="text-[32px] text-black-75 font-bold">
              CanvasEditor
            </h1>
          </div>
          <div
            className="flex items-center gap-3  cursor-pointer border-b border-b-[#CB0000] pb-[4px]"
            onClick={toggleModal}
          >
            <span className="text-[#CB0000] font-medium">Reset</span>
            <img
              src={resetIcon}
              alt="reset icon"
              className="w-[24px] h-[22px]"
            />
          </div>
          {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              onClose={toggleModal}
              onReset={handleReset}
            />
          )}
        </div>
        <div className="bg-gray-100 rounded-[10px] p-[16px] mt-6 mb-9">
          <h2 className="text-lg text-black-100  font-bold">Add content</h2>
        </div>
        <div className="border-b border-white-98 pb-15">
          <AddContent
            onAddText={onAddText}
            onAddImage={onAddImage}
            onSetBackgroundImage={onSetBackgroundImage}
          />
        </div>
      </div>
      <div className="flex lg:justify-end justify-center pt-8 lg:pt-0 pb-8 lg:pb-0">
        <Button onClick={onExportToPNG}>Export to PNG</Button>
      </div>
    </div>
  );
};

export default Toolbar;
