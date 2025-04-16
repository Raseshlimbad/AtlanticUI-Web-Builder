"use client";
import { EditorElement } from "@/context/Editor/EditorProvider";
import { useState } from "react";
import Selected from "../Selected";

export default function Text({ element }: { element: EditorElement }) {
  const [textValue, setTextValue] = useState<string>("text");

  const handleChange = (textVal: string) => {
    setTextValue(textVal);
  };
  return (
    <Selected element={element}>
      <input
        type="text"
        value={textValue}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        className="h-full w-full border-none outline-none placeholder:hidden focus:ring-0"
      />
    </Selected>
  );
}
