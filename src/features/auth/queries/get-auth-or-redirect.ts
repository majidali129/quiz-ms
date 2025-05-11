import { auth } from "@/auth";
import { chooseRolePath } from "@/paths/paths";
import { redirect } from "next/navigation";

export const getAuthOrRedirect = async () => {
  const session = await auth();
  if (!session?.user) redirect(chooseRolePath());

  return session;
};
