"use client";
import AppShell from "@/components/app-shell";
import { AuthProvider } from "@/lib/auth/provider";
import React, { PropsWithChildren } from "react";

type Props = {};

const Layout = (props: PropsWithChildren) => {
  return (
    <AuthProvider>
      <AppShell>{props.children}</AppShell>
    </AuthProvider>
  );
};

export default Layout;
