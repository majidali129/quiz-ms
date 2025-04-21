import { create, createStore } from "zustand";

import { persist } from "zustand/middleware";

export type Role = "student" | "teacher";

export type UserRoleState = {
  role: Role;
};

export type RoleAction = {
  setRole: (role: Role) => void;
};

export type UserRoleStore = UserRoleState & RoleAction;

export const initialUserRoleStore = (): UserRoleState => {
  return {
    role: "teacher",
  };
};

export const defaultInitialState: UserRoleState = {
  role: "teacher",
};

export const createUserRoleStore = (initialState: UserRoleState = defaultInitialState) => {
  return createStore<UserRoleStore>((set) => ({
    ...initialState,
    setRole: (role) => set({ role }),
  }));
};

export const useUserRole = create<UserRoleStore>()(
  persist(
    (set, get) => ({
      role: "teacher",
      setRole: (role) => set({ role }),
    }),
    {
      name: "userRole",
    }
  )
);
