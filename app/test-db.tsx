"use client";
import React, { useEffect } from "react";
import { handleConnectionTest } from "./db";

const TestDb = () => {
  useEffect(() => {

    handleConnectionTest();
    return () => {};
  }, []);

  return <div></div>;
};

export default TestDb;
