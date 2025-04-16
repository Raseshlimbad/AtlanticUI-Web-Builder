"use client";
import EditorComponent from "@/components/web-builder/Editor/EditorComponent";
import EditorProvider from "@/context/Editor/EditorProvider";
import SettingsProvider from "@/context/Settings/SettingsProvider";
import DragAndDropWrapper from "@/context/dragAndDrop/DragAndDropWrapper";

export default function WebsiteBuilder({
  params,
}: {
  params: { projectId: string };
}) {

  return (
    <>
      <SettingsProvider>
        <EditorProvider>
          <DragAndDropWrapper>
            <EditorComponent projectId={params.projectId} />
          </DragAndDropWrapper>
        </EditorProvider>
      </SettingsProvider>
    </>
  );
}
