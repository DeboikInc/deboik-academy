import { NextResponse } from "next/server";

export async function POST(request) {
  const { password } = await request.json();

  if (password !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });

  // Set a secure httpOnly cookie valid for 8 hours
  res.cookies.set("admin_token", process.env.ADMIN_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  });

  return res;
}