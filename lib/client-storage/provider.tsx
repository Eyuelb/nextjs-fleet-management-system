"use client"
import React, { createContext, PropsWithChildren, useEffect, useLayoutEffect, useMemo } from "react";
import { storageService, StorageType } from "./services";
import dayjs from "dayjs";

interface StorageContextType {
  storageType: StorageType | null;
  getStorageType: () => StorageType | null;
  getItem: (key: string) => any | null;
  setItem: (key: string, value: any, reservedTime: dayjs.Dayjs, expirationTime: dayjs.Dayjs) => void;
  removeItem: (key: string) => void;
  startExpirationListener: (interval?: number) => void;
}

const StorageContext = createContext<StorageContextType>({
  storageType: null,
  ...storageService,
});

export const useStorageHook = () => React.useContext(StorageContext);

export const StorageProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const storageType = useMemo(() => storageService.getStorageType(), []);

  useLayoutEffect(() => {
    if (storageType === StorageType.LocalStorage) {
      // storageService.startExpirationListener();
    }
  }, [storageType]);

  const contextValue = useMemo(() => ({
    storageType,
    ...storageService,
  }), [storageType]);

  return (
    <StorageContext.Provider value={contextValue}>
      {children}
    </StorageContext.Provider>
  );
};
