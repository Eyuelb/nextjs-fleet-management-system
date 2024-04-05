"use client";
import Sidebar from "@/components/sidebar";
import { AuthProvider } from "@/lib/auth/provider";
import React, { PropsWithChildren } from "react";

type Props = {};

const Layout = (props: PropsWithChildren) => {
  return (
    <AuthProvider>
      <div className="flex min-h-screen w-full h-full">
      <Sidebar />
      {props.children}
      </div>

    </AuthProvider>
  );
};

export default Layout;
