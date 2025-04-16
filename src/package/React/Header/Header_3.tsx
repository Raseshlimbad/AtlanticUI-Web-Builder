import { ReactElement } from "react";
export default function Header_3() {
  return (
    <div className="flex h-16 w-full items-center justify-between border-b-[1px] border-aui_border bg-aui_primary px-12">
      <h1 className="text-xl font-semibold">LOGO</h1>
      <div className="flex h-full items-center gap-6">
        <input
          type="text"
          placeholder="Search"
          className="block h-8 w-full rounded-md border-[1px] border-aui_accent_secondary px-4 shadow-sm focus:ring focus:ring-aui_ring focus:ring-opacity-50"
        />
        <a
          href=""
          className="flex h-8 w-20 items-center justify-center rounded-md bg-aui_accent text-center text-aui_text_accent hover:bg-aui_accent_hover"
        >
          Login
        </a>
      </div>
    </div>
  );
}

export const HeaderElement_3: ReactElement = (
  <div className="flex h-16 w-full items-center justify-between border-b-[1px] border-aui_border bg-aui_primary px-12">
    <h1 className="text-xl font-semibold">LOGO</h1>
    <div className="flex h-full items-center gap-6">
      <input
        type="text"
        placeholder="Search"
        className="block h-8 w-full rounded-md border-[1px] border-aui_accent_secondary px-4 shadow-sm focus:ring focus:ring-aui_ring focus:ring-opacity-50"
      />
      <a
        href=""
        className="flex h-8 w-20 items-center justify-center rounded-md bg-aui_accent text-center text-aui_text_accent hover:bg-aui_accent_hover"
      >
        Login
      </a>
    </div>
  </div>
);

export const HeaderCode_3 = `<div className="w-full h-16 flex justify-between items-center border-b-[1px] border-aui_border px-12 bg-aui_primary">
  <h1 className="font-semibold text-xl">LOGO</h1>
  <div className="h-full flex items-center gap-6">
    <input
      type="text"
      placeholder="Search"
      className="block w-full h-8 rounded-md border-[1px] shadow-sm px-4 border-aui_accent_secondary focus:ring focus:ring-aui_ring focus:ring-opacity-50"
    />
    <a
      href=""
      className="w-20 h-8 rounded-md bg-aui_accent hover:bg-aui_accent_hover text-aui_text_accent text-center flex justify-center items-center"
    >
      Login
    </a>
  </div>
</div>`;
