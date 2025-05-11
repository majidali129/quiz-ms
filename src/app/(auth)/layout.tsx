import { getAuth } from "@/features/auth/queries/get-auth";
import { dashboardPath } from "@/paths/paths";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuth();
  if (session) {
    redirect(dashboardPath());
  }
  return <div className="min-h-screen">{children}</div>;
}
