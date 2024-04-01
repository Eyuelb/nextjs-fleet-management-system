"use client";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import getQueryClient from "./queryClient";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient;
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
