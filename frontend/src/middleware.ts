import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // if user is not authenticated, redirect to the sign-in page
  if (!token) {
    const signInUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
}
// protected paths
export const config = {
  matcher: [
    "/home",
    "/home/:path*",
    "/home/tasks",
    "/home/storage",
    "/home/faq",
    "/home/settings",
  ],
};
