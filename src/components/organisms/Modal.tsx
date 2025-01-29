import React from "react";
import ReactDOM from "react-dom";
import closeIcon from "../../assets/closeIcon.svg";
import warningIcon from "../../assets/warningIcon.svg";
import Button from "../atoms/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onReset }) => {
  if (!isOpen) return null;

  const handleReset = () => {
    onReset();
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.75)] flex items-center justify-center">
      <div className="bg-white p-16 rounded relative flex flex-col items-center">
        <img
          src={closeIcon}
          alt="close icon"
          className="w-4 h-4 cursor-pointer absolute top-4 right-4"
          onClick={onClose}
        />
        <img
          src={warningIcon}
          alt="warning icon"
          className="w-[217px] h-[199px] mb-4"
        />
        <h2 className="text-[32px] text-black-100 font-bold mb-4">WARNING</h2>
        <p className="mb-4 text-black-75 font-medium text-center lg:w-[60%] w-full">
          You’re about to reset whole process. Are you sure you want to do it?
        </p>
        <div className="flex gap-3 items-center">
          <button className="cursor-pointer" onClick={onClose}>
            Cancel
          </button>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
