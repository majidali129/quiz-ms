"use client";

import { FormItem } from "@/components/form/form-item";
import SubmitButton from "@/components/form/submit-button";
import { Empty_Action_State } from "@/components/form/utils/to-action-state";
import { useUserRole } from "@/store/user-role-store";
import Link from "next/link";
import { useActionState } from "react";
import { loginUser } from "../actions/sign-in";

export const SignInForm = () => {
  const { role } = useUserRole();
  const [formState, login] = useActionState(loginUser, Empty_Action_State);
  const isStudent = role === "student";
  return (
    <form action={login}>
      <div className="flex flex-col gap-4">
        <FormItem
          formState={formState}
          name={isStudent ? "registerationId" : "email"}
          label={isStudent ? "Registeration Number" : "Email"}
          type={!isStudent ? "email" : "text"}
          placeholder={isStudent ? "Your university id" : "user@gmail.com"}
          required={true}
        />
        <input type="hidden" name="role" value={role} />
        <FormItem formState={formState} name="password" isLogin={true} label="Password" type="password" required={true} placeholder="********" />
        <SubmitButton label="Sign In" />
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="sign-up" className="underline underline-offset-4">
          Sign Up
        </Link>
      </div>
    </form>
  );
};
