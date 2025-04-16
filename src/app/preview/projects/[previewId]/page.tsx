"use client";
import Recursive from "@/components/preview/Recursive";
import { EditorElement } from "@/context/Editor/EditorProvider";
import { getSession } from "@/context/UserData/AuthLogic";
import { BACKEND_URL, HEADER_CONFIG } from "@/utils/utils";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PreviewFullscreen({
  params,
}: {
  params: { previewId: string };
}) {
  const [elements, setElements] = useState<EditorElement[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const userCookie = await checkAuth();
      const preview = params.previewId;
      if (preview && userCookie?.userData) {
        await handleInitialFetchRequest({
          userId: userCookie.userData.userID,
          projectId: preview,
        });
      } else {
        setErrorMessage("Ops! An Error Occurred");
      }
    };

    fetchData();
  }, [params.previewId]);

  const checkAuth = async () => {
    const session = await getSession();
    const response = session.state;
    if (response?.userData) {
      const { userID, name, email, projects } = response.userData as {
        userID?: string;
        name?: string;
        email?: string;
        projects?: Array<string>;
      };
      if (!userID || !name || !email || !projects) {
        return null;
      }
      const userData = {
        userID: userID,
        name: name,
        email: email,
        projects: projects,
      };
      return {
        ...response,
        userData: userData,
      };
    } else {
      setErrorMessage("Please Login to View This Project");
    }
  };

  const handleInitialFetchRequest = async ({
    userId,
    projectId,
  }: {
    userId?: string;
    projectId: string;
  }) => {
    if (!userId || !projectId) return null;

    const response = await axios.get(
      `${BACKEND_URL}/projects?authorId=${userId}&projectId=${projectId}`,
      HEADER_CONFIG,
    );

    if (response.data.status === true) {
      setProjectName(response.data.data.name);
      setElements([response.data.data.code]);
    } else {
      setElements(null);
      setErrorMessage(
        "Project Not Found. The project you are looking for is deleted.",
      );
    }
  };
  return (
    <>
      {elements ? (
        <div className="min-h-screen w-full">
          <div className="w-full bg-primary px-6 py-4 text-sm text-textComplementary">
            <span className="flex gap-2">
              This is a preview of the project:{" "}
              <span className="underline underline-offset-2">
                {projectName}
              </span>
              . To edit the project
              <Link
                href={"/web-builder/" + params.previewId}
                className="text-accent transition-all duration-300 hover:scale-105 hover:text-accentLight"
              >
                Click Here
              </Link>
            </span>
          </div>
          {/* <Background /> */}
          {errorMessage ? (
            <div className="flex h-full w-full items-center justify-center">
              {errorMessage}
            </div>
          ) : (
            <Recursive element={elements[0]} />
          )}
        </div>
      ) : null}
    </>
  );
}

function Background() {
  return (
    <>
      {" "}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
    </>
  );
}
