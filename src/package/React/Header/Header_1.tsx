import { ReactElement } from "react";

export default function Header_1() {
  return (
    <div className="flex h-12 w-full items-center justify-between bg-aui_primary px-4 text-aui_text">
      <h1 className="text-xl font-semibold">LOGO</h1>
      <button className="text-md flex h-8 w-20 items-center justify-center rounded-sm bg-aui_accent text-center font-semibold text-aui_text_accent">
        Login
      </button>
    </div>
  );
}

export const HeaderElement_1: ReactElement = (
  <div className="flex h-12 w-full items-center justify-between bg-aui_primary px-4 text-aui_text">
    <h1 className="text-xl font-semibold">LOGO</h1>
    <button className="text-md flex h-8 w-20 items-center justify-center rounded-sm bg-aui_accent text-center font-semibold text-aui_text_accent">
      Login
    </button>
  </div>
);

export const HeaderCode_1 = `<div className="bg-aui_primary text-aui_text h-12 w-full flex justify-between items-center px-4">
  <h1 className="font-semibold text-xl">LOGO</h1>
  <button className="w-20 h-8 bg-aui_accent text-md font-semibold text-aui_text_accent flex justify-center items-center text-center rounded-sm">
    Login
  </button>
</div>`;
