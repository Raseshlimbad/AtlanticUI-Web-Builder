import { EditorElement } from "@/context/Editor/EditorProvider";
import Components from "./Components";
import Container from "./Container";
import Text from "./Text";

type Props = {
  element: EditorElement;
};

const Recursive = ({ element }: Props) => {
  switch (element.type) {
    case "text":
      return <Text element={element} />;
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
