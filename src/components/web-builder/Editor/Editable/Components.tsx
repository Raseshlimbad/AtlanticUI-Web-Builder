/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  ContainerQueryLabels,
  EditorElement,
  useEditor,
} from "@/context/Editor/EditorProvider";
import { useSettings } from "@/context/Settings/SettingsProvider";
import { useDragAndDrop } from "@/context/dragAndDrop/DragAndDropWrapper";
import React, { useEffect, useState } from "react";
import Recursive from "./Recursive";

export default function Components({ element }: { element: EditorElement }) {
  const { id, content } = element;

  const [textValue, setTextValue] = useState<string | null>(null);
  const [styling, setStyling] = useState<string | null>(null);
  const hoverStyling: string = " hover:border-2 hover:border-accent py-2 ";
  const selectedStyling: string = " border-2 border-accent py-2 ";
  const previewStyling: string =
    " border-[1px] border-gray-400 border-dashed py-2";

  const { state, dispatch } = useEditor();
  const { settingsState, dispatchSettings } = useSettings();
  const { setComponentData, onDrop, handleDragOver } = useDragAndDrop();

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
    detectSingleTag(element.tag);
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

  const handleHover = (value: boolean) => {
    if (settingsState.previewMode === true) return;
    if (value) {
      dispatch({
        type: "UPDATE_HOVER",
        payload: {
          elementId: id,
        },
      });
    } else {
      dispatch({
        type: "UPDATE_HOVER",
        payload: {
          elementId: null,
        },
      });
    }
  };

  const handleElementSelection = (e: React.MouseEvent) => {
    if (settingsState.previewMode === true) return;
    e.stopPropagation();
    dispatch({
      type: "UPDATE_SELECTED_ELEMENT",
      payload: {
        elementId: element.id,
      },
    });
    dispatchSettings({
      type: "UPDATE_SETTINGS_STATE",
      payload: {
        Settings: "Settings",
      },
    });
  };

  const handleElementReplacementDragStart = (e: React.DragEvent) => {
    if (settingsState.previewMode === true) return;
    e.stopPropagation();
    setComponentData({
      elementStatus: "replace",
      elementType: "component",
      elementData: element,
    });
  };

  const [isSingleTag, setIsSingleTag] = useState<boolean | null>(null);

  const detectSingleTag = (
    tag:
      | keyof JSX.IntrinsicElements
      | React.ComponentType<any>
      | "unknown"
      | undefined,
  ) => {
    const singleTag = ["img"];
    if (tag === undefined || tag === null || tag === "unknown") return;
    if (singleTag.includes(tag as string)) {
      setIsSingleTag(true);
    } else {
      setIsSingleTag(false);
    }
  };

  return (
    <>
      {Array.isArray(content) &&
        (content.length > 0 ? (
          element.tag !== undefined &&
          element.tag !== "unknown" &&
          element.type === "component_element" ? (
            // <Selected element={element}>
            <element.tag
              ref={element.elementRef}
              className={`${styling}  ${
                state.editor.hoverElement === id &&
                settingsState.previewMode === false
                  ? hoverStyling
                  : ""
              } ${
                state.editor.selectedElement === id &&
                settingsState.previewMode === false
                  ? selectedStyling
                  : ""
              }
                ${settingsState.previewMode === false && state.editor.selectedElement !== id && state.editor.hoverElement !== id ? previewStyling : null}`}
              {...rest}
              id={element.id}
              onMouseEnter={() => {
                handleHover(true);
              }}
              onMouseLeave={() => {
                handleHover(false);
              }}
              onClick={(e: React.MouseEvent) => {
                handleElementSelection(e);
              }}
              //ID OF PARENT

              onDrop={(e: React.DragEvent) =>
                onDrop(
                  e,
                  element.tag ? (element.tag as string) : null,
                  element.id,
                )
              }
              onDragOver={handleDragOver}
              //Replace the component logic
              draggable={settingsState.previewMode === true ? false : true}
              onDragStart={(e: React.DragEvent) => {
                handleElementReplacementDragStart(e);
              }}
            >
              {content.map((childElement, i) => (
                <Recursive element={childElement} key={i} />
              ))}
            </element.tag>
          ) : (
            // </Selected>
            content.map((childElement, i) => (
              <Recursive element={childElement} key={i} />
            ))
          )
        ) : (
          <>
            {element.tag !== undefined && element.tag !== "unknown" && (
              <>
                {isSingleTag ? (
                  <element.tag
                    ref={element.elementRef}
                    className={`${styling} ${
                      state.editor.hoverElement === id &&
                      settingsState.previewMode === false
                        ? hoverStyling
                        : ""
                    } ${
                      state.editor.selectedElement === id &&
                      settingsState.previewMode === false
                        ? selectedStyling
                        : ""
                    } ${settingsState.previewMode === false && state.editor.selectedElement !== id && state.editor.hoverElement !== id ? previewStyling : null}`}
                    {...rest}
                    id={element.id}
                    onMouseEnter={() => {
                      handleHover(true);
                    }}
                    onMouseLeave={() => {
                      handleHover(false);
                    }}
                    onClick={(e: React.MouseEvent) => {
                      handleElementSelection(e);
                    }}
                    onDrop={(e: React.DragEvent) =>
                      onDrop(
                        e,
                        element.tag ? (element.tag as string) : null,
                        element.id,
                      )
                    }
                    onDragOver={handleDragOver}
                    //Replace the component logic
                    draggable={
                      settingsState.previewMode === true ? false : true
                    }
                    onDragStart={(e: React.DragEvent) => {
                      handleElementReplacementDragStart(e);
                    }}
                  />
                ) : (
                  <element.tag
                    ref={element.elementRef}
                    className={`${styling} ${
                      state.editor.hoverElement === id &&
                      settingsState.previewMode === false
                        ? hoverStyling
                        : ""
                    } ${
                      state.editor.selectedElement === id &&
                      settingsState.previewMode === false
                        ? selectedStyling
                        : ""
                    } ${settingsState.previewMode === false && state.editor.selectedElement !== id && state.editor.hoverElement !== id ? previewStyling : null}`}
                    {...rest}
                    id={element.id}
                    onMouseEnter={() => {
                      handleHover(true);
                    }}
                    onMouseLeave={() => {
                      handleHover(false);
                    }}
                    onClick={(e: React.MouseEvent) => {
                      handleElementSelection(e);
                    }}
                    onDrop={(e: React.DragEvent) =>
                      onDrop(
                        e,
                        element.tag ? (element.tag as string) : null,
                        element.id,
                      )
                    }
                    onDragOver={handleDragOver}
                    //Replace the component logic
                    draggable={
                      settingsState.previewMode === true ? false : true
                    }
                    onDragStart={(e: React.DragEvent) => {
                      handleElementReplacementDragStart(e);
                    }}
                  >
                    {textValue ? textValue : null}
                  </element.tag>
                )}
              </>
            )}
          </>
        ))}
    </>
  );
}
