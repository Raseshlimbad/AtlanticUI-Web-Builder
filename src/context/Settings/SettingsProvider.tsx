"use client";
// import { EditorAction } from './editor-actions'
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { SettingsAction } from "./SettingsAction";

export type DeviceTypes = "Desktop" | "Mobile" | "Tablet";

export type SettingsType =
  | "Components"
  | "Settings"
  | "Defaults"
  | "Structures";

export type Settings = {
  device: DeviceTypes;
  previewMode: boolean;
  settingsState: SettingsType;
  sidebarActive: boolean;
  displayType: "Editor" | "Code";
};

const initialSettingsState: Settings = {
  device: "Desktop",
  previewMode: false,
  settingsState: "Defaults",
  sidebarActive: true,
  displayType: "Editor",
};

const settingsReducer = (
  settingsState: Settings = initialSettingsState,
  action: SettingsAction,
): Settings => {
  switch (action.type) {
    // case "TOGGLE_PREVIEW_MODE":

    case "CHANGE_DEVICE":
      return {
        ...settingsState,
        device: action.payload.device,
      };

    case "TOGGLE_PREVIEW_MODE":
      return {
        ...settingsState,
        previewMode: !settingsState.previewMode,
      };

    case "UPDATE_SETTINGS_STATE":
      return {
        ...settingsState,
        settingsState: action.payload.Settings,
      };
    case "TOGGLE_SIDEBAR":
      return {
        ...settingsState,
        sidebarActive: !settingsState.sidebarActive,
      };
    case "TOGGLE_DISPLAY_MODE":
      return {
        ...settingsState,
        displayType: settingsState.displayType === "Editor" ? "Code" : "Editor",
      };
    default:
      return settingsState;
  }
};

export type SettingContextData = {
  device: DeviceTypes;
  previewMode: boolean;
  setPreviewMode: (previewMode: boolean) => void;
  setDevice: (device: DeviceTypes) => void;
};

export const SettingsContext = createContext<{
  settingsState: Settings;
  dispatchSettings: Dispatch<SettingsAction>;
}>({
  settingsState: initialSettingsState,
  dispatchSettings: () => undefined,
});

type SettingsProps = {
  children: React.ReactNode;
};

const SettingsProvider = (props: SettingsProps) => {
  const [settingsState, dispatchSettings] = useReducer(
    settingsReducer,
    initialSettingsState,
  );

  useEffect(() => {
    // console.log(settingsState);
  }, [settingsState]);

  return (
    <SettingsContext.Provider
      value={{
        settingsState,
        dispatchSettings,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useEditor Hook must be used within the editor Provider");
  }
  return context;
};

export default SettingsProvider;
