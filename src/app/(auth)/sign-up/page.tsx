import { CardCompact } from "@/components/card-compact";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { UserPlus } from "lucide-react";

const SignUpPage = () => {
  const title = (
    <div className="space-y-5">
      <h3 className="flex items-center text-center justify-center text-[24px] gap-2 font-bold tracking-tight py-1">
        <UserPlus className="text-primary  lg:w-7 lg:h-7" />
        Create Account
      </h3>
    </div>
  );
  return (
    <div className="flex border min-h-screen flex-1 items-center justify-center flex-col">
      <CardCompact content={<SignUpForm />} title={title} />
    </div>
  );
};
export default SignUpPage;
