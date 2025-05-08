import { NextResponse } from "next/server";
import { auth } from "./auth";
import { chooseRolePath } from "./paths/paths";
import { authRoutes } from "./routes";

import { connectDB } from "./lib/connect-db";

export default auth((req) => {
  const { nextUrl } = req;
  const url = nextUrl.pathname;
  const isLoggedIn = !!req.auth;
  console.log("URL", url, isLoggedIn);

  if (isLoggedIn && authRoutes.includes(url)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!isLoggedIn && !authRoutes.includes(url)) {
    return NextResponse.redirect(new URL(chooseRolePath(), req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/sign-up",
    "/sign-in",
    "/choose-role",
    "/new-password",
    "/courses",
    "/dashboard",
    "/quizzes",
    "/update-password",
    "/profile",
    "/settings",
    "/",
    "/about",
    "/contact-us",
    "/faqs",
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],

  unstable_allowDynamic: [
    "/node_modules/@nextui-org/calendar/dist/chunk-NABLCSM5.mjs",
    "/node_modules/@nextui-org/theme/dist/chunk-YSA7EQBH.mjs",
    "/node_modules/@nextui-org/calendar/dist/index.mjs",
    "/node_modules/@nextui-org/react/dist/index.mjs",
    "/node_modules/@nextui-org/theme/dist/index.mjs",
    "/node_modules/lodash.kebabcase/index.js",
    "/node_modules/lodash.debounce/index.js",
    "/node_modules/lodash.mapkeys/index.js",
    "/node_modules/lodash.omit/index.js",
    "/node_modules/lodash.get/index.js",
    "./src/lib/connect-db.ts",
    "./node_modules/mongoose/dist/browser.umd.js",
  ],
};
