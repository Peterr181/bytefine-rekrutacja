import { useState, useEffect } from "react";

const useElementEditing = (
  initialX: number,
  initialY: number,
  initialWidth: number,
  initialHeight: number
) => {
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEditing]);

  return {
    x,
    y,
    width,
    height,
    isEditing,
    setX,
    setY,
    setWidth,
    setHeight,
    setIsEditing,
  };
};

export default useElementEditing;
