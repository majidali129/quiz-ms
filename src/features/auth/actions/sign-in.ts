"use server";

import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { z } from "zod";

const signInSchema = z
  .object({
    role: z.enum(["student", "teacher"], { message: "Role must be either 'student' or 'teacher'" }),
    email: z.string().email().optional(),
    password: z.string().min(8, "Password  must be at least 8 character long.").max(191, "Password must not exceed 191 characters"),
    registerationId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === "student" && !data.registerationId) {
      ctx.addIssue({
        code: "custom",
        message: "Registeration ID is required for students.",
        path: ["registerationId"],
      });
    }

    if (data.role === "teacher" && !data.email) {
      ctx.addIssue({
        code: "custom",
        message: " Email is required",
        path: ["email"],
      });
    }
  });

export const loginUser = async (_initialState: ActionState, formData: FormData) => {
  try {
    const { email, password, role, registerationId } = await signInSchema.parse(Object.fromEntries(formData));
    console.log(email);
  } catch (error) {
    console.log(error);
    return fromErrorToActionState(error, formData);
  }

  return toActionState("SUCCESS", "User registered successfully");
};
