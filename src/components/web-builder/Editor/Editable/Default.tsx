/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { EditorElement } from "@/context/Editor/EditorProvider";
import Selected from "../Selected";
import React, { useEffect, useState } from "react";

export default function Default({ element }: { element: EditorElement }) {
  const [textValue, setTextValue] = useState<string | null>(null);
  const [styling, setStyling] = useState<string | null>(null);

  const { className, textData, ...rest } = element.special as {
    className?: string;
    href?: string;
    src?: string;
    textData?: string;
  };

  useEffect(() => {
    handleTextData();
    handleStyling();
  }, [element]);

  const handleStyling = () => {
    const tempStyle = element.styles.reduce((acc, style) => {
      return acc + style;
    }, "");
    setStyling(tempStyle);
  };

  const handleTextData = () => {
    const { textData } = element.special as {
      textData?: string;
    };
    if (textData !== undefined) setTextValue(textData);
  };

  return (
    <Selected element={element}>
      {element.tag !== undefined && element.tag !== "unknown" && (
        <element.tag className={styling} {...rest}>
          {textValue}
        </element.tag>
      )}
    </Selected>
  );
}
