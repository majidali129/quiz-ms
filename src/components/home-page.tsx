"use client";

import { useUserRoleStore } from "@/providers/user-role-store-provider";

const HomePage = () => {
  const { role } = useUserRoleStore((state) => state);
  return <div>Current User Role: {role}</div>;
};
export { HomePage };
