import { ReactElement } from "react";
export default function Header_2() {
  return (
    <div className="flex h-16 w-full items-center justify-between border-b-[1px] border-aui_border bg-aui_primary px-6">
      <h1 className="text-xl font-semibold">LOGO</h1>
      <div className="flex h-full items-center gap-6">
        <a href="" className="text-aui_text_secondary hover:text-aui_text">
          Field 1
        </a>
        <a href="" className="text-aui_text_secondary hover:text-aui_text">
          Field 2
        </a>
        <a href="" className="text-aui_text_secondary hover:text-aui_text">
          Field 3
        </a>
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

export const HeaderElement_2: ReactElement = (
  <div className="flex h-16 w-full items-center justify-between border-b-[1px] border-aui_border bg-aui_primary px-6">
    <h1 className="text-xl font-semibold">LOGO</h1>
    <div className="flex h-full items-center gap-6">
      <a href="" className="text-aui_text_secondary hover:text-aui_text">
        Field 1
      </a>
      <a href="" className="text-aui_text_secondary hover:text-aui_text">
        Field 2
      </a>
      <a href="" className="text-aui_text_secondary hover:text-aui_text">
        Field 3
      </a>
      <a
        href=""
        className="flex h-8 w-20 items-center justify-center rounded-md bg-aui_accent text-center text-aui_text_accent hover:bg-aui_accent_hover"
      >
        Login
      </a>
    </div>
  </div>
);
export const HeaderCode_2 = `<div className="flex h-16 w-full items-center justify-between border-b-[1px] border-aui_border bg-aui_primary px-6">
  <h1 className="font-semibold text-xl">LOGO</h1>
  <div className="flex h-full items-center gap-6">
    <a href="" className="text-aui_text_secondary hover:text-aui_text">
      Field 1
    </a>
    <a href="" className="text-aui_text_secondary hover:text-aui_text">
      Field 2
    </a>
    <a href="" className="text-aui_text_secondary hover:text-aui_text">
      Field 3
    </a>
    <a
      href=""
      className="flex h-8 w-20 items-center justify-center rounded-md bg-aui_accent text-center text-aui_text_accent hover:bg-aui_accent_hover"
    >
      Login
    </a>
  </div>
</div>`;
