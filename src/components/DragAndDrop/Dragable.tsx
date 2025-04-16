import { EditorBtns, EditorElement } from "@/context/Editor/EditorProvider";
import { useDragAndDrop } from "@/context/dragAndDrop/DragAndDropWrapper";
import React, { ReactElement } from "react";

type DragableProps = React.PropsWithChildren<{
  className?: string;
  componentType?: EditorBtns;
  componentDataJsx?: ReactElement;
  componentDataEditorElement?: EditorElement;
}>;

export const Dragable: React.FC<DragableProps> = (props) => {
  const { onComponentDrag, setComponentData } = useDragAndDrop();

  const {
    className,
    children,
    componentType,
    componentDataJsx,
    componentDataEditorElement,
    ...rest
  } = props;

  const handleDragStart = (e: React.DragEvent) => {
    if (componentType !== undefined) {
      if (componentDataJsx) {
        onComponentDrag(componentType, e, componentDataJsx);
      } else if (componentDataEditorElement) {
        setComponentData({
          elementType: componentDataEditorElement.type,
          elementData: componentDataEditorElement,
          elementStatus: "add",
        });
      } else return;
    }
  };
  return (
    <div
      className={`${props.className} cursor-pointer`}
      draggable
      onDragStart={(e) => {
        handleDragStart(e);
      }}
      {...rest}
    >
      {props.children}
    </div>
  );
};
