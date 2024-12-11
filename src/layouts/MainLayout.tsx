import Footer from "@/components/footer";
import Header from "@/components/header";
import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const MainLayout = (props: IProps) => {
  return (
    <div className="flex-center">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default MainLayout;
