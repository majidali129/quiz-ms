"use server";

import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { z } from "zod";

const signUpSchema = z
  .object({
    fullName: z.string().min(3, "Full Name must be at least 3 characters long").max(191, "Full Name must not exceed 191 characters"),
    userName: z.string().min(3, "Username must be at least 3 characters long").max(191, "Username must not exceed 191 characters"),
    email: z.string().min(1, "Email is required").max(191).email(),
    password: z.string().min(8, "Password  must be at least 8 character long.").max(191, "Password must not exceed 191 characters"),
    role: z.enum(["student", "teacher"], { message: "Role must be either 'student' or 'teacher'" }),
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
  });

export const registerUser = async (_initialState: ActionState, formData: FormData) => {
  try {
    const { email, userName, fullName, password, role, registerationId } = await signUpSchema.parse(Object.fromEntries(formData));
    console.log(email, userName);
  } catch (error) {
    console.log(error);
    return fromErrorToActionState(error, formData);
  }

  return toActionState("SUCCESS", "User registered successfully");
};
