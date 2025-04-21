"use client";

import { Button } from "@/components/ui/button";
import { Role, useUserRole } from "@/store/user-role-store";

const SelectUserRole = () => {
  const { role, setRole } = useUserRole();

  const handleRoleSelection = (role: Role) => {
    setRole(role);
    localStorage.setItem("userRole", role);
  };

  // TODO: thes is a bug in role selections
  return (
    <div className="flex items-center justify-center gap-3">
      <Button variant={role === "teacher" ? "secondary" : "default"} onClick={() => handleRoleSelection("student")}>
        Student
      </Button>
      <Button variant={role === "student" ? "secondary" : "default"} onClick={() => handleRoleSelection("teacher")}>
        Teacher
      </Button>
    </div>
  );
};
export default SelectUserRole;
