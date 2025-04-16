/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Checks } from "@phosphor-icons/react/dist/ssr";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import { githubGist } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { EditorElement, useEditor } from "@/context/Editor/EditorProvider";
import { CopySimple } from "@phosphor-icons/react";
import { html } from "js-beautify";

// Register the language
SyntaxHighlighter.registerLanguage('javascript', js);

export default function CodeBlock() {
  const { state } = useEditor();
  const [code, setCode] = useState<string | null>(null);

  // ---
  const generateCodeString = (element: EditorElement): string => {
    let mainStr = "";
    if (element.id === "__body") {
      const str = element.content.map((el) => { return elementToStr(el); });
      mainStr = mainStr + str.join("\n");
    } else {
      mainStr = "Something went wrong";
    }
    return mainStr;
  };

  const elementToStr = (element: EditorElement): string => {
    if (element.content.length === 0) {
      if (element.tag === undefined && element.tag === "unknown") return "";
      const { textData, ...rest } = element.special as {
        textData?: string;
      };

      const special = Object.keys(rest || {}).map((key) => {
        return `${key}="${element.special ? element.special[key] : ""}"`
      }).join(" ");
      const openTag = `<${element.tag} className="${element.styles.join(" ")}" ${special}>`;
      const closeTag = `</${element.tag}>`;

      const str = openTag + (textData ? textData : "") + closeTag;
      return str;
    } else {
      if (element.tag !== undefined &&
        element.tag !== "unknown") {

        const special = Object.keys(element.special || {}).map((key) => {
          return `${key}="${element.special ? element.special[key] : ""}"`
        }).join(" ");
        const openTag = `<${element.tag} className="${element.styles.join(" ")}" ${special} >`;
        const closeTag = `</${element.tag}>`;

        const content = element.content.map((el) => { return elementToStr(el); }).join("\n");
        const str = openTag + content + closeTag;
        return str;
      } else {
        const content = element.content.map((el) => { return elementToStr(el); }).join("\n");
        return content;
      }

    }
  }

  // ----
  // Remove this line as we don't need to register language with the default SyntaxHighlighter
  // SyntaxHighlighter.registerLanguage("jsx", jsx);

  useEffect(() => {
    const stringElement = generateCodeString(state.editor.elements[0]);
    const formattedCode = html(stringElement.replace(/\\"/g, '"'), {
      indent_size: 2, wrap_attributes: "force-expand-multiline"
    });
    setCode(formattedCode);
  }, [state.editor.elements]);

  const [btnClick, setBtnClick] = useState(false);
  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setBtnClick(true);
    const time = setTimeout(handleCopyBtn, 1000);
  };

  function handleCopyBtn() {
    setBtnClick(false);
  }

  return (
    <>
      <div className="relative h-full w-[95%]">
        {code && (
          <SyntaxHighlighter
            language="javascript"
            style={githubGist}
            customStyle={{ width: "100%", height: "100%", textWrap: "pretty", maxWidth: "100%" }}
            showLineNumbers
            wrapLines
          >
            {code}
          </SyntaxHighlighter>
        )}
        {btnClick ? (
          <button className="size-8 p-1 flex justify-center items-center absolute right-4 top-6 rounded-lg border-2 bg-background border-green-800 text-green-700">
            <Checks size={80} />
          </button>
        ) : (
          <button
            className="size-8 p-1 flex justify-center items-center absolute right-4 top-6 rounded-lg border-2 border-textComplementary text-textPrimary bg-background"
            onClick={handleCopy}
          >
            <CopySimple size={100} />
          </button>
        )}
      </div>
    </>
  );
}
