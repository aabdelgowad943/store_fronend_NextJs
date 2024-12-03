import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/products(.*)", "/about"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isUserRoute = createRouteMatcher(["/user-dashboard(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const isAdminUser = (await auth()).userId === process.env.ADMIN_USER_ID;

  if (!isPublicRoute(request)) {
    await auth.protect();
  }
  if (isAdminRoute(request) && !isAdminUser) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isUserRoute(request) && isAdminUser) {
    return NextResponse.redirect(new URL("/", request.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};