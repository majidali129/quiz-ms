import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar/components/sidebar";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { SessionProvider } from "next-auth/react";

export default async function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getAuthOrRedirect();
  return (
    <SessionProvider>
      <div className="flex items-start">
        <Sidebar />
        <div className="flex-1 min-h-screen flex flex-col lg:ps-[210px] h-full">
          <Header />
          <div className="h-[calc(100vh-60px)] hide-scroll overflow-y-auto">{children}</div>
        </div>
      </div>
    </SessionProvider>
  );
}
