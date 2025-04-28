"use client";

import { Form } from "@/components/form/form";
import { FormItem } from "@/components/form/form-item";
import SubmitButton from "@/components/form/submit-button";
import { Empty_Action_State } from "@/components/form/utils/to-action-state";
import { useUserRole } from "@/store/user-role-store";
import Link from "next/link";
import { useActionState } from "react";
import { registerUser } from "../actions/sign-up";

export const SignUpForm = () => {
  const { role } = useUserRole();
  const [formState, signUp] = useActionState(registerUser, Empty_Action_State);
  const isStudent = role === "student";

  return (
    <Form actionState={formState} onSuccess={() => console.log("Account created succesfully")} action={signUp}>
      <div className="flex flex-col gap-4">
        <input type="hidden" name="role" value={role} defaultValue={formState?.payload?.get("role") as string} />
        <FormItem name="fullName" label="FullName" type="text" required={true} placeholder="John doe" formState={formState} />
        <FormItem name="userName" label="Username" type="text" required={true} placeholder="majid129" formState={formState} />
        <FormItem name="email" label="Email" type="email" required={true} placeholder="user@gmail.com" formState={formState} />
        {isStudent && <FormItem name="registerationId" label="Registeration Id" type="text" required={true} placeholder="Your university id" formState={formState} />}
        <FormItem name="password" label="Password" type="password" required={true} placeholder="********" formState={formState} />
        <SubmitButton label="Sign Up" />
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="underline underline-offset-4">
          Sign In
        </Link>
      </div>
    </Form>
  );
};
