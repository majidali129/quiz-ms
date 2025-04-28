import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar/components/sidebar";
import { SessionProvider } from "next-auth/react";

export default function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <div className="flex items-start">
        <Sidebar />
        <div className="flex-1 flex flex-col lg:ps-[210px]">
          <Header />
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
