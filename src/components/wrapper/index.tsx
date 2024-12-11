import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const Wrapper = (props: IProps) => {
  return <div className="container mx-auto lg:p-6">{props.children}</div>;
};

export default Wrapper;
