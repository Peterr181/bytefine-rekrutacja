import { forwardRef } from "react";
import { useDispatch } from "react-redux";
import initialCanvasImage from "../../assets/initialCanvasImage.png";
import TextElement from "../molecules/TextElement";
import ImageElement from "../molecules/ImageElement";
import {
  deleteElement,
  updateElementPosition,
} from "../../redux/slices/editorSlice";

interface CanvasProps {
  elements: {
    id: string;
    type: "text" | "image";
    content: string;
    x: number;
    y: number;
    isEditing?: boolean;
  }[];
  backgroundImage: string | null;
}

const Canvas = forwardRef<HTMLDivElement, CanvasProps>(
  ({ elements, backgroundImage }, ref) => {
    const dispatch = useDispatch();
    const hasElements = elements.length > 0;

    return (
      <div className="flex items-center justify-center">
        <div
          ref={ref}
          className="lg:w-[759px] w-full h-[800px] relative"
          style={{
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : hasElements
              ? "none"
              : `url(${initialCanvasImage})`,
            backgroundColor:
              !backgroundImage && hasElements ? "#9B9B9B" : "transparent",
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
                width={300}
                height={150}
                onDelete={() => dispatch(deleteElement(el.id))}
                isEditing={el.isEditing}
                onDragEnd={(x, y) =>
                  dispatch(updateElementPosition({ id: el.id, x, y }))
                }
              />
            ) : (
              <ImageElement
                key={el.id}
                id={el.id}
                src={el.content}
                x={el.x}
                y={el.y}
                width={200}
                height={200}
                onDelete={() => dispatch(deleteElement(el.id))}
                onDragEnd={(x, y) =>
                  dispatch(updateElementPosition({ id: el.id, x, y }))
                }
              />
            )
          )}
        </div>
      </div>
    );
  }
);

export default Canvas;
