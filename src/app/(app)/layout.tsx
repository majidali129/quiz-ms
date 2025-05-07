import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar/components/sidebar";
import { SessionProvider } from "next-auth/react";

export default async function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <div className="flex items-start">
        <Sidebar />
        <div className="flex-1 min-h-screen flex flex-col lg:ps-[210px] h-full">
          <Header />
          <main className="h-[calc(100vh-60px)] hide-scroll overflow-y-scroll py-10">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
