/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { SettingsType, useSettings } from "@/context/Settings/SettingsProvider";
import { useUser } from "@/context/UserData/UserProvider";
import { BACKEND_URL, HEADER_CONFIG } from "@/utils/utils";
import {
  BoundingBox,
  CaretLeft,
  CaretRight,
  Columns,
  Gear,
  PuzzlePiece,
} from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SideBar({ projectId }: { projectId: string }) {
  const { settingsState, dispatchSettings } = useSettings();
  const [name, setName] = useState("");

  const handleChangeSettings = (Value: SettingsType) => {
    dispatchSettings({
      type: "UPDATE_SETTINGS_STATE",
      payload: { Settings: Value },
    });
  };

  const handleToggleSidebar = () => {
    dispatchSettings({ type: "TOGGLE_SIDEBAR" });
  };

  const { userState } = useUser();
  const getProjectName = async () => {
    if (!userState.userData?.userID) return;

    const projectName = await axios
      .get(
        `${BACKEND_URL}/projects?authorId=${userState.userData.userID}&projectId=${projectId}`,
        HEADER_CONFIG,
      )
      .then((res) => {
        return res.data.data.name;
      });
    setName(projectName);
  };

  useEffect(() => {
    getProjectName();
  }, [projectId]);

  return (
    <>
      <div
        className={clsx(
          "flex h-full flex-col items-center gap-6 transition-all duration-500",
          { "w-20 ": settingsState.sidebarActive === false },
          { "w-72 ": settingsState.sidebarActive === true },
        )}
      >
        <span
          className={clsx(
            "mt-6 flex h-10 w-[95%] items-center px-4",
            { "justify-center": settingsState.sidebarActive === false },
            { "justify-between": settingsState.sidebarActive === true },
          )}
        >
          <h1
            className={clsx("text-lg font-semibold", {
              hidden: settingsState.sidebarActive === false,
            })}
          >
            {name || "Project Name"}
          </h1>
          <button
            onClick={() => {
              handleToggleSidebar();
            }}
          >
            {settingsState.sidebarActive ? (
              <CaretLeft size={20} />
            ) : (
              <CaretRight size={24} />
            )}
          </button>
        </span>
        <div className="min-h-[1px] w-[85%] bg-border"></div>

        <Link
          href="/dashboard"
          className={clsx(
            "flex w-[80%] items-center gap-6 px-2 py-2",
            { "justify-center": settingsState.sidebarActive === false },
            { "justify-start": settingsState.sidebarActive === true },
          )}
        >
          <BoundingBox size={20} />
          <h1
            className={clsx({ hidden: settingsState.sidebarActive === false })}
          >
            Dashboard
          </h1>
        </Link>

        <button
          className={clsx(
            "flex w-[80%] items-center gap-6 px-2 py-2",
            { "justify-center": settingsState.sidebarActive === false },
            { "justify-start": settingsState.sidebarActive === true },
            settingsState.settingsState === "Settings" &&
              "rounded bg-primary text-textComplementary",
          )}
          onClick={() => {
            handleChangeSettings("Settings");
          }}
        >
          <Gear size={20} />
          <h1
            className={clsx({ hidden: settingsState.sidebarActive === false })}
          >
            Settings
          </h1>
        </button>
        <button
          className={clsx(
            "flex w-[80%] items-center gap-6 px-2 py-2",
            { "justify-center": settingsState.sidebarActive === false },
            { "justify-start": settingsState.sidebarActive === true },
            settingsState.settingsState === "Components" &&
              "rounded bg-primary text-textComplementary",
          )}
          onClick={() => {
            handleChangeSettings("Components");
          }}
        >
          <PuzzlePiece size={20} />
          <h1
            className={clsx({ hidden: settingsState.sidebarActive === false })}
          >
            Components
          </h1>
        </button>
        <button
          className={clsx(
            "flex w-[80%] items-center gap-6 px-2 py-2",
            { "justify-center": settingsState.sidebarActive === false },
            { "justify-start": settingsState.sidebarActive === true },
            settingsState.settingsState === "Defaults" &&
              "rounded bg-primary text-textComplementary",
          )}
          onClick={() => {
            handleChangeSettings("Defaults");
          }}
        >
          <Columns size={20} />
          <h1
            className={clsx({ hidden: settingsState.sidebarActive === false })}
          >
            Defaults
          </h1>
        </button>
      </div>
    </>
  );
}
