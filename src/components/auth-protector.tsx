"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const publicRoutes = ["/", "/about", "/contact-us", "/sign-in", "/sign-up", "/choose-role", "/faqs", "/new-password"];

export const AuthProtector = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (status === "loading") return;

    const isLoggedIn = !!session;

    // Not logged in & trying to access protected route
    if (!isLoggedIn && !isPublicRoute) {
      router.replace("/choose-role");
    }

    // Logged in & trying to access auth-only route
    if (isLoggedIn && ["/sign-in", "/sign-up", "/choose-role"].includes(pathname)) {
      router.replace("/dashboard");
    }
  }, [session, status, pathname, router, isPublicRoute]);

  // Optionally render nothing while redirecting
  if (status === "loading") return null;

  return <>{children}</>;
};
