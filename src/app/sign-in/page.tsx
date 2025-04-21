import { CardCompact } from "@/components/card-compact";
import SelectUserRole from "@/features/auth/components/select-user-role";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { SignUpSignIn } from "@/features/auth/components/sign-up-sign-in";
import { KeyRound } from "lucide-react";

const AccountPage = () => {
  const title = (
    <div className="space-y-5">
      <SelectUserRole />
      <h3 className="flex items-center text-center justify-center text-[24px] gap-2 font-bold tracking-tight py-1">
        <KeyRound className="text-primary  lg:w-7 lg:h-7" />
        Welcome Back
      </h3>
    </div>
  );
  return (
    <div className="flex border min-h-screen flex-1 items-center justify-center flex-col">
      <CardCompact content={<SignInForm />} title={title} />
    </div>
  );
};
export default AccountPage;
