"use client";

import { EditorElement } from "@/context/Editor/EditorProvider";
import Recursive from "./Recursive";

type Props = { element: EditorElement };

const Container = ({ element }: Props) => {
  const { content, type } = element;

  return (
    <div className={`py-4 ${type === "__body" ? "min-h-full" : null}`}>
      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
    </div>
  );
};

export default Container;
