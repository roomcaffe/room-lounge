import { NextRequest, NextResponse } from "next/server";

// On admin.roomcaffe.com, rewrite all paths to /admin/*
// so visiting the bare host opens the admin app directly.
export function middleware(req: NextRequest) {
  const host = req.headers.get("host")?.toLowerCase() ?? "";
  const isAdminHost = host === "admin.roomcaffe.com";

  if (!isAdminHost) return NextResponse.next();

  const { pathname, search } = req.nextUrl;

  // Already pointing at /admin/* — leave it alone
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.next();
  }

  // Public API routes still need to work on the admin host
  // (admin pages call /api/admin/* from the browser).
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Static assets / Next internals
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/public/") ||
    /\.[a-z0-9]+$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Rewrite everything else to /admin{pathname}
  const url = req.nextUrl.clone();
  url.pathname = `/admin${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
