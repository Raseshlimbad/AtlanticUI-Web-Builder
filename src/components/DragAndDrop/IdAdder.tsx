import React, { ReactNode } from "react";

type CustomProps = {
  children: ReactNode;
  id: string;
};

export const withCustomProps = (props: CustomProps) => {
  const { id, children } = props;

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement, { id });
    }
    return child;
  });

  return <>{childrenWithProps}</>;
};
