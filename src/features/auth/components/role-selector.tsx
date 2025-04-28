"use client";

import { selectRole } from "@/actions/set-role";
import { useRef, useState } from "react";

export default function RoleSelector({ selectedRole }: { selectedRole?: "teacher" | "teacher" }) {
  const [role, setRole] = useState<"student" | "teacher">(selectedRole ?? "teacher");
  const formRef = useRef<HTMLFormElement>(null);

  const handleRoleChange = (newRole: "student" | "teacher") => {
    setRole(newRole);
    formRef.current?.requestSubmit();
  };

  console.log(role);
  return (
    <div>
      <form action={selectRole} ref={formRef}>
        <input type="hidden" name="role" value={role} />
        <div className="flex items-center justify-center gap-2.5">
          <button className={`py-1 px-4  ${role === "student" ? "bg-teal-500 hover:bg-teal-500/80" : "bg-gray-900 hover:bg-gray-900/90"}  text-gray-100 cursor-pointer`} onClick={() => handleRoleChange("student")}>
            Student
          </button>
          <button className={`py-1 px-4  ${role === "teacher" ? "bg-teal-500 hover:bg-teal-500/80" : "bg-gray-900 hover:bg-gray-900/90"}  text-gray-100 cursor-pointer`} onClick={() => handleRoleChange("teacher")}>
            Teacher
          </button>
        </div>
      </form>
    </div>
  );
}
