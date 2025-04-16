import { ReactElement } from "react";

export default function Footer_2() {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center bg-aui_primary">
        <div className="flex w-full  items-center justify-between px-8 py-6">
          <div className="flex w-40 items-center justify-center">
            <h1 className="text-xl font-semibold">LOGO</h1>
          </div>
          <div className="flex w-40 flex-col items-start justify-center gap-2">
            <span className="hover:cursor-pointer hover:text-aui_text_secondary">
              About Us
            </span>
            <span className="hover:cursor-pointer hover:text-aui_text_secondary">
              Contact
            </span>{" "}
            <span className="hover:cursor-pointer hover:text-aui_text_secondary">
              Career
            </span>
          </div>
        </div>
        <div className="flex h-16 w-full items-center justify-center gap-2 border-t-[1px] border-border text-center text-aui_text_secondary">
          <span>2023 Atlantic Web Builder</span>
        </div>
      </div>
    </>
  );
}

export const FooterElement_2: ReactElement = (
  <div className="flex w-full flex-col items-center justify-center bg-aui_primary">
    <div className="flex w-full  items-center justify-between px-8 py-6">
      <div className="flex w-40 items-center justify-center">
        <h1 className="text-xl font-semibold">LOGO</h1>
      </div>
      <div className="flex w-40 flex-col items-start justify-center gap-2">
        <span className="hover:cursor-pointer hover:text-aui_text_secondary">
          About Us
        </span>
        <span className="hover:cursor-pointer hover:text-aui_text_secondary">
          Contact
        </span>{" "}
        <span className="hover:cursor-pointer hover:text-aui_text_secondary">
          Career
        </span>
      </div>
    </div>
    <div className="flex h-16 w-full items-center justify-center gap-2 border-t-[1px] border-border text-center text-aui_text_secondary">
      <span>2023 Atlantic Web Builder</span>
    </div>
  </div>
);

export const FooterCode_2 = `<>
<div className="w-full flex flex-col justify-center items-center bg-aui_primary">
  <div className="w-full h-24  flex items-center justify-between px-8">
    <div className="w-40 flex justify-center items-center">
        <h1 className="font-semibold text-xl">LOGO</h1>
    </div>
    <div className="w-40 flex justify-center items-center gap-6">
      <InstagramLogo
        size={28}
        weight="fill"
        className="hover:scale-110 hover:cursor-pointer"
      />
      <TwitterLogo
        size={28}
        weight="fill"
        className="hover:scale-110 hover:cursor-pointer"
      />
      <FacebookLogo
        size={28}
        weight="fill"
        className="hover:scale-110 hover:cursor-pointer"
      />
    </div>
  </div>
  <div className="w-full h-16 border-t-[1px] border-border flex justify-center items-center gap-2 text-aui_text_secondary text-center">
    <Copyright size={20} />
    <span>2023 Atlantic Web Builder</span>
  </div>
</div>
</>`;
