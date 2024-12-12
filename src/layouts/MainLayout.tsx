"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

interface IProps {
  children: ReactNode;
}

const MainLayout = (props: IProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Header />
        {props.children}
        <Footer />
      </div>
    </QueryClientProvider>
  );
};

export default MainLayout;
