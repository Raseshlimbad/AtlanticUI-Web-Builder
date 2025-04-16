/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Editor from "@/components/web-builder/Editor/Editor";
import Settings from "@/components/web-builder/Settings/Settings";
import SideBar from "@/components/web-builder/SideBar/SideBar";
import { useEditor } from "@/context/Editor/EditorProvider";
import { getSession } from "@/context/UserData/AuthLogic";
import { useUser } from "@/context/UserData/UserProvider";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditorComponent({ projectId }: { projectId: string }) {
  const { state, handleCodeUpdateToBackend, handleInitialFetchRequest } = useEditor();
  const { userState } = useUser();
  const router = useRouter();

  const [status, setStatus] = useState<boolean | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true); // Track fetching state

  const initialFunc = async () => {
    if (userState?.userData?.userID && projectId) {
      setIsFetching(true);  // Start fetching
      const resp = await handleInitialFetchRequest({
        userId: userState?.userData?.userID,
        projectId: projectId,
      });

      if (resp) {
        setStatus(resp.status);
        setStatusMessage(resp.message);
      }

      setIsFetching(false);  // Finished fetching
    }
  };

  const checkSession = async () => {
    const isSession = await getSession();

    if (isSession) {
      await initialFunc();
    } else {
      router.push("/signin");
    }
  };

  const updateFunc = async () => {
    const isSession = await getSession();

    if (isSession) {
      if (userState?.userData?.userID && projectId) {
        await handleCodeUpdateToBackend({
          userId: userState?.userData?.userID,
          projectId: projectId,
        });
      }
    }
  };

  useEffect(() => {
    checkSession();
  }, [userState.loginStatus]);

  useEffect(() => {
    if (!isFetching) {
      updateFunc();
    }
  }, [state.editor.elements, isFetching]);  // Run update function after initial data is fetched

  // Display loading message until data is fetched
  if (isFetching) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <h1 className="text-2xl">
          {statusMessage ? (
            statusMessage
          ) : (
            <Loader2 className="size-8 animate-spin text-foreground" />
          )}
        </h1>
      </div>
    );
  }

  return (
    <>
      {status && projectId ? (
        <div className="flex h-screen w-full overflow-hidden">
          <SideBar projectId={projectId} />
          <Editor projectId={projectId} />
          <Settings />
        </div>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center">
          <h1 className="text-2xl">
            {statusMessage ? statusMessage : "Unknown Error"}
          </h1>
        </div>
      )}
    </>
  );
}
