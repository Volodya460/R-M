import { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => {
  return <div className="container mx-auto  px-5 py-10">{children}</div>;
};
