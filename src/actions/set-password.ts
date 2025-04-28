"use server";

import { auth } from "@/auth";
import { User } from "@/models/user-model";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { redirect } from "next/navigation";
import { z } from "zod";

const setPasswordSchema = z
  .object({
    role: z.enum(["teacher", "student"], { message: "Invalid role selection. It can be either teacher or student" }),
    password: z.string().min(8, "Password must be at least 8 characters long").max(20),
    confirmPassword: z.string().min(2, "Confirm password must be at least 8 characters long").max(20),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
      });
    }
  });
export const setPassword = async (formData: FormData) => {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("No session found");
    }
    const { role, password } = await setPasswordSchema.parse(Object.fromEntries(formData));
    const user = await User.findOne({ _id: new Types.ObjectId(session.user.id), role, email: session?.user.email });
    if (!user) {
      throw new Error("User not found");
    }

    console.log("password", user);

    user.password = await bcrypt.hash(password, 10);
    await user.save({ validateBeforeSave: false });

    console.log("Password set");
  } catch (error) {
    console.log("set-password Error: ", error);
  }
  redirect("/sign-in");
};
