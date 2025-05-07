"use server";

import { signIn } from "@/auth";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { User } from "@/models/user-model";
import { signInSchema } from "@/schemas/sign-in-schema";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

// TODO: handle login for role base;

export const loginUserAction = async (_initialState: ActionState, formData: FormData) => {
  const parsedData = await signInSchema.safeParse(Object.fromEntries(formData));
  console.log("LoginAction called!!!");

  if (!parsedData.success) {
    return fromErrorToActionState(parsedData.error, formData);
  }
  const { email, password, role } = parsedData.data;

  const existingUser = await User.findOne({ email }).lean();
  if (!existingUser || !existingUser.email) {
    return toActionState("ERROR", "Email does not exists!", formData);
  }

  if (!existingUser.password) {
    return toActionState("ERROR", "This email is registered via social login. Please use the social login option.", formData);
  }
  try {
    await signIn("credentials", {
      email,
      password,
      role,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      switch (error.type) {
        case "CredentialsSignin":
          return toActionState("ERROR", "Invalid credentials!");
        default:
          return toActionState("ERROR", "Something went wrong!");
      }
    }

    throw error;
  }

  redirect("/dashboard");
};

export const signInWithGoogle = async () => {
  console.log("google signin called!!! ");
  await signIn("google", { redirectTo: "/dashboard" });
};
