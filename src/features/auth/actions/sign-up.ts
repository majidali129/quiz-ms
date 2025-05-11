"use server";

import { getCookieByKey } from "@/actions/cookies";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { connectDB } from "@/lib/connect-db";
import { User } from "@/models/user-model";
import { signInPath } from "@/paths/paths";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";

const signUpSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters long").max(191, "Full Name must not exceed 191 characters"),
  userName: z.string().min(3, "Username must be at least 3 characters long").max(191, "Username must not exceed 191 characters"),
  email: z.string().min(1, "Email is required").max(191).email("Invalid email address"),
  password: z.string().min(8, "Password  must be at least 8 character long.").max(191, "Password must not exceed 191 characters"),
  registerationId: z.string().optional(),
});
// .superRefine((data, ctx) => {
//   if (data.role === "student" && !data.registerationId) {
//     ctx.addIssue({
//       code: "custom",
//       message: "Registeration ID is required for students.",
//       path: ["registerationId"],
//     });
//   }
// });

export const registerUser = async (_initialState: ActionState, formData: FormData) => {
  await connectDB();
  try {
    const { userName, fullName, email, password, registerationId } = await signUpSchema.parse(Object.fromEntries(formData));
    const role = await getCookieByKey("user-role");

    const existingUser = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (existingUser) {
      return toActionState("ERROR", "User already exists with these credentials", formData);
    }

    // if (role === "student") {
    //   const existingStudent = await User.findOne({
    //     registerationId,
    //   });
    //   if (existingStudent) {
    //     return toActionState("ERROR", "Registeration ID is already used", formData);
    //   }
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("called");
    const createdUser = await User.create({
      userName,
      fullName,
      email,
      password: hashedPassword,
      role: role,
      registerationId: registerationId,
    });

    if (!createdUser) {
      return toActionState("ERROR", "We are facing some issue in registeration. Try again later", formData);
    }
  } catch (error) {
    console.log(error);
    return fromErrorToActionState(error, formData);
  }

  redirect(signInPath());
};
