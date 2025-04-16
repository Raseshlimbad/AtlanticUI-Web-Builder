import { ReactElement } from "react";

export default function Hero_1() {
  return (
    <>
      <div className="flex h-[40rem] w-full items-center justify-center bg-aui_primary">
        <div className="flex h-full flex-col items-center justify-center gap-6 px-16">
          <h1 className="text-4xl font-bold text-aui_text">
            Welcome to the world of Atlantic Web Builder
          </h1>
          <h2 className="text-lg font-medium text-aui_text_secondary">
            One stop destination to build Tailwind styled components instantly.
            A Developer first model that provides the root customizability to
            cater all your needs.
          </h2>
          <button className="h-12 w-40 rounded bg-aui_accent text-aui_text_accent hover:scale-105">
            Explore Now
          </button>
        </div>
      </div>
    </>
  );
}

export const HeroElement_1: ReactElement = (
  <div className="flex h-[40rem] w-full items-center justify-center bg-aui_primary">
    <div className="flex h-full flex-col items-center justify-center gap-6 px-16">
      <h1 className="text-4xl font-bold text-aui_text">
        Welcome to the world of Atlantic Web Builder
      </h1>
      <h2 className="text-lg font-medium text-aui_text_secondary">
        One stop destination to build Tailwind styled components instantly. A
        Developer first model that provides the root customizability to cater
        all your needs.
      </h2>
      <button className="h-12 w-40 rounded bg-aui_accent text-aui_text_accent hover:scale-105">
        Explore Now
      </button>
    </div>
  </div>
);

export const HeroCode_1 = `<div className="flex h-[40rem] w-full items-center justify-center bg-aui_primary">
    <div className="flex h-full flex-col items-center justify-center gap-6 px-16">
      <h1 className="text-4xl font-bold text-aui_text">
        Welcome to the world of Atlantic Web Builder
      </h1>
      <h2 className="text-lg font-medium text-aui_text_secondary">
        One stop destination to build Tailwind styled components instantly. A
        Developer first model that provides the root customizability to cater
        all your needs.
      </h2>
      <button className="h-12 w-40 rounded bg-aui_accent text-aui_text_accent hover:scale-105">
        Explore Now
      </button>
    </div>
  </div>`;
