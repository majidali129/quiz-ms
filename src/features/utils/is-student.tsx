import { ROLE } from "@/types/index";

export const isStudent = (role: ROLE) => {
  if (!role) return false;

  return role === ROLE.student;
};
