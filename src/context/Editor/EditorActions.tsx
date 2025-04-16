import { DeviceTypes, SettingsType } from "../Settings/SettingsProvider";
import { EditorElement } from "./EditorProvider";

export type EditorAction =
  | {
      type: "UPDATE_EDITOR_STATE";
      payload: {
        newEeditorState: EditorElement[];
      };
    }
  | {
      type: "ADD_ELEMENT";
      payload: {
        containerId: string;
        elementDetails: EditorElement;
      };
    }
  | {
      type: "UPDATE_ELEMENT";
      payload: {
        elementDetails: EditorElement;
      };
    }
  | {
      type: "DELETE_ELEMENT";
      payload: {
        elementId: string;
      };
    }
  | {
      type: "UPDATE_SELECTED_ELEMENT";
      payload: {
        elementId: string | null;
      };
    }
  | {
      type: "CHANGE_DEVICE";
      payload: {
        device: DeviceTypes;
      };
    }
  // | {
  //     type: "TOGGLE_PREVIEW_MODE";
  //   }
  // | {
  //     type: "TOGGLE_LIVE_MODE";
  //     payload?: {
  //       value: boolean;
  //     };
  //   }
  | { type: "REDO" }
  | { type: "UNDO" }
  // | {
  //     type: "LOAD_DATA";
  //     payload: {
  //       elements: EditorElement[];
  //       withLive: boolean;
  //     };
  //   }
  | {
      type: "UPDATE_HOVER";
      payload: {
        elementId: string | null;
      };
    }
  | {
      type: "ADD_REF";
      payload: {
        element: EditorElement;
      };
    }
  | { type: "TOGGLE_PREVIEW_MODE" }
  | { type: "TOGGLE_SIDEBAR" }
  | {
      type: "UPDATE_SETTINGS_STATE";
      payload: {
        Settings: SettingsType;
      };
    };
