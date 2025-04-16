/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getSession } from "@/context/UserData/AuthLogic";
import { useUser } from "@/context/UserData/UserProvider";
import { BACKEND_URL, HEADER_CONFIG } from "@/utils/utils";
import axios from "axios";
import { Eye, Loader2, Plus, SquarePen, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { ProjectProps } from "../api/projects/route";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Dashboard() {
  const { userState, dispatchUserState } = useUser();
  const router = useRouter();
  const [projectData, setProjectData] = useState<any>([]);
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, [userState]);

  const checkSession = async () => {
    const isSession = await getSession();

    if (isSession) {
      handleDataFetching();
    } else {
      router.push("/signin");
    }
  };

  const handleDataFetching = async () => {
    const userId = userState?.userData?.userID;
    if (!userId) return;

    const resp = await axios.get(
      `${BACKEND_URL}/projects/allProjects?userId=${userId}`,
      HEADER_CONFIG,
    );

    if (resp.data.status === true) {
      setProjectData(resp.data.data);
    }
    setLoading(false);
  };

  return (
    <>
      <CreateModal
        modalStatus={createModal}
        setModalStatus={setCreateModal}
        callReload={handleDataFetching}
      />
      <DeleteModal
        modalStatus={deleteModal}
        setModalStatus={setDeleteModal}
        projectId={deleteProjectId ? deleteProjectId : ""}
        callReload={handleDataFetching}
      />

      <Header />
      

      {loading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader2 className="size-10 animate-spin" />
        </div>
      ) : (
        <div className="flex h-screen w-full">
          <div className="flex w-[calc(100%)] items-center justify-center py-10">
            <div className=" flex h-full w-[80%] flex-col gap-4 overflow-x-auto">
              <div className="flex w-full items-center justify-between">
                <h1 className="text-lg font-semibold">
                  Projects ({projectData?.length})
                </h1>
                <button
                  className="flex items-center justify-center gap-2 rounded bg-primary px-4 py-2 text-sm text-textComplementary"
                  onClick={() => {
                    setCreateModal(true);
                  }}
                >
                  <Plus size={16} /> Add Project
                </button>
              </div>

              {projectData?.length > 0 ? (
                <table className="w-full table-fixed rounded-lg border-2 border-secondary">
                  <thead>
                    <tr className="border-b-2 border-secondary">
                      <th className=" px-4 py-4 text-start">Project Name</th>
                      <th className="px-4 py-4 text-start">Status</th>
                      <th className="px-4 py-4 text-start">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData?.map((data: any) => (
                      <tr className="border-b-2 border-secondary" key={v4()}>
                        <td className="px-4 py-2">{data?.name}</td>
                        <td className="px-4 py-2">{data?.status}</td>
                        <td className="flex flex-col gap-2 px-4 py-2">
                          <a
                            className="flex items-center justify-start gap-2 text-accent transition-all duration-300 hover:scale-[102%]"
                            href={`/preview/projects/${data?.projectID}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Eye size={16} /> Preview
                          </a>
                          <button
                            className="flex items-center justify-start gap-2 text-accent transition-all duration-300 hover:scale-[102%]"
                            onClick={() => {
                              router.push(`/web-builder/${data?.projectID}`);
                            }}
                          >
                            <SquarePen size={16} /> Edit
                          </button>
                          <button
                            className="flex items-center justify-start gap-2 text-red-500 transition-all duration-300 hover:scale-[102%]"
                            onClick={() => {
                              setDeleteModal(true);
                              setDeleteProjectId(data?.projectID);
                            }}
                          >
                            <Trash size={16} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="mt-8 flex h-10 w-full flex-col items-center justify-center gap-1 text-center">
                  <h1 className="text-2xl font-bold"> No Projects Available</h1>
                  <h1 className="text-base font-semibold">
                    Please Create a Project
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

const CreateModal = ({
  modalStatus,
  setModalStatus,
  callReload,
}: {
  modalStatus: boolean;
  setModalStatus: Function;
  callReload: Function;
}) => {
  const [inputState, setInputState] = useState<string | null>(null);
  const router = useRouter();
  const { userState, dispatchUserState, handleUserUpdate } = useUser();

  const handleProjectCreation = async () => {
    if (inputState && userState?.userData?.userID) {
      const Payload: ProjectProps = {
        projectID: v4(),
        name: inputState,
        status: "public",
        creatorID: userState?.userData?.userID,
        code: {
          content: [],
          id: "__body",
          name: "Body",
          styles: [],
          type: "__body",
          special: {},
        },
      };
      const resp = await axios.post(
        `${BACKEND_URL}/projects/`,
        Payload,
        HEADER_CONFIG,
      );

      if (resp.data.status === true) {
        // router.push("/editor");
        //REMOVE IT IF WE REDIRECT TO EDITOR
        handleUserUpdate();
        setModalStatus(false);
      }
    }
  };
  return (
    <>
      {modalStatus ? (
        <div className="z-200 absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-secondary">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="flex w-[30rem] flex-col gap-8 rounded-lg bg-white px-8 py-6">
              <div className="flex w-full items-center justify-end">
                <button onClick={() => setModalStatus(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="username" className="text-lg text-textPrimary">
                  Project Name
                </label>
                <input
                  type="text"
                  placeholder="Project Name"
                  className={
                    "focus:ring-primary-200 block h-12 w-full rounded-md border-2 px-4 shadow-sm focus:ring focus:ring-opacity-50"
                  }
                  onChange={(e) => {
                    setInputState(e.target.value);
                  }}
                />
              </div>
              <div className="flex w-full items-center justify-center">
                <button
                  className="rounded bg-primary px-4 py-2 text-textComplementary"
                  onClick={handleProjectCreation}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

const DeleteModal = ({
  modalStatus,
  setModalStatus,
  projectId,
  callReload,
}: {
  modalStatus: boolean;
  setModalStatus: Function;
  projectId: string;
  callReload: Function;
}) => {
  const router = useRouter();
  const { userState, dispatchUserState, handleUserUpdate } = useUser();

  const handleProjectDeletion = async () => {
    if (userState?.userData?.userID && projectId !== "") {
      const resp = await axios.delete(
        `${BACKEND_URL}/projects?authorId=${userState?.userData?.userID}&projectId=${projectId}`,
        HEADER_CONFIG,
      );

      if (resp.data.status === true) {
        handleUserUpdate();
        setModalStatus(false);
      }
    } else {
      alert("Something went wrong");
    }
  };
  return (
    <>
      {modalStatus ? (
        <div className="z-200 absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-secondary">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="flex w-[30rem] flex-col gap-8 rounded-lg bg-white px-8 py-6">
              <div>
                <h1 className="text-md font-medium ">
                  Do you really want to delete this project? Pressing Delete
                  will delete it forever!
                </h1>
              </div>
              <div className="flex w-full items-center justify-center gap-4">
                <button
                  className="rounded border-2 border-primary px-4 py-1"
                  onClick={() => setModalStatus(false)}
                >
                  Cancel
                </button>
                <button
                  className="rounded border-2 border-red-700 bg-red-200 px-4 py-1 text-red-700"
                  onClick={handleProjectDeletion}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
