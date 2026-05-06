import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin_token")?.value;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  // 2. If trying to access admin area without a token, redirect to login
  if (isAdminRoute && !isLoginPage && !token) {
    const loginUrl = new URL("/admin/login", request.url);
    // Optional: add the 'from' param so you can redirect back after login
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. If they HAVE a token and try to go to the login page, skip login
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/admin/cohorts", request.url));
  }

  return NextResponse.next();
}

// Ensure the matcher catches the base /admin path and all sub-paths
export const config = {
  matcher: ["/admin/:path*", "/admin"],
};