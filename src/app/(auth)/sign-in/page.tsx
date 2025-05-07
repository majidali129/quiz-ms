import { getCookieByKey } from "@/actions/cookies";
import { CardCompact } from "@/components/card-compact";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { KeyRound } from "lucide-react";

const SignInPage = () => {
  const role = getCookieByKey("user-role");
  const title = (
    <div className="space-y-5">
      <h3 className="flex items-center text-center justify-center text-[24px] gap-2 font-bold tracking-tight py-1">
        <KeyRound className="text-primary  lg:w-7 lg:h-7" />
        Welcome Back
      </h3>
    </div>
  );
  return (
    <div className="flex border min-h-screen flex-1 items-center justify-center flex-col">
      <CardCompact content={<SignInForm pendingRole={role} />} title={title} className="py-6" />
    </div>
  );
};
export default SignInPage;
