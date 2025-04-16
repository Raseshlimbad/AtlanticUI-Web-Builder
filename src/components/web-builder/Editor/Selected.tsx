import { EditorElement } from "@/context/Editor/EditorProvider";

type SelectedProps = React.PropsWithChildren<{
  className?: string;
  element: EditorElement;
}>;
const Selected: React.FC<SelectedProps> = (props) => {
  return <>{props.children}</>;
};

export default Selected;
