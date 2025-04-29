import { signOut } from "@/features/auth/actions/sign-out";
import { signInPath } from "@/paths/paths";
import { LogOut, Settings, User } from "lucide-react";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

type AcctountDropdownProps = {
  session: Session;
};

const AccountDropdown = ({ session }: AcctountDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.user?.image || "/placeholder.svg"} alt={session.user?.userName || ""} />
            <AvatarFallback className="bg-background text-foreground">{session.user?.fullName?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium leading-none">{session.user?.name}</p>
          <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600 dark:text-red-400">
          <LogOut className="mr-1 h-4 w-4" />
          <form action={signOut}>
            <button type="submit" className="w-full text-left">
              Sign out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export { AccountDropdown };
