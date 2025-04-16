"use client";

import { useDragAndDrop } from "@/context/dragAndDrop/DragAndDropWrapper";
import { EditorElement } from "@/context/Editor/EditorProvider";
import React from "react";
import Recursive from "./Recursive";

type Props = { element: EditorElement };

const Container = ({ element }: Props) => {
  const { id, content, type } = element;

  const { onDrop, handleDragOver } = useDragAndDrop();

  return (
    <div
      className={`py-4 ${type === "__body" ? "min-h-full" : null}`}
      onDrop={(e: React.DragEvent) => {
        onDrop(e, "body", id);
      }}
      onDragOver={handleDragOver}
      draggable={type !== "__body"}
    >
      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
    </div>
  );
};

export default Container;
