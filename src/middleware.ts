import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const cookie = req.cookies.get("sessionId");

  if (!cookie) {
    res.cookies.set("sessionId", crypto.randomUUID());
  }

  const pathActual = req.nextUrl.pathname;
  const redirectUrl = "/chat/https://pt.wikipedia.org/wiki/Portal:Tecnologia";

  if (pathActual === "/") {
    return NextResponse.redirect(new URL(redirectUrl, req.nextUrl.origin));
  }

  return res;
}
