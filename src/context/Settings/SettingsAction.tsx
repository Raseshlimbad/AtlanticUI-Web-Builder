import { DeviceTypes, SettingsType } from "./SettingsProvider";

export type SettingsAction =
  | {
      type: "CHANGE_DEVICE";
      payload: {
        device: DeviceTypes;
      };
    }
  | {
      type: "TOGGLE_DISPLAY_MODE";
    }
  | { type: "TOGGLE_PREVIEW_MODE" }
  | { type: "TOGGLE_SIDEBAR" }
  | {
      type: "UPDATE_SETTINGS_STATE";
      payload: {
        Settings: SettingsType;
      };
    };
