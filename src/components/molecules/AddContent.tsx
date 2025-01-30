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
    if (event.target.files && event.target.files.length > 0) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      callback(imageUrl);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
      <ActionButton
        icon={<img src={textImage} className="w-[96px] h-[96px]" alt="text" />}
        label="Text"
        onClick={onAddText}
      />
      <label className="cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileUpload(e, onAddImage)}
          ref={imageInputRef}
        />
        <ActionButton
          icon={
            <img src={photoImage} className="w-[96px] h-[96px]" alt="photo" />
          }
          label="Image"
          onClick={() => imageInputRef.current?.click()}
        />
      </label>
      <label className="cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileUpload(e, onSetBackgroundImage)}
          ref={bgImageInputRef}
        />
        <ActionButton
          icon={
            <img src={bgImage} className="w-[96px] h-[96px]" alt="background" />
          }
          label="Background"
          onClick={() => bgImageInputRef.current?.click()}
        />
      </label>
    </div>
  );
};

export default AddContent;
