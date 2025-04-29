import { auth } from "@/auth";
import { signInPath, signUpPath } from "@/paths/paths";
import Link from "next/link";
import { AccountDropdown } from "./account-dropdown";
import { buttonVariants } from "./ui/button";

const Header = async () => {
  const session = await auth();

  if (!session?.user) return null;
  return (
    <header className="h-15  border-b border-border flex items-center justify-between px-4 sticky top-0 !backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="hidden md:block">
          <div className="text-sm text-foreground font-medium">Dashboard</div>
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <AccountDropdown session={session} />
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href={signInPath()} className={buttonVariants({ variant: "outline" })}>
                Sign In
              </Link>
              <Link href={signUpPath()} className={buttonVariants({ variant: "default" })}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export { Header };
