import { DragableElementType } from "@/utils/constants";
import React, { ReactElement } from "react";
import { EditorBtns } from "../Editor/EditorProvider";

export type DragAndDropContextProps = {
  componentData: DragableElementType | null;
  setComponentData: Function;
  onDrag: (componentType: EditorBtns, Event: React.DragEvent) => void;
  onComponentDrag: (
    componentType: EditorBtns,
    e: React.DragEvent,
    component: ReactElement,
  ) => void;
  onDrop: (
    e: React.DragEvent,
    tag: string | "unknown" | null,
    parentId: string,
  ) => void;
  handleDragOver: (e: React.DragEvent) => void;
};

const DragAndDropContext = React.createContext<DragAndDropContextProps>({
  componentData: null,
  setComponentData: () => {},
  onComponentDrag: () => {},
  onDrag: () => {},
  onDrop: () => {},
  handleDragOver: () => {},
});

export default DragAndDropContext;
