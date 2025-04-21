import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SelectUserRole from "./select-user-role";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";

export const SignUpSignIn = () => {
  return (
    <Card className="max-w-[420px] flex self-center w-full py-5">
      <Tabs defaultValue={"sign-in"}>
        <CardHeader>
          <SelectUserRole />
          <TabsList className="text-center w-full bg-transparent pb-0 h-auto rounded-none *:rounded-none">
            <TabsTrigger className="active-auth-tab" value="sign-in">
              Sign In
            </TabsTrigger>
            <TabsTrigger className="active-auth-tab" value="sign-up">
              Sign Up
            </TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent>
          <TabsContent value="sign-in">
            <SignInForm />
          </TabsContent>
          <TabsContent value="sign-up">
            <SignUpForm />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};
