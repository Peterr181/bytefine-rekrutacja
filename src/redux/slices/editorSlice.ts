import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Element {
  id: string;
  type: "text" | "image";
  content: string;
  x: number;
  y: number;
  isEditing?: boolean;
  opacity?: number;
  color?: string;
}

interface EditorState {
  elements: Element[];
  backgroundImage: string | null;
}

const initialState: EditorState = {
  elements: [],
  backgroundImage: null,
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    addText: (state) => {
      state.elements.push({
        id: Date.now().toString(),
        type: "text",
        content: "Type your text here",
        x: 100,
        y: 100,
        isEditing: true,
        opacity: 0.25,
      });
    },
    addImage: (state, action: PayloadAction<string>) => {
      state.elements.push({
        id: Date.now().toString(),
        type: "image",
        content: action.payload,
        x: 100,
        y: 100,
      });
    },
    deleteElement: (state, action: PayloadAction<string>) => {
      state.elements = state.elements.filter((el) => el.id !== action.payload);
    },
    updateElementPosition: (
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>
    ) => {
      const element = state.elements.find((el) => el.id === action.payload.id);
      if (element) {
        element.x = action.payload.x;
        element.y = action.payload.y;
      }
    },
    updateElementContent: (
      state,
      action: PayloadAction<{ id: string; content: string; color: string }>
    ) => {
      const element = state.elements.find((el) => el.id === action.payload.id);
      if (element) {
        element.content = action.payload.content;
        element.color = action.payload.color;
      }
    },
    setBackgroundImage: (state, action: PayloadAction<string | null>) => {
      state.backgroundImage = action.payload;
    },
    resetElements: (state) => {
      state.elements = [];
      state.backgroundImage = null;
    },
  },
});

export const {
  addText,
  addImage,
  deleteElement,
  updateElementPosition,
  updateElementContent,
  setBackgroundImage,
  resetElements,
} = editorSlice.actions;
export default editorSlice.reducer;
