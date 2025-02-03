import React, { useRef } from "react";
import bgImage from "../../assets/bgImage.svg";
import photoImage from "../../assets/photoImage.svg";
import textImage from "../../assets/textImage.svg";
import ActionButton from "../atoms/ActionButton";

interface AddContentProps {
  onAddText: () => void;
  onAddImage: (image: string) => void;
  onSetBackgroundImage: (image: string) => void;
}

const AddContent: React.FC<AddContentProps> = ({
  onAddText,
  onAddImage,
  onSetBackgroundImage,
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const bgImageInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    callback: (image: string) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      callback(URL.createObjectURL(file));
    }
  };

  const renderFileInput = (
    ref: React.RefObject<HTMLInputElement>,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    icon: string,
    label: string,
    onClick: () => void
  ) => (
    <label className="cursor-pointer">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={ref}
        onChange={onChange}
      />
      <ActionButton
        icon={<img src={icon} className="w-[96px] h-[96px]" alt={label} />}
        label={label}
        onClick={onClick}
      />
    </label>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <ActionButton
        icon={<img src={textImage} className="w-[96px] h-[96px]" alt="text" />}
        label="Text"
        onClick={onAddText}
      />
      {renderFileInput(
        imageInputRef,
        (e) => handleFileUpload(e, onAddImage),
        photoImage,
        "Image",
        () => imageInputRef.current?.click()
      )}
      {renderFileInput(
        bgImageInputRef,
        (e) => handleFileUpload(e, onSetBackgroundImage),
        bgImage,
        "Background",
        () => bgImageInputRef.current?.click()
      )}
    </div>
  );
};

export default AddContent;
