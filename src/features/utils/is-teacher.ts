import { ROLE } from "@/types/index";

export const isTeacher = (role: ROLE) => {
  if (!role) return false;

  return role === ROLE.teacher;
};
