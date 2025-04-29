"use server";
import { signOut as signOutApi } from "@/auth";
import { signInPath } from "@/paths/paths";
import { redirect } from "next/navigation";

export const signOut = async () => {
  try {
    await signOutApi();
  } catch (error) {
    console.error("Sign out failed:", error);
  }

  redirect(signInPath());
};
