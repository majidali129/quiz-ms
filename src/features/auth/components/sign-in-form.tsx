"use client";

import { Form } from "@/components/form/form";
import { FormItem } from "@/components/form/form-item";
import SubmitButton from "@/components/form/submit-button";
import { Empty_Action_State } from "@/components/form/utils/to-action-state";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { use, useActionState } from "react";
import { loginUserAction, signInWithGoogle } from "../actions/sign-in";
import google from "/public/images/google.png";

type SelectedRoleType = {
  pendingRole: Promise<string | undefined>;
};
export const SignInForm = ({ pendingRole }: SelectedRoleType) => {
  const role = use(pendingRole);
  const [formState, login] = useActionState(loginUserAction, Empty_Action_State);

  return (
    <>
      <Form action={login} actionState={formState} onSuccess={() => "Login successfully"}>
        <div className="flex flex-col gap-4">
          <FormItem formState={formState} name="email" label="Email" type="email" placeholder="user@gmail.com" required={true} />
          <input type="hidden" name="role" value={role} />
          <FormItem formState={formState} name="password" isLogin={true} label="Password" type="password" required={true} placeholder="********" />
          <SubmitButton label="Sign In" />
        </div>
        <div className="py-4">
          <Button onClick={signInWithGoogle} variant="outline" className="w-full flex items-center justify-center gap-3">
            <span className="h-6 w-6">
              <Image className="w-full h-full" src={google.src} alt="google_icon" width={100} height={100} />
            </span>
            Continue with google
          </Button>
          <div className="text-center text-sm py-1">
            Don&apos;t have an account?{" "}
            <Link href="sign-up" className="underline underline-offset-4">
              Sign Up
            </Link>
          </div>
        </div>
      </Form>
    </>
  );
};
