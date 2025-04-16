import Image from "next/image";
import Logo from "@/assets/logo.png";
import {
  InstagramLogo,
  FacebookLogo,
  TwitterLogo,
  Copyright,
} from "@phosphor-icons/react/dist/ssr";
import { ReactElement } from "react";

export default function Footer_1() {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center bg-aui_primary">
        <div className="flex h-24 w-full items-center justify-center">
          <h1 className="text-xl font-semibold">LOGO</h1>
        </div>
        <div className="mt-4 flex h-16 w-full items-center justify-center gap-2 border-t-[1px] border-border text-center text-aui_text_secondary">
          <Copyright size={20} />
          <span>2023 Atlantic Web Builder</span>
        </div>
      </div>
    </>
  );
}

export const FooterElement_1: ReactElement = (
  <div className="flex w-full flex-col items-center justify-center bg-aui_primary">
    <div className="flex h-24 w-full items-center justify-center">
      <h1 className="text-xl font-semibold">LOGO</h1>
    </div>
    <div className="mt-4 flex h-16 w-full items-center justify-center gap-2 border-t-[1px] border-border text-center text-aui_text_secondary">
      <Copyright size={20} />
      <span>2023 Atlantic Web Builder</span>
    </div>
  </div>
);

export const FooterCode_1 = `<div className="flex w-full flex-col items-center justify-center bg-aui_primary">
<div className="flex h-24 w-full items-center justify-center">
  <h1 className="font-semibold text-xl">LOGO</h1>
</div>
<div className="mt-4 flex h-16 w-full items-center justify-center gap-2 border-t-[1px] border-border text-center text-aui_text_secondary">
  <Copyright size={20} />
  <span>2023 Atlantic Web Builder</span>
</div>
</div>`;
