"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";

import { createUserRoleStore, initialUserRoleStore, type UserRoleStore } from "@/store/user-role-store";
import { useStore } from "zustand";

export type UserRoleStoreApi = ReturnType<typeof createUserRoleStore>;

export const UserRoleStoreContext = createContext<UserRoleStoreApi | undefined>(undefined);

export interface UserRoleStoreProviderProps {
  children: ReactNode;
}

export const UserRoleStoreProvider = ({ children }: UserRoleStoreProviderProps) => {
  const storeRef = useRef<UserRoleStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createUserRoleStore(initialUserRoleStore());
  }

  return <UserRoleStoreContext.Provider value={storeRef.current}>{children}</UserRoleStoreContext.Provider>;
};

export const useUserRoleStore = <T,>(selectore: (store: UserRoleStore) => T): T => {
  const userRoleStoreContext = useContext(UserRoleStoreContext);

  if (!userRoleStoreContext) {
    throw new Error(`useUserRoleStore must be used within UserRoleStoreProvider`);
  }

  return useStore(userRoleStoreContext, selectore);
};
