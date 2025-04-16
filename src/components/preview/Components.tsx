/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  ContainerQueryLabels,
  EditorElement,
} from "@/context/Editor/EditorProvider";
import { useEffect, useState } from "react";
import Recursive from "./Recursive";

export default function Components({ element }: { element: EditorElement }) {
  const { content } = element;

  const [textValue, setTextValue] = useState<string | null>(null);
  const [styling, setStyling] = useState<string | null>(null);

  const [rest, setRest] = useState({});
  function hasTextData(obj: {
    className?: string;
    href?: string;
    src?: string;
    textData?: string;
  }): obj is {
    className?: string;
    href?: string;
    src?: string;
    textData: string;
  } {
    return obj.textData !== undefined;
  }

  const handleRst = () => {
    if (element.special && hasTextData(element.special)) {
      const { textData, ...restObj } = element.special;
      setRest(restObj);
      handleTextData();
      // Use textData and rest
    } else {
      const { ...restObj } = element.special || {};
      setRest(restObj);
      // Use rest
    }
  };

  useEffect(() => {
    handleStyling();
    handleRst();
  }, [element]);

  const handleStyling = () => {
    const tempStyle = element.styles.reduce((acc, style) => {
      return acc + " " + style;
    }, "");
    const queryList: Array<ContainerQueryLabels> = [
      "sm",
      "md",
      "lg",
      "xl",
      "2xl",
      "3xl",
      "4xl",
      "5xl",
      "6xl",
      "7xl",
    ];
    var modifiedTempStyle = tempStyle;

    queryList.map((item) => {
      modifiedTempStyle = transformToContainerQueries(modifiedTempStyle, item);
      return modifiedTempStyle;
    });

    setStyling(modifiedTempStyle);
  };

  function transformToContainerQueries(
    inputString: string,
    queryFind: ContainerQueryLabels,
  ) {
    const regEx: Record<ContainerQueryLabels, RegExp> = {
      sm: /sm:/g,
      md: /md:/g,
      lg: /lg:/g,
      xl: /\bxl:/g,
      "2xl": /\b2xl:/g,
      "3xl": /\b3xl:/g,
      "4xl": /\b4xl:/g,
      "5xl": /\b5xl:/g,
      "6xl": /\b6xl:/g,
      "7xl": /\b7xl:/g,
    };
    if (inputString.includes(queryFind)) {
      // If "@md:" is present in the string, replace it with "md:"

      let reversedString = inputString.replace(
        regEx[queryFind],
        `@${queryFind}:`,
      );
      return reversedString;
    } else {
      // If "@md:" is not present, return the original string
      return inputString;
    }
  }

  const handleTextData = () => {
    const { textData } = element.special as {
      textData?: string;
    };
    if (textData !== undefined) setTextValue(textData);
  };

  return (
    <>
      {Array.isArray(content) &&
        (content.length > 0 ? (
          element.tag !== undefined &&
          element.tag !== "unknown" &&
          element.type === "component_element" ? (
            <element.tag className={`${styling} `} {...rest}>
              {content.map((childElement, i) => (
                <Recursive element={childElement} key={i} />
              ))}
            </element.tag>
          ) : (
            content.map((childElement, i) => (
              <Recursive element={childElement} key={i} />
            ))
          )
        ) : (
          <>
            {element.tag !== undefined && element.tag !== "unknown" && (
              <element.tag className={`${styling}`} {...rest}>
                {textValue ? textValue : null}
              </element.tag>
            )}
          </>
        ))}
    </>
  );
}
