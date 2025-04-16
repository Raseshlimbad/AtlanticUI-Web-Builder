type DropableProps = React.PropsWithChildren<{
  className?: string;
}>;

export const Dropable: React.FC<DropableProps> = (props) => {
  const handleDrop = () => {};

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  return (
    <div
      className={`${props.className}`}
      onDrop={() => handleDrop()}
      onDragOver={(e) => handleDragOver(e)}
    >
      {props.children}
    </div>
  );
};
