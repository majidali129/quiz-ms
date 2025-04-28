"use server";

import { signIn } from "@/auth";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { signInSchema } from "@/schemas/sign-in-schema";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

// TODO: handle login for role base;

export const loginUserAction = async (_initialState: ActionState, formData: FormData) => {
  const data = await signInSchema.safeParse(Object.fromEntries(formData));

  try {
    await signIn("credentials", {
      email: data.data?.email,
      password: data.data?.password,
      role: data.data?.role,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return fromErrorToActionState(error, formData);
    }

    if (error instanceof AuthError) {
      switch (error.cause) {
        case "CredentialsSignin":
          return toActionState("ERROR", "Invalid credentials", formData);
        default:
          return toActionState("ERROR", "Something went wrong", formData);
      }
    }
  }

  redirect("/dashboard");
};

export const signInWithGoogle = async () => {
  console.log("google signin called!!! ");
  await signIn("google", { redirectTo: "/dashboard" });
};
