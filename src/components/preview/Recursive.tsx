import { EditorElement } from "@/context/Editor/EditorProvider";
import React from "react";
import Container from "./Container";
import Components from "./Components";

type Props = {
  element: EditorElement;
};

const Recursive = ({ element }: Props) => {
  switch (element.type) {
    case "__body":
      return <Container element={element} />;
    case "component":
      return <Components element={element} />;
    case "component_element":
      return <Components element={element} />;
    default:
      return null;
  }
};

export default Recursive;
