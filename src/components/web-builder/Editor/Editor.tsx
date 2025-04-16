"use client";

import CodeBlock from "@/components/preview/CodeBlock";
import { useEditor } from "@/context/Editor/EditorProvider";
import { useSettings } from "@/context/Settings/SettingsProvider";
import {
  ArrowArcLeft,
  ArrowArcRight,
  ArrowsOut,
  Code,
  ExcludeSquare,
  Eye,
  EyeSlash,
} from "@phosphor-icons/react";
import clsx from "clsx";
import Recursive from "./Editable/Recursive";

export default function Editor({ projectId }: { projectId: string }) {
  const { state, dispatch } = useEditor();
  const { settingsState, dispatchSettings } = useSettings();

  const handleTogglePreview = () => {
    dispatchSettings({
      type: "TOGGLE_PREVIEW_MODE",
    });
  };

  const handleUndo = () => {
    dispatch({
      type: "UNDO",
    });
  };

  const handleRedo = () => {
    dispatch({
      type: "REDO",
    });
  };
  const handleEditorType = () => {
    dispatchSettings({
      type: "TOGGLE_DISPLAY_MODE",
    });
  };

  return (
    <>
      <div
        className={clsx(
          " flex flex-col items-center justify-start bg-secondary transition-all duration-500",
          { "w-[calc(100vw-24rem)]": settingsState.sidebarActive === false },
          { "w-[calc(100vw-38rem)]": settingsState.sidebarActive === true },
        )}
      >
        <div className="flex h-16 w-full items-center justify-between px-6">
          <div className="flex h-10  items-center justify-center rounded-xl bg-background">
            <button
              className="flex w-10 items-center justify-center text-center"
              onClick={() => {
                handleTogglePreview();
              }}
            >
              {settingsState.previewMode === false ? (
                <EyeSlash size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
            <div className="h-full min-w-[1px] bg-slate-200"></div>
            <a
              href={`/preview/projects/${projectId}`}
              target="_blank"
              className="flex w-10 items-center justify-center text-center"
            >
              <ArrowsOut size={20} />
            </a>
            <div className="h-full min-w-[1px] bg-slate-200"></div>

            <button
              className="flex w-32 items-center justify-center gap-2 text-center"
              onClick={() => {
                handleEditorType();
              }}
            >
              {settingsState.displayType === "Editor" ? (
                <>
                  <Code size={20} /> Code
                </>
              ) : (
                <>
                  <ExcludeSquare size={20} /> Editor
                </>
              )}
            </button>
          </div>

          <div className="flex h-10 w-20 items-center justify-center gap-2 rounded-xl bg-background">
            <button
              onClick={handleUndo}
              disabled={state.history.undo.length <= 0}
              className="h-full disabled:cursor-not-allowed disabled:text-textSecondary"
            >
              <ArrowArcLeft size={20} />
            </button>
            <div className="h-full min-w-[1px] bg-slate-200"></div>
            <button
              onClick={handleRedo}
              disabled={state.history.redo.length <= 0}
              className="h-full disabled:cursor-not-allowed disabled:text-textSecondary"
            >
              <ArrowArcRight size={20} />
            </button>
          </div>
        </div>

        {/* EDITOR */}
        {settingsState.displayType === "Editor" ? (
          <div
            className={`h-full max-w-[98%] overflow-y-auto  rounded-t-lg bg-background @container 
    ${settingsState.device === "Desktop" && "w-full"}
    ${settingsState.device === "Tablet" && "w-[650px]"} 
    ${settingsState.device === "Mobile" && "w-[420px]"}`}
          >
            {Array.isArray(state.editor.elements) &&
              state.editor.elements.map((childElement) => (
                <Recursive key={childElement.id} element={childElement} />
              ))}
          </div>
        ) : (
          <CodeBlock />
        )}
      </div>
    </>
  );
}
