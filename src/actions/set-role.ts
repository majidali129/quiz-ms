"use server";

import { ActionState, fromErrorToActionState } from "@/components/form/utils/to-action-state";
import { redirect } from "next/navigation";
import { z, ZodError } from "zod";
import { setCookieByKey } from "./cookies";

const roleSelectSchema = z.object({
  role: z.enum(["teacher", "student"], { message: "Pleas select a role. It can be either teacher or student" }),
});

export const selectRole = async (_initialState: ActionState, formData: FormData) => {
  try {
    const { role } = await roleSelectSchema.parse(Object.fromEntries(formData));
    console.log("choose-role called!!!", role);
    await setCookieByKey("user-role", role);

    console.log("Select Role:", role);
    // return toActionState("SUCCESS", "Role selected successfully", formData);
  } catch (error) {
    console.log("Role Selection Error: ", error);
    if (error instanceof ZodError) {
      return fromErrorToActionState(error, formData);
    }
  }

  redirect("/sign-in");
};
