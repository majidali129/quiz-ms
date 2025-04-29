import { auth } from "@/auth";
import { signInPath } from "@/paths/paths";
import { redirect } from "next/navigation";

export const getAuthOrRedirect = async () => {
  const session = await auth();
  if (!session?.user) redirect(signInPath());

  return session;
};
