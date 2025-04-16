/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { EditorElement, useEditor } from "@/context/Editor/EditorProvider";
import { Barricade, Check, Plus, Trash, X } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";

export default function Settings_Main() {
  const [componentData, setComponentData] = useState<EditorElement | null>(
    null,
  );

  const { state, dispatch } = useEditor();

  useEffect(() => {
    if (state.editor.selectedElement !== null) {
      findStateData(state.editor.selectedElement);
    } else {
      setComponentData(null);
    }
  }, [state]);

  const findStateData = (elemId: string) => {
    const ElementDetail: EditorElement = reccursiveFinder(
      elemId,
      state.editor.elements[0].content,
    );
    setComponentData(ElementDetail);
  };

  const reccursiveFinder = (elemId: string, content: Array<any>): any => {
    for (const item of content) {
      if (item.id === elemId) {
        return item;
      }

      if (item.content && Array.isArray(item.content)) {
        const nestedResult = reccursiveFinder(elemId, item.content);
        if (nestedResult) {
          return nestedResult;
        }
      }
    }

    return null;
  };

  const handleUnselect = () => {
    dispatch({
      type: "UPDATE_SELECTED_ELEMENT",
      payload: {
        elementId: null,
      },
    });
  };

  const handleDelete = () => {
    if (componentData !== null) {
      dispatch({
        type: "DELETE_ELEMENT",
        payload: {
          elementId: componentData.id,
        },
      });
    }
  };

  const handleStyleUpdate = (newVal: Array<string>) => {
    if (componentData) {
      const newElementVal: EditorElement = {
        ...componentData,
        styles: newVal,
      };
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          elementDetails: newElementVal,
        },
      });
    }
  };

  return (
    <>
      <div className="h-full w-full overflow-y-auto">
        <div className="flex h-16 items-center border-b-2 border-border px-8">
          <h1>Settings</h1>
        </div>
        {componentData === null ? (
          <div className="flex h-[calc(100%-4rem)] w-full flex-col items-center justify-center gap-4 px-6 text-center">
            <Barricade size={80} />
            <h1 className="capitalize">
              Please select a component to view and modify its settings
            </h1>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-4 px-6 py-4">
            <span className="flex gap-4 capitalize">
              {"TAG : "}
              <h1 className="font-semibold">
                {componentData?.tag !== undefined &&
                componentData?.tag !== "unknown"
                  ? (componentData?.tag as string)
                  : null}
              </h1>
            </span>
            <div className="mb-4 mt-4 w-full border-[1px] border-slate-700"></div>
            <div className="flex w-full items-center justify-between gap-4">
              <button
                className="flex w-full items-center justify-center gap-1 rounded-sm border-2  border-primary py-1 text-textPrimary transition-all duration-200 hover:bg-primary hover:text-textComplementary"
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete
                <Trash size={20} />
              </button>
              <button
                className="flex w-full items-center justify-center gap-1 rounded-sm border-2 border-primary py-1 text-textPrimary transition-all duration-200 hover:bg-primary hover:text-textComplementary"
                onClick={() => {
                  handleUnselect();
                }}
              >
                Unselect
                <X size={20} />
              </button>
            </div>
            <div className="mb-4 mt-4 w-full border-[1px] border-slate-700"></div>

            {Object.entries(
              componentData.special ? componentData.special : {},
            ).map(([key, value]) => {
              // Perform operations on key-value pairs here
              return (
                <InputBlock
                  name={key}
                  type={typeof value}
                  getInputData={() => {}}
                  predefinedInputData={value}
                  key={key}
                  componentData={componentData}
                />
              );
            })}
            <StyleBlock
              componentData={componentData}
              handleStyleUpdate={handleStyleUpdate}
            />
          </div>
        )}
      </div>
    </>
  );
}

const InputBlock = ({
  name,
  type,
  getInputData,
  predefinedInputData,
  componentData,
}: {
  name: string;
  type: any;
  getInputData: Function;
  predefinedInputData: any;
  componentData: EditorElement;
}) => {
  const [inputValue, setInputValue] = useState<string>(predefinedInputData);
  const { dispatch } = useEditor();
  const handleChange = () => {
    const newElement: EditorElement = {
      ...componentData,
      special: {
        ...componentData.special,
        [name]: inputValue,
      },
    };
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: newElement,
      },
    });
  };

  useEffect(() => {
    setInputValue(predefinedInputData);
  }, [componentData]);
  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <h1>{name === "textData" ? "Text" : name}</h1>

        <div className="flex w-full justify-between">
          <input
            type={type}
            className="h-10 w-[calc(100%-2.5rem-0.5rem)] rounded border-2 border-primary px-3"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button
            className="flex h-10 w-10 items-center justify-center rounded bg-primary text-center text-textComplementary disabled:bg-gray-200 disabled:text-slate-400"
            onClick={() => {
              handleChange();
            }}
            disabled={predefinedInputData === inputValue ? true : false}
          >
            <Check size={20} weight="bold" />
          </button>
        </div>
      </div>
    </>
  );
};

const StyleBlock = ({
  handleStyleUpdate,
  componentData,
}: {
  handleStyleUpdate: (val: Array<string>) => void;
  componentData: EditorElement;
}) => {
  const [styleArray, setStyleArray] = useState<Array<string>>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const [styling, setStyling] = useState<string>("");

  const convertStringToArray = (styleVal: string) => {
    var styleArrayTemp = styleVal.split(/\s+/);
    setStyleArray(styleArrayTemp);
  };

  const addStyle = () => {
    var styleArrayTemp = styleArray;

    if (inputValue) {
      styleArrayTemp.push(inputValue);
      setStyleArray(styleArrayTemp);
      handleStyleUpdate(styleArrayTemp);
      setInputValue("");
    }
  };

  const deleteStyle = (deleteItemName: string) => {
    var styleArrayTemp = styleArray;

    if (deleteItemName) {
      styleArrayTemp = styleArray.filter((item) => item !== deleteItemName);
      setStyleArray(styleArrayTemp);
      handleStyleUpdate(styleArrayTemp);
      setInputValue("");
    }
  };

  const handleStyling = () => {
    const tempStyle = componentData.styles.reduce((acc, style) => {
      return acc + " " + style;
    }, "");
    setStyling(tempStyle);
    return tempStyle;
  };

  useEffect(() => {
    const styleVal = handleStyling();
    convertStringToArray(styleVal);
  }, [componentData]);

  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <h1>Class / Style</h1>
        <div className="flex w-full justify-between">
          <input
            type="text"
            className="h-10 w-[calc(100%-2.5rem-0.5rem)] rounded border-2 border-primary px-3"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            value={inputValue}
          />
          <button
            className="flex h-10 w-10 items-center justify-center rounded bg-primary text-center text-textComplementary"
            onClick={() => {
              addStyle();
            }}
          >
            <Plus size={20} weight="bold" />
          </button>
        </div>

        <div className="flex w-full flex-wrap gap-2">
          {styleArray.map((style, i) => (
            <React.Fragment key={i}>
              {style && (
                <div className="flex items-center justify-center gap-4 rounded bg-primary px-3 py-1 text-sm text-textComplementary">
                  <p>{style}</p>
                  <button
                    onClick={() => {
                      deleteStyle(style);
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
