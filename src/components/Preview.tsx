"use client";
import { Variants } from "@/package/React/data";
import clsx from "clsx";
import { useState } from "react";

import { ArrowsOut, Checks, Copy } from "@phosphor-icons/react/dist/ssr";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Preview({ variant }: { variant: Variants }) {
  SyntaxHighlighter.registerLanguage("jsx", jsx);

  const [mode, setMode] = useState<"preview" | "code">("preview");

  const handleModeChange = (): void => {
    if (mode === "preview") {
      setMode("code");
    } else if (mode === "code") {
      setMode("preview");
    }
  };
  const [btnClick, setBtnClick] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(variant.code);
    setBtnClick(true);
    const time = setTimeout(handleCopyBtn, 1000);
  };

  function handleCopyBtn() {
    setBtnClick(false);
  }
  return (
    <>
      {variant ? (
        <div className="w-full">
          <div className="flex h-16 w-full items-center justify-between">
            <h1 className="text-xl font-semibold text-textPrimary">
              {variant.name}
            </h1>
            <div className="flex h-full items-center justify-center gap-4">
              <a
                href={`/preview/components/${variant.id}`}
                target="_blank"
                className=" flex h-10 items-center justify-center gap-4 rounded-lg bg-secondary px-4 text-center text-textPrimary  transition-all  duration-200 hover:scale-110"
              >
                Open In Fullscreeen
                <ArrowsOut size={24} />
              </a>
              <div className="flex h-10 items-center justify-center gap-2 rounded-md bg-secondary px-2">
                <button
                  className={clsx("h-8 w-24 rounded-md ", {
                    "bg-primary text-textComplementary": mode === "preview",
                  })}
                  onClick={handleModeChange}
                >
                  Preview
                </button>
                <button
                  className={clsx("h-8 w-16 rounded-md ", {
                    "bg-primary text-textComplementary": mode === "code",
                  })}
                  onClick={handleModeChange}
                >
                  Code
                </button>
              </div>
              <button
                className={clsx(
                  "flex h-10 w-10 items-center justify-center rounded-md bg-secondary",
                  { "text-green-600": btnClick === true },
                )}
                onClick={handleCopy}
              >
                {btnClick === false ? <Copy size={20} /> : <Checks size={20} />}
              </button>
            </div>
          </div>

          {/* BOX */}

          {mode === "preview" ? (
            <div className="flex w-full items-center justify-center  rounded-md border-[2px] border-border bg-slate-200 py-10">
              <div
                className="flex min-h-80 w-[98%] items-center justify-center 
              md:max-w-[calc((100vw*0.85)*0.90)]"
              >
                <variant.component />
              </div>
            </div>
          ) : null}
          {mode === "code" ? (
            <div className="min-h-80 w-full max-w-[calc((100vw*0.85)*0.90)]">
              <SyntaxHighlighter
                language="jsx"
                style={atomDark}
                customStyle={{ width: "100", minHeight: "21rem" }}
                showLineNumbers
              >
                {variant.code}
              </SyntaxHighlighter>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
