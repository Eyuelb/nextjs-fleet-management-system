"use-client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  PropsWithChildren,
} from "react";
import { useStorageHook } from "../client-storage/provider";
import AuthUtility from "./utils";
import { User } from "./model";
import { createEvent } from "../event-bus";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { getItem, setItem, removeItem } = useStorageHook();
  const [user, setUser] = useState<User | null>(AuthUtility.getUser());

  createEvent("logout", () => {
    AuthUtility.removeUser();
    // showNotification({
    //   type: 'success',
    //   message: 'User logged out successfully',
    // });
    window.location.reload();
  });

  const authContextValue = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
    }),
    [user]
  );

  const logout = () => {
    // Clear tokens and user data
    removeItem("tokens");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
